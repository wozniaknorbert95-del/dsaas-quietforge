const vehicles = {
  'compact van': 'compact low-roof panel van, Caddy class',
  'medium van': 'mid-size commercial panel van, Trafic class',
  'large van': 'long high-roof cargo van, Sprinter class',
  'passenger car': 'five-door passenger estate car',
};

const languages: [RegExp, string][] = [
  [/ele[kc]tr|installatie/i, 'two precise parallel lines, a measured technical rhythm'],
  [/loodgiet|plumb|hydraul/i, 'one continuous flowing curve'],
  [/bouw|schilder|construct/i, 'a broad stable architectural block'],
  [/schoon|clean|zorg/i, 'ample light negative space with one crisp band'],
];

export function buildPrompt(input: {vehicleType?: string; businessType?: string; impression?: string; exposure?: string; brandColors?: string[]}, style: 'standard' | 'premium') {
  const vehicle = input.vehicleType;
  if (!vehicle || !Object.hasOwn(vehicles, vehicle)) throw new Error('Unknown vehicle class');
  const colors = Array.isArray(input.brandColors) ? input.brandColors.filter(c => typeof c === 'string' && /^#[a-f0-9]{6}$/i.test(c)).slice(0, 3) : [];
  const language = languages.find(([pattern]) => pattern.test(String(input.businessType ?? '').slice(0, 80)))?.[1] ?? 'one calm field and a single contrasting accent';
  const exposure = input.exposure === 'moving' ? 'Use large shapes that survive a brief glance in traffic.' : 'Ensure clarity both at street distance and in a close parked view.';
  const impression = ['opvallend','stoer'].includes(input.impression || '') ? 'Confident assertive tone.' : input.impression === 'vriendelijk' ? 'Approachable welcoming tone.' : 'Precise uncluttered tone.';
  return `Photorealistic commercial studio mockup photograph of one ${vehicles[vehicle as keyof typeof vehicles]}. Exact side profile, nose to the left, centered, entire vehicle in frame, straight wheels, neutral seamless background, soft studio lighting. Continuous applied vinyl on the same side bodywork from front door to rear quarter. Realistic body seams and glass. Palette: ${colors.join(', ') || 'neutral charcoal and white concept'}. Design language: ${language}. ${exposure} ${impression} ${style === 'standard' ? 'Calm broad color field with a single subtle accent across the side.' : 'Bold rhythmic bands sweep across the same side bodywork, energetic contrast and clear negative space.'} Leave a completely blank calm solid field on the front cab door, clear of the handle, seams and trim. No marks inside that field. No text, numbers, lettering, logos, badges, printed plates, watermarks, QR codes, people, other vehicles, collage, rectangular overlays, cropped body or distorted wheels.`;
}
