import test from 'node:test';
import assert from 'node:assert/strict';
import {server} from '../server.mjs';
import {courses} from '../public/app.js';

test('serves the study site and assets, and rejects missing paths',async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try {
  const base=`http://127.0.0.1:${server.address().port}`;
  for(const [url,type,text] of [['/','text/html','ENVIR 102'],['/style.css','text/css','.course-grid'],['/app.js','text/javascript','localStorage']]){
   const response=await fetch(base+url);assert.equal(response.status,200);assert.ok(response.headers.get('content-type').startsWith(type));assert.ok((await response.text()).includes(text));
  }
  assert.equal((await fetch(base+'/missing')).status,404);
 } finally {await new Promise(resolve=>server.close(resolve));}
});
test('contains all seven requested branches and actionable review tasks',()=>{
 assert.deepEqual(courses.map(c=>[c.code,c.branches.map(b=>b.name)]),[['ENVIR 102',['考试','项目']],['CHEM10',['知识点梳理','实验','考试']],['EAP 101B',['阅读材料','写作']]]);
 assert.equal(courses.flatMap(c=>c.branches.flatMap(b=>b.tasks)).length,21);
});
