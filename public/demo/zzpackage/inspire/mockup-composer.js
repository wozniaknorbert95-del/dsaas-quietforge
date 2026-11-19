/**
 * ==========================================
 * ZZPACKAGE INSPIRE — MECHANICAL MOCKUP COMPOSER (Step B)
 * ==========================================
 *
 * Vanilla JS + canvas port of the ORIGINAL engine composition logic
 * (flexgrafik-inspire / engine/compose_ref.py + brain/panel-map.json).
 * No dependencies, no bundler — loaded before demo-boot.js.
 *
 * HYBRID GENERATION STACK (todos/inspire.json decided_generation_stack):
 *   1. SDXL generates FLAT WRAP ARTWORK only (Step A: /api/v1/generate-art).
 *   2. THIS MODULE composes it mechanically: vehicle template (voertuig_*.png)
 *      + AI artwork clipped to the panel-map wrap zones + the customer's REAL
 *      logo over the "deur" zone.
 *   3. THE LOGO NEVER PASSES THROUGH AI. It is only knocked out (white plate
 *      removal) and uniformly scaled — no warp, no colour change, no redraw.
 *
 * Faithful ports (exact original maths):
 *   - knockoutWhiteBackground(): r,g,b >= 245 → transparent (threshold 245).
 *   - logoRect(): "deur" panel, x = w*x_pct + 8, y = h*y_pct + 8,
 *     x2 = x + w*w_pct*0.75, y2 = y + h*h_pct*0.45 (int truncation like int()).
 *   - logo fit: ratio = min(max_w/logo_w, max_h/logo_h), trunc resize, paste
 *     top-left at (lx, ly) (compose_ref.py compose_template_on_vehicle).
 *   - downscale(): max width 800, height truncated (downscale_png).
 *   - template is downscaled BEFORE the logo maths (preview path of
 *     compose_template_on_vehicle: resize base first, then _logo_rect).
 *   - no-logo fallback: minimal typographic logo (draw_typo_logo port).
 */
