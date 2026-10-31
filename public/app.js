export const courses = [
  {id:'envir',code:'ENVIR 102',name:'环境与可持续发展',english:'Environment & Sustainability',description:'从理解环境议题，到探索更可持续的未来。',icon:'❋',accent:'#899d67',tint:'#e8eedc',branches:[
    {id:'exam',name:'考试',symbol:'▤',description:'串联概念，练习解释，让复习更有方向。',tasks:[['搭建核心概念地图','依据课堂笔记整理生态系统、生物多样性、资源与可持续发展的关联。'],['整理环境议题案例','选择课堂讨论过的案例，记录问题、证据、利益相关方与解决路径。'],['进行一次限时自测','用课程提供的练习题自测，记录错题及需要回看的知识点。']]},
    {id:'project',name:'项目',symbol:'⚑',description:'把一个环境问题，变成有证据、有思考的项目。',tasks:[['明确研究问题','选定具体环境议题，写下研究范围、目标与待回答的问题。'],['收集并评估资料','整理文献与数据来源，记录发布日期、研究方法及证据局限。'],['制定项目计划','根据实际作业要求，拆分研究、分析、展示与提交的里程碑。']]}
  ]},
  {id:'chem',code:'CHEM10',name:'化学',english:'Chemistry',description:'理解每一个原理，连接每一次反应。',icon:'⚛',accent:'#a18bbd',tint:'#ede7f6',branches:[
    {id:'concepts',name:'知识点梳理',symbol:'⌘',description:'用概念、公式和例题，建立自己的化学知识网络。',tasks:[['整理原子与化学键','根据课程进度归纳原子结构、周期规律及化学键，并用例子说明。'],['建立计算方法清单','梳理摩尔、化学计量与浓度计算，记录单位、适用条件及常见错误。'],['复盘课堂重点','将每节课的关键概念改写成自己的话，标记仍需确认的问题。']]},
    {id:'lab',name:'实验',symbol:'⚗',description:'从预习到报告，有条理地记录每一步。',tasks:[['完成实验预习','阅读教师提供的实验步骤、安全要求和废弃物处置规范；不以示例替代实验手册。'],['整理实验记录','记录原始观测、数据、单位及异常情况，保留原始记录。'],['完善实验报告','根据课程模板整理计算、结果与误差分析，并核对引用和提交要求。']]},
    {id:'exam',name:'考试',symbol:'▤',description:'把薄弱点变成下一次答对的起点。',tasks:[['回顾公式与适用条件','整理已授章节的重要关系式，注明变量单位和使用前提。'],['建立错题复盘','从已批改作业中选题，分析错误来自概念、计算还是读题。'],['模拟考试并复查','使用教师提供的练习材料限时作答，检查步骤、单位与有效数字。']]}
  ]},
  {id:'eap',code:'EAP 101B',name:'学术英语',english:'English for Academic Purposes',description:'在阅读中积累，在写作中清晰表达。',icon:'Aa',accent:'#c69478',tint:'#f7e6db',branches:[
    {id:'reading',name:'阅读材料',symbol:'▥',description:'读懂论点、识别证据，也保留自己的问题。',tasks:[['整理课程阅读目录','按课程实际安排记录文章标题、作者、来源和阅读日期。'],['制作阅读卡片','概括中心论点、支撑证据与段落结构，摘录时注明页码。'],['积累学术表达','从文章中记录有用表达、上下文与自己的改写，避免脱离语境背词。']]},
    {id:'writing',name:'写作',symbol:'✎',description:'从一个清晰的论点，到一篇有说服力的文章。',tasks:[['拆解写作任务','根据实际题目确认受众、体裁、字数、论题和评分标准。'],['写出论点与提纲','确定中心论点，为各段安排主题句、证据与分析。'],['修改并检查引用','检查逻辑衔接、语言准确性和引用格式，结合教师反馈再修改。']]}
  ]}
];

