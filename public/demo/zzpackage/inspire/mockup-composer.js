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
        const dialog = document.createElement('dialog');
        dialog.className = 'wrap-proof';
        dialog.innerHTML = '<h2></h2><p>Controleer eerst: hele voertuig zichtbaar, juiste kleur, geen verzonnen tekst, beeldmerk of vervorming. Keur het beeld af bij twijfel. Tik in het midden van een leeg deurvlak, weg van naden en handgreep. Gebruik de schuiven voor fijnafstelling.</p><canvas></canvas><div class="wrap-controls"></div><button type="button" class="btn-vca btn-action">Plaatsing goedkeuren</button> <button type="button">Beeld afkeuren</button>';
        dialog.querySelector('h2').textContent = 'Controle logoplaatsing · ' + label;
        const canvas = dialog.querySelector('canvas');
        canvas.width = image.width; canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        const controls = {};
        const accept = dialog.querySelector('button');
        accept.disabled = !initial;
        function draw() {
            ctx.drawImage(image, 0, 0);
            const w = canvas.width, h = canvas.height;
            const scale = Math.min(w * controls.size.value / 100 / logo.width, h * 0.10 / logo.height);
            const lw = logo.width * scale, lh = logo.height * scale;
            const x = w * controls.x.value / 100, y = h * controls.y.value / 100;
            ctx.drawImage(logo, x-lw/2, y-lh/2, lw, lh);
            if (contact) {
                ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.font = `bold ${Math.round(h * .018)}px sans-serif`;
                ctx.fillText(contact, x, y+lh/2+2, w*.19);
            }
        }
        for (const [key, title, min, max, def] of [['x','Horizontaal',10,90,36],['y','Verticaal',16,84,54],['size','Logobreedte',3,17,10]]) {
            const label = document.createElement('label'); label.textContent = title;
            const el = document.createElement('input'); el.type = 'range'; el.min=min; el.max=max; el.step=.1;
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
            draw(); dialog.showModal();
            await new Promise((resolve,reject) => {
                accept.onclick=resolve;
                dialog.querySelectorAll('button')[1].onclick=dialog.oncancel=()=>reject(new Error('Beeld afgekeurd.'));
            });
            return { url: canvas.toDataURL('image/png'), placement: Object.fromEntries(Object.entries(controls).map(([key,el])=>[key,Number(el.value)])) };
        } finally { dialog.remove(); }
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
            const variants=['standard','premium'];
            const photos=await Promise.all(variants.map(async style=>{
                const img=images.find(it=>it.style===style)?.image;
                if (!img || img.format!=='base64' || !['image/png','image/jpeg'].includes(img.mimeType)) throw new Error('Variant ontbreekt.');
                return load('data:'+img.mimeType+';base64,'+img.data);
            }));
            const out=[];
            for (const [i,style] of variants.entries()) out.push(await inspect(photos[i],logo,map.vehicles[vehicle]?.[style],i?'B':'A',contact));
            return out;
        } finally { URL.revokeObjectURL(logoUrl); }
    }
    return {compose};
})();
