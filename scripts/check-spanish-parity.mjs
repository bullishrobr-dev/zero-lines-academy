/* Every renderable string in a lesson must have a Spanish twin. */
import esbuild from 'esbuild';
import { join } from 'node:path';
import { DATA } from './paths.mjs';
globalThis.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
const o=await esbuild.build({entryPoints:[join(DATA,'lessons.ts')],bundle:true,format:'esm',platform:'node',write:false,logLevel:'silent'});
const { lessons } = await import('data:text/javascript;base64,'+Buffer.from(o.outputFiles[0].text).toString('base64'));

const gaps=[];
for (const [id,l] of Object.entries(lessons)) {
  if (l.title && !l.titleEs) gaps.push(`${id}  title`);
  if (l.subtitle && !l.subtitleEs) gaps.push(`${id}  subtitle`);
  (l.sections??[]).forEach((s,i)=>{
    if (s.text && !s.textEs) gaps.push(`${id}  section[${i}].${s.type}.text`);
    if (s.items && !s.itemsEs) gaps.push(`${id}  section[${i}].${s.type}.items`);
    if (s.left && !s.leftEs) gaps.push(`${id}  section[${i}].comparison.left`);
    if (s.right && !s.rightEs) gaps.push(`${id}  section[${i}].comparison.right`);
    if (s.attribution && !s.attributionEs) gaps.push(`${id}  section[${i}].attribution`);
  });
}
console.log(gaps.length ? `${gaps.length} Spanish gap(s):\n  ${gaps.join('\n  ')}` : 'PASS  every lesson string has a Spanish twin');
process.exit(gaps.length?1:0);
