import fs from 'fs';
import path from 'path';

const spriteFile = path.join(process.cwd(), 'public/icons/sprite.svg');
const content = fs.readFileSync(spriteFile, 'utf-8');

// Extract all id attributes from symbol elements
const iconNames = Array.from(content.matchAll(/id="([^"]+)"/g))
	.map((match) => match[1])
	.sort();

const typeContent = `// Auto-generated from sprite.svg
export const ICON_NAMES = [
  ${iconNames.map((name) => `'${name}'`).join(',\n  ')}
] as const;

export type IconName = typeof ICON_NAMES[number];
`;

fs.writeFileSync(path.join(process.cwd(), 'lib/types/icons.ts'), typeContent);

console.log(`Generated types for ${iconNames.length} icons`);
