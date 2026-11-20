/* eslint-disable @typescript-eslint/no-require-imports -- test loader for Pages extensionless imports */
// Offline integration: run the real handler and reservation SQL; no network/key.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');
const ts = require('typescript');
require.extensions['.ts'] = (mod, path) => mod._compile(ts.transpile(fs.readFileSync(path, 'utf8'), {module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}), path);
const {onRequestPost} = require('../../functions/api/v1/generate-art.ts');
const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync('docs/operations/scripts/inspire/budget.sql','utf8'));
const kv = new Map();
const env = {IMAGE_PROVIDER:'openai', IMAGE_MODEL:'gpt-image-2.6-sunburst', IMAGE_CALL_BOUND_CONFIRMED:'yes', IMAGE_API_KEY:'test', GEN_DAILY_CAP:'100',
  IMAGE_BUDGET:{prepare:sql=>({bind:(...args)=>({run:async()=>({meta:db.prepare(sql).run(...args)})})})},
  AI_LEDGER:{get:async k=>kv.get(k)??null,put:async(k,v)=>kv.set(k,v),delete:async k=>kv.delete(k)}};
let calls=0;
global.fetch=async(url, opts)=>{assert.equal(url,'https://api.openai.com/v1/images/generations');assert.equal(JSON.parse(opts.body).quality,'high');calls++;return Response.json({data:[{b64_json:'iVBORw0KGgo='}]});};
let seq=0;
const send=e=>onRequestPost({env:e,request:new Request('http://example.test',{method:'POST',body:JSON.stringify({style:'standard',vehicleType:['compact van','medium van','large van','passenger car'][seq++ % 4],visitorToken:crypto.randomUUID()})})});
(async()=>{
  assert.equal((await send({...env,IMAGE_API_KEY:undefined})).status,503);
  assert.equal(calls,0);
  for(const ceiling of [4,8]){
    const responses=await Promise.all(Array.from({length:10},()=>send(env)));
    assert.equal(responses.filter(r=>r.status===200).length,4);
    assert.equal(responses.filter(r=>r.status===429).length,6);
    assert.equal(calls,ceiling);
    assert.equal(db.prepare('SELECT SUM(reserved_cents) AS n FROM image_spend').get().n,125*ceiling);
    env.IMAGE_SECOND_HALF_APPROVED='yes';
  }
  console.log('PASS: missing secret; concurrent reservations; 5 USD pause; 10 USD stop.');
})().catch(e=>{console.error(e);process.exitCode=1});
