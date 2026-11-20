import assert from 'node:assert/strict';
import { buildPrompt } from '../../functions/api/v1/prompt-templates.ts';
const outputs = new Set();
for (const vehicleType of ['compact van','medium van','large van','passenger car']) {
  for (const style of ['standard','premium']) {
    const prompt = buildPrompt({vehicleType, businessType:'elektra private customer data', brandColors:['#112233','invalid']}, style);
    assert.match(prompt,/Photorealistic.*#112233.*parallel lines/);
    assert.doesNotMatch(prompt,/private customer|invalid/);
    outputs.add(prompt);
  }
}
assert.equal(outputs.size,8);
for(const [businessType,design] of [['elektra',/parallel lines/],['loodgieter',/continuous flowing curve/],['bouw',/architectural block/],['schoonmaak',/crisp band/],['anders',/single contrasting accent/]]) {
  const prompt=buildPrompt({vehicleType:'medium van',businessType},'standard');
  assert.match(prompt,design);assert.match(prompt,/Continuous applied vinyl/);assert.ok(prompt.length<2000);
}
