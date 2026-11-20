/* A finished vehicle photograph is the background. Only the uploaded logo and
   confirmed contact are drawn locally; the original logo file never leaves the browser. */
window.MockupComposer = (() => {
    function load(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('Beeld niet leesbaar.'));
            image.src = src;
        });
    }
    async function inspect(image, logo, initial, label, contact) {
        const previouslyFocused = document.activeElement;
        const dialog = document.createElement('dialog');
        dialog.className = 'wrap-proof';
        dialog.setAttribute('aria-labelledby','wrap-proof-title');
        dialog.setAttribute('aria-describedby','wrap-proof-instructions');
        dialog.innerHTML = '<h2 id="wrap-proof-title" tabindex="-1"></h2><p id="wrap-proof-instructions">Controleer eerst: hele voertuig zichtbaar, juiste kleur, geen verzonnen tekst, beeldmerk of vervorming. Keur het beeld af bij twijfel. Tik in het midden van een leeg deurvlak, weg van naden en handgreep. Gebruik de schuiven voor fijnafstelling.</p><canvas aria-label="Voorbeeld met je originele logo"></canvas><div class="wrap-controls"></div><button type="button" class="btn-vca btn-action">Plaatsing goedkeuren</button> <button type="button">Beeld afkeuren</button>';
        dialog.querySelector('h2').textContent = 'Controle logoplaatsing · ' + label;
        const canvas = dialog.querySelector('canvas');
        canvas.width = image.width; canvas.height = image.height;
        canvas.style.width = `min(100%, ${44 * image.width / image.height}vh)`;
        const ctx = canvas.getContext('2d');
        const controls = {};
        const accept = dialog.querySelector('button');
        accept.disabled = !initial;
        let showContact = Boolean(contact);
        if (contact) {
            const option = document.createElement('label');
            const toggle = document.createElement('input');
            toggle.type='checkbox'; toggle.checked=true;
            toggle.onchange=()=>{ showContact=toggle.checked; draw(); };
            option.append(toggle, document.createTextNode(' Contact op het voertuig tonen'));
            dialog.querySelector('.wrap-controls').after(option);
        }
        function draw() {
            ctx.drawImage(image, 0, 0);
            const w = canvas.width, h = canvas.height;
            const scale = Math.min(w * controls.size.value / 100 / logo.width, h * 0.10 / logo.height);
            const lw = logo.width * scale, lh = logo.height * scale;
            const x = w * controls.x.value / 100, y = h * controls.y.value / 100;
            ctx.drawImage(logo, x-lw/2, y-lh/2, lw, lh);
            if (showContact) {
                const [r,g,b] = ctx.getImageData(Math.round(x), Math.round(y+lh/2+3), 1, 1).data;
                ctx.fillStyle = .2126*r+.7152*g+.0722*b < 135 ? '#fff' : '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.font = `bold ${Math.round(h * .018)}px sans-serif`;
                ctx.fillText(contact, x, y+lh/2+2, w*.19);
            }
        }
        for (const [key, title, min, max, def] of [['x','Horizontaal',10,90,36],['y','Verticaal',16,84,54],['size','Logobreedte',3,17,10]]) {
            const label = document.createElement('label'); label.textContent = title;
            const el = document.createElement('input'); el.type = 'range'; el.min=min; el.max=max; el.step=.1;
            el.setAttribute('aria-label', title);
            el.value=initial?.[key] ?? def; controls[key]=el;
            el.oninput = () => { draw(); accept.disabled=false; };
            label.append(el); dialog.querySelector('.wrap-controls').append(label);
        }
        canvas.onclick = event => {
            const rect = canvas.getBoundingClientRect();
            controls.x.value=100*(event.clientX-rect.left)/rect.width;
            controls.y.value=100*(event.clientY-rect.top)/rect.height;
            draw(); accept.disabled=false;
        };
        document.body.append(dialog);
        try {
            draw(); dialog.showModal(); dialog.querySelector('h2').focus();
            await new Promise((resolve,reject) => {
                accept.onclick=resolve;
                dialog.querySelectorAll('button')[1].onclick=dialog.oncancel=()=>reject(new Error('Beeld afgekeurd.'));
            });
            return { url: canvas.toDataURL('image/png'), contactVisible: showContact, placement: Object.fromEntries(Object.entries(controls).map(([key,el])=>[key,Number(el.value)])) };
        } finally {
            dialog.close();
            dialog.remove();
            canvas.width = canvas.height = 0;
            if (previouslyFocused && typeof previouslyFocused.focus === 'function' && document.contains(previouslyFocused)) {
                previouslyFocused.focus({preventScroll:true});
            }
        }
    }
    async function compose(images, file, vehicle, contact) {
        if (!(file instanceof Blob) || !file.size || !Array.isArray(images) || images.length!==2) throw new Error('Bronbestand ontbreekt.');
        const mapResponse=await fetch('data/panel-map.json');
        if (!mapResponse.ok) throw new Error('Plaatsingskaart ontbreekt.');
        const map=await mapResponse.json();
        if (!Object.hasOwn(map.vehicles,vehicle)) throw new Error('Onbekend voertuig.');
        const logoUrl=URL.createObjectURL(file);
        try {
            const logo=await load(logoUrl);
            // Provider-internal style keys map to directions A/B, not product tiers.
            const variants=['standard','premium'];
            const sources=variants.map(style=>{
                const img=images.find(it=>it.style===style)?.image;
                if (!img || img.format!=='base64' || !['image/png','image/jpeg'].includes(img.mimeType)) throw new Error('Variant ontbreekt.');
                return img;
            });
            const out=[];
            for (const [i,style] of variants.entries()) {
                const src=sources[i];
                const photo=await load('data:'+src.mimeType+';base64,'+src.data);
                out.push(await inspect(photo,logo,map.vehicles[vehicle]?.[style],i?'B':'A',contact));
            }
            return out;
        } finally { URL.revokeObjectURL(logoUrl); }
    }
    return {compose};
})();
