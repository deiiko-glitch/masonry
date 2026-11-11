const { execFileSync } = require('child_process');
const fs = require('fs');

fs.mkdirSync('public/assets/projects', { recursive: true });

const items = [
  { file: 'patio-pergola.jpg', color: '0x242426' },
  { file: 'retaining-wall.jpg', color: '0x2b2927' },
  { file: 'stone-facing.jpg', color: '0x20262e' },
  { file: 'pool-pavers.jpg', color: '0x162c38' },
  { file: 'brick-mailbox.jpg', color: '0x331e1e' },
  { file: 'firepit.jpg', color: '0x332219' },
];

for (const it of items) {
  const out = `public/assets/projects/${it.file}`;
  execFileSync('ffmpeg', [
    '-y',
    '-f', 'lavfi',
    '-i', `color=c=${it.color}:s=1200x800:d=1`,
    '-vframes', '1',
    out
  ]);
  console.log(`Created ${out}`);
}

execFileSync('ffmpeg', [
  '-y',
  '-f', 'lavfi',
  '-i', 'color=c=0x1c1917:s=1200x630:d=1',
  '-vframes', '1',
  'public/assets/og-image.jpg'
]);
console.log('Created public/assets/og-image.jpg');