if (typeof document !== 'undefined') {
const $ = (s) => document.querySelector(s);
let storageAvailable = true;
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key));return value ?? fallback;}catch{storageAvailable=false;return fallback;}}
let done=read('study-space-done',{}); if(!done || typeof done!=='object' || Array.isArray(done)) done={};
let notes=read('study-space-notes',[]); if(!Array.isArray(notes))notes=[];
notes=notes.filter(n=>n && typeof n.title==='string' && typeof n.body==='string' && courses.some(c=>c.id===n.course));
const escape=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function persist(){try{localStorage.setItem('study-space-done',JSON.stringify(done));localStorage.setItem('study-space-notes',JSON.stringify(notes));storageAvailable=true;}catch{storageAvailable=false;toast('浏览器存储不可用，本次更改仅在当前页面保留。');}}
const taskKey=(c,b,i)=>`${c.id}-${b.id}-${i}`;
const count=(c)=>c.branches.reduce((n,b)=>n+b.tasks.filter((_,i)=>done[taskKey(c,b,i)]).length,0);
const total=(c)=>c.branches.reduce((n,b)=>n+b.tasks.length,0);
function renderNav(){
 $('#course-nav').innerHTML=courses.map(c=>`<div style="--accent:${c.accent}"><a class="course-nav-title" href="#${c.id}/${c.branches[0].id}"><span class="course-dot"></span>${c.code}</a>${c.branches.map(b=>`<a class="branch-nav" href="#${c.id}/${b.id}" data-route="${c.id}/${b.id}">${b.name}</a>`).join('')}</div>`).join('');
}
function renderHome(){
 const query=$('#search').value.trim().toLowerCase();
 const filtered=courses.filter(c=>`${c.code} ${c.name} ${c.english} ${c.branches.map(b=>b.name).join(' ')}`.toLowerCase().includes(query));
 $('#course-grid').innerHTML=filtered.map(c=>`<article class="course-card" style="--accent:${c.accent};--tint:${c.tint}"><a class="course-banner" href="#${c.id}/${c.branches[0].id}" aria-label="打开 ${c.code}"><div><div class="course-code">${c.code}</div><div class="course-subtitle">${c.english}</div></div><span class="course-illustration" aria-hidden="true">${c.icon}</span></a><div class="course-body"><h3>${c.name}</h3><p>${c.description}</p><div class="branches">${c.branches.map(b=>`<a class="branch-link" href="#${c.id}/${b.id}"><span class="branch-symbol">${b.symbol}</span>${b.name}<span class="arrow">↗</span></a>`).join('')}</div><div class="card-progress"><span>学习进度</span><span>${count(c)} / ${total(c)} 项完成</span></div><div class="progress-track" role="progressbar" aria-label="${c.code} 学习进度" aria-valuenow="${count(c)}" aria-valuemin="0" aria-valuemax="${total(c)}"><div class="progress-fill" style="width:${count(c)/total(c)*100}%"></div></div></div></article>`).join('');
 $('#empty-search').hidden=filtered.length>0;
 const completed=courses.reduce((n,c)=>n+count(c),0);
 $('#done-count').textContent=completed;
 $('#progress-message').textContent=completed?`已完成 ${completed} / 21 项复习任务，继续加油`:'每一个小进步都值得记录';
 $('#note-count').textContent=notes.length;
}
function renderDetail(c,b){
 const completed=b.tasks.filter((_,i)=>done[taskKey(c,b,i)]).length;
 $('#detail-view').innerHTML=`<button class="back-button" id="back-home">← 返回学习总览</button><div class="eyebrow">YOUR NEXT SMALL STEP · ${c.code}</div><div class="detail-hero" style="--tint:${c.tint}"><span class="course-code">${c.english}</span><h1>${c.name} · ${b.name}</h1><p>${b.description}</p></div><div class="detail-tabs" aria-label="学习分支">${c.branches.map(branch=>`<a class="detail-tab ${branch.id===b.id?'active':''}" ${branch.id===b.id?'aria-current="page"':''} href="#${c.id}/${branch.id}">${branch.symbol} ${branch.name}</a>`).join('')}</div><div class="content-header"><h2>复习清单 <small>${completed} / ${b.tasks.length} 已完成</small></h2><button class="dark-button" id="add-course-note">＋ 记一条笔记</button></div><div class="task-list">${b.tasks.map((task,i)=>`<div class="task ${done[taskKey(c,b,i)]?'checked':''}"><input type="checkbox" id="task-${i}" data-task="${taskKey(c,b,i)}" ${done[taskKey(c,b,i)]?'checked':''}><label for="task-${i}"><h3>${task[0]}</h3><p>${task[1]}</p></label><span class="task-tag">自主复习</span></div>`).join('')}</div><p class="disclaimer">✧ 以上为可用的通用复习框架，尚未包含你的教师讲义、真实考试范围或截止日期。请以课程大纲及教师要求为准。你可以在笔记中补充自己的课程资料。</p><div class="content-header"><h2>这门课的笔记</h2><small>仅保存在当前浏览器</small></div><div class="notes-grid">${notes.filter(n=>n.course===c.id).map(noteCard).join('')||'<p class="disclaimer">还没有笔记，记录第一个想法吧。</p>'}</div>`;
 $('#back-home').onclick=()=>location.hash='home';
 $('#add-course-note').onclick=()=>openEditor(c.id);
 $('#detail-view').querySelectorAll('[data-task]').forEach(input=>input.addEventListener('change',()=>{done[input.dataset.task]=input.checked;persist();renderHome();renderDetail(c,b);}));
 bindDelete();
}
function noteCard(n){return `<article class="note-card"><button class="delete-note" data-delete="${escape(n.id)}" aria-label="删除笔记 ${escape(n.title)}">删除</button><small>${courses.find(c=>c.id===n.course)?.code||''} · ${escape(n.date||'')}</small><h3>${escape(n.title)}</h3><p>${escape(n.body)}</p></article>`;}
function renderNotes(){ $('#notes-view').innerHTML=`<div class="eyebrow">IDEAS WORTH KEEPING</div><div class="content-header"><div><h1>给想法，一个落脚点。</h1><p class="disclaimer">你的课程笔记，保存在当前浏览器中。</p></div><button class="dark-button" id="add-note">＋ 新建笔记</button></div>${notes.length?`<div class="notes-grid">${notes.map(noteCard).join('')}</div>`:'<div class="empty-notes"><span>✎</span>还没有笔记<br>从一个概念、一段摘录或一个问题开始。</div>'}`;$('#add-note').onclick=()=>openEditor();bindDelete();}
function bindDelete(){document.querySelectorAll('[data-delete]').forEach(button=>button.onclick=()=>{if(!confirm('确定删除这条笔记吗？'))return;notes=notes.filter(n=>n.id!==button.dataset.delete);persist();route(false);renderHome();toast('笔记已删除');});}
function openEditor(course='envir'){$('#note-form').reset();$('#note-course').value=course;$('#editor').showModal();$('#note-title').focus();}
function route(scroll=true){
 const hash=location.hash.slice(1)||'home';const [id,branch]=hash.split('/');const c=courses.find(c=>c.id===id);const b=c?.branches.find(b=>b.id===branch)||c?.branches[0];
 const view=c?'detail':id==='notes'?'notes':'home';
 ['home','detail','notes'].forEach(v=>$(`#${v}-view`).hidden=v!==view);
 $('#breadcrumb').textContent=c?`${c.code} · ${b.name}`:view==='notes'?'我的笔记':'学习总览';
 document.title=`${c?`${c.code} · ${b.name}`:view==='notes'?'我的笔记':'学习总览'} · Study Space`;
 document.querySelectorAll('[data-route]').forEach(el=>{const selected=el.dataset.route===(c?`${c.id}/${b.id}`:view);el.classList.toggle('active',selected);if(selected)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
 $('#open-notes').classList.toggle('active',view==='notes');
 if(c){try{sessionStorage.setItem('study-space-last',`${c.id}/${b.id}`);}catch{}renderDetail(c,b);}else if(view==='notes')renderNotes();else renderHome();
 $('.sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');if(scroll)window.scrollTo(0,0);
}
$('#search').addEventListener('input',renderHome);
$('#open-notes').onclick=()=>location.hash='notes';
$('#continue-study').onclick=()=>{let last;try{last=sessionStorage.getItem('study-space-last');}catch{}if(last && courses.some(c=>c.branches.some(b=>last===`${c.id}/${b.id}`))){location.hash=last;return;}for(const c of courses){const b=c.branches.find(b=>b.tasks.some((_,i)=>!done[taskKey(c,b,i)]));if(b){location.hash=`${c.id}/${b.id}`;return;}}location.hash='envir/exam';};
$('#menu-toggle').onclick=()=>{const open=$('.sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));};
document.addEventListener('click',e=>{if(window.innerWidth<=650&&!e.target.closest('.sidebar')&&!e.target.closest('#menu-toggle')){$('.sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#editor').open){e.preventDefault();location.hash='home';$('#search').focus();}if(e.key==='Escape')$('.sidebar').classList.remove('open');});
$('#close-editor').onclick=()=>$('#editor').close();
$('#editor').addEventListener('click',e=>{if(e.target===$('#editor')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#note-form').onsubmit=e=>{e.preventDefault();const title=$('#note-title').value.trim(),body=$('#note-body').value.trim();if(!title||!body){toast('请填写标题和笔记内容');return;}notes.unshift({id:crypto.randomUUID(),title,body,course:$('#note-course').value,date:new Date().toLocaleDateString('zh-CN')});persist();$('#editor').close();renderHome();route(false);if(storageAvailable)toast('笔记已保存，留住这一点进步。');};
const today=new Date();$('#today-date').innerHTML=`${today.toLocaleDateString('zh-CN',{month:'long',day:'numeric',weekday:'long',timeZone:'Asia/Shanghai'})}<small>A GOOD DAY TO LEARN</small>`;
window.addEventListener('hashchange',()=>route());renderNav();renderHome();route();
}
