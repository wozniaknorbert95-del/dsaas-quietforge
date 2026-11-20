/** Offline-only: serve public/ locally. All Images requests are intercepted. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const base = process.env.INSPIRE_TEST_URL || 'http://127.0.0.1:8070/demo/zzpackage/inspire/';
assert.ok(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const root='public/demo/zzpackage/inspire/assets/';
for (const scenario of ['success','unavailable','reject']) {
const offline=scenario!=='success';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--single-process']});
try {
  const page=await browser.newPage({viewport:{width:375,height:812}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let apiCalls=0;
  await page.route('**/api/v1/generate-art',async route=>{
    apiCalls++;
    const request=route.request().postDataJSON();assert.equal(request.vehicleType,'compact van');assert.ok(!JSON.stringify(request).includes('Stroom op Maat'));
    const images=await Promise.all(['standard','premium'].map(async(style,i)=>({style,image:{format:'base64',mimeType:'image/png',data:(await readFile(root+'mockup-caddy-'+(i?'opvallend':'strak')+'.png')).toString('base64')}})));
    await route.fulfill({status:scenario==='unavailable'?503:200,json:scenario==='unavailable'?{error:{code:'INTERNAL'}}:{success:true,data:{imageKind:'vehicle-mockup',provider:'openai',images}}});
  });
  await page.goto(base);
  async function text(v){await page.locator('#da-chat-input').fill(v);await page.locator('#da-send-btn').click();}
  async function chip(v){await page.getByRole('button',{name:v,exact:true}).click();}
  await text('Stroom op Maat');for (const v of ['Installatie/elektra','Rotterdam','Caddy/Partner','Alleen zakelijk','Tijdens het rijden'])await chip(v);
  await text('Huiseigenaren');await text('Groepenkast vervangen');await chip('Strak');await chip('Bellen');await text('010 000 0000');await chip('Tot €150');await chip('Strikt');
  await page.locator('#da-logo-input').setInputFiles(root+'zzpackage-logo-primary.png');await page.locator('#da-confirm-yes').click();
  if(scenario==='reject') await page.getByRole('dialog').getByText('Beeld afkeuren').click();
  if(!offline){for(const letter of ['A','B']){const box=page.getByRole('dialog').filter({hasText:'plaatsing · '+letter}); await box.locator('canvas').click();await box.getByText('Plaatsing goedkeuren').click();}}
  await page.locator('#wrap-copy').waitFor({state:'visible'});assert.equal(apiCalls,1);
  const cards=page.locator('.da-mockup-card');assert.equal(await cards.count(),2);
  for(const src of await cards.locator('img').evaluateAll(els=>els.map(e=>e.getAttribute('src'))))assert.equal(src.startsWith('data:image/png'),!offline);
  await cards.last().locator('button').click();const brief=await page.locator('#wrap-brief').inputValue();assert.match(brief,/Richting B/);assert.match(brief,/Groepenkast vervangen/);assert.match(brief,/Huiseigenaren/);
  assert.equal((await page.locator('#wrap-source').innerText()).includes('Demo-voorbeelden'),offline);
  assert.doesNotMatch(await page.locator('body').innerText(),/magneten|magneet|MA-005|€149|€399/i);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
  if(!offline && process.env.INSPIRE_EVIDENCE) {
    await page.locator('#wrap-brief').scrollIntoViewIfNeeded();
    await page.locator('#wrap-brief').screenshot({path:process.env.INSPIRE_EVIDENCE});
  }
  console.log('PASS '+scenario+': 375px chat → logo → API → '+(offline?'labelled fallback':'two inspected compositions')+' → selected direction and brief');
} finally {await browser.close();}
}
