(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){return{id:crypto.randomUUID(),term:``,definition:``}}function t(e,t,n,r){return e.map(e=>e.id===t?{...e,[n]:r}:e)}function n(e,t){return e.filter(e=>e.id!==t)}function r(e){return e.term.trim()===``&&e.definition.trim()===``}function i(e){return e.term.trim()===``?`term`:e.definition.trim()===``?`definition`:null}function a(e){return e.filter(e=>i(e)===null)}function o(e,t=Math.random){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function s(e,t=Math.random){return o(a(e),t).slice(0,8)}function c(e,t=Math.random){let n=o(e,t);for(;e.length>1&&n.every((t,n)=>t===e[n]);)n=o(e,t);return n}function l(e){return Math.max(1,3-e)}function u(e,t){return e.trim().toLowerCase()===t.trim().toLowerCase()}function d(e,t){return e.id===t.id||u(e.term,t.term)||u(e.definition,t.definition)}function f(e){let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return`${n}:${String(r).padStart(2,`0`)}`}var p=class{cards;points=0;misses=new Map;matchedTerms=new Set;matchedDefinitions=new Set;constructor(e){this.cards=e}get maxPoints(){return this.cards.length*3}get matchedCount(){return this.matchedTerms.size}get isFinished(){return this.matchedCount===this.cards.length}pointsAvailable(e){return l(this.misses.get(e)??0)}hasMissed(e){return this.misses.has(e)}tryMatch(e,t){let n=this.findCard(e),r=this.findCard(t);if(this.matchedDefinitions.has(e)||this.matchedTerms.has(t))throw Error(`That card has already been matched.`);return d(n,r)?(this.points+=this.pointsAvailable(e),this.matchedDefinitions.add(e),this.matchedTerms.add(t),`correct`):(this.misses.set(e,(this.misses.get(e)??0)+1),`wrong`)}findCard(e){let t=this.cards.find(t=>t.id===e);if(!t)throw Error(`No card with id ${e} in this round.`);return t}},m=[`match`,`quiz`,`battle`,`type`,`tower`];function h(e,t){return t?e.score===t.score?e.timeMs<t.timeMs:e.score>t.score:!0}function g(e,t,n){return e[t]?.[n]}function _(e,t,n,r){let i=g(e,t,n);return h(r,i)?{scores:{...e,[t]:{...e[t],[n]:r}},best:r,isNewBest:!0}:{scores:e,best:i,isNewBest:!1}}function v(e,t){let n={...e};return delete n[t],n}function y(e,t){let n=f(t.timeMs);return e===`match`?`${t.score} / ${t.outOf} points in ${n}`:e===`type`?`${t.score} / ${t.outOf} correct in ${n}`:e===`battle`?`won with ${t.score} health left in ${n}`:e===`tower`?`won with ${t.score} ${t.score===1?`life`:`lives`} left in ${n}`:`liftoff in ${n}`}function b(e,t){return t.practice?`<p class="best-line">Practice rounds don't count toward your best.</p>`:t.isNewBest?`<p class="new-best">🏆 New best!</p>`:x(e,t.best)}function x(e,t){return t?`<p class="best-line">Your best: ${y(e,t)}</p>`:``}var S=[100,200,300],C=1200,w={100:12,200:8,300:5};function T(e){return w[e]}function E(){return S.flatMap(e=>Array.from({length:4},(t,n)=>({id:`${e}-${n}`,value:e,column:n,result:`open`})))}var D=class{playerHealth;botHealth;tiles=E();constructor(e=C){this.playerHealth=e,this.botHealth=e}get outcome(){return this.botHealth===0?`won`:this.playerHealth===0?`lost`:this.tiles.some(e=>e.result===`open`)?`playing`:this.playerHealth===this.botHealth?`tie`:this.playerHealth>this.botHealth?`won`:`lost`}answerTile(e,t){let n=this.tiles.find(t=>t.id===e);if(!n||n.result!==`open`)throw Error(`Tile ${e} can't be played.`);if(this.outcome!==`playing`)throw Error(`The battle is already over.`);n.result=t?`won`:`lost`,t?this.botHealth=Math.max(0,this.botHealth-n.value):this.playerHealth=Math.max(0,this.playerHealth-n.value)}},O=!1,k=null;function ee(e){return 880*2**((Math.min(Math.max(e,1),10)-1)*2/12)}function A(){return O}function te(e){O=e}function j({frequency:e,slideTo:t,durationMs:n,delayMs:r=0,wave:i=`sine`,volume:a=.2}){if(!O)return;k??=new AudioContext,k.state===`suspended`&&k.resume();let o=k.currentTime+r/1e3,s=o+n/1e3,c=k.createOscillator(),l=k.createGain();c.type=i,c.frequency.setValueAtTime(e,o),t&&c.frequency.exponentialRampToValueAtTime(t,s),l.gain.setValueAtTime(1e-4,o),l.gain.exponentialRampToValueAtTime(a,o+.01),l.gain.exponentialRampToValueAtTime(1e-4,s),c.connect(l).connect(k.destination),c.start(o),c.stop(s)}function ne(e,t=`triangle`){let n=0;for(let[r,i]of e)j({frequency:r,durationMs:i*1.4,delayMs:n,wave:t,volume:.18}),n+=i}var M={chime(){ne([[1047,70],[1568,160]])},buzz(){j({frequency:150,durationMs:250,wave:`square`,volume:.08})},streak(e){j({frequency:ee(e),durationMs:160,wave:`triangle`})},shield(){j({frequency:520,durationMs:220,wave:`triangle`,volume:.15})},liftoff(){j({frequency:120,slideTo:1400,durationMs:900,wave:`sawtooth`,volume:.07}),j({frequency:180,slideTo:2e3,durationMs:900,wave:`sine`,volume:.1})},hit(){j({frequency:300,slideTo:90,durationMs:180,wave:`square`,volume:.12}),j({frequency:900,durationMs:80,wave:`triangle`,volume:.12})},hurt(){j({frequency:220,slideTo:110,durationMs:400,wave:`sawtooth`,volume:.09})},fanfare(e){let t=[[523,110],[659,110],[784,110],[1047,300]];e&&t.push([1319,120],[1568,400]),ne(t)},lose(){ne([[392,180],[370,180],[349,180],[330,450]],`sawtooth`)}};function re(e){return e.term.trim().toLowerCase()}function ie(e){let t=new Set;return a(e).filter(e=>{let n=re(e);return!t.has(n)&&(t.add(n),!0)})}function ae(e){return 4*e}function oe(e,t,n=Math.random){if(e.length<4)throw Error(`Speed Quiz needs at least 4 cards.`);return{answer:t,choices:o([t,...o(e.filter(e=>e.id!==t.id),n).slice(0,3)],n)}}var se=class{cards;random;remaining=[];previous=null;constructor(e,t=Math.random){this.cards=e,this.random=t}next(){return this.remaining.length===0&&(this.remaining=o(this.cards,this.random),this.cards.length>1&&this.remaining[0]===this.previous&&this.remaining.push(this.remaining.shift())),this.previous=this.remaining.shift(),this.previous}},ce=class{progress=0;streak=0;bestStreak=0;correctCount=0;answeredCount=0;shield=`ready`;get isHot(){return this.streak>=3}get isFinished(){return this.progress>=100}answerCorrect(){this.answeredCount++,this.correctCount++,this.streak++,this.bestStreak=Math.max(this.bestStreak,this.streak);let e=this.progress;return this.progress=Math.min(100,this.progress+ae(this.streak)),this.progress-e}activateShield(){this.shield===`ready`&&(this.shield=`active`)}answerWrong(){return this.answeredCount++,this.shield===`active`?(this.shield=`used`,!0):(this.streak=0,this.progress=Math.max(0,this.progress-10),!1)}},le=`My deck`;function ue(e,t=[]){return{id:crypto.randomUUID(),name:e.trim(),cards:t}}function de(e,t,n){let r=t.trim();if(r===``)return`Give the deck a name.`;if(r.length>40)return`Keep the name to 40 characters or fewer.`;let i=e.find(e=>e.id!==n&&e.name.toLowerCase()===r.toLowerCase());return i?`You already have a deck called "${i.name}".`:null}function fe(e,t,n){return e.map(e=>e.id===t?{...e,name:n.trim()}:e)}function pe(e,t){return e.filter(e=>e.id!==t)}function me(e,t,n){return e.map(e=>e.id===t?{...e,cards:n}:e)}function he(e,t){return e.find(e=>e.id===t)??e[0]}function N(e){return`${e} ${e===1?`card`:`cards`}`}function ge(e,t,n){return{...e,[t]:{...e[t],[n]:0}}}function _e(e,t,n){let r=be(e,t,n);return r===void 0?e:r+1>=3?ve(e,t,n):{...e,[t]:{...e[t],[n]:r+1}}}function ve(e,t,n){let r={...e[t]};return delete r[n],{...e,[t]:r}}function ye(e,t){let n={...e};return delete n[t],n}function be(e,t,n){return e[t]?.[n]}function xe(e,t,n){let r=e[t]??{};return n.filter(e=>r[e.id]!==void 0)}function P(e,t){return t.isPracticing?e.filter(e=>t.isWeak(e.id)):e}function Se(e,t,n){if(P(t,n).length===0)return null;let r=e.next();for(;n.isPracticing&&!n.isWeak(r.id);)r=e.next();return r}function Ce(e){let t={added:0,cleared:0};return{changes:t,tracker:{...e,miss:n=>{e.isWeak(n)||t.added++,e.miss(n)},right:n=>{let r=e.isWeak(n);e.right(n),r&&!e.isWeak(n)&&t.cleared++}}}}function we(e){let t=[];return e.added>0&&t.push(`${N(e.added)} added to Weak cards`),e.cleared>0&&t.push(`${N(e.cleared)} cleared`),t.join(` · `)}var Te=100,Ee=3,De=class{timeouts=new Set;interval;later(e,t){let n=window.setTimeout(()=>{this.timeouts.delete(n),e()},t);this.timeouts.add(n)}countdown(e,t,n){this.stopCountdown();let r=performance.now()+e;t(e),this.interval=window.setInterval(()=>{let e=r-performance.now();e<=0?(this.stopCountdown(),n()):t(e)},Te)}stopCountdown(){window.clearInterval(this.interval)}stop(){this.stopCountdown(),this.timeouts.forEach(e=>window.clearTimeout(e)),this.timeouts.clear()}},Oe=`
  <div class="quiz-timer" aria-hidden="true"><div class="quiz-timer-fill"></div></div>
  <p class="quiz-seconds"></p>
`;function ke(e,t,n){let r=Math.ceil(Math.max(0,t)/1e3),i=e.querySelector(`.quiz-timer-fill`);i.style.width=`${Math.max(0,t)/n*100}%`,i.classList.toggle(`low`,r<=Ee),e.querySelector(`.quiz-seconds`).textContent=`${r}s`}function Ae(e,t,n){let r=t.map(e=>{let t=document.createElement(`button`);return t.type=`button`,t.className=`quiz-choice`,t.dataset.id=e.id,t.textContent=e.term,t.addEventListener(`click`,()=>n(e)),t});e.replaceChildren(...r)}function je(e,t,n){let r=[...e.querySelectorAll(`.quiz-choice`)];for(let e of r)e.disabled=!0,e.dataset.id===t.id?e.classList.add(`correct`):e.dataset.id===n?.id&&e.classList.add(`wrong`)}function Me(e,t,n){e.innerHTML=`
    <p class="empty-message">
      ${t} needs at least 4 cards with different terms, so each
      question has 4 choices. You have ${n}.
      Go to <a href="#write">Add cards</a> to add more.
    </p>
  `}function F(e,t){M.fanfare(!0),e.innerHTML=`
    <div class="finish-panel" role="status">
      <p class="finish-title">🎉 All weak cards cleared!</p>
      <p>You got every card you missed right 3 times in a row.</p>
      <button class="primary-button" type="button">Play the whole deck</button>
    </div>
  `;let n=e.querySelector(`button`);n.addEventListener(`click`,t.stopPracticing),n.focus()}function Ne(e,t,n,r,i){return!t.isPracticing||r>=i?!1:r===0?(F(e,t),!0):(e.innerHTML=`
    <p class="empty-message">
      ${n} needs at least ${i} weak cards. You have ${r}, so try another game,
      or turn off <strong>Weak cards only</strong> in the sidebar to play the whole deck.
    </p>
  `,!0)}function I(e){let t=we(e);return t?`<p class="weak-changes">🎯 ${t}</p>`:``}var Pe=1300,Fe=2e3,Ie=1e3,Le=450,Re={player:`🧑‍🎓 You`,bot:`🤖 Quiz Bot`};function ze(e){return`
    <div class="fighter" data-side="${e}">
      <p class="fighter-name">${Re[e]}</p>
      <div class="health-bar" role="meter" aria-label="${e===`player`?`Your`:`Quiz Bot's`} health"
        aria-valuemin="0" aria-valuemax="${C}">
        <div class="health-fill"></div>
      </div>
      <p class="health-text"></p>
    </div>
  `}function Be(e,t,n,r){let i=ie(t);if(i.length<4)return Me(e,`Battle`,i.length),()=>{};let a=new De;function o(){a.stop();let t=P(i,r);if(Ne(e,r,`Battle`,t.length,1))return;let s=new D,c=Ce(r),l=new se(t),u=performance.now(),d=0,p=0;e.innerHTML=`
      <div class="battle-arena">${ze(`player`)}${ze(`bot`)}</div>
      ${x(`battle`,n.best(`battle`))}
      <div class="battle-stage"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <span></span>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.battle-stage`),h=e.querySelector(`.quiz-message`),g=t=>e.querySelector(`.fighter[data-side="${t}"]`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{a.stop(),E(`ended`)});function _(e,t){h.textContent=e,h.dataset.kind=t}function v(){for(let e of[`player`,`bot`]){let t=e===`player`?s.playerHealth:s.botHealth,n=g(e),r=n.querySelector(`.health-fill`),i=t/C;r.style.width=`${i*100}%`,r.dataset.level=i>.5?`high`:i>.25?`medium`:`low`,n.querySelector(`.health-bar`).setAttribute(`aria-valuenow`,String(t)),n.querySelector(`.health-text`).textContent=`${t} / ${C}`}}function y(e,t){let n=g(e);n.classList.remove(`hit`),n.offsetWidth,n.classList.add(`hit`),a.later(()=>n.classList.remove(`hit`),Le);let r=document.createElement(`span`);r.className=`damage-float`,r.textContent=`−${t}`,r.setAttribute(`aria-hidden`,`true`),n.append(r),a.later(()=>r.remove(),Ie)}function S(){if(r.isPracticing&&P(t,r).length===0){a.stop(),F(e,r);return}m.innerHTML=`
        <p class="question-label">Pick a tile. Bigger tiles hit harder but give you less time.</p>
        <div class="battle-board"></div>
      `;let n=m.querySelector(`.battle-board`);for(let e of s.tiles){let t=document.createElement(`button`);t.type=`button`,t.className=`battle-tile ${e.result}`,e.result===`open`?(t.textContent=String(e.value),t.setAttribute(`aria-label`,`${e.value} points, ${T(e.value)} seconds`),t.addEventListener(`click`,()=>w(e))):(t.disabled=!0,t.textContent=e.result===`won`?`✓`:`✗`,t.setAttribute(`aria-label`,`${e.value} points, ${e.result===`won`?`you hit`:`Quiz Bot hit`}`)),n.append(t)}}function w(e){let n=oe(i,Se(l,t,r)),o=T(e.value)*1e3;h.textContent=``,m.innerHTML=`
        <p class="question-label">
          <strong>${e.value}-point question</strong> · ${T(e.value)} seconds
        </p>
        ${Oe}
        <p class="question-definition"></p>
        <div class="quiz-choices"></div>
      `,m.querySelector(`.question-definition`).textContent=n.answer.definition;let u=m.querySelector(`.quiz-choices`),f=t=>{a.stopCountdown(),je(u,n.answer,t),t||ke(m,0,o);let r=t?.id===n.answer.id;d++,s.answerTile(e.id,r),r?c.tracker.right(n.answer.id):c.tracker.miss(n.answer.id),r?(p++,y(`bot`,e.value),M.hit(),_(`Hit! Quiz Bot takes ${e.value} damage.`,`correct`)):(y(`player`,e.value),M.hurt(),_(`${t?`Ouch!`:`Time's up!`} Quiz Bot hits you for ${e.value}. The answer was "${n.answer.term}".`,`wrong`)),v(),a.later(()=>s.outcome===`playing`?S():E(s.outcome),r?Pe:Fe)};Ae(u,n.choices,f),a.countdown(o,e=>ke(m,e,o),()=>f(null))}function E(t){let r={won:`🏆 You win!`,lost:`💥 Quiz Bot wins`,tie:`🤝 It's a tie`,ended:`Battle ended`,playing:`Battle ended`},i=performance.now()-u,a=x(`battle`,n.best(`battle`));if(t===`won`){let e=n.record(`battle`,{score:s.playerHealth,timeMs:i});M.fanfare(e.isNewBest),a=b(`battle`,e)}else t===`lost`&&M.lose();e.innerHTML=`
        <div class="finish-panel ${t===`won`?``:`ended`}" role="status">
          <p class="finish-title">${r[t]}</p>
          <p>You: <strong>${s.playerHealth}</strong> · Quiz Bot: <strong>${s.botHealth}</strong></p>
          <p class="finish-time">${p} of ${d} right · Time: ${f(i)}</p>
          ${a}
          ${I(c.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let l=e.querySelector(`button`);l.addEventListener(`click`,o),l.focus()}v(),S()}return o(),()=>a.stop()}function Ve(e){if(!e)return``;let t=Array.from({length:e.needed},(t,n)=>`<span class="${n<e.right?`dot filled`:`dot`}"></span>`).join(``),n=`Weak card: ${e.right} of ${e.needed} right in a row`;return`<span class="weak-progress" role="img" aria-label="${n}" title="${n}">${t}</span>`}function He(e){e.style.height=`auto`,e.style.height=`${e.scrollHeight}px`}function Ue(e,t,n){let r=t===`term`,i=document.createElement(`div`);i.className=`card-face ${r?`card-front`:`card-back`}`,i.innerHTML=`
    <div class="card-header">
      <span class="face-label">${r?`Term`:`Definition`}</span>
      ${Ve(n.weakProgress)}
      ${n.onDelete?`<button class="delete-card" type="button" aria-label="Delete card">×</button>`:``}
    </div>
    <textarea placeholder="${r?`Type a term`:`Type the definition`}"
      aria-label="${r?`Term`:`Definition`}"></textarea>
    <button class="flip-card" type="button">↻ Flip to ${r?`definition`:`term`}</button>
  `;let a=i.querySelector(`textarea`);return a.value=e[t],a.rows=1,a.addEventListener(`input`,()=>{He(a),n.onEdit(t,a.value)}),i}function We(e,t){let n=t===`definition`;e.classList.toggle(`flipped`,n);let r=e.querySelector(`.card-front`),i=e.querySelector(`.card-back`);r.inert=n,i.inert=!n,(n?i:r).querySelector(`textarea`).focus()}function Ge(e,t){let n=document.createElement(`article`);n.className=`card`;let r=document.createElement(`div`);return r.className=`card-inner`,r.append(Ue(e,`term`,t),Ue(e,`definition`,t)),n.append(r),n.querySelector(`.card-back`).inert=!0,n.addEventListener(`click`,e=>{let r=e.target;r.closest(`.delete-card`)?t.onDelete?.():(r.closest(`.flip-card`)||!r.closest(`textarea`))&&We(n,n.classList.contains(`flipped`)?`term`:`definition`)}),n}function Ke(e){e.querySelectorAll(`textarea`).forEach(He)}var qe=`Sample: World Capitals`,Je=[[`Japan`,`Tokyo`],[`France`,`Paris`],[`Italy`,`Rome`],[`Egypt`,`Cairo`],[`Brazil`,`Brasília`],[`Canada`,`Ottawa`],[`Australia`,`Canberra`],[`India`,`New Delhi`],[`Kenya`,`Nairobi`],[`Spain`,`Madrid`]];function Ye(){return ue(qe,Je.map(([e,t])=>({id:crypto.randomUUID(),term:t,definition:`Capital of ${e}`})))}function Xe(e,t,n,r){let i=document.createElement(`form`);i.className=`deck-name-form`,i.innerHTML=`
    <input type="text" maxlength="40" aria-label="Deck name"
      placeholder="Deck name, like Bio 101" />
    <button class="primary-button" type="submit">${t}</button>
    ${r?`<button class="secondary-button" type="button">Cancel</button>`:``}
    <p class="deck-error" aria-live="polite"></p>
  `;let a=i.querySelector(`input`),o=i.querySelector(`.deck-error`);return a.value=e,i.addEventListener(`submit`,e=>{e.preventDefault();let t=n(a.value);o.textContent=t??``,t&&a.focus()}),r&&(i.querySelector(`.secondary-button`).addEventListener(`click`,r),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&r()})),i}function Ze(e,t,n){let r=e.id===t.currentDeckId,i=document.createElement(`article`);i.className=`deck-tile${r?` current`:``}`,i.innerHTML=`
    <button class="deck-select" type="button" aria-pressed="${r}">
      <span class="deck-name"></span>
      <span class="deck-card-count">${N(e.cards.length)}</span>
      ${r?`<span class="current-badge">Current</span>`:``}
    </button>
    <div class="deck-tile-actions">
      <button class="text-button rename-deck" type="button">Rename</button>
      <button class="text-button delete-deck" type="button">Delete</button>
    </div>
  `,i.querySelector(`.deck-name`).textContent=e.name,i.querySelector(`.deck-select`).addEventListener(`click`,()=>t.onSelect(e.id));let a=i.querySelector(`.delete-deck`);return t.decks.length===1&&(a.disabled=!0,a.title=`You need at least one deck.`),a.addEventListener(`click`,()=>{let n=`Delete "${e.name}" and its ${N(e.cards.length)}? This can't be undone.`;(e.cards.length===0||confirm(n))&&t.onDelete(e.id)}),i.querySelector(`.rename-deck`).addEventListener(`click`,()=>{let r=Xe(e.name,`Save`,n=>t.onRename(e.id,n),n);i.replaceChildren(r);let a=r.querySelector(`input`);a.focus(),a.select()}),i}function Qe(e,t){let n=()=>Qe(e,t),r=document.createElement(`div`);r.className=`deck-grid`,r.append(...t.decks.map(e=>Ze(e,t,n)));let i=document.createElement(`h2`);i.className=`new-deck-heading`,i.textContent=`New deck`;let a=Xe(``,`+ Create deck`,t.onCreate);if(e.replaceChildren(r,i,a),!t.decks.some(e=>e.name.toLowerCase()===`sample: world capitals`)){let n=document.createElement(`p`);n.className=`sample-deck-row`,n.innerHTML=`
      Want something to try or show a friend?
      <button class="text-button" type="button">+ Add sample deck (World Capitals)</button>
    `,n.querySelector(`button`).addEventListener(`click`,t.onAddSample),e.append(n)}}var $e=/^(?:[-*•]|\d+[.)])\s+/,et=/\s+[-–—](?:\s+|$)/;function tt(e){let t=e.indexOf(`	`);if(t!==-1)return{index:t,length:1};let n=et.exec(e);if(n)return{index:n.index,length:n[0].length};let r=e.indexOf(`:`);return r===-1?null:{index:r,length:1}}function nt(e){let t=e.replace(/^ +| +$/g,``).replace($e,``),n=tt(t);return n?[t.slice(0,n.index).trim(),t.slice(n.index+n.length).trim()]:null}var rt=e=>e.trim().toLowerCase();function it(e,t){let n=new Set(t.map(e=>rt(e.term))),r=new Set,i=[],a=[];for(let t of e.split(/\r?\n/)){let e=t.trim();if(e===``)continue;let o=nt(t);if(!o){a.push({line:e,reason:`No dash, colon, or tab between term and definition`});continue}let[s,c]=o;if(s===``||c===``){a.push({line:e,reason:`Missing a term or a definition`});continue}let l=rt(s);n.has(l)?a.push({line:e,reason:r.has(l)?`Same term as an earlier line`:`Already in this deck`}):(n.add(l),r.add(l),i.push({id:crypto.randomUUID(),term:s,definition:c}))}return{cards:i,skipped:a}}function at(e){let t=[],n=[],r=``,i=!1;for(let a=0;a<e.length;a++){let o=e[a];i?o===`"`&&e[a+1]===`"`?(r+=`"`,a++):o===`"`?i=!1:r+=o:o===`"`?i=!0:o===`,`?(n.push(r),r=``):o===`
`||o===`\r`?(o===`\r`&&e[a+1]===`
`&&a++,n.push(r),t.push(n),n=[],r=``):r+=o}return(r!==``||n.length>0)&&(n.push(r),t.push(n)),t}var ot=new Set([`term`,`terms`,`word`,`front`,`question`]);function st(e){let t=at(e);t.length>0&&ot.has(t[0][0].trim().toLowerCase())&&t.shift();let n=e=>e.replace(/\s+/g,` `).trim();return t.map(e=>e.map(n)).filter(e=>e.some(e=>e!==``)).map(([e,t=``])=>`${e}\t${t}`).join(`
`)}async function ct(e){let t=e.name.toLowerCase(),n=t.endsWith(`.csv`);if(!n&&!t.endsWith(`.txt`)&&!t.endsWith(`.tsv`))return{error:`Can't read “${e.name}”. Choose a .csv or .txt file.`};if(e.size>1e6)return{error:`“${e.name}” is too big. Choose a file under 1 MB.`};let r=await e.text(),i=n?st(r):r;return i.trim()===``?{error:`“${e.name}” has no cards in it.`}:{text:i}}var lt=10;function ut(e,t,n){if(e.replaceChildren(),t.cards.length===0&&t.skipped.length===0)return;let r=document.createElement(`p`);if(r.className=`import-summary`,r.textContent=t.cards.length>0?`${N(t.cards.length)} ready to add to ${n}`:`No cards to add yet`,e.append(r),t.cards.length>0){let n=document.createElement(`ul`);n.className=`import-card-list`;for(let e of t.cards){let t=document.createElement(`li`),r=document.createElement(`strong`);r.textContent=e.term,t.append(r,` → ${e.definition}`),n.append(t)}e.append(n)}if(t.skipped.length>0){let n=document.createElement(`p`);n.className=`import-skipped-heading`,n.textContent=`${t.skipped.length} ${t.skipped.length===1?`line`:`lines`} skipped:`;let r=document.createElement(`ul`);r.className=`import-skipped-list`;for(let{line:e,reason:n}of t.skipped.slice(0,lt)){let t=document.createElement(`li`),i=document.createElement(`code`);i.textContent=e,t.append(i,` (${n})`),r.append(t)}if(t.skipped.length>lt){let e=document.createElement(`li`);e.textContent=`…and ${t.skipped.length-lt} more`,r.append(e)}e.append(n,r)}}function dt(e,t){e.innerHTML=`
    <section class="import-panel" aria-labelledby="import-title">
      <h2 id="import-title">Import cards</h2>
      <p class="instructions">
        Paste one card per line. Put a dash ( - ), a colon, or a tab between the term and
        its definition.
      </p>
      <textarea class="import-text" rows="8" aria-label="Cards to import"
        placeholder="Mitochondria - makes energy for the cell&#10;Ribosome: builds proteins"></textarea>
      <div class="import-preview" aria-live="polite"></div>
      <div class="import-actions">
        <button class="primary-button import-add" type="button" disabled>Add cards</button>
        <button class="secondary-button import-cancel" type="button">Cancel</button>
      </div>
    </section>
  `;let n=e.querySelector(`.import-text`),r=e.querySelector(`.import-preview`),i=e.querySelector(`.import-add`),a={cards:[],skipped:[]},o=()=>{a=it(n.value,t.existingCards),ut(r,a,t.deckName),i.disabled=a.cards.length===0,i.textContent=a.cards.length>0?`Add ${N(a.cards.length)}`:`Add cards`};n.addEventListener(`input`,o),i.addEventListener(`click`,()=>t.onAdd(a.cards)),e.querySelector(`.import-cancel`).addEventListener(`click`,t.onClose),t.fromFile?(e.querySelector(`#import-title`).textContent=`Import from ${t.fromFile.name}`,e.querySelector(`.instructions`).textContent=`Check the cards below. You can fix any line in the box before adding them.`,n.value=t.fromFile.text,o(),i.focus()):n.focus()}var ft=6,pt=300,mt=300,ht=450,gt=e=>new Promise(t=>setTimeout(t,e));function _t(e,t){let n=document.createElement(`button`);return n.type=`button`,n.className=`match-tile ${t}-tile`,n.dataset.id=e.id,n.textContent=t===`term`?e.term:e.definition,n.setAttribute(`aria-pressed`,`false`),n}function vt(e,t){let n=document.createElement(`div`);n.className=`match-column`;let r=document.createElement(`h2`);return r.textContent=e,n.append(r,...t),n}function yt(e,t){e.innerHTML=`
    <p class="empty-message">
      Match needs at least 2 cards with both a term and a definition.
      You have ${t}. Go to <a href="#write">Add cards</a> to add more.
    </p>
  `}function bt(e,t,n,r,i,a){let o=r.record(`match`,{score:t.points,timeMs:n,outOf:t.maxPoints});M.fanfare(o.isNewBest),e.innerHTML=`
    <div class="finish-panel" role="status">
      <p class="finish-title">Round complete!</p>
      <p class="finish-score"><strong>${t.points}</strong> / ${t.maxPoints} points</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${b(`match`,o)}
      ${I(i)}
      <button class="primary-button" type="button">Play again</button>
    </div>
  `;let s=e.querySelector(`button`);s.addEventListener(`click`,a),s.focus()}function xt(e,t,n,r,i,a){e.innerHTML=`
    <div class="finish-panel ended" role="status">
      <p class="finish-title">Round ended</p>
      <p class="finish-score"><strong>${t.points}</strong> points so far</p>
      <p>${t.matchedCount} of ${t.cards.length} pairs matched</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${x(`match`,r.best(`match`))}
      ${I(i)}
      <button class="primary-button" type="button">Play again</button>
    </div>
  `;let o=e.querySelector(`button`);o.addEventListener(`click`,a),o.focus()}function St(e,t,n,r,i){let o=a(P(n,i));if(Ne(e,i,`Match`,o.length,2)){t.textContent=``;return}if(o.length<2){t.textContent=``,yt(e,o.length);return}let l=new p(s(o)),u=Ce(i),d=performance.now(),f=l.cards.map(e=>_t(e,`term`)),m=c(l.cards).map(e=>_t(e,`definition`));e.innerHTML=`
    <p class="instructions">
      Drag each definition onto its term, or click a definition and then its term.
    </p>
    ${x(`match`,r.best(`match`))}
  `;let h=document.createElement(`div`);h.className=`match-board`,h.append(vt(`Terms`,f),vt(`Definitions`,m));let g=document.createElement(`p`);g.className=`match-message`,g.setAttribute(`aria-live`,`polite`);let _=document.createElement(`div`);_.className=`quiz-actions`,_.innerHTML=`<span></span><button class="end-game-button" type="button">End game</button>`,e.append(h,g,_);let v=!1;_.querySelector(`.end-game-button`).addEventListener(`click`,()=>{l.isFinished||(v=!0,t.textContent=``,xt(e,l,performance.now()-d,r,u.changes,()=>St(e,t,n,r,i)))});let y=null;function b(){t.textContent=`Points: ${l.points} · ${l.matchedCount} of ${l.cards.length} matched`}function S(e,t){g.textContent=e,g.dataset.kind=t}function C(e){y?.setAttribute(`aria-pressed`,`false`),y=e,y?.setAttribute(`aria-pressed`,`true`)}function w(e){return!e.disabled&&e.dataset.busy!==`true`}function T(e,t,n,r){e.style.transition=r?`translate ${pt}ms ease`:`none`,e.style.translate=t===0&&n===0?``:`${t}px ${n}px`}function E(e){let[t=`0`,n=`0`]=e.style.translate.split(` `);return[parseFloat(t)||0,parseFloat(n)||0]}async function D(a,o){C(null);let s=a.dataset.id,c=[a,o];c.forEach(e=>e.dataset.busy=`true`);let f=l.pointsAvailable(s);if(l.tryMatch(s,o.dataset.id)===`wrong`){u.tracker.miss(s),M.buzz(),S(`Not a match. That definition is now worth ${l.pointsAvailable(s)} ${l.pointsAvailable(s)===1?`point`:`points`}.`,`wrong`),c.forEach(e=>e.classList.add(`wrong`)),T(a,0,0,!0),await gt(ht),c.forEach(e=>{e.classList.remove(`wrong`),e.dataset.busy=`false`});return}l.hasMissed(s)||u.tracker.right(s),M.chime(),S(`Match! +${f} ${f===1?`point`:`points`}`,`correct`),b();let[p,m]=E(a),h=a.getBoundingClientRect(),g=o.getBoundingClientRect();a.classList.add(`combining`),T(a,p+g.left-h.left,m+g.top-h.top,!0),c.forEach(e=>e.classList.add(`correct`)),await gt(pt),c.forEach(e=>e.classList.add(`vanish`)),await gt(mt),!v&&(k(c),l.isFinished&&i.isPracticing&&P(n,i).length===0?(t.textContent=``,F(e,i)):l.isFinished&&(t.textContent=``,bt(e,l,performance.now()-d,r,u.changes,()=>St(e,t,n,r,i))))}let O=new Map;function k(e){let t=[...h.querySelectorAll(`.match-tile`)].filter(t=>!e.includes(t)),n=new Map(t.map(e=>[e,e.getBoundingClientRect().top]));e.forEach(e=>e.remove());let r=!matchMedia(`(prefers-reduced-motion: reduce)`).matches;for(let e of t){let t=n.get(e)-e.getBoundingClientRect().top;if(t===0)continue;let i=O.get(e);if(i){i.y-=t;let[n,r]=E(e);T(e,n,r+t,!1)}else r&&e.animate([{transform:`translateY(${t}px)`},{transform:`none`}],{duration:pt,easing:`ease`})}}let ee=!1;for(let e of[...f,...m])e.addEventListener(`click`,()=>{if(ee||!w(e))return;if(y===null||y===e){C(y===e?null:e);return}let t=e.classList.contains(`term-tile`);t===y.classList.contains(`term-tile`)?C(e):D(t?y:e,t?e:y)});function A(e){let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.term-tile`);return t&&h.contains(t)&&w(t)?t:null}for(let e of m){let t=!1,n=null;function r(e){n?.classList.remove(`drop-target`),n=e,n?.classList.add(`drop-target`)}function i(n,i){let a=i?null:A(n);r(null),e.classList.remove(`dragging`),O.delete(e),t&&(t=!1,ee=!0,setTimeout(()=>ee=!1,0),a?D(e,a):T(e,0,0,!0))}e.addEventListener(`pointerdown`,t=>{t.button===0&&w(e)&&(O.set(e,{x:t.clientX,y:t.clientY}),e.setPointerCapture(t.pointerId))}),e.addEventListener(`pointermove`,n=>{let i=O.get(e);if(!i)return;let a=n.clientX-i.x,o=n.clientY-i.y;!t&&Math.hypot(a,o)<ft||(t||(t=!0,e.classList.add(`dragging`),C(null)),T(e,a,o,!1),r(A(n)))}),e.addEventListener(`pointerup`,e=>i(e,!1)),e.addEventListener(`pointercancel`,e=>i(e,!0))}b()}var Ct=700,wt=1600,Tt=1200;function Et(e,t,n,r){let i=ie(t);if(i.length<4)return Me(e,`Speed Quiz`,i.length),()=>{};let a=new De,o=()=>a.stop();function s(){o(),e.innerHTML=`
      <div class="quiz-intro">
        <p class="quiz-intro-rocket" aria-hidden="true">🚀</p>
        <p>
          Pick the term that matches each definition. You have
          <strong>8 seconds</strong> per question.
        </p>
        <p>
          Every right answer in a row fills the bar faster. 3 in a row is a hot
          streak! A wrong answer drops the bar and resets your streak.
        </p>
        <p>Fill the bar to launch the rocket.</p>
        ${x(`quiz`,n.best(`quiz`))}
        <button class="primary-button" type="button">Start</button>
      </div>
    `;let t=e.querySelector(`button`);t.addEventListener(`click`,c),t.focus()}function c(){o();let t=P(i,r);if(Ne(e,r,`Speed Quiz`,t.length,1))return;let s=new ce,l=Ce(r),u=performance.now(),d=new se(t),p=null;e.innerHTML=`
      <div class="streak-panel">
        <p class="streak-status" aria-live="polite"></p>
        <div class="streak-bar" role="progressbar" aria-label="Rocket progress"
          aria-valuemin="0" aria-valuemax="100">
          <div class="streak-fill"></div>
          <span class="rocket" aria-hidden="true"><span class="rocket-ship">🚀</span><span class="rocket-shield">🛡️</span></span>
        </div>
      </div>
      ${Oe}
      <p class="question-label">Which term matches this definition?</p>
      <p class="question-definition"></p>
      <div class="quiz-choices"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <button class="shield-button" type="button"></button>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.streak-status`),h=e.querySelector(`.streak-bar`),g=e.querySelector(`.streak-fill`),_=e.querySelector(`.rocket`),v=e.querySelector(`.question-definition`),y=e.querySelector(`.quiz-choices`),S=e.querySelector(`.quiz-message`),C=e.querySelector(`.shield-button`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{o(),A(performance.now()-u,!1)});function w(){C.textContent={ready:`🛡️ Use shield (1 per game)`,active:`🛡️ Shield on: your next miss is free`,used:`🛡️ Shield used`}[s.shield],C.disabled=s.shield!==`ready`,C.classList.toggle(`active`,s.shield===`active`),h.classList.toggle(`shielded`,s.shield===`active`)}C.addEventListener(`click`,()=>{s.activateShield(),w()});function T(){g.style.width=`${s.progress}%`,_.style.left=`${s.progress}%`,h.setAttribute(`aria-valuenow`,String(s.progress)),h.classList.toggle(`hot`,s.isHot),s.isHot?m.textContent=`🔥 Hot streak! ×${s.streak}`:s.streak>0?m.textContent=`Streak: ${s.streak}`:m.textContent=`${s.progress}% to launch`,m.classList.toggle(`hot`,s.isHot)}function E(e,t){S.textContent=e,S.dataset.kind=t}let D=8e3;function O(){let n=Se(d,t,r);n?(p=oe(i,n),v.textContent=p.answer.definition,S.textContent=``,Ae(y,p.choices,k),a.countdown(D,t=>ke(e,t,D),()=>k(null))):(o(),F(e,r))}function k(t){a.stopCountdown();let n=p.answer;if(je(y,n,t),t||ke(e,0,D),t?.id===n.id){l.tracker.right(n.id);let e=s.answerCorrect();M.streak(s.streak),E(s.streak===3?`🔥 Hot streak! +${e}%`:`Correct! +${e}%`,`correct`)}else{l.tracker.miss(n.id);let e=t?`Not quite.`:`Time's up!`;s.answerWrong()?(M.shield(),E(`🛡️ Shield blocked it! ${e} The answer was "${n.term}". Your streak is safe.`,`shielded`)):(M.buzz(),E(`${e} The answer was "${n.term}". −10%`,`wrong`),h.classList.remove(`shake`),h.offsetWidth,h.classList.add(`shake`))}T(),w(),s.isFinished?ee():a.later(O,t?.id===n.id?Ct:wt)}function ee(){let e=performance.now()-u;m.textContent=`🚀 Liftoff!`,_.classList.add(`launch`),M.liftoff(),a.later(()=>A(e,!0),Tt)}function A(t,r){let i=x(`quiz`,n.best(`quiz`));if(r){let e=n.record(`quiz`,{score:0,timeMs:t});M.fanfare(e.isNewBest),i=b(`quiz`,e)}let a=r?`<p class="finish-title">🚀 Liftoff!</p>
           <p class="finish-score"><strong>${f(t)}</strong></p>`:`<p class="finish-title">Game ended</p>
           <p class="finish-score"><strong>${s.progress}%</strong> of the way to launch</p>
           <p>Time: ${f(t)}</p>`;e.innerHTML=`
        <div class="finish-panel ${r?``:`ended`}" role="status">
          ${a}
          <p>Best streak: <strong>${s.bestStreak}</strong></p>
          <p class="finish-time">${s.correctCount} of ${s.answeredCount} correct</p>
          ${i}
          ${I(l.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let o=e.querySelector(`button`);o.addEventListener(`click`,c),o.focus()}T(),w(),O()}return s(),o}var Dt=.7,Ot={tower:20,wall:10},kt={hits:0,blocked:0,shielded:0},At=e=>e===`player`?`bot`:`player`,jt=class{castles={player:{lives:5,coins:0,towers:0,walls:0,defending:!1},bot:{lives:5,coins:0,towers:0,walls:0,defending:!1}};get outcome(){return this.castles.bot.lives===0?`won`:this.castles.player.lives===0?`lost`:`playing`}answer(e,t){let n=this.castles[e];t?n.coins+=10:n.lives=Math.max(0,n.lives-1)}canBuild(e,t){return this.castles[e].coins>=Ot[t]}build(e,t){if(!this.canBuild(e,t))throw Error(`Not enough coins for a ${t}.`);let n=this.castles[e];n.coins-=Ot[t],t===`tower`?n.towers++:n.walls++}defend(e){this.castles[e].defending=!0}stand(e){this.castles[e].coins+=10}fireTowers(e){let t=this.castles[At(e)],n=this.castles[e].towers;if(t.defending)return{...kt,shielded:n};let r=Math.min(n,t.walls),i=Math.min(n-r,t.lives);return t.walls-=r,t.lives-=i,{hits:i,blocked:r,shielded:0}}playBotTurn(e){this.answer(`bot`,e);let t=kt;return e&&(this.canBuild(`bot`,`tower`)&&this.build(`bot`,`tower`),t=this.fireTowers(`bot`)),this.castles.player.defending=!1,t}},Mt=`http://www.w3.org/2000/svg`,Nt=800,Pt=250,Ft=[150,195,240,285],It=[325,343,361],Lt=70,Rt=170,zt=178,Bt=385,Vt=.6,Ht=[{x:150,y:52,size:1},{x:430,y:34,size:.7},{x:650,y:70,size:1.2}],Ut=[30,118,176,262,331,408,447,529,603,668,742,781],Wt=1100,L=(e,t)=>e===`player`?t:Nt-t,Gt=e=>e===`player`?`bot`:`player`;function Kt(e,t,n,r){let i=n/(r*2-1);return Array.from({length:r},(n,r)=>`<rect x="${e+r*i*2}" y="${t-9}" width="${i}" height="10" />`).join(``)}function qt(e,t,n,r){let i=Math.floor(r/16);return Array.from({length:i},(r,i)=>{let a=t+(i+1)*16,o=i%2==0?0:10,s=Array.from({length:Math.floor(n/20)},(t,n)=>`<path d="M${e+o+n*20} ${a-16}V${a}" />`).join(``);return`<path d="M${e} ${a}H${e+n}" />${s}`}).join(``)}function Jt(e,t){return`<ellipse class="ground-shadow" cx="${e}" cy="253" rx="${t}" ry="6" />`}function Yt({x:e,y:t,size:n}){return`
    <g class="scene-cloud">
      <ellipse cx="${e}" cy="${t}" rx="${44*n}" ry="${13*n}" />
      <ellipse cx="${e-16*n}" cy="${t-9*n}" rx="${18*n}" ry="${12*n}" />
      <ellipse cx="${e+14*n}" cy="${t-12*n}" rx="${22*n}" ry="${15*n}" />
    </g>
  `}function Xt(e,t){let n=264+t%3*11;return`<path class="grass-tuft" d="M${e} ${n}l-4 -8M${e} ${n}v-10M${e} ${n}l4 -8" />`}function Zt(e){let t=e===`bot`?`url(#duel-stone-mirrored)`:`url(#duel-stone)`;return`
    <g class="scene-castle" data-side="${e}" ${e===`bot`?`transform="translate(${Nt},0) scale(-1,1)"`:``}>
      ${Jt(70,66)}
      <g class="stone" fill="${t}">
        <rect x="16" y="120" width="30" height="130" />
        <rect x="94" y="120" width="30" height="130" />
        <rect x="40" y="150" width="60" height="100" />
        ${Kt(16,120,30,3)}${Kt(94,120,30,3)}${Kt(40,150,60,4)}
      </g>
      <g class="stone-lines">
        ${qt(16,120,30,130)}${qt(94,120,30,130)}${qt(40,150,60,100)}
      </g>
      <path class="gate" d="M56 250V218a14 14 0 0 1 28 0V250Z" />
      <rect class="window" x="27" y="150" width="8" height="16" rx="4" />
      <rect class="window" x="105" y="150" width="8" height="16" rx="4" />
      <path class="flagpole" d="M31 111V84" />
      <path class="flag" data-side="${e}" d="M31 84L56 91L31 98Z" />
      <g class="damage" data-at="3">
        <path d="M26 190l10 14-6 12 10 16" /><path d="M108 200l-8 12 8 10" />
      </g>
      <g class="damage" data-at="1">
        <path class="smoke" d="M46 150c-12-14 8-20-2-34M96 150c10-14-8-20 2-34" />
        <circle class="fire" cx="70" cy="146" r="8" />
      </g>
    </g>
  `}function Qt(e){return`<ellipse class="scene-shield" data-side="${e}" cx="${L(e,190)}" cy="${Pt}"
    rx="195" ry="170" hidden />`}function $t(){return`
    <svg class="duel-scene" viewBox="0 0 ${Nt} 300" role="img"
      aria-label="Two castles facing each other across a battlefield">
      <defs>
        <linearGradient id="duel-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#6fa8dc" /><stop offset="1" stop-color="#dcebf5" />
        </linearGradient>
        <linearGradient id="duel-grass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#6d9f4b" /><stop offset="1" stop-color="#3f6b2c" />
        </linearGradient>
        <linearGradient id="duel-stone">
          <stop offset="0" stop-color="#c9c4b8" /><stop offset="1" stop-color="#85806f" />
        </linearGradient>
        <linearGradient id="duel-stone-mirrored">
          <stop offset="0" stop-color="#85806f" /><stop offset="1" stop-color="#c9c4b8" />
        </linearGradient>
      </defs>
      <rect width="${Nt}" height="300" fill="url(#duel-sky)" />
      ${Ht.map(Yt).join(``)}
      <path class="hills-far" d="M0 215C150 150 300 195 430 165S680 150 800 200V250H0Z" />
      <path class="hills" d="M0 250C120 195 240 225 360 208S620 195 800 240V250H0Z" />
      <rect y="${Pt}" width="${Nt}" height="50" fill="url(#duel-grass)" />
      ${Ut.map(Xt).join(``)}
      ${Zt(`player`)}${Zt(`bot`)}
      <g class="scene-buildings"></g>
      ${Qt(`player`)}${Qt(`bot`)}
      <g class="scene-effects"></g>
    </svg>
  `}function en(e){let t=e-13;return`
    <g class="scene-tower">
      ${Jt(e,20)}
      <g class="stone" fill="url(#duel-stone)">
        <rect x="${t}" y="188" width="26" height="62" />
        ${Kt(t-3,188,32,3)}
      </g>
      <g class="stone-lines">${qt(t,188,26,62)}</g>
      <rect class="window" x="${e-3}" y="200" width="6" height="14" rx="3" />
    </g>
  `}function tn(e){return`
    <g class="scene-wall">
      ${Jt(e,10)}
      <rect class="stone" fill="url(#duel-stone)" x="${e-7}" y="220" width="14" height="30" />
      <g class="stone-lines">${qt(e-7,220,14,30)}</g>
    </g>
  `}function nn(e,t){let n=Ft.slice(0,t.towers).map(t=>en(L(e,t))),r=It.slice(0,t.walls).map(t=>tn(L(e,t)));return[...n,...r].join(``)}function rn(e,t){let{player:n,bot:r}=t.castles;e.querySelector(`.scene-buildings`).innerHTML=nn(`player`,n)+nn(`bot`,r);for(let n of[`player`,`bot`]){let{lives:r,defending:i}=t.castles[n];e.querySelector(`.scene-shield[data-side="${n}"]`).toggleAttribute(`hidden`,!i);let a=e.querySelector(`.scene-castle[data-side="${n}"]`);for(let e of a.querySelectorAll(`.damage`))e.classList.toggle(`shown`,r<=Number(e.dataset.at))}}function an(e,t){let n=document.createElementNS(Mt,e);for(let[e,r]of Object.entries(t))n.setAttribute(e,String(r));return n}var on=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;function sn(e,t,n){let r=e.querySelector(`.scene-effects`),i=an(`circle`,{class:`impact-flash`,cx:t,cy:n,r:16});r.append(i),i.animate([{opacity:1,r:`6px`},{opacity:0,r:`30px`}],350).onfinish=()=>i.remove();for(let e=0;e<8;e++){let i=an(`rect`,{class:`impact-chip`,x:t,y:n,width:4,height:4});r.append(i);let a=Math.PI*2*e/8,o=26+e%3*12,s=`translate(${Math.cos(a)*o}px, ${Math.sin(a)*o+16}px)`;i.animate([{transform:`none`,opacity:1},{transform:s,opacity:0}],450).onfinish=()=>i.remove()}}function cn(e,t,n,r){let i=an(`g`,{class:`scene-arrow`});i.innerHTML=`<path class="arrow-shaft" d="M-16 0H14" />
    <path class="arrow-head" d="M18 0L10 -4V4Z" />
    <path class="arrow-fletching" d="M-16 0L-22 -4M-16 0L-22 4" />`,e.querySelector(`.scene-effects`).append(i);let a=70+Math.abs(n.x-t.x)*.12,o=e=>({x:t.x+(n.x-t.x)*e,y:t.y+(n.y-t.y)*e-a*4*e*(1-e)}),s=Array.from({length:17},(e,t)=>{let n=t/16,r=o(n),i=o(n+.01),a=Math.atan2(i.y-r.y,i.x-r.x)*180/Math.PI;return{transform:`translate(${r.x}px, ${r.y}px) rotate(${a}deg)`}});i.style.visibility=`hidden`;let c=i.animate(s,{duration:750,delay:r,easing:`linear`});window.setTimeout(()=>{i.style.visibility=``},r),c.onfinish=()=>{i.remove(),sn(e,n.x,n.y)}}function ln(e,t,n){let r=Gt(t);[...Array(n.shielded).fill(Bt),...Array(n.blocked).fill(It[0]),...Array(n.hits).fill(Lt)].forEach((n,i)=>{let a=Ft[i%Ft.length],o=n===Lt?Rt:226,s={x:L(r,n),y:o};on()?sn(e,s.x,s.y):cn(e,{x:L(t,a),y:zt},s,i*220)})}function un(e,t){let n=L(Gt(t),150),r=L(t,100),i=t===`player`?-1:1,a=an(`g`,{class:`scene-enemy`});a.innerHTML=`<g transform="scale(${i*Vt},${Vt})">
    <circle cx="0" cy="-30" r="6" /><path d="M0 -24V-10M0 -10L-6 0M0 -10L6 0M0 -20L10 -14" />
    <path class="enemy-sword" d="M10 -14L20 -24" /></g>`,e.querySelector(`.scene-effects`).append(a);let o=Array.from({length:13},(e,t)=>({transform:`translate(${n+(r-n)*t/12}px, ${258-(t%2==0?0:4)}px)`}));a.animate(o,Wt).onfinish=()=>{a.remove(),sn(e,r,210)}}var dn=`Tower Duel`,fn=1e3,pn=2200,mn=900,hn=1e3,gn=900,_n=1600,vn={player:`🧑‍🎓 You`,bot:`🤖 Quiz Bot`};function yn(e){return`
    <div class="duel-status" data-side="${e}">
      <p class="fighter-name">${vn[e]}</p>
      <p class="duel-lives"></p>
      <p class="duel-stats"></p>
    </div>
  `}var bn=(e,t)=>`${e} ${t}${e===1?``:`s`}`;function xn(e,t){let n=e===`player`?`Your`:`Quiz Bot's`,r=[t.blocked>0?`${bn(t.blocked,`wall`)} broke stopping a shot.`:``,t.shielded>0?`The shield stopped ${bn(t.shielded,`shot`)}.`:``].filter(Boolean).join(` `),i=t.hits===1?`1 life`:`${t.hits} lives`;return t.hits>0?`${n} towers took ${i}. ${r}`.trim():r}function Sn(e){let t=e.hits+e.blocked+e.shielded;return 750+Math.max(0,t-1)*220}function Cn(e,t,n,r){let i=ie(t);if(i.length<4)return Me(e,dn,i.length),()=>{};let a=new De;function o(){a.stop();let t=P(i,r);if(Ne(e,r,dn,t.length,1))return;let s=new jt,c=Ce(r),l=new se(t),u=performance.now(),d=0,p=0;e.innerHTML=`
      <p class="instructions">
        Right answers earn 10 coins and an action. Wrong answers let an
        enemy through, which costs a life. Last castle with a life wins.
      </p>
      ${$t()}
      <div class="duel-statuses">${yn(`player`)}${yn(`bot`)}</div>
      ${x(`tower`,n.best(`tower`))}
      <div class="battle-stage"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <span></span>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.battle-stage`),h=e.querySelector(`.quiz-message`),g=e.querySelector(`.duel-scene`),_=t=>e.querySelector(`.duel-status[data-side="${t}"]`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{a.stop(),k(`ended`)});function v(e,t){h.textContent=e,h.dataset.kind=t}function y(){rn(g,s);for(let e of[`player`,`bot`]){let{lives:t,coins:n,towers:r,walls:i}=s.castles[e],a=_(e),o=a.querySelector(`.duel-lives`);o.textContent=`❤️`.repeat(t)+`🖤`.repeat(5-t),o.setAttribute(`aria-label`,`${t} of 5 lives`),a.querySelector(`.duel-stats`).textContent=`🪙 ${n} · 🗼 ${r} · 🧱 ${i}`}}function S(){return s.outcome!==`playing`&&(a.stop(),k(s.outcome),!0)}function C(){if(r.isPracticing&&P(t,r).length===0){a.stop(),F(e,r);return}let n=oe(i,Se(l,t,r));h.textContent=``,m.innerHTML=`
        <p class="question-label"><strong>Your turn.</strong> Which term matches?</p>
        <p class="question-definition"></p>
        <div class="quiz-choices"></div>
      `,m.querySelector(`.question-definition`).textContent=n.answer.definition;let o=m.querySelector(`.quiz-choices`);Ae(o,n.choices,e=>{je(o,n.answer,e);let t=e.id===n.answer.id;d++,t?(s.answer(`player`,!0),y(),p++,c.tracker.right(n.answer.id),M.hit(),v(`Right! +10 coins.`,`correct`),a.later(w,fn)):(c.tracker.miss(n.answer.id),M.hurt(),un(g,`player`),v(`An enemy got through! You lose a life and your action. The answer was "${n.answer.term}".`,`wrong`),a.later(()=>{s.answer(`player`,!1),y()},Wt),a.later(()=>S()||D(),pn))})}function w(){let{coins:e,towers:t}=s.castles.player;h.textContent=``,m.innerHTML=`
        <p class="question-label"><strong>Build</strong> (optional). You have 🪙 ${e}.</p>
        <div class="duel-choices">
          <button class="quiz-choice" type="button" data-building="tower">
            🗼 Tower · 20 coins<small>Adds one arrow to every attack</small>
          </button>
          <button class="quiz-choice" type="button" data-building="wall">
            🧱 Wall · 10 coins<small>Breaks stopping one arrow</small>
          </button>
        </div>
        <p class="question-label"><strong>Choose your action.</strong> This ends your turn.</p>
        <div class="duel-choices duel-actions">
          <button class="quiz-choice" type="button" data-action="attack">
            ⚔️ Attack<small>${t>0?`Fire ${bn(t,`tower`)}`:`Build a tower first`}</small>
          </button>
          <button class="quiz-choice" type="button" data-action="defend">
            🛡 Defend<small>Shield stops every arrow next turn</small>
          </button>
          <button class="quiz-choice" type="button" data-action="stand">
            🧍 Stand<small>Hold fire, +10 coins</small>
          </button>
        </div>
      `;for(let e of m.querySelectorAll(`[data-building]`)){let t=e.dataset.building;e.disabled=!s.canBuild(`player`,t),e.addEventListener(`click`,()=>{s.build(`player`,t),y(),w()})}let n=e=>m.querySelector(`[data-action="${e}"]`);n(`attack`).disabled=t===0,n(`attack`).addEventListener(`click`,E),n(`defend`).addEventListener(`click`,()=>{s.defend(`player`),y(),T(`🛡 Shield up! It stops every arrow on Quiz Bot's next turn.`)}),n(`stand`).addEventListener(`click`,()=>{s.stand(`player`),y(),T(`🧍 You hold your ground and collect 10 bonus coins.`)})}function T(e){m.innerHTML=``,v(e,`info`),a.later(D,hn)}function E(){m.innerHTML=``,h.textContent=``;let e=s.fireTowers(`player`);ln(g,`player`,e),a.later(()=>{y(),e.hits>0&&M.hit(),v(xn(`player`,e),`correct`)},Sn(e)),a.later(()=>S()||D(),Sn(e)+mn)}function D(){m.innerHTML=`<p class="question-label">🤖 Quiz Bot is answering…</p>`,h.textContent=``,a.later(O,gn)}function O(){let e=Math.random()<Dt,t=s.castles.bot.towers,n=s.castles.player.defending,r=s.playBotTurn(e);m.innerHTML=``,e?(s.castles.player.defending=n,rn(g,s),ln(g,`bot`,r),v(`Quiz Bot got it right.${s.castles.bot.towers>t?` It built a tower.`:``}`,`info`),a.later(()=>{s.castles.player.defending=!1,y(),r.hits>0&&M.hurt();let e=xn(`bot`,r);e&&v(e,r.hits>0?`wrong`:`info`)},Sn(r)),a.later(()=>S()||C(),Sn(r)+_n)):(un(g,`bot`),v(`Quiz Bot got it wrong, so your enemy got through!`,`correct`),a.later(()=>{y(),M.hit()},Wt),a.later(()=>S()||C(),_n))}function k(t){let r={won:`🏆 Your castle stands!`,lost:`💥 Quiz Bot wins`,ended:`Duel ended`,playing:`Duel ended`},i=performance.now()-u,{player:a,bot:l}=s.castles,m=x(`tower`,n.best(`tower`));if(t===`won`){let e=n.record(`tower`,{score:a.lives,timeMs:i});M.fanfare(e.isNewBest),m=b(`tower`,e)}else t===`lost`&&M.lose();e.innerHTML=`
        <div class="finish-panel ${t===`won`?``:`ended`}" role="status">
          <p class="finish-title">${r[t]}</p>
          <p>Your lives: <strong>${a.lives}</strong> · Quiz Bot's lives: <strong>${l.lives}</strong></p>
          <p class="finish-time">${p} of ${d} right · Time: ${f(i)}</p>
          ${m}
          ${I(c.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let h=e.querySelector(`button`);h.addEventListener(`click`,o),h.focus()}y(),C()}return o(),()=>a.stop()}function wn(e){return e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,` `).trim()}function Tn(e,t){let n=Array.from({length:e.length+1},(e,n)=>Array.from({length:t.length+1},(e,t)=>n===0?t:t===0?n:0));for(let r=1;r<=e.length;r++)for(let i=1;i<=t.length;i++){let a=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+a),r>1&&i>1&&e[r-1]===t[i-2]&&e[r-2]===t[i-1]&&(n[r][i]=Math.min(n[r][i],n[r-2][i-2]+1))}return n[e.length][t.length]}function En(e,t){let n=wn(e),r=wn(t);return n===``?`wrong`:n===r?`exact`:r.length>=5&&Tn(n,r)<=1?`close`:`wrong`}var Dn=class{cards;index=0;correctCount=0;constructor(e,t=Math.random){this.cards=o(a(e),t).slice(0,10)}get current(){return this.cards[this.index]}get isFinished(){return this.index>=this.cards.length}answer(e){if(this.isFinished)throw Error(`The round is already over.`);let t=En(e,this.current.term);return t!==`wrong`&&this.correctCount++,this.index++,t}};function On(e,t,n,r){let i=P(t,r);if(Ne(e,r,`Type It`,a(i).length,1))return;if(a(i).length===0){e.innerHTML=`
      <p class="empty-message">
        Type It needs at least 1 card with a term and a definition.
        Go to <a href="#write">Add cards</a> to add some.
      </p>
    `;return}let o=new Dn(i),s=Ce(r),c=performance.now(),l=()=>On(e,t,n,r);e.innerHTML=`
    <p class="instructions">Type the term for each definition, then press Enter.</p>
    ${x(`type`,n.best(`type`))}
    <p class="type-progress"></p>
    <p class="question-definition"></p>
    <form class="type-form">
      <input class="type-answer" type="text" aria-label="Your answer" autocomplete="off"
        autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" />
      <button class="primary-button type-submit" type="submit">Check</button>
    </form>
    <p class="quiz-message" aria-live="polite"></p>
    <div class="quiz-actions">
      <span></span>
      <button class="end-game-button" type="button">End game</button>
    </div>
  `;let u=e.querySelector(`.type-progress`),d=e.querySelector(`.question-definition`),p=e.querySelector(`.type-form`),m=e.querySelector(`.type-answer`),h=e.querySelector(`.type-submit`),g=e.querySelector(`.quiz-message`),_=()=>r.isPracticing&&P(t,r).length===0,v=!1;function y(e,t){g.textContent=e,g.dataset.kind=t}function S(e){u.textContent=`Question ${e} of ${o.cards.length} · ${o.correctCount} correct`}function C(){S(o.index+1),d.textContent=o.current.definition,g.textContent=``,m.value=``,m.readOnly=!1,m.classList.remove(`correct`,`wrong`),h.textContent=`Check`,v=!1,m.focus()}function w(){let e=o.current,t=o.answer(m.value);t===`wrong`?s.tracker.miss(e.id):s.tracker.right(e.id),m.readOnly=!0,m.classList.add(t===`wrong`?`wrong`:`correct`),t===`exact`?(M.chime(),y(`✓ Correct!`,`correct`)):t===`close`?(M.chime(),y(`✓ Close enough! It's spelled "${e.term}".`,`correct`)):(M.buzz(),y(`✗ The answer was "${e.term}".`,`wrong`)),S(o.index),h.textContent=_()?`Finish 🎉`:o.isFinished?`See results`:`Next →`,v=!0,h.focus()}function T(t){let r=performance.now()-c,i=x(`type`,n.best(`type`));if(t){let e=n.record(`type`,{score:o.correctCount,timeMs:r,outOf:o.cards.length});M.fanfare(e.isNewBest),i=b(`type`,e)}e.innerHTML=`
      <div class="finish-panel ${t?``:`ended`}" role="status">
        <p class="finish-title">${t?`Round complete!`:`Round ended`}</p>
        <p class="finish-score">
          <strong>${o.correctCount}</strong> / ${t?o.cards.length:o.index} correct
        </p>
        <p class="finish-time">Time: ${f(r)}</p>
        ${i}
        ${I(s.changes)}
        <button class="primary-button" type="button">Play again</button>
      </div>
    `;let a=e.querySelector(`button`);a.addEventListener(`click`,l),a.focus()}p.addEventListener(`submit`,t=>{t.preventDefault(),v?_()?F(e,r):o.isFinished?T(!0):C():w()}),e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{T(o.isFinished)}),C()}var kn=`study-games.decks`,An=`study-games.current-deck`,jn=`study-games.draft`,Mn=`study-games.best-scores`,Nn=`study-games.sound-on`,Pn=`study-games.weak-cards`,Fn=`study-games.weak-only`,In=`study-games.cards`;function Ln(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.term==`string`&&typeof t.definition==`string`}function Rn(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.name!=`string`||!Array.isArray(t.cards)?null:{id:t.id,name:t.name,cards:t.cards.filter(Ln)}}function R(e,t){try{let n=e.getItem(t);return n===null?null:JSON.parse(n)}catch{return null}}function z(e,t,n){try{return e.setItem(t,JSON.stringify(n)),!0}catch{return!1}}function zn(e=localStorage){let t=R(e,kn),n=Array.isArray(t)?t.map(Rn).filter(e=>e!==null):[];if(n.length>0)return n;let r=R(e,In);return Array.isArray(r)?[ue(le,r.filter(Ln))]:[Ye()]}function Bn(e,t=localStorage){return z(t,kn,e)}function Vn(e=localStorage){let t=R(e,An);return typeof t==`string`?t:null}function Hn(e,t=localStorage){return z(t,An,e)}function Un(e=localStorage){let t=R(e,jn);return Ln(t)?t:null}function Wn(e,t=localStorage){return z(t,jn,e)}function Gn(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.score==`number`&&typeof t.timeMs==`number`&&(t.outOf===void 0||typeof t.outOf==`number`)}function Kn(e=localStorage){let t=R(e,Mn);if(typeof t!=`object`||!t||Array.isArray(t))return{};let n={};for(let[e,r]of Object.entries(t))if(typeof r==`object`&&r)for(let t of m){let i=r[t];Gn(i)&&(n[e]={...n[e],[t]:i})}return n}function qn(e,t=localStorage){return z(t,Mn,e)}function Jn(e=localStorage){return R(e,Nn)===!0}function Yn(e,t=localStorage){return z(t,Nn,e)}function Xn(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Zn(e=localStorage){let t=R(e,Pn);if(!Xn(t))return{};let n={};for(let[e,r]of Object.entries(t))if(Xn(r))for(let[t,i]of Object.entries(r))Number.isInteger(i)&&i>=0&&(n[e]={...n[e],[t]:i});return n}function Qn(e,t=localStorage){return z(t,Pn,e)}function $n(e=localStorage){return R(e,Fn)===!0}function er(e,t=localStorage){return z(t,Fn,e)}var tr=[`write`,`cards`,`match`,`quiz`,`battle`,`type`,`tower`,`decks`],nr=document.querySelector(`#deck-picker`),rr=document.querySelector(`#sound-toggle`),B=document.querySelector(`#weak-only`),ir=document.querySelector(`#weak-count`),ar=document.querySelector(`#match-game`),or=document.querySelector(`#match-progress`),sr=document.querySelector(`#quiz-game`),cr=document.querySelector(`#battle-game`),lr=document.querySelector(`#type-game`),ur=document.querySelector(`#tower-game`),dr=document.querySelector(`#decks-list`),fr=document.querySelector(`#decks-message`),pr=document.querySelectorAll(`a[data-view]`),mr=document.querySelector(`#card-count`),hr=document.querySelector(`#write-deck-name`),gr=document.querySelector(`#draft-slot`),_r=document.querySelector(`#save-card`),vr=document.querySelector(`#write-message`),yr=document.querySelector(`#import-file`),br=document.querySelector(`#file-import-message`),xr=document.querySelector(`#file-import-slot`),Sr=document.querySelector(`#cards-title`),Cr=document.querySelector(`#card-grid`),wr=document.querySelector(`#import-button`),Tr=document.querySelector(`#import-slot`),Er=document.querySelector(`#empty-message`),Dr=document.querySelector(`#no-weak-message`),Or=document.querySelector(`#graduate-count`),V=document.createElement(`p`);V.className=`practice-banner`;var H=document.querySelector(`#save-status`),U=`Couldn't save. Your browser may be blocking storage.`,kr=`Get one right 3 times in a row to clear it.`;Or.textContent=`3`;var W=zn(),G=he(W,Vn()).id,K=Un()??e(),q=Kn(),J=Zn(),Y=$n(),X=()=>he(W,G),Ar=()=>xe(J,G,X().cards);function jr(e){return Bn(e)?(W=e,!0):!1}function Mr(e){return jr(me(W,G,e))}function Nr(){if(Y)return{best:()=>void 0,record:(e,t)=>({scores:q,best:t,isNewBest:!1,practice:!0})};let e=G;return{best:t=>g(q,e,t),record:(t,n)=>{let r=_(q,e,t,n);return q=r.scores,qn(q),r}}}function Pr(){let e=G,t=e=>{J=e,Qn(J),Fr()};return{isPracticing:Y,isWeak:t=>be(J,e,t)!==void 0,miss:n=>t(ge(J,e,n)),right:n=>t(_e(J,e,n)),stopPracticing:()=>Ir(!1)}}function Fr(){let e=Ar().length;B.checked=Y,B.disabled=e===0&&!Y,ir.textContent=String(e),ir.setAttribute(`aria-label`,`${N(e)} to practice`),B.parentElement.title=e===0?`Cards you miss in a game show up here.`:`Play and review only the cards you've missed. ${kr}`,V.textContent=`🎯 Practicing ${N(e)} you've missed. ${kr}`,V.hidden=e===0}function Ir(e){Y=e,er(Y),Fr(),$r(Xr())}B.addEventListener(`change`,()=>Ir(B.checked));function Z(){let e=W.map(e=>{let t=document.createElement(`option`);return t.value=e.id,t.textContent=e.name,t.selected=e.id===G,t});nr.replaceChildren(...e);let t=X().cards.length;mr.textContent=String(t),mr.setAttribute(`aria-label`,N(t)),Fr()}function Lr(e){G=e,Hn(e),Z(),$r(Xr())}nr.addEventListener(`change`,()=>Lr(nr.value));function Rr(){let e=A();rr.textContent=e?`🔊`:`🔇`,rr.setAttribute(`aria-pressed`,String(e)),rr.setAttribute(`aria-label`,e?`Sound on`:`Sound off`),rr.title=e?`Sound is on. Click to mute.`:`Sound is off. Click to turn on.`}rr.addEventListener(`click`,()=>{te(!A()),Yn(A()),Rr(),M.chime()}),te(Jn());function Q(e,t){vr.textContent=e,vr.classList.toggle(`error`,t)}function zr(){hr.textContent=X().name;let e=Ge(K,{onEdit:(e,t)=>{K={...K,[e]:t},Wn(K),Q(``,!1)}});gr.replaceChildren(e),Ke(gr)}function Br(){let t=gr.querySelector(`.card`),n=i(K);if(n===`term`){Q(`Type a term before saving.`,!0),We(t,`term`);return}if(n===`definition`){Q(`Flip the card and add a definition before saving.`,!0),We(t,`definition`);return}if(!Mr([...X().cards,K])){Q(U,!0);return}K=e(),Wn(K),Z();let r=X();Q(`Saved to ${r.name}! It has ${N(r.cards.length)}.`,!1),zr(),We(gr.querySelector(`.card`),`term`)}_r.addEventListener(`click`,Br);function Vr(){xr.replaceChildren(),br.textContent=``}yr.addEventListener(`change`,async()=>{let e=yr.files?.[0];if(yr.value=``,!e)return;Vr();let t=await ct(e);if(`error`in t){br.textContent=t.error;return}let n=X();dt(xr,{deckName:n.name,existingCards:n.cards,fromFile:{name:e.name,text:t.text},onAdd:t=>{if(!Mr([...X().cards,...t])){br.textContent=U;return}Vr(),Z();let n=X().name;Q(`Added ${N(t.length)} from ${e.name} to ${n}!`,!1)},onClose:Vr}),xr.scrollIntoView({behavior:`smooth`,block:`start`})});function Hr(e){let t=Mr(e);H.textContent=t?`All changes saved`:U,H.classList.toggle(`error`,!t)}function Ur(e,t){let i=X().cards,a=i.find(e=>e.id===t);(!a||r(a)||confirm(`Delete this card from your deck?`))&&(Hr(n(i,t)),J=ve(J,G,t),Qn(J),e.remove(),Z(),Kr())}function Wr(e){let t=be(J,G,e);return t===void 0?void 0:{right:t,needed:3}}function Gr(){return Y?Ar():X().cards}function Kr(){let e=X().cards.length===0;Er.hidden=!e,Dr.hidden=!Y||e||Gr().length>0}function qr(){Tr.replaceChildren(),wr.hidden=!1}wr.addEventListener(`click`,()=>{wr.hidden=!0;let e=X();dt(Tr,{deckName:e.name,existingCards:e.cards,onAdd:e=>{Mr([...X().cards,...e])?(Z(),Jr(),H.textContent=`Added ${N(e.length)} to ${X().name}.`,H.classList.remove(`error`)):(H.textContent=U,H.classList.add(`error`))},onClose:qr})});function Jr(){qr();let e=X();Sr.textContent=Y?`${e.name}: weak cards`:e.name;let n=Gr().map(e=>{let n=Ge(e,{onEdit:(n,r)=>Hr(t(X().cards,e.id,n,r)),onDelete:()=>Ur(n,e.id),weakProgress:Wr(e.id)});return n});Cr.replaceChildren(...n),Ke(Cr),Kr(),H.textContent=``}function $(e){fr.textContent=e}function Yr(){Qe(dr,{decks:W,currentDeckId:G,onSelect:e=>{Lr(e),$(`Now using ${X().name}.`)},onCreate:e=>{let t=de(W,e);if(t)return t;let n=ue(e);return jr([...W,n])?(Lr(n.id),$(`Created ${n.name}. It's now your current deck.`),null):U},onRename:(e,t)=>de(W,t,e)||(jr(fe(W,e,t))?(Z(),Yr(),$(`Renamed to ${t.trim()}.`),null):U),onDelete:e=>{let t=he(W,e).name;jr(pe(W,e))?(q=v(q,e),qn(q),J=ye(J,e),Qn(J),Lr(X().id),$(`Deleted ${t}.`)):$(U)},onAddSample:()=>{let e=Ye();jr([...W,e])?(Lr(e.id),$(`Added ${e.name}. It's now your current deck.`)):$(U)}})}function Xr(){let e=location.hash.slice(1);return tr.find(t=>t===e)??`write`}var Zr=()=>{};function Qr(e){return Y?Ar().length===0?(e.innerHTML=`
      <p class="empty-message">
        No weak cards to practice in this deck. Miss a card in any game and it shows up here.
        Or turn off <strong>Weak cards only</strong> in the sidebar to play the whole deck.
      </p>
    `,!1):(e.before(V),!0):!0}function $r(e){Zr(),Zr=()=>{};for(let e of[ar,sr,cr,lr,ur])e.replaceChildren();or.textContent=``;for(let t of tr)document.querySelector(`#${t}-view`).hidden=t!==e;for(let t of pr){let n=t.dataset.view===e;t.classList.toggle(`current`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)}let t=X().cards;V.remove(),e===`write`?(Q(``,!1),Vr(),zr()):e===`cards`?Jr():e===`match`?Qr(ar)&&St(ar,or,t,Nr(),Pr()):e===`quiz`?Qr(sr)&&(Zr=Et(sr,t,Nr(),Pr())):e===`battle`?Qr(cr)&&(Zr=Be(cr,t,Nr(),Pr())):e===`type`?Qr(lr)&&On(lr,t,Nr(),Pr()):e===`tower`?Qr(ur)&&(Zr=Cn(ur,t,Nr(),Pr())):($(``),Yr())}window.addEventListener(`hashchange`,()=>$r(Xr())),Bn(W),Z(),Rr(),$r(Xr());