(function () {
    'use strict';

    // ============================================================
    // Constants — compose_ref.py / brain/panel-map.json
    // ============================================================
    var PANEL_MAP_URL = 'data/panel-map.json';
    var KNOCKOUT_THRESHOLD = 245;   // knockout_white_background(threshold=245)
    var LOGO_OFFSET_PX = 8;         // _logo_rect +8px offsets
    var LOGO_W_FACTOR = 0.75;       // _logo_rect x2 factor
    var LOGO_H_FACTOR = 0.45;       // _logo_rect y2 factor
    var PREVIEW_MAX_WIDTH = 800;    // downscale_png(max_width=800)

    /**
     * ARTWORK BLEND (documented, Step B decision): the AI wrap artwork is
     * clipped to the panel-map wrap-zone rects (rounded_vinyl clip) and drawn
     * with source-over compositing at globalAlpha 0.62. The vehicle photo
     * stays visible underneath at 38% — body shading, contours and reflections
     * read through, so the artwork looks like printed vinyl on the photographed
     * vehicle instead of a flat sticker. The real logo is pasted LAST at full
     * opacity on top of everything.
     */
    var ARTWORK_ALPHA = 0.62;
    var PANEL_RADIUS = 4;           // panel_shape_style: "rounded_vinyl"
    var DEFAULT_WRAP_ZONE = ['zij', 'deur', 'achter'];

    var panelMapCache = null;

    // ============================================================
    // Panel map (repo SSoT — brain/panel-map.json, copied verbatim to
    // data/panel-map.json). logoRect() needs it; composeMockup() loads it.
    // ============================================================
    function loadPanelMap() {
        if (panelMapCache) return Promise.resolve(panelMapCache);
        return fetch(PANEL_MAP_URL, { cache: 'no-store' })
            .then(function (res) {
                if (!res.ok) throw new Error('[mockup-composer] panel-map.json HTTP ' + res.status);
                return res.json();
            })
            .then(function (json) {
                if (!json || !json.panels || !json.panels.caddy || !json.panels.caddy.deur) {
                    throw new Error('[mockup-composer] panel-map.json has no panels.*.deur data');
                }
                panelMapCache = json;
                return json;
            });
    }

    // ============================================================
    // knockout_white_background — exact port (threshold 245)
    // ============================================================
    function knockoutWhiteBackground(imageData) {
        var d = imageData.data;
        for (var i = 0; i < d.length; i += 4) {
            if (d[i + 3] === 0) continue;
            if (d[i] >= KNOCKOUT_THRESHOLD && d[i + 1] >= KNOCKOUT_THRESHOLD && d[i + 2] >= KNOCKOUT_THRESHOLD) {
                d[i + 3] = 0;
            }
        }
        return imageData;
    }

    // ============================================================
    // _logo_rect — exact port (deur panel + 8px offsets, 0.75/0.45 factors)
    // ============================================================
    function logoRect(w, h, vehicle, map) {
        var m = map || panelMapCache;
        if (!m || !m.panels) {
            throw new Error('[mockup-composer] panel-map not loaded (call loadPanelMap first)');
        }
        // compose_ref.py: panels.get(vehicle, panels["caddy"])
        var panels = m.panels[vehicle] || m.panels.caddy;
        var deur = panels.deur;
        var x = Math.trunc(w * deur.x_pct) + LOGO_OFFSET_PX;
        var y = Math.trunc(h * deur.y_pct) + LOGO_OFFSET_PX;
        var x2 = x + Math.trunc(w * deur.w_pct * LOGO_W_FACTOR);
        var y2 = y + Math.trunc(h * deur.h_pct * LOGO_H_FACTOR);
        return { x: x, y: y, x2: x2, y2: y2 };
    }

    // ============================================================
    // Image loading helpers (File / Blob / URL / data URL → HTMLImageElement)
    // ============================================================
    function loadImage(source) {
        return new Promise(function (resolve, reject) {
            if (!source) {
                reject(new Error('[mockup-composer] empty image source'));
                return;
            }
            if (source.tagName === 'IMG' || source.tagName === 'CANVAS') {
                resolve(source);
                return;
            }
            var img = new Image();
            var objectUrl = null;
            img.onload = function () {
                if (objectUrl) URL.revokeObjectURL(objectUrl);
                resolve(img);
            };
            img.onerror = function () {
                if (objectUrl) URL.revokeObjectURL(objectUrl);
                reject(new Error('[mockup-composer] image load failed'));
            };
            if (typeof source === 'string') {
                img.src = source;
            } else if (typeof Blob !== 'undefined' && source instanceof Blob) {
                objectUrl = URL.createObjectURL(source);
                img.src = objectUrl;
            } else {
                reject(new Error('[mockup-composer] unsupported image source'));
            }
        });
    }

    function sourceSize(img) {
        return {
            w: img.naturalWidth || img.width || 0,
            h: img.naturalHeight || img.height || 0
        };
    }

    /** Logo plate → knockout canvas (white plate removed, alpha preserved). */
    function knockoutCanvas(img) {
        var size = sourceSize(img);
        var c = document.createElement('canvas');
        c.width = size.w;
        c.height = size.h;
        var ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);
        var data = ctx.getImageData(0, 0, size.w, size.h);
        knockoutWhiteBackground(data);
        ctx.putImageData(data, 0, 0);
        return c;
    }

    // ============================================================
    // draw_typo_logo — minimal typographic logo (T-008 port): bold sans,
    // brand colour, used ONLY when the customer has no logo file.
    // ============================================================
    function drawTypoLogo(text, color) {
        var label = String(text || '').trim().slice(0, 24) || 'Logo';
        var font = '700 72px Arial, Helvetica, sans-serif';
        var probe = document.createElement('canvas').getContext('2d');
        probe.font = font;
        var pad = 24;
        var c = document.createElement('canvas');
        c.width = Math.ceil(probe.measureText(label).width) + pad * 2;
        c.height = 72 + pad * 2;
        var ctx = c.getContext('2d'); // resizing resets context state
        ctx.font = font;
        ctx.fillStyle = /^#[0-9a-fA-F]{6}$/.test(String(color || '')) ? color : '#101014';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, c.width / 2, c.height / 2);
        return c;
    }

    // ============================================================
    // downscale_png — preview downscale (max width 800, height truncated)
    // ============================================================
    function downscale(canvas, maxWidth) {
        var max = maxWidth || PREVIEW_MAX_WIDTH;
        if (canvas.width <= max) return canvas;
        var ratio = max / canvas.width;
        var out = document.createElement('canvas');
        out.width = max;
        out.height = Math.max(1, Math.trunc(canvas.height * ratio));
        var ctx = out.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high'; // closest canvas analogue to LANCZOS
        ctx.drawImage(canvas, 0, 0, out.width, out.height);
        return out;
    }

    // ============================================================
    // Artwork placement — clip to panel rects (rounded_vinyl), "cover" fit
    // ============================================================
    function roundedPanelPath(ctx, x, y, w, h, r) {
        var radius = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.closePath();
    }

    function drawCover(ctx, img, x, y, w, h) {
        var size = sourceSize(img);
        if (!size.w || !size.h) return;
        var scale = Math.max(w / size.w, h / size.h);
        var dw = size.w * scale;
        var dh = size.h * scale;
        ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    }

    // ============================================================
    // composeMockup — layered composition (compose_ref.py port + wrap zone)
    //   1. vehicle template base (downscaled to <=800 FIRST, like the original
    //      preview path — the logo maths runs on the downscaled size)
    //   2. AI wrap artwork clipped to the wrap-zone panels at alpha 0.62
    //   3. REAL logo (knockout + uniform min-ratio fit) over the "deur" zone,
    //      ON TOP — never transformed beyond uniform scale.
    // Returns a Promise< PNG data URL (<=800px wide) >.
    // ============================================================
    function composeMockup(opts) {
        opts = opts || {};
        return loadPanelMap().then(function (map) {
            if (!opts.templateImg) throw new Error('[mockup-composer] templateImg required');
            var vehicle = (opts.vehicle && map.panels[opts.vehicle]) ? opts.vehicle : 'caddy';
            var panels = map.panels[vehicle];
            var wrapZone = (Array.isArray(opts.panels) && opts.panels.length ? opts.panels : DEFAULT_WRAP_ZONE)
                .filter(function (key) { return !!panels[key]; });
            if (!wrapZone.length) wrapZone = DEFAULT_WRAP_ZONE.filter(function (key) { return !!panels[key]; });

            // --- 1. base: template, downscaled BEFORE the logo maths
            var tplSize = sourceSize(opts.templateImg);
            if (!tplSize.w || !tplSize.h) throw new Error('[mockup-composer] template has no size');
            var w, h;
            if (tplSize.w > PREVIEW_MAX_WIDTH) {
                var ratio = PREVIEW_MAX_WIDTH / tplSize.w;
                w = PREVIEW_MAX_WIDTH;
                h = Math.max(1, Math.trunc(tplSize.h * ratio));
            } else {
                w = tplSize.w;
                h = tplSize.h;
            }
            var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(opts.templateImg, 0, 0, w, h);

            // --- 2. AI wrap artwork over the wrap-zone panels (documented blend)
            if (opts.artworkImg) {
                ctx.save();
                ctx.globalAlpha = ARTWORK_ALPHA;
                wrapZone.forEach(function (key) {
                    var p = panels[key];
                    var rx = Math.trunc(w * p.x_pct);
                    var ry = Math.trunc(h * p.y_pct);
                    var rw = Math.trunc(w * p.w_pct);
                    var rh = Math.trunc(h * p.h_pct);
                    if (rw < 1 || rh < 1) return;
                    ctx.save();
                    roundedPanelPath(ctx, rx, ry, rw, rh, PANEL_RADIUS);
                    ctx.clip();
                    drawCover(ctx, opts.artworkImg, rx, ry, rw, rh);
                    ctx.restore();
                });
                ctx.restore();
            }

            // --- 3. REAL logo on top (or minimal typo logo when no logo file)
            var mark = null;
            if (opts.logoImg) {
                mark = knockoutCanvas(opts.logoImg);
            } else if (opts.bedrijfsnaam) {
                mark = drawTypoLogo(opts.bedrijfsnaam, opts.brandColor);
            }
            if (mark) {
                // compose_ref.py _logo_rect + min-ratio fit + top-left paste
                var rect = logoRect(w, h, vehicle, map);
                var maxW = Math.max(1, rect.x2 - rect.x);
                var maxH = Math.max(1, rect.y2 - rect.y);
                var fit = Math.min(maxW / Math.max(mark.width, 1), maxH / Math.max(mark.height, 1));
                var nw = Math.max(1, Math.trunc(mark.width * fit));
                var nh = Math.max(1, Math.trunc(mark.height * fit));
                ctx.drawImage(mark, rect.x, rect.y, nw, nh); // alpha-aware, uniform scale only
            }

            return downscale(canvas).toDataURL('image/png');
        });
    }

    // ============================================================
    // extractBrandColors — dominant colours from a logo (canvas quantise,
    // same approach as the client extractor in dtp-design-agent.js).
    // Returns ['#rrggbb', ...] (max `count`, engine fallback palette).
    // ============================================================
    function extractBrandColors(source, count) {
        var max = count || 3;
        return loadImage(source).then(function (img) {
            var canvas = document.createElement('canvas');
            var size = 80;
            canvas.width = size;
            canvas.height = size;
            var ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, size, size);
            var data = ctx.getImageData(0, 0, size, size).data;
            var colorMap = {};
            for (var i = 0; i < data.length; i += 16) {
                var r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
                if (a < 128) continue;
                var brightness = (r + g + b) / 3;
                if (brightness < 20 || brightness > 235) continue;
                var key = Math.round(r / 32) * 32 + ',' + Math.round(g / 32) * 32 + ',' + Math.round(b / 32) * 32;
                colorMap[key] = (colorMap[key] || 0) + 1;
            }
            var sorted = Object.keys(colorMap)
                .sort(function (a, b) { return colorMap[b] - colorMap[a]; })
                .slice(0, max)
                .map(function (key) {
                    return '#' + key.split(',').map(function (c) {
                        return ('0' + Number(c).toString(16)).slice(-2);
                    }).join('');
                });
            return sorted.length ? sorted : ['#009fe3', '#d60075'];
        });
    }

    window.MockupComposer = {
        loadPanelMap: loadPanelMap,
        knockoutWhiteBackground: knockoutWhiteBackground,
        knockoutCanvas: knockoutCanvas,
        logoRect: logoRect,
        composeMockup: composeMockup,
        downscale: downscale,
        drawTypoLogo: drawTypoLogo,
        loadImage: loadImage,
        extractBrandColors: extractBrandColors,
        PANEL_MAP_URL: PANEL_MAP_URL,
        KNOCKOUT_THRESHOLD: KNOCKOUT_THRESHOLD,
        ARTWORK_ALPHA: ARTWORK_ALPHA,
        PREVIEW_MAX_WIDTH: PREVIEW_MAX_WIDTH
    };
})();
