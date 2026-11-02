(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){return{id:crypto.randomUUID(),term:``,definition:``}}function t(e,t,n,r){return e.map(e=>e.id===t?{...e,[n]:r}:e)}function n(e,t){return e.filter(e=>e.id!==t)}function r(e){return e.term.trim()===``&&e.definition.trim()===``}function i(e){return e.term.trim()===``?`term`:e.definition.trim()===``?`definition`:null}function a(e){return e.filter(e=>i(e)===null)}function o(e,t=Math.random){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function s(e,t=Math.random){return o(a(e),t).slice(0,8)}function c(e,t=Math.random){let n=o(e,t);for(;e.length>1&&n.every((t,n)=>t===e[n]);)n=o(e,t);return n}function l(e){return Math.max(1,3-e)}function u(e,t){return e.trim().toLowerCase()===t.trim().toLowerCase()}function d(e,t){return e.id===t.id||u(e.term,t.term)||u(e.definition,t.definition)}function f(e){let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return`${n}:${String(r).padStart(2,`0`)}`}var p=class{cards;points=0;misses=new Map;matchedTerms=new Set;matchedDefinitions=new Set;constructor(e){this.cards=e}get maxPoints(){return this.cards.length*3}get matchedCount(){return this.matchedTerms.size}get isFinished(){return this.matchedCount===this.cards.length}pointsAvailable(e){return l(this.misses.get(e)??0)}hasMissed(e){return this.misses.has(e)}tryMatch(e,t){let n=this.findCard(e),r=this.findCard(t);if(this.matchedDefinitions.has(e)||this.matchedTerms.has(t))throw Error(`That card has already been matched.`);return d(n,r)?(this.points+=this.pointsAvailable(e),this.matchedDefinitions.add(e),this.matchedTerms.add(t),`correct`):(this.misses.set(e,(this.misses.get(e)??0)+1),`wrong`)}findCard(e){let t=this.cards.find(t=>t.id===e);if(!t)throw Error(`No card with id ${e} in this round.`);return t}},m=[`match`,`quiz`,`battle`,`type`,`tower`];function h(e,t){return t?e.score===t.score?e.timeMs<t.timeMs:e.score>t.score:!0}function g(e,t,n){return e[t]?.[n]}function _(e,t,n,r){let i=g(e,t,n);return h(r,i)?{scores:{...e,[t]:{...e[t],[n]:r}},best:r,isNewBest:!0}:{scores:e,best:i,isNewBest:!1}}function v(e,t){let n={...e};return delete n[t],n}function y(e,t){let n=f(t.timeMs);return e===`match`?`${t.score} / ${t.outOf} points in ${n}`:e===`type`?`${t.score} / ${t.outOf} correct in ${n}`:e===`battle`?`won with ${t.score} health left in ${n}`:e===`tower`?`won with ${t.score} ${t.score===1?`life`:`lives`} left in ${n}`:`liftoff in ${n}`}function b(e,t){return t.practice?`<p class="best-line">Practice rounds don't count toward your best.</p>`:t.isNewBest?`<p class="new-best">🏆 New best!</p>`:x(e,t.best)}function x(e,t){return t?`<p class="best-line">Your best: ${y(e,t)}</p>`:``}var S=[100,200,300],C=1200,w={100:12,200:8,300:5};function T(e){return w[e]}function E(){return S.flatMap(e=>Array.from({length:4},(t,n)=>({id:`${e}-${n}`,value:e,column:n,result:`open`})))}var D=class{playerHealth;botHealth;tiles=E();constructor(e=C){this.playerHealth=e,this.botHealth=e}get outcome(){return this.botHealth===0?`won`:this.playerHealth===0?`lost`:this.tiles.some(e=>e.result===`open`)?`playing`:this.playerHealth===this.botHealth?`tie`:this.playerHealth>this.botHealth?`won`:`lost`}answerTile(e,t){let n=this.tiles.find(t=>t.id===e);if(!n||n.result!==`open`)throw Error(`Tile ${e} can't be played.`);if(this.outcome!==`playing`)throw Error(`The battle is already over.`);n.result=t?`won`:`lost`,t?this.botHealth=Math.max(0,this.botHealth-n.value):this.playerHealth=Math.max(0,this.playerHealth-n.value)}},O=!1,k=null;function A(e){return 880*2**((Math.min(Math.max(e,1),10)-1)*2/12)}function ee(){return O}function j(e){O=e}function M({frequency:e,slideTo:t,durationMs:n,delayMs:r=0,wave:i=`sine`,volume:a=.2}){if(!O)return;k??=new AudioContext,k.state===`suspended`&&k.resume();let o=k.currentTime+r/1e3,s=o+n/1e3,c=k.createOscillator(),l=k.createGain();c.type=i,c.frequency.setValueAtTime(e,o),t&&c.frequency.exponentialRampToValueAtTime(t,s),l.gain.setValueAtTime(1e-4,o),l.gain.exponentialRampToValueAtTime(a,o+.01),l.gain.exponentialRampToValueAtTime(1e-4,s),c.connect(l).connect(k.destination),c.start(o),c.stop(s)}function te(e,t=`triangle`){let n=0;for(let[r,i]of e)M({frequency:r,durationMs:i*1.4,delayMs:n,wave:t,volume:.18}),n+=i}var N={chime(){te([[1047,70],[1568,160]])},buzz(){M({frequency:150,durationMs:250,wave:`square`,volume:.08})},streak(e){M({frequency:A(e),durationMs:160,wave:`triangle`})},shield(){M({frequency:520,durationMs:220,wave:`triangle`,volume:.15})},liftoff(){M({frequency:120,slideTo:1400,durationMs:900,wave:`sawtooth`,volume:.07}),M({frequency:180,slideTo:2e3,durationMs:900,wave:`sine`,volume:.1})},hit(){M({frequency:300,slideTo:90,durationMs:180,wave:`square`,volume:.12}),M({frequency:900,durationMs:80,wave:`triangle`,volume:.12})},hurt(){M({frequency:220,slideTo:110,durationMs:400,wave:`sawtooth`,volume:.09})},fanfare(e){let t=[[523,110],[659,110],[784,110],[1047,300]];e&&t.push([1319,120],[1568,400]),te(t)},lose(){te([[392,180],[370,180],[349,180],[330,450]],`sawtooth`)}};function ne(e){return e.term.trim().toLowerCase()}function re(e){let t=new Set;return a(e).filter(e=>{let n=ne(e);return!t.has(n)&&(t.add(n),!0)})}function ie(e){return 4*e}function ae(e,t,n=Math.random){if(e.length<4)throw Error(`Speed Quiz needs at least 4 cards.`);return{answer:t,choices:o([t,...o(e.filter(e=>e.id!==t.id),n).slice(0,3)],n)}}var oe=class{cards;random;remaining=[];previous=null;constructor(e,t=Math.random){this.cards=e,this.random=t}next(){return this.remaining.length===0&&(this.remaining=o(this.cards,this.random),this.cards.length>1&&this.remaining[0]===this.previous&&this.remaining.push(this.remaining.shift())),this.previous=this.remaining.shift(),this.previous}},se=class{progress=0;streak=0;bestStreak=0;correctCount=0;answeredCount=0;shield=`ready`;get isHot(){return this.streak>=3}get isFinished(){return this.progress>=100}answerCorrect(){this.answeredCount++,this.correctCount++,this.streak++,this.bestStreak=Math.max(this.bestStreak,this.streak);let e=this.progress;return this.progress=Math.min(100,this.progress+ie(this.streak)),this.progress-e}activateShield(){this.shield===`ready`&&(this.shield=`active`)}answerWrong(){return this.answeredCount++,this.shield===`active`?(this.shield=`used`,!0):(this.streak=0,this.progress=Math.max(0,this.progress-10),!1)}},ce=`My deck`;function le(e,t=[]){return{id:crypto.randomUUID(),name:e.trim(),cards:t}}function ue(e,t,n){let r=t.trim();if(r===``)return`Give the deck a name.`;if(r.length>40)return`Keep the name to 40 characters or fewer.`;let i=e.find(e=>e.id!==n&&e.name.toLowerCase()===r.toLowerCase());return i?`You already have a deck called "${i.name}".`:null}function de(e,t,n){return e.map(e=>e.id===t?{...e,name:n.trim()}:e)}function fe(e,t){return e.filter(e=>e.id!==t)}function pe(e,t,n){return e.map(e=>e.id===t?{...e,cards:n}:e)}function me(e,t){return e.find(e=>e.id===t)??e[0]}function P(e){return`${e} ${e===1?`card`:`cards`}`}function he(e,t,n){return{...e,[t]:{...e[t],[n]:0}}}function ge(e,t,n){let r=ye(e,t,n);return r===void 0?e:r+1>=3?_e(e,t,n):{...e,[t]:{...e[t],[n]:r+1}}}function _e(e,t,n){let r={...e[t]};return delete r[n],{...e,[t]:r}}function ve(e,t){let n={...e};return delete n[t],n}function ye(e,t,n){return e[t]?.[n]}function be(e,t,n){let r=e[t]??{};return n.filter(e=>r[e.id]!==void 0)}function F(e,t){return t.isPracticing?e.filter(e=>t.isWeak(e.id)):e}function xe(e,t,n){if(F(t,n).length===0)return null;let r=e.next();for(;n.isPracticing&&!n.isWeak(r.id);)r=e.next();return r}function I(e){let t={added:0,cleared:0};return{changes:t,tracker:{...e,miss:n=>{e.isWeak(n)||t.added++,e.miss(n)},right:n=>{let r=e.isWeak(n);e.right(n),r&&!e.isWeak(n)&&t.cleared++}}}}function Se(e){let t=[];return e.added>0&&t.push(`${P(e.added)} added to Weak cards`),e.cleared>0&&t.push(`${P(e.cleared)} cleared`),t.join(` · `)}var Ce=100,we=3,Te=class{timeouts=new Set;interval;later(e,t){let n=window.setTimeout(()=>{this.timeouts.delete(n),e()},t);this.timeouts.add(n)}countdown(e,t,n){this.stopCountdown();let r=performance.now()+e;t(e),this.interval=window.setInterval(()=>{let e=r-performance.now();e<=0?(this.stopCountdown(),n()):t(e)},Ce)}stopCountdown(){window.clearInterval(this.interval)}stop(){this.stopCountdown(),this.timeouts.forEach(e=>window.clearTimeout(e)),this.timeouts.clear()}},Ee=`
  <div class="quiz-timer" aria-hidden="true"><div class="quiz-timer-fill"></div></div>
  <p class="quiz-seconds"></p>
`;function De(e,t,n){let r=Math.ceil(Math.max(0,t)/1e3),i=e.querySelector(`.quiz-timer-fill`);i.style.width=`${Math.max(0,t)/n*100}%`,i.classList.toggle(`low`,r<=we),e.querySelector(`.quiz-seconds`).textContent=`${r}s`}function Oe(e,t,n){let r=t.map(e=>{let t=document.createElement(`button`);return t.type=`button`,t.className=`quiz-choice`,t.dataset.id=e.id,t.textContent=e.term,t.addEventListener(`click`,()=>n(e)),t});e.replaceChildren(...r)}function ke(e,t,n){let r=[...e.querySelectorAll(`.quiz-choice`)];for(let e of r)e.disabled=!0,e.dataset.id===t.id?e.classList.add(`correct`):e.dataset.id===n?.id&&e.classList.add(`wrong`)}function Ae(e,t,n){e.innerHTML=`
    <p class="empty-message">
      ${t} needs at least 4 cards with different terms, so each
      question has 4 choices. You have ${n}.
      Go to <a href="#write">Add cards</a> to add more.
    </p>
  `}function je(e,t,n){N.fanfare(!0),e.innerHTML=`
    <div class="finish-panel" role="status">
      <p class="finish-title">🎉 All weak cards cleared!</p>
      <p>You got every card you missed right 3 times in a row.</p>
      <button class="primary-button" type="button">${n?.label??`Play the whole deck`}</button>
    </div>
  `;let r=e.querySelector(`button`);r.addEventListener(`click`,n?.onNext??t.stopPracticing),r.focus()}function Me(e,t,n,r,i){return!t.isPracticing||r>=i?!1:r===0?(je(e,t),!0):(e.innerHTML=`
    <p class="empty-message">
      ${n} needs at least ${i} weak cards. You have ${r}, so try another game,
      or turn off <strong>Weak cards only</strong> in the sidebar to play the whole deck.
    </p>
  `,!0)}function L(e){let t=Se(e);return t?`<p class="weak-changes">🎯 ${t}</p>`:``}var Ne=1300,Pe=2e3,Fe=1e3,Ie=450,Le={player:`🧑‍🎓 You`,bot:`🤖 Quiz Bot`};function Re(e){return`
    <div class="fighter" data-side="${e}">
      <p class="fighter-name">${Le[e]}</p>
      <div class="health-bar" role="meter" aria-label="${e===`player`?`Your`:`Quiz Bot's`} health"
        aria-valuemin="0" aria-valuemax="${C}">
        <div class="health-fill"></div>
      </div>
      <p class="health-text"></p>
    </div>
  `}function ze(e,t,n,r){let i=re(t);if(i.length<4)return Ae(e,`Battle`,i.length),()=>{};let a=new Te;function o(){a.stop();let t=F(i,r);if(Me(e,r,`Battle`,t.length,1))return;let s=new D,c=I(r),l=new oe(t),u=performance.now(),d=0,p=0;e.innerHTML=`
      <div class="battle-arena">${Re(`player`)}${Re(`bot`)}</div>
      ${x(`battle`,n.best(`battle`))}
      <div class="battle-stage"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <span></span>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.battle-stage`),h=e.querySelector(`.quiz-message`),g=t=>e.querySelector(`.fighter[data-side="${t}"]`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{a.stop(),E(`ended`)});function _(e,t){h.textContent=e,h.dataset.kind=t}function v(){for(let e of[`player`,`bot`]){let t=e===`player`?s.playerHealth:s.botHealth,n=g(e),r=n.querySelector(`.health-fill`),i=t/C;r.style.width=`${i*100}%`,r.dataset.level=i>.5?`high`:i>.25?`medium`:`low`,n.querySelector(`.health-bar`).setAttribute(`aria-valuenow`,String(t)),n.querySelector(`.health-text`).textContent=`${t} / ${C}`}}function y(e,t){let n=g(e);n.classList.remove(`hit`),n.offsetWidth,n.classList.add(`hit`),a.later(()=>n.classList.remove(`hit`),Ie);let r=document.createElement(`span`);r.className=`damage-float`,r.textContent=`−${t}`,r.setAttribute(`aria-hidden`,`true`),n.append(r),a.later(()=>r.remove(),Fe)}function S(){if(r.isPracticing&&F(t,r).length===0){a.stop(),je(e,r);return}m.innerHTML=`
        <p class="question-label">Pick a tile. Bigger tiles hit harder but give you less time.</p>
        <div class="battle-board"></div>
      `;let n=m.querySelector(`.battle-board`);for(let e of s.tiles){let t=document.createElement(`button`);t.type=`button`,t.className=`battle-tile ${e.result}`,e.result===`open`?(t.textContent=String(e.value),t.setAttribute(`aria-label`,`${e.value} points, ${T(e.value)} seconds`),t.addEventListener(`click`,()=>w(e))):(t.disabled=!0,t.textContent=e.result===`won`?`✓`:`✗`,t.setAttribute(`aria-label`,`${e.value} points, ${e.result===`won`?`you hit`:`Quiz Bot hit`}`)),n.append(t)}}function w(e){let n=ae(i,xe(l,t,r)),o=T(e.value)*1e3;h.textContent=``,m.innerHTML=`
        <p class="question-label">
          <strong>${e.value}-point question</strong> · ${T(e.value)} seconds
        </p>
        ${Ee}
        <p class="question-definition"></p>
        <div class="quiz-choices"></div>
      `,m.querySelector(`.question-definition`).textContent=n.answer.definition;let u=m.querySelector(`.quiz-choices`),f=t=>{a.stopCountdown(),ke(u,n.answer,t),t||De(m,0,o);let r=t?.id===n.answer.id;d++,s.answerTile(e.id,r),r?c.tracker.right(n.answer.id):c.tracker.miss(n.answer.id),r?(p++,y(`bot`,e.value),N.hit(),_(`Hit! Quiz Bot takes ${e.value} damage.`,`correct`)):(y(`player`,e.value),N.hurt(),_(`${t?`Ouch!`:`Time's up!`} Quiz Bot hits you for ${e.value}. The answer was "${n.answer.term}".`,`wrong`)),v(),a.later(()=>s.outcome===`playing`?S():E(s.outcome),r?Ne:Pe)};Oe(u,n.choices,f),a.countdown(o,e=>De(m,e,o),()=>f(null))}function E(t){let r={won:`🏆 You win!`,lost:`💥 Quiz Bot wins`,tie:`🤝 It's a tie`,ended:`Battle ended`,playing:`Battle ended`},i=performance.now()-u,a=x(`battle`,n.best(`battle`));if(t===`won`){let e=n.record(`battle`,{score:s.playerHealth,timeMs:i});N.fanfare(e.isNewBest),a=b(`battle`,e)}else t===`lost`&&N.lose();e.innerHTML=`
        <div class="finish-panel ${t===`won`?``:`ended`}" role="status">
          <p class="finish-title">${r[t]}</p>
          <p>You: <strong>${s.playerHealth}</strong> · Quiz Bot: <strong>${s.botHealth}</strong></p>
          <p class="finish-time">${p} of ${d} right · Time: ${f(i)}</p>
          ${a}
          ${L(c.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let l=e.querySelector(`button`);l.addEventListener(`click`,o),l.focus()}v(),S()}return o(),()=>a.stop()}function Be(e){if(!e)return``;let t=Array.from({length:e.needed},(t,n)=>`<span class="${n<e.right?`dot filled`:`dot`}"></span>`).join(``),n=`Weak card: ${e.right} of ${e.needed} right in a row`;return`<span class="weak-progress" role="img" aria-label="${n}" title="${n}">${t}</span>`}function Ve(e){e.style.height=`auto`,e.style.height=`${e.scrollHeight}px`}function He(e,t,n){let r=t===`term`,i=document.createElement(`div`);i.className=`card-face ${r?`card-front`:`card-back`}`,i.innerHTML=`
    <div class="card-header">
      <span class="face-label">${r?`Term`:`Definition`}</span>
      ${Be(n.weakProgress)}
      ${n.onDelete?`<button class="delete-card" type="button" aria-label="Delete card">×</button>`:``}
    </div>
    <textarea placeholder="${r?`Type a term`:`Type the definition`}"
      aria-label="${r?`Term`:`Definition`}"></textarea>
    <button class="flip-card" type="button">↻ Flip to ${r?`definition`:`term`}</button>
  `;let a=i.querySelector(`textarea`);return a.value=e[t],a.rows=1,a.addEventListener(`input`,()=>{Ve(a),n.onEdit(t,a.value)}),i}function Ue(e,t){let n=t===`definition`;e.classList.toggle(`flipped`,n);let r=e.querySelector(`.card-front`),i=e.querySelector(`.card-back`);r.inert=n,i.inert=!n,(n?i:r).querySelector(`textarea`).focus()}function We(e,t){let n=document.createElement(`article`);n.className=`card`;let r=document.createElement(`div`);return r.className=`card-inner`,r.append(He(e,`term`,t),He(e,`definition`,t)),n.append(r),n.querySelector(`.card-back`).inert=!0,n.addEventListener(`click`,e=>{let r=e.target;r.closest(`.delete-card`)?t.onDelete?.():(r.closest(`.flip-card`)||!r.closest(`textarea`))&&Ue(n,n.classList.contains(`flipped`)?`term`:`definition`)}),n}function Ge(e){e.querySelectorAll(`textarea`).forEach(Ve)}var Ke=`﻿`,qe=/[",\r\n]/,Je=1e4;function Ye(e){return qe.test(e)?`"${e.replaceAll(`"`,`""`)}"`:e}function Xe(e){return`${Ke}${[`Term,Definition`,...e.map(e=>`${Ye(e.term)},${Ye(e.definition)}`)].join(`\r
`)}\r\n`}function Ze(e){return`${e.replace(/[^\p{L}\p{N} _-]/gu,``).replace(/\s+/g,` `).trim()||`deck`}.csv`}function Qe(e){let t=URL.createObjectURL(new Blob([Xe(e.cards)],{type:`text/csv`})),n=document.createElement(`a`);n.href=t,n.download=Ze(e.name),n.click(),window.setTimeout(()=>URL.revokeObjectURL(t),Je)}var $e=`Sample: World Capitals`,et=[[`Japan`,`Tokyo`],[`France`,`Paris`],[`Italy`,`Rome`],[`Egypt`,`Cairo`],[`Brazil`,`Brasília`],[`Canada`,`Ottawa`],[`Australia`,`Canberra`],[`India`,`New Delhi`],[`Kenya`,`Nairobi`],[`Spain`,`Madrid`]];function tt(){return le($e,et.map(([e,t])=>({id:crypto.randomUUID(),term:t,definition:`Capital of ${e}`})))}function nt(e,t,n,r){let i=document.createElement(`form`);i.className=`deck-name-form`,i.innerHTML=`
    <input type="text" maxlength="40" aria-label="Deck name"
      placeholder="Deck name, like Bio 101" />
    <button class="primary-button" type="submit">${t}</button>
    ${r?`<button class="secondary-button" type="button">Cancel</button>`:``}
    <p class="deck-error" aria-live="polite"></p>
  `;let a=i.querySelector(`input`),o=i.querySelector(`.deck-error`);return a.value=e,i.addEventListener(`submit`,e=>{e.preventDefault();let t=n(a.value);o.textContent=t??``,t&&a.focus()}),r&&(i.querySelector(`.secondary-button`).addEventListener(`click`,r),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&r()})),i}function rt(e,t,n){let r=e.id===t.currentDeckId,i=document.createElement(`article`);i.className=`deck-tile${r?` current`:``}`,i.innerHTML=`
    <button class="deck-select" type="button" aria-pressed="${r}">
      <span class="deck-name"></span>
      <span class="deck-card-count">${P(e.cards.length)}</span>
      ${r?`<span class="current-badge">Current</span>`:``}
    </button>
    <div class="deck-tile-actions">
      <button class="text-button export-deck" type="button">Export</button>
      <button class="text-button rename-deck" type="button">Rename</button>
      <button class="text-button delete-deck" type="button">Delete</button>
    </div>
  `,i.querySelector(`.deck-name`).textContent=e.name,i.querySelector(`.deck-select`).addEventListener(`click`,()=>t.onSelect(e.id));let a=i.querySelector(`.export-deck`);a.setAttribute(`aria-label`,`Export ${e.name} as a CSV file`),e.cards.length===0&&(a.disabled=!0,a.title=`Add cards before exporting this deck.`),a.addEventListener(`click`,()=>t.onExport(e));let o=i.querySelector(`.delete-deck`);return t.decks.length===1&&(o.disabled=!0,o.title=`You need at least one deck.`),o.addEventListener(`click`,()=>{let n=`Delete "${e.name}" and its ${P(e.cards.length)}? This can't be undone.`;(e.cards.length===0||confirm(n))&&t.onDelete(e.id)}),i.querySelector(`.rename-deck`).addEventListener(`click`,()=>{let r=nt(e.name,`Save`,n=>t.onRename(e.id,n),n);i.replaceChildren(r);let a=r.querySelector(`input`);a.focus(),a.select()}),i}function it(e,t){let n=()=>it(e,t),r=document.createElement(`div`);r.className=`deck-grid`,r.append(...t.decks.map(e=>rt(e,t,n)));let i=document.createElement(`h2`);i.className=`new-deck-heading`,i.textContent=`New deck`;let a=nt(``,`+ Create deck`,t.onCreate);if(e.replaceChildren(r,i,a),!t.decks.some(e=>e.name.toLowerCase()===`sample: world capitals`)){let n=document.createElement(`p`);n.className=`sample-deck-row`,n.innerHTML=`
      Want something to try or show a friend?
      <button class="text-button" type="button">+ Add sample deck (World Capitals)</button>
    `,n.querySelector(`button`).addEventListener(`click`,t.onAddSample),e.append(n)}}var at=[{view:`match`,title:`Match`,icon:`🧩`},{view:`quiz`,title:`Speed Quiz`,icon:`⚡`},{view:`type`,title:`Type It`,icon:`✍️`},{view:`battle`,title:`Battle`,icon:`⚔️`},{view:`tower`,title:`Tower Duel`,icon:`🏰`}],ot=4;function st(e,t,n){return e.length===1&&e[0].name===`Sample: World Capitals`&&Object.keys(t).length===0&&Object.keys(n).length===0}function ct(e,t){let n=ot-e.cards.length;return n>0?{kind:`add-cards`,reason:`Add ${n===1?`1 more card`:`${n} more cards`} to start playing.`}:t>0?{kind:`session`,reason:`3 quick games, starting with ${t===1?`1 card`:`${t} cards`} you've missed.`}:{kind:`session`,reason:`3 quick games with this deck.`}}function lt(e,t){e.innerHTML=`
    <section class="home-welcome">
      <h1 id="home-title">Study with games, not flashcards</h1>
      <p>
        Turn your own terms and definitions into quick games. One deck works in all of them,
        and the cards you miss come back until you've learned them.
      </p>
      <div class="home-actions">
        <button class="primary-button home-try-sample" type="button">▶ Try the sample deck</button>
        <a class="secondary-button" href="#decks">+ Create your first deck</a>
      </div>
    </section>
  `,e.querySelector(`.home-try-sample`).addEventListener(`click`,t.onTrySample)}function ut(e,t){let n=e.id===t.currentDeck.id,r=t.weakCountFor(e),i=document.createElement(`article`);return i.className=`deck-tile${n?` current`:``}`,i.innerHTML=`
    <button class="deck-select" type="button" aria-pressed="${n}">
      <span class="deck-name"></span>
      <span class="deck-card-count">${P(e.cards.length)}</span>
      ${r>0?`<span class="home-weak">🎯 ${r} to practice</span>`:``}
      ${n?`<span class="current-badge">Current</span>`:``}
    </button>
  `,i.querySelector(`.deck-name`).textContent=e.name,i.querySelector(`.deck-select`).addEventListener(`click`,()=>t.onSelectDeck(e.id)),i}function dt(e){let{currentDeck:t,weakCountFor:n}=e,r=ct(t,n(t)),i=document.createElement(`section`);i.className=`home-study`,i.setAttribute(`aria-label`,`Study this deck`),i.innerHTML=`
    <p class="home-study-reason"></p>
    <div class="home-actions"></div>
    <p class="home-jump-label">Or jump into a game</p>
    <div class="home-games"></div>
  `,i.querySelector(`.home-study-reason`).textContent=r.reason;let a=i.querySelector(`.home-actions`);a.innerHTML=r.kind===`add-cards`?`<a class="primary-button" href="#write">+ Add cards</a>`:`<a class="primary-button" href="#session">▶ Start studying</a>`;let o=at.map(e=>{let t=document.createElement(`a`);return t.className=`secondary-button`,t.href=`#${e.view}`,t.textContent=`${e.icon} ${e.title}`,t});return i.querySelector(`.home-games`).append(...o),i}function ft(e,t){if(t.isNewVisitor){lt(e,t);return}let n=document.createElement(`h1`);n.id=`home-title`,n.textContent=`Your decks`;let r=document.createElement(`div`);r.className=`deck-grid`,r.append(...t.decks.map(e=>ut(e,t))),e.replaceChildren(n,r,dt(t))}var pt=e=>at.find(t=>t.view===e);function mt(e){return(t=>t.map((t,n)=>({game:pt(t),practice:e>0&&n===0})))(e>0?[`type`,`match`,`quiz`]:[`match`,`quiz`,`type`])}function ht(e){let t={added:0,cleared:0},n=new Set,r=0,i=0;return{track:e=>{let a=I(e);return{...a.tracker,miss:e=>{let r=a.changes.added;a.tracker.miss(e),t.added+=a.changes.added-r,i++,n.add(e)},right:e=>{let n=a.changes.cleared;a.tracker.right(e),t.cleared+=a.changes.cleared-n,r++}}},results:()=>({right:r,missed:i,missedCards:e.filter(e=>n.has(e.id)),weakChanges:t})}}function gt(e,t,n,r){N.fanfare(n.missed===0);let{right:i,missed:a,missedCards:o,weakChanges:s}=n,c=i+a,l=c>0?Math.round(i/c*100):0;e.innerHTML=`
    <div class="finish-panel session-summary" role="status">
      <p class="finish-title">🎓 Session complete!</p>
      <p>${t} games · <strong>${i}</strong> right · <strong>${a}</strong> missed</p>
      ${c>0?`<p class="finish-time">${l}% of answers right</p>`:``}
      ${L(s)}
      <div class="session-missed" hidden>
        <p class="session-missed-title">Cards to review (${P(o.length)})</p>
        <ul></ul>
      </div>
      <div class="home-actions session-actions">
        <button class="primary-button" type="button">Study again</button>
        <a class="secondary-button" href="#home">Back to home</a>
      </div>
    </div>
  `,e.querySelector(`ul`).append(...o.map(e=>{let t=document.createElement(`li`),n=document.createElement(`strong`);return n.textContent=e.term,t.append(n,` → ${e.definition}`),t})),e.querySelector(`.session-missed`).hidden=o.length===0;let u=e.querySelector(`.primary-button`);u.addEventListener(`click`,r),u.focus()}function _t(e,t){if(re(t.deck).length<4)return e.innerHTML=`
      <p class="empty-message">
        A study session needs at least 4 cards with different terms.
        Go to <a href="#write">Add cards</a> to add more.
      </p>
    `,()=>{};let n=mt(t.weakCount),r=ht(t.deck),i=()=>{};e.innerHTML=`
    <p class="session-step" aria-live="polite"></p>
    <p class="session-game-progress"></p>
    <div class="session-screen"></div>
  `;let a=e.querySelector(`.session-step`),o=e.querySelector(`.session-game-progress`),s=e.querySelector(`.session-screen`);function c(l){if(i(),l===n.length){i=()=>{},gt(e,n.length,r.results(),t.onRestart);return}let u=n[l],d=l===n.length-1,f=u.practice?` · your missed cards`:``;a.textContent=`Game ${l+1} of ${n.length}: ${u.game.icon} ${u.game.title}${f}`,o.textContent=``,s.replaceChildren(),i=t.runGame(s,o,u,r.track(t.trackerFor(u)),{label:d?`See my summary`:`Next game →`,onNext:()=>c(l+1)})}return c(0),()=>i()}var vt=/^(?:[-*•]|\d+[.)])\s+/,yt=/\s+[-–—](?:\s+|$)/;function bt(e){let t=e.indexOf(`	`);if(t!==-1)return{index:t,length:1};let n=yt.exec(e);if(n)return{index:n.index,length:n[0].length};let r=e.indexOf(`:`);return r===-1?null:{index:r,length:1}}function xt(e){let t=e.replace(/^ +| +$/g,``).replace(vt,``),n=bt(t);return n?[t.slice(0,n.index).trim(),t.slice(n.index+n.length).trim()]:null}var St=e=>e.trim().toLowerCase();function Ct(e,t){let n=new Set(t.map(e=>St(e.term))),r=new Set,i=[],a=[];for(let t of e.split(/\r?\n/)){let e=t.trim();if(e===``)continue;let o=xt(t);if(!o){a.push({line:e,reason:`No dash, colon, or tab between term and definition`});continue}let[s,c]=o;if(s===``||c===``){a.push({line:e,reason:`Missing a term or a definition`});continue}let l=St(s);n.has(l)?a.push({line:e,reason:r.has(l)?`Same term as an earlier line`:`Already in this deck`}):(n.add(l),r.add(l),i.push({id:crypto.randomUUID(),term:s,definition:c}))}return{cards:i,skipped:a}}function wt(e){let t=[],n=[],r=``,i=!1;for(let a=0;a<e.length;a++){let o=e[a];i?o===`"`&&e[a+1]===`"`?(r+=`"`,a++):o===`"`?i=!1:r+=o:o===`"`?i=!0:o===`,`?(n.push(r),r=``):o===`
`||o===`\r`?(o===`\r`&&e[a+1]===`
`&&a++,n.push(r),t.push(n),n=[],r=``):r+=o}return(r!==``||n.length>0)&&(n.push(r),t.push(n)),t}var Tt=new Set([`term`,`terms`,`word`,`front`,`question`]);function Et(e){let t=wt(e);t.length>0&&Tt.has(t[0][0].trim().toLowerCase())&&t.shift();let n=e=>e.replace(/\s+/g,` `).trim();return t.map(e=>e.map(n)).filter(e=>e.some(e=>e!==``)).map(([e,t=``])=>`${e}\t${t}`).join(`
`)}async function Dt(e){let t=e.name.toLowerCase(),n=t.endsWith(`.csv`);if(!n&&!t.endsWith(`.txt`)&&!t.endsWith(`.tsv`))return{error:`Can't read “${e.name}”. Choose a .csv or .txt file.`};if(e.size>1e6)return{error:`“${e.name}” is too big. Choose a file under 1 MB.`};let r=await e.text(),i=n?Et(r):r;return i.trim()===``?{error:`“${e.name}” has no cards in it.`}:{text:i}}var Ot=10;function kt(e,t,n){if(e.replaceChildren(),t.cards.length===0&&t.skipped.length===0)return;let r=document.createElement(`p`);if(r.className=`import-summary`,r.textContent=t.cards.length>0?`${P(t.cards.length)} ready to add to ${n}`:`No cards to add yet`,e.append(r),t.cards.length>0){let n=document.createElement(`ul`);n.className=`import-card-list`;for(let e of t.cards){let t=document.createElement(`li`),r=document.createElement(`strong`);r.textContent=e.term,t.append(r,` → ${e.definition}`),n.append(t)}e.append(n)}if(t.skipped.length>0){let n=document.createElement(`p`);n.className=`import-skipped-heading`,n.textContent=`${t.skipped.length} ${t.skipped.length===1?`line`:`lines`} skipped:`;let r=document.createElement(`ul`);r.className=`import-skipped-list`;for(let{line:e,reason:n}of t.skipped.slice(0,Ot)){let t=document.createElement(`li`),i=document.createElement(`code`);i.textContent=e,t.append(i,` (${n})`),r.append(t)}if(t.skipped.length>Ot){let e=document.createElement(`li`);e.textContent=`…and ${t.skipped.length-Ot} more`,r.append(e)}e.append(n,r)}}function At(e,t){e.innerHTML=`
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
  `;let n=e.querySelector(`.import-text`),r=e.querySelector(`.import-preview`),i=e.querySelector(`.import-add`),a={cards:[],skipped:[]},o=()=>{a=Ct(n.value,t.existingCards),kt(r,a,t.deckName),i.disabled=a.cards.length===0,i.textContent=a.cards.length>0?`Add ${P(a.cards.length)}`:`Add cards`};n.addEventListener(`input`,o),i.addEventListener(`click`,()=>t.onAdd(a.cards)),e.querySelector(`.import-cancel`).addEventListener(`click`,t.onClose),t.fromFile?(e.querySelector(`#import-title`).textContent=`Import from ${t.fromFile.name}`,e.querySelector(`.instructions`).textContent=`Check the cards below. You can fix any line in the box before adding them.`,n.value=t.fromFile.text,o(),i.focus()):n.focus()}var jt=6,Mt=300,Nt=300,Pt=450,Ft=e=>new Promise(t=>setTimeout(t,e));function It(e,t){let n=document.createElement(`button`);return n.type=`button`,n.className=`match-tile ${t}-tile`,n.dataset.id=e.id,n.textContent=t===`term`?e.term:e.definition,n.setAttribute(`aria-pressed`,`false`),n}function Lt(e,t){let n=document.createElement(`div`);n.className=`match-column`;let r=document.createElement(`h2`);return r.textContent=e,n.append(r,...t),n}function Rt(e,t){e.innerHTML=`
    <p class="empty-message">
      Match needs at least 2 cards with both a term and a definition.
      You have ${t}. Go to <a href="#write">Add cards</a> to add more.
    </p>
  `}function zt(e,t,n,r,i,a){let o=r.record(`match`,{score:t.points,timeMs:n,outOf:t.maxPoints});N.fanfare(o.isNewBest),e.innerHTML=`
    <div class="finish-panel" role="status">
      <p class="finish-title">Round complete!</p>
      <p class="finish-score"><strong>${t.points}</strong> / ${t.maxPoints} points</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${b(`match`,o)}
      ${L(i)}
      <button class="primary-button" type="button">${a.label}</button>
    </div>
  `;let s=e.querySelector(`button`);s.addEventListener(`click`,a.onNext),s.focus()}function Bt(e,t,n,r,i,a){e.innerHTML=`
    <div class="finish-panel ended" role="status">
      <p class="finish-title">Round ended</p>
      <p class="finish-score"><strong>${t.points}</strong> points so far</p>
      <p>${t.matchedCount} of ${t.cards.length} pairs matched</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${x(`match`,r.best(`match`))}
      ${L(i)}
      <button class="primary-button" type="button">${a.label}</button>
    </div>
  `;let o=e.querySelector(`button`);o.addEventListener(`click`,a.onNext),o.focus()}function Vt(e,t,n,r,i,o){let l=o??{label:`Play again`,onNext:()=>Vt(e,t,n,r,i)},u=a(F(n,i));if(Me(e,i,`Match`,u.length,2)){t.textContent=``;return}if(u.length<2){t.textContent=``,Rt(e,u.length);return}let d=new p(s(u)),f=I(i),m=performance.now(),h=d.cards.map(e=>It(e,`term`)),g=c(d.cards).map(e=>It(e,`definition`));e.innerHTML=`
    <p class="instructions">
      Drag each definition onto its term, or click a definition and then its term.
    </p>
    ${x(`match`,r.best(`match`))}
  `;let _=document.createElement(`div`);_.className=`match-board`,_.append(Lt(`Terms`,h),Lt(`Definitions`,g));let v=document.createElement(`p`);v.className=`match-message`,v.setAttribute(`aria-live`,`polite`);let y=document.createElement(`div`);y.className=`quiz-actions`,y.innerHTML=`<span></span><button class="end-game-button" type="button">End game</button>`,e.append(_,v,y);let b=!1;y.querySelector(`.end-game-button`).addEventListener(`click`,()=>{d.isFinished||(b=!0,t.textContent=``,Bt(e,d,performance.now()-m,r,f.changes,l))});let S=null;function C(){t.textContent=`Points: ${d.points} · ${d.matchedCount} of ${d.cards.length} matched`}function w(e,t){v.textContent=e,v.dataset.kind=t}function T(e){S?.setAttribute(`aria-pressed`,`false`),S=e,S?.setAttribute(`aria-pressed`,`true`)}function E(e){return!e.disabled&&e.dataset.busy!==`true`}function D(e,t,n,r){e.style.transition=r?`translate ${Mt}ms ease`:`none`,e.style.translate=t===0&&n===0?``:`${t}px ${n}px`}function O(e){let[t=`0`,n=`0`]=e.style.translate.split(` `);return[parseFloat(t)||0,parseFloat(n)||0]}async function k(a,s){T(null);let c=a.dataset.id,u=[a,s];u.forEach(e=>e.dataset.busy=`true`);let p=d.pointsAvailable(c);if(d.tryMatch(c,s.dataset.id)===`wrong`){f.tracker.miss(c),N.buzz(),w(`Not a match. That definition is now worth ${d.pointsAvailable(c)} ${d.pointsAvailable(c)===1?`point`:`points`}.`,`wrong`),u.forEach(e=>e.classList.add(`wrong`)),D(a,0,0,!0),await Ft(Pt),u.forEach(e=>{e.classList.remove(`wrong`),e.dataset.busy=`false`});return}d.hasMissed(c)||f.tracker.right(c),N.chime(),w(`Match! +${p} ${p===1?`point`:`points`}`,`correct`),C();let[h,g]=O(a),_=a.getBoundingClientRect(),v=s.getBoundingClientRect();a.classList.add(`combining`),D(a,h+v.left-_.left,g+v.top-_.top,!0),u.forEach(e=>e.classList.add(`correct`)),await Ft(Mt),u.forEach(e=>e.classList.add(`vanish`)),await Ft(Nt),!b&&(ee(u),d.isFinished&&i.isPracticing&&F(n,i).length===0?(t.textContent=``,je(e,i,o)):d.isFinished&&(t.textContent=``,zt(e,d,performance.now()-m,r,f.changes,l)))}let A=new Map;function ee(e){let t=[..._.querySelectorAll(`.match-tile`)].filter(t=>!e.includes(t)),n=new Map(t.map(e=>[e,e.getBoundingClientRect().top]));e.forEach(e=>e.remove());let r=!matchMedia(`(prefers-reduced-motion: reduce)`).matches;for(let e of t){let t=n.get(e)-e.getBoundingClientRect().top;if(t===0)continue;let i=A.get(e);if(i){i.y-=t;let[n,r]=O(e);D(e,n,r+t,!1)}else r&&e.animate([{transform:`translateY(${t}px)`},{transform:`none`}],{duration:Mt,easing:`ease`})}}let j=!1;for(let e of[...h,...g])e.addEventListener(`click`,()=>{if(j||!E(e))return;if(S===null||S===e){T(S===e?null:e);return}let t=e.classList.contains(`term-tile`);t===S.classList.contains(`term-tile`)?T(e):k(t?S:e,t?e:S)});function M(e){let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.term-tile`);return t&&_.contains(t)&&E(t)?t:null}for(let e of g){let t=!1,n=null;function r(e){n?.classList.remove(`drop-target`),n=e,n?.classList.add(`drop-target`)}function i(n,i){let a=i?null:M(n);r(null),e.classList.remove(`dragging`),A.delete(e),t&&(t=!1,j=!0,setTimeout(()=>j=!1,0),a?k(e,a):D(e,0,0,!0))}e.addEventListener(`pointerdown`,t=>{t.button===0&&E(e)&&(A.set(e,{x:t.clientX,y:t.clientY}),e.setPointerCapture(t.pointerId))}),e.addEventListener(`pointermove`,n=>{let i=A.get(e);if(!i)return;let a=n.clientX-i.x,o=n.clientY-i.y;!t&&Math.hypot(a,o)<jt||(t||(t=!0,e.classList.add(`dragging`),T(null)),D(e,a,o,!1),r(M(n)))}),e.addEventListener(`pointerup`,e=>i(e,!1)),e.addEventListener(`pointercancel`,e=>i(e,!0))}C()}var Ht=700,Ut=1600,Wt=1200;function Gt(e,t,n,r,i){let a=re(t);if(a.length<4)return Ae(e,`Speed Quiz`,a.length),()=>{};let o=new Te,s=()=>o.stop();function c(){s(),e.innerHTML=`
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
    `;let t=e.querySelector(`button`);t.addEventListener(`click`,l),t.focus()}function l(){s();let t=F(a,r);if(Me(e,r,`Speed Quiz`,t.length,1))return;let c=new se,u=I(r),d=performance.now(),p=new oe(t),m=null;e.innerHTML=`
      <div class="streak-panel">
        <p class="streak-status" aria-live="polite"></p>
        <div class="streak-bar" role="progressbar" aria-label="Rocket progress"
          aria-valuemin="0" aria-valuemax="100">
          <div class="streak-fill"></div>
          <span class="rocket" aria-hidden="true"><span class="rocket-ship">🚀</span><span class="rocket-shield">🛡️</span></span>
        </div>
      </div>
      ${Ee}
      <p class="question-label">Which term matches this definition?</p>
      <p class="question-definition"></p>
      <div class="quiz-choices"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <button class="shield-button" type="button"></button>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let h=e.querySelector(`.streak-status`),g=e.querySelector(`.streak-bar`),_=e.querySelector(`.streak-fill`),v=e.querySelector(`.rocket`),y=e.querySelector(`.question-definition`),S=e.querySelector(`.quiz-choices`),C=e.querySelector(`.quiz-message`),w=e.querySelector(`.shield-button`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{s(),j(performance.now()-d,!1)});function T(){w.textContent={ready:`🛡️ Use shield (1 per game)`,active:`🛡️ Shield on: your next miss is free`,used:`🛡️ Shield used`}[c.shield],w.disabled=c.shield!==`ready`,w.classList.toggle(`active`,c.shield===`active`),g.classList.toggle(`shielded`,c.shield===`active`)}w.addEventListener(`click`,()=>{c.activateShield(),T()});function E(){_.style.width=`${c.progress}%`,v.style.left=`${c.progress}%`,g.setAttribute(`aria-valuenow`,String(c.progress)),g.classList.toggle(`hot`,c.isHot),c.isHot?h.textContent=`🔥 Hot streak! ×${c.streak}`:c.streak>0?h.textContent=`Streak: ${c.streak}`:h.textContent=`${c.progress}% to launch`,h.classList.toggle(`hot`,c.isHot)}function D(e,t){C.textContent=e,C.dataset.kind=t}let O=8e3;function k(){let n=xe(p,t,r);n?(m=ae(a,n),y.textContent=m.answer.definition,C.textContent=``,Oe(S,m.choices,A),o.countdown(O,t=>De(e,t,O),()=>A(null))):(s(),je(e,r,i))}function A(t){o.stopCountdown();let n=m.answer;if(ke(S,n,t),t||De(e,0,O),t?.id===n.id){u.tracker.right(n.id);let e=c.answerCorrect();N.streak(c.streak),D(c.streak===3?`🔥 Hot streak! +${e}%`:`Correct! +${e}%`,`correct`)}else{u.tracker.miss(n.id);let e=t?`Not quite.`:`Time's up!`;c.answerWrong()?(N.shield(),D(`🛡️ Shield blocked it! ${e} The answer was "${n.term}". Your streak is safe.`,`shielded`)):(N.buzz(),D(`${e} The answer was "${n.term}". −10%`,`wrong`),g.classList.remove(`shake`),g.offsetWidth,g.classList.add(`shake`))}E(),T(),c.isFinished?ee():o.later(k,t?.id===n.id?Ht:Ut)}function ee(){let e=performance.now()-d;h.textContent=`🚀 Liftoff!`,v.classList.add(`launch`),N.liftoff(),o.later(()=>j(e,!0),Wt)}function j(t,r){let a=x(`quiz`,n.best(`quiz`));if(r){let e=n.record(`quiz`,{score:0,timeMs:t});N.fanfare(e.isNewBest),a=b(`quiz`,e)}let o=r?`<p class="finish-title">🚀 Liftoff!</p>
           <p class="finish-score"><strong>${f(t)}</strong></p>`:`<p class="finish-title">Game ended</p>
           <p class="finish-score"><strong>${c.progress}%</strong> of the way to launch</p>
           <p>Time: ${f(t)}</p>`;e.innerHTML=`
        <div class="finish-panel ${r?``:`ended`}" role="status">
          ${o}
          <p>Best streak: <strong>${c.bestStreak}</strong></p>
          <p class="finish-time">${c.correctCount} of ${c.answeredCount} correct</p>
          ${a}
          ${L(u.changes)}
          <button class="primary-button" type="button">${i?.label??`Play again`}</button>
        </div>
      `;let s=e.querySelector(`button`);s.addEventListener(`click`,i?.onNext??l),s.focus()}E(),T(),k()}return c(),s}var Kt=.7,qt={tower:20,wall:10},Jt={hits:0,blocked:0,shielded:0},Yt=e=>e===`player`?`bot`:`player`,Xt=class{castles={player:{lives:5,coins:0,towers:0,walls:0,defending:!1},bot:{lives:5,coins:0,towers:0,walls:0,defending:!1}};get outcome(){return this.castles.bot.lives===0?`won`:this.castles.player.lives===0?`lost`:`playing`}answer(e,t){let n=this.castles[e];t?n.coins+=10:n.lives=Math.max(0,n.lives-1)}canBuild(e,t){return this.castles[e].coins>=qt[t]}build(e,t){if(!this.canBuild(e,t))throw Error(`Not enough coins for a ${t}.`);let n=this.castles[e];n.coins-=qt[t],t===`tower`?n.towers++:n.walls++}defend(e){this.castles[e].defending=!0}stand(e){this.castles[e].coins+=10}fireTowers(e){let t=this.castles[Yt(e)],n=this.castles[e].towers;if(t.defending)return{...Jt,shielded:n};let r=Math.min(n,t.walls),i=Math.min(n-r,t.lives);return t.walls-=r,t.lives-=i,{hits:i,blocked:r,shielded:0}}playBotTurn(e){this.answer(`bot`,e);let t=Jt;return e&&(this.canBuild(`bot`,`tower`)&&this.build(`bot`,`tower`),t=this.fireTowers(`bot`)),this.castles.player.defending=!1,t}},Zt=`http://www.w3.org/2000/svg`,Qt=800,$t=250,en=[150,195,240,285],tn=[325,343,361],nn=70,rn=170,an=178,on=385,sn=.6,cn=[{x:150,y:52,size:1},{x:430,y:34,size:.7},{x:650,y:70,size:1.2}],ln=[30,118,176,262,331,408,447,529,603,668,742,781],un=1100,R=(e,t)=>e===`player`?t:Qt-t,dn=e=>e===`player`?`bot`:`player`;function fn(e,t,n,r){let i=n/(r*2-1);return Array.from({length:r},(n,r)=>`<rect x="${e+r*i*2}" y="${t-9}" width="${i}" height="10" />`).join(``)}function pn(e,t,n,r){let i=Math.floor(r/16);return Array.from({length:i},(r,i)=>{let a=t+(i+1)*16,o=i%2==0?0:10,s=Array.from({length:Math.floor(n/20)},(t,n)=>`<path d="M${e+o+n*20} ${a-16}V${a}" />`).join(``);return`<path d="M${e} ${a}H${e+n}" />${s}`}).join(``)}function mn(e,t){return`<ellipse class="ground-shadow" cx="${e}" cy="253" rx="${t}" ry="6" />`}function hn({x:e,y:t,size:n}){return`
    <g class="scene-cloud">
      <ellipse cx="${e}" cy="${t}" rx="${44*n}" ry="${13*n}" />
      <ellipse cx="${e-16*n}" cy="${t-9*n}" rx="${18*n}" ry="${12*n}" />
      <ellipse cx="${e+14*n}" cy="${t-12*n}" rx="${22*n}" ry="${15*n}" />
    </g>
  `}function gn(e,t){let n=264+t%3*11;return`<path class="grass-tuft" d="M${e} ${n}l-4 -8M${e} ${n}v-10M${e} ${n}l4 -8" />`}function _n(e){let t=e===`bot`?`url(#duel-stone-mirrored)`:`url(#duel-stone)`;return`
    <g class="scene-castle" data-side="${e}" ${e===`bot`?`transform="translate(${Qt},0) scale(-1,1)"`:``}>
      ${mn(70,66)}
      <g class="stone" fill="${t}">
        <rect x="16" y="120" width="30" height="130" />
        <rect x="94" y="120" width="30" height="130" />
        <rect x="40" y="150" width="60" height="100" />
        ${fn(16,120,30,3)}${fn(94,120,30,3)}${fn(40,150,60,4)}
      </g>
      <g class="stone-lines">
        ${pn(16,120,30,130)}${pn(94,120,30,130)}${pn(40,150,60,100)}
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
  `}function vn(e){return`<ellipse class="scene-shield" data-side="${e}" cx="${R(e,190)}" cy="${$t}"
    rx="195" ry="170" hidden />`}function yn(){return`
    <svg class="duel-scene" viewBox="0 0 ${Qt} 300" role="img"
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
      <rect width="${Qt}" height="300" fill="url(#duel-sky)" />
      ${cn.map(hn).join(``)}
      <path class="hills-far" d="M0 215C150 150 300 195 430 165S680 150 800 200V250H0Z" />
      <path class="hills" d="M0 250C120 195 240 225 360 208S620 195 800 240V250H0Z" />
      <rect y="${$t}" width="${Qt}" height="50" fill="url(#duel-grass)" />
      ${ln.map(gn).join(``)}
      ${_n(`player`)}${_n(`bot`)}
      <g class="scene-buildings"></g>
      ${vn(`player`)}${vn(`bot`)}
      <g class="scene-effects"></g>
    </svg>
  `}function bn(e){let t=e-13;return`
    <g class="scene-tower">
      ${mn(e,20)}
      <g class="stone" fill="url(#duel-stone)">
        <rect x="${t}" y="188" width="26" height="62" />
        ${fn(t-3,188,32,3)}
      </g>
      <g class="stone-lines">${pn(t,188,26,62)}</g>
      <rect class="window" x="${e-3}" y="200" width="6" height="14" rx="3" />
    </g>
  `}function xn(e){return`
    <g class="scene-wall">
      ${mn(e,10)}
      <rect class="stone" fill="url(#duel-stone)" x="${e-7}" y="220" width="14" height="30" />
      <g class="stone-lines">${pn(e-7,220,14,30)}</g>
    </g>
  `}function Sn(e,t){let n=en.slice(0,t.towers).map(t=>bn(R(e,t))),r=tn.slice(0,t.walls).map(t=>xn(R(e,t)));return[...n,...r].join(``)}function Cn(e,t){let{player:n,bot:r}=t.castles;e.querySelector(`.scene-buildings`).innerHTML=Sn(`player`,n)+Sn(`bot`,r);for(let n of[`player`,`bot`]){let{lives:r,defending:i}=t.castles[n];e.querySelector(`.scene-shield[data-side="${n}"]`).toggleAttribute(`hidden`,!i);let a=e.querySelector(`.scene-castle[data-side="${n}"]`);for(let e of a.querySelectorAll(`.damage`))e.classList.toggle(`shown`,r<=Number(e.dataset.at))}}function wn(e,t){let n=document.createElementNS(Zt,e);for(let[e,r]of Object.entries(t))n.setAttribute(e,String(r));return n}var Tn=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;function En(e,t,n){let r=e.querySelector(`.scene-effects`),i=wn(`circle`,{class:`impact-flash`,cx:t,cy:n,r:16});r.append(i),i.animate([{opacity:1,r:`6px`},{opacity:0,r:`30px`}],350).onfinish=()=>i.remove();for(let e=0;e<8;e++){let i=wn(`rect`,{class:`impact-chip`,x:t,y:n,width:4,height:4});r.append(i);let a=Math.PI*2*e/8,o=26+e%3*12,s=`translate(${Math.cos(a)*o}px, ${Math.sin(a)*o+16}px)`;i.animate([{transform:`none`,opacity:1},{transform:s,opacity:0}],450).onfinish=()=>i.remove()}}function Dn(e,t,n,r){let i=wn(`g`,{class:`scene-arrow`});i.innerHTML=`<path class="arrow-shaft" d="M-16 0H14" />
    <path class="arrow-head" d="M18 0L10 -4V4Z" />
    <path class="arrow-fletching" d="M-16 0L-22 -4M-16 0L-22 4" />`,e.querySelector(`.scene-effects`).append(i);let a=70+Math.abs(n.x-t.x)*.12,o=e=>({x:t.x+(n.x-t.x)*e,y:t.y+(n.y-t.y)*e-a*4*e*(1-e)}),s=Array.from({length:17},(e,t)=>{let n=t/16,r=o(n),i=o(n+.01),a=Math.atan2(i.y-r.y,i.x-r.x)*180/Math.PI;return{transform:`translate(${r.x}px, ${r.y}px) rotate(${a}deg)`}});i.style.visibility=`hidden`;let c=i.animate(s,{duration:750,delay:r,easing:`linear`});window.setTimeout(()=>{i.style.visibility=``},r),c.onfinish=()=>{i.remove(),En(e,n.x,n.y)}}function On(e,t,n){let r=dn(t);[...Array(n.shielded).fill(on),...Array(n.blocked).fill(tn[0]),...Array(n.hits).fill(nn)].forEach((n,i)=>{let a=en[i%en.length],o=n===nn?rn:226,s={x:R(r,n),y:o};Tn()?En(e,s.x,s.y):Dn(e,{x:R(t,a),y:an},s,i*220)})}function kn(e,t){let n=R(dn(t),150),r=R(t,100),i=t===`player`?-1:1,a=wn(`g`,{class:`scene-enemy`});a.innerHTML=`<g transform="scale(${i*sn},${sn})">
    <circle cx="0" cy="-30" r="6" /><path d="M0 -24V-10M0 -10L-6 0M0 -10L6 0M0 -20L10 -14" />
    <path class="enemy-sword" d="M10 -14L20 -24" /></g>`,e.querySelector(`.scene-effects`).append(a);let o=Array.from({length:13},(e,t)=>({transform:`translate(${n+(r-n)*t/12}px, ${258-(t%2==0?0:4)}px)`}));a.animate(o,un).onfinish=()=>{a.remove(),En(e,r,210)}}var An=`Tower Duel`,jn=1e3,Mn=2200,Nn=900,Pn=1e3,Fn=900,In=1600,Ln=`Right answers earn 10 coins and an action. Wrong answers let an
  enemy through, which costs a life. Last castle with a life wins.`,Rn={player:`🧑‍🎓 You`,bot:`🤖 Quiz Bot`};function zn(e){return`
    <div class="duel-status" data-side="${e}">
      <p class="fighter-name">${Rn[e]}</p>
      <p class="duel-lives"></p>
      <p class="duel-stats"></p>
    </div>
  `}var Bn=(e,t)=>`${e} ${t}${e===1?``:`s`}`;function Vn(e,t){let n=e===`player`?`Your`:`Quiz Bot's`,r=[t.blocked>0?`${Bn(t.blocked,`wall`)} broke stopping a shot.`:``,t.shielded>0?`The shield stopped ${Bn(t.shielded,`shot`)}.`:``].filter(Boolean).join(` `),i=t.hits===1?`1 life`:`${t.hits} lives`;return t.hits>0?`${n} towers took ${i}. ${r}`.trim():r}function Hn(e){let t=e.hits+e.blocked+e.shielded;return 750+Math.max(0,t-1)*220}function Un(e,t,n,r){let i=re(t);if(i.length<4)return Ae(e,An,i.length),()=>{};let a=new Te;function o(){a.stop();let t=F(i,r);if(Me(e,r,An,t.length,1))return;let s=new Xt,c=I(r),l=new oe(t),u=performance.now(),d=0,p=0;e.innerHTML=`
      <p class="instructions duel-rules">${Ln}</p>
      <details class="duel-help">
        <summary>How to play</summary>
        ${Ln}
      </details>
      ${yn()}
      <div class="duel-statuses">${zn(`player`)}${zn(`bot`)}</div>
      ${x(`tower`,n.best(`tower`))}
      <div class="battle-stage"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <span></span>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.battle-stage`),h=e.querySelector(`.quiz-message`),g=e.querySelector(`.duel-scene`),_=t=>e.querySelector(`.duel-status[data-side="${t}"]`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{a.stop(),k(`ended`)});function v(e,t){h.textContent=e,h.dataset.kind=t}function y(){Cn(g,s);for(let e of[`player`,`bot`]){let{lives:t,coins:n,towers:r,walls:i}=s.castles[e],a=_(e),o=a.querySelector(`.duel-lives`);o.textContent=`❤️`.repeat(t)+`🖤`.repeat(5-t),o.setAttribute(`aria-label`,`${t} of 5 lives`),a.querySelector(`.duel-stats`).textContent=`🪙 ${n} · 🗼 ${r} · 🧱 ${i}`}}function S(){return s.outcome!==`playing`&&(a.stop(),k(s.outcome),!0)}function C(){if(r.isPracticing&&F(t,r).length===0){a.stop(),je(e,r);return}let n=ae(i,xe(l,t,r));h.textContent=``,m.innerHTML=`
        <p class="question-label"><strong>Your turn.</strong> Which term matches?</p>
        <p class="question-definition"></p>
        <div class="quiz-choices"></div>
      `,m.querySelector(`.question-definition`).textContent=n.answer.definition;let o=m.querySelector(`.quiz-choices`);Oe(o,n.choices,e=>{ke(o,n.answer,e);let t=e.id===n.answer.id;d++,t?(s.answer(`player`,!0),y(),p++,c.tracker.right(n.answer.id),N.hit(),v(`Right! +10 coins.`,`correct`),a.later(w,jn)):(c.tracker.miss(n.answer.id),N.hurt(),kn(g,`player`),v(`An enemy got through! You lose a life and your action. The answer was "${n.answer.term}".`,`wrong`),s.answer(`player`,!1),a.later(y,un),a.later(()=>S()||D(),Mn))})}function w(){let{coins:e,towers:t}=s.castles.player;h.textContent=``,m.innerHTML=`
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
            ⚔️ Attack<small>${t>0?`Fire ${Bn(t,`tower`)}`:`Build a tower first`}</small>
          </button>
          <button class="quiz-choice" type="button" data-action="defend">
            🛡 Defend<small>Shield stops every arrow next turn</small>
          </button>
          <button class="quiz-choice" type="button" data-action="stand">
            🧍 Stand<small>Hold fire, +10 coins</small>
          </button>
        </div>
      `;for(let e of m.querySelectorAll(`[data-building]`)){let t=e.dataset.building;e.disabled=!s.canBuild(`player`,t),e.addEventListener(`click`,()=>{s.build(`player`,t),y(),w()})}let n=e=>m.querySelector(`[data-action="${e}"]`);n(`attack`).disabled=t===0,n(`attack`).addEventListener(`click`,E),n(`defend`).addEventListener(`click`,()=>{s.defend(`player`),y(),T(`🛡 Shield up! It stops every arrow on Quiz Bot's next turn.`)}),n(`stand`).addEventListener(`click`,()=>{s.stand(`player`),y(),T(`🧍 You hold your ground and collect 10 bonus coins.`)})}function T(e){m.innerHTML=``,v(e,`info`),a.later(D,Pn)}function E(){m.innerHTML=``,h.textContent=``;let e=s.fireTowers(`player`);On(g,`player`,e),a.later(()=>{y(),e.hits>0&&N.hit(),v(Vn(`player`,e),`correct`)},Hn(e)),a.later(()=>S()||D(),Hn(e)+Nn)}function D(){m.innerHTML=`<p class="question-label">🤖 Quiz Bot is answering…</p>`,h.textContent=``,a.later(O,Fn)}function O(){let e=Math.random()<Kt,t=s.castles.bot.towers,n=s.castles.player.defending,r=s.playBotTurn(e);m.innerHTML=``,e?(s.castles.player.defending=n,Cn(g,s),On(g,`bot`,r),v(`Quiz Bot got it right.${s.castles.bot.towers>t?` It built a tower.`:``}`,`info`),a.later(()=>{s.castles.player.defending=!1,y(),r.hits>0&&N.hurt();let e=Vn(`bot`,r);e&&v(e,r.hits>0?`wrong`:`info`)},Hn(r)),a.later(()=>S()||C(),Hn(r)+In)):(kn(g,`bot`),v(`Quiz Bot got it wrong, so your enemy got through!`,`correct`),a.later(()=>{y(),N.hit()},un),a.later(()=>S()||C(),In))}function k(t){let r={won:`🏆 Your castle stands!`,lost:`💥 Quiz Bot wins`,ended:`Duel ended`,playing:`Duel ended`},i=performance.now()-u,{player:a,bot:l}=s.castles,m=x(`tower`,n.best(`tower`));if(t===`won`){let e=n.record(`tower`,{score:a.lives,timeMs:i});N.fanfare(e.isNewBest),m=b(`tower`,e)}else t===`lost`&&N.lose();e.innerHTML=`
        <div class="finish-panel ${t===`won`?``:`ended`}" role="status">
          <p class="finish-title">${r[t]}</p>
          <p>Your lives: <strong>${a.lives}</strong> · Quiz Bot's lives: <strong>${l.lives}</strong></p>
          <p class="finish-time">${p} of ${d} right · Time: ${f(i)}</p>
          ${m}
          ${L(c.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let h=e.querySelector(`button`);h.addEventListener(`click`,o),h.focus()}y(),C()}return o(),()=>a.stop()}function Wn(e){return e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,` `).trim()}function Gn(e,t){let n=Array.from({length:e.length+1},(e,n)=>Array.from({length:t.length+1},(e,t)=>n===0?t:t===0?n:0));for(let r=1;r<=e.length;r++)for(let i=1;i<=t.length;i++){let a=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+a),r>1&&i>1&&e[r-1]===t[i-2]&&e[r-2]===t[i-1]&&(n[r][i]=Math.min(n[r][i],n[r-2][i-2]+1))}return n[e.length][t.length]}function Kn(e,t){let n=Wn(e),r=Wn(t);return n===``?`wrong`:n===r?`exact`:r.length>=5&&Gn(n,r)<=1?`close`:`wrong`}var qn=class{cards;index=0;correctCount=0;constructor(e,t=Math.random){this.cards=o(a(e),t).slice(0,10)}get current(){return this.cards[this.index]}get isFinished(){return this.index>=this.cards.length}answer(e){if(this.isFinished)throw Error(`The round is already over.`);let t=Kn(e,this.current.term);return t!==`wrong`&&this.correctCount++,this.index++,t}};function Jn(e,t,n,r,i){let o=F(t,r);if(Me(e,r,`Type It`,a(o).length,1))return;if(a(o).length===0){e.innerHTML=`
      <p class="empty-message">
        Type It needs at least 1 card with a term and a definition.
        Go to <a href="#write">Add cards</a> to add some.
      </p>
    `;return}let s=new qn(o),c=I(r),l=performance.now(),u=()=>Jn(e,t,n,r,i);e.innerHTML=`
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
  `;let d=e.querySelector(`.type-progress`),p=e.querySelector(`.question-definition`),m=e.querySelector(`.type-form`),h=e.querySelector(`.type-answer`),g=e.querySelector(`.type-submit`),_=e.querySelector(`.quiz-message`),v=()=>r.isPracticing&&F(t,r).length===0,y=!1;function S(e,t){_.textContent=e,_.dataset.kind=t}function C(e){d.textContent=`Question ${e} of ${s.cards.length} · ${s.correctCount} correct`}function w(){C(s.index+1),p.textContent=s.current.definition,_.textContent=``,h.value=``,h.readOnly=!1,h.classList.remove(`correct`,`wrong`),g.textContent=`Check`,y=!1,h.focus()}function T(){let e=s.current,t=s.answer(h.value);t===`wrong`?c.tracker.miss(e.id):c.tracker.right(e.id),h.readOnly=!0,h.classList.add(t===`wrong`?`wrong`:`correct`),t===`exact`?(N.chime(),S(`✓ Correct!`,`correct`)):t===`close`?(N.chime(),S(`✓ Close enough! It's spelled "${e.term}".`,`correct`)):(N.buzz(),S(`✗ The answer was "${e.term}".`,`wrong`)),C(s.index),g.textContent=v()?`Finish 🎉`:s.isFinished?`See results`:`Next →`,y=!0,g.focus()}function E(t){let r=performance.now()-l,a=x(`type`,n.best(`type`));if(t){let e=n.record(`type`,{score:s.correctCount,timeMs:r,outOf:s.cards.length});N.fanfare(e.isNewBest),a=b(`type`,e)}e.innerHTML=`
      <div class="finish-panel ${t?``:`ended`}" role="status">
        <p class="finish-title">${t?`Round complete!`:`Round ended`}</p>
        <p class="finish-score">
          <strong>${s.correctCount}</strong> / ${t?s.cards.length:s.index} correct
        </p>
        <p class="finish-time">Time: ${f(r)}</p>
        ${a}
        ${L(c.changes)}
        <button class="primary-button" type="button">${i?.label??`Play again`}</button>
      </div>
    `;let o=e.querySelector(`button`);o.addEventListener(`click`,i?.onNext??u),o.focus()}m.addEventListener(`submit`,t=>{t.preventDefault(),y?v()?je(e,r,i):s.isFinished?E(!0):w():T()}),e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{E(s.isFinished)}),w()}var Yn=`study-games.decks`,Xn=`study-games.current-deck`,Zn=`study-games.draft`,Qn=`study-games.best-scores`,$n=`study-games.sound-on`,er=`study-games.weak-cards`,tr=`study-games.weak-only`,nr=`study-games.cards`;function rr(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.term==`string`&&typeof t.definition==`string`}function ir(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.name!=`string`||!Array.isArray(t.cards)?null:{id:t.id,name:t.name,cards:t.cards.filter(rr)}}function z(e,t){try{let n=e.getItem(t);return n===null?null:JSON.parse(n)}catch{return null}}function B(e,t,n){try{return e.setItem(t,JSON.stringify(n)),!0}catch{return!1}}function ar(e=localStorage){let t=z(e,Yn),n=Array.isArray(t)?t.map(ir).filter(e=>e!==null):[];if(n.length>0)return n;let r=z(e,nr);return Array.isArray(r)?[le(ce,r.filter(rr))]:[tt()]}function or(e,t=localStorage){return B(t,Yn,e)}function sr(e=localStorage){let t=z(e,Xn);return typeof t==`string`?t:null}function cr(e,t=localStorage){return B(t,Xn,e)}function lr(e=localStorage){let t=z(e,Zn);return rr(t)?t:null}function ur(e,t=localStorage){return B(t,Zn,e)}function dr(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.score==`number`&&typeof t.timeMs==`number`&&(t.outOf===void 0||typeof t.outOf==`number`)}function fr(e=localStorage){let t=z(e,Qn);if(typeof t!=`object`||!t||Array.isArray(t))return{};let n={};for(let[e,r]of Object.entries(t))if(typeof r==`object`&&r)for(let t of m){let i=r[t];dr(i)&&(n[e]={...n[e],[t]:i})}return n}function pr(e,t=localStorage){return B(t,Qn,e)}function mr(e=localStorage){return z(e,$n)===!0}function hr(e,t=localStorage){return B(t,$n,e)}function gr(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function _r(e=localStorage){let t=z(e,er);if(!gr(t))return{};let n={};for(let[e,r]of Object.entries(t))if(gr(r))for(let[t,i]of Object.entries(r))Number.isInteger(i)&&i>=0&&(n[e]={...n[e],[t]:i});return n}function vr(e,t=localStorage){return B(t,er,e)}function yr(e=localStorage){return z(e,tr)===!0}function br(e,t=localStorage){return B(t,tr,e)}var xr=[`home`,`session`,`write`,`cards`,`match`,`quiz`,`battle`,`type`,`tower`,`decks`],Sr=document.querySelector(`#deck-picker`),Cr=document.querySelector(`#sound-toggle`),wr=document.querySelector(`#weak-only`),Tr=document.querySelector(`#weak-count`),Er=document.querySelector(`#match-game`),Dr=document.querySelector(`#match-progress`),Or=document.querySelector(`#quiz-game`),kr=document.querySelector(`#battle-game`),Ar=document.querySelector(`#type-game`),jr=document.querySelector(`#tower-game`),Mr=document.querySelector(`#home-content`),Nr=document.querySelector(`#session-game`),Pr=document.querySelector(`#decks-list`),Fr=document.querySelector(`#decks-message`),Ir=document.querySelectorAll(`a[data-view]`),Lr=document.querySelector(`#card-count`),Rr=document.querySelector(`#write-deck-name`),zr=document.querySelector(`#draft-slot`),Br=document.querySelector(`#save-card`),Vr=document.querySelector(`#write-message`),Hr=document.querySelector(`#import-file`),Ur=document.querySelector(`#file-import-message`),Wr=document.querySelector(`#file-import-slot`),Gr=document.querySelector(`#cards-title`),Kr=document.querySelector(`#card-grid`),qr=document.querySelector(`#import-button`),Jr=document.querySelector(`#import-slot`),Yr=document.querySelector(`#empty-message`),Xr=document.querySelector(`#no-weak-message`),Zr=document.querySelector(`#graduate-count`),Qr=document.createElement(`p`);Qr.className=`practice-banner`;var V=document.querySelector(`#save-status`),H=`Couldn't save. Your browser may be blocking storage.`,$r=`Get one right 3 times in a row to clear it.`;Zr.textContent=`3`;var U=ar(),W=me(U,sr()).id,G=lr()??e(),K=fr(),q=_r(),J=yr(),Y=()=>me(U,W),ei=()=>be(q,W,Y().cards);function ti(e){return or(e)?(U=e,!0):!1}function ni(e){return ti(pe(U,W,e))}function ri(e=J){if(e)return{best:()=>void 0,record:(e,t)=>({scores:K,best:t,isNewBest:!1,practice:!0})};let t=W;return{best:e=>g(K,t,e),record:(e,n)=>{let r=_(K,t,e,n);return K=r.scores,pr(K),r}}}function ii(e=J){let t=W,n=e=>{q=e,vr(q),ai()};return{isPracticing:e,isWeak:e=>ye(q,t,e)!==void 0,miss:e=>n(he(q,t,e)),right:e=>n(ge(q,t,e)),stopPracticing:()=>oi(!1)}}function ai(){let e=ei().length;wr.checked=J,wr.disabled=e===0&&!J,Tr.textContent=String(e),Tr.setAttribute(`aria-label`,`${P(e)} to practice`),wr.parentElement.title=e===0?`Cards you miss in a game show up here.`:`Play and review only the cards you've missed. ${$r}`,Qr.textContent=`🎯 Practicing ${P(e)} you've missed. ${$r}`,Qr.hidden=e===0}function oi(e){J=e,br(J),ai(),Ti(Ci())}wr.addEventListener(`change`,()=>oi(wr.checked));function X(){let e=U.map(e=>{let t=document.createElement(`option`);return t.value=e.id,t.textContent=e.name,t.selected=e.id===W,t});Sr.replaceChildren(...e);let t=Y().cards.length;Lr.textContent=String(t),Lr.setAttribute(`aria-label`,P(t)),ai()}function si(e){W=e,cr(e),X(),Ti(Ci())}Sr.addEventListener(`change`,()=>si(Sr.value));function ci(){let e=ee();Cr.textContent=e?`🔊`:`🔇`,Cr.setAttribute(`aria-pressed`,String(e)),Cr.setAttribute(`aria-label`,e?`Sound on`:`Sound off`),Cr.title=e?`Sound is on. Click to mute.`:`Sound is off. Click to turn on.`}Cr.addEventListener(`click`,()=>{j(!ee()),hr(ee()),ci(),N.chime()}),j(mr());function Z(e,t){Vr.textContent=e,Vr.classList.toggle(`error`,t)}function li(){Rr.textContent=Y().name;let e=We(G,{onEdit:(e,t)=>{G={...G,[e]:t},ur(G),Z(``,!1)}});zr.replaceChildren(e),Ge(zr)}function ui(){let t=zr.querySelector(`.card`),n=i(G);if(n===`term`){Z(`Type a term before saving.`,!0),Ue(t,`term`);return}if(n===`definition`){Z(`Flip the card and add a definition before saving.`,!0),Ue(t,`definition`);return}if(!ni([...Y().cards,G])){Z(H,!0);return}G=e(),ur(G),X();let r=Y();Z(`Saved to ${r.name}! It has ${P(r.cards.length)}.`,!1),li(),Ue(zr.querySelector(`.card`),`term`)}Br.addEventListener(`click`,ui);function di(){Wr.replaceChildren(),Ur.textContent=``}Hr.addEventListener(`change`,async()=>{let e=Hr.files?.[0];if(Hr.value=``,!e)return;di();let t=await Dt(e);if(`error`in t){Ur.textContent=t.error;return}let n=Y();At(Wr,{deckName:n.name,existingCards:n.cards,fromFile:{name:e.name,text:t.text},onAdd:t=>{if(!ni([...Y().cards,...t])){Ur.textContent=H;return}di(),X();let n=Y().name;Z(`Added ${P(t.length)} from ${e.name} to ${n}!`,!1)},onClose:di}),Wr.scrollIntoView({behavior:`smooth`,block:`start`})});function fi(e){let t=ni(e);V.textContent=t?`All changes saved`:H,V.classList.toggle(`error`,!t)}function pi(e,t){let i=Y().cards,a=i.find(e=>e.id===t);(!a||r(a)||confirm(`Delete this card from your deck?`))&&(fi(n(i,t)),q=_e(q,W,t),vr(q),e.remove(),X(),gi())}function mi(e){let t=ye(q,W,e);return t===void 0?void 0:{right:t,needed:3}}function hi(){return J?ei():Y().cards}function gi(){let e=Y().cards.length===0;Yr.hidden=!e,Xr.hidden=!J||e||hi().length>0}function _i(){Jr.replaceChildren(),qr.hidden=!1}qr.addEventListener(`click`,()=>{qr.hidden=!0;let e=Y();At(Jr,{deckName:e.name,existingCards:e.cards,onAdd:e=>{ni([...Y().cards,...e])?(X(),vi(),V.textContent=`Added ${P(e.length)} to ${Y().name}.`,V.classList.remove(`error`)):(V.textContent=H,V.classList.add(`error`))},onClose:_i})});function vi(){_i();let e=Y();Gr.textContent=J?`${e.name}: weak cards`:e.name;let n=hi().map(e=>{let n=We(e,{onEdit:(n,r)=>fi(t(Y().cards,e.id,n,r)),onDelete:()=>pi(n,e.id),weakProgress:mi(e.id)});return n});Kr.replaceChildren(...n),Ge(Kr),gi(),V.textContent=``}function Q(e){Fr.textContent=e}function yi(){it(Pr,{decks:U,currentDeckId:W,onSelect:e=>{si(e),Q(`Now using ${Y().name}.`)},onCreate:e=>{let t=ue(U,e);if(t)return t;let n=le(e);return ti([...U,n])?(si(n.id),Q(`Created ${n.name}. It's now your current deck.`),null):H},onRename:(e,t)=>ue(U,t,e)||(ti(de(U,e,t))?(X(),yi(),Q(`Renamed to ${t.trim()}.`),null):H),onDelete:e=>{let t=me(U,e).name;ti(fe(U,e))?(K=v(K,e),pr(K),q=ve(q,e),vr(q),si(Y().id),Q(`Deleted ${t}.`)):Q(H)},onAddSample:()=>{let e=tt();ti([...U,e])?(si(e.id),Q(`Added ${e.name}. It's now your current deck.`)):Q(H)},onExport:e=>{Qe(e),Q(`Exported ${P(e.cards.length)} to ${Ze(e.name)}. Check your Downloads.`)}})}function bi(){ft(Mr,{decks:U,currentDeck:Y(),isNewVisitor:st(U,K,q),weakCountFor:e=>be(q,e.id,e.cards).length,onSelectDeck:si,onTrySample:()=>{location.hash=`match`}})}function xi(e,t,{game:n,practice:r},i,a){let o=Y().cards,s=ri(r);return n.view===`match`?(Vt(e,t,o,s,i,a),()=>{}):n.view===`quiz`?Gt(e,o,s,i,a):(Jn(e,o,s,i,a),()=>{})}function Si(){return _t(Nr,{deck:Y().cards,weakCount:ei().length,trackerFor:({practice:e})=>ii(e),runGame:xi,onRestart:()=>{$(),$=Si()}})}function Ci(){let e=location.hash.slice(1);return xr.find(t=>t===e)??`home`}var $=()=>{};function wi(e){return J?ei().length===0?(e.innerHTML=`
      <p class="empty-message">
        No weak cards to practice in this deck. Miss a card in any game and it shows up here.
        Or turn off <strong>Weak cards only</strong> in the sidebar to play the whole deck.
      </p>
    `,!1):(e.before(Qr),!0):!0}function Ti(e){$(),$=()=>{};for(let e of[Er,Or,kr,Ar,jr,Nr])e.replaceChildren();Dr.textContent=``;for(let t of xr)document.querySelector(`#${t}-view`).hidden=t!==e;for(let t of Ir){let n=t.dataset.view===e;t.classList.toggle(`current`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)}let t=Y().cards;Qr.remove(),e===`home`?bi():e===`session`?$=Si():e===`write`?(Z(``,!1),di(),li()):e===`cards`?vi():e===`match`?wi(Er)&&Vt(Er,Dr,t,ri(),ii()):e===`quiz`?wi(Or)&&($=Gt(Or,t,ri(),ii())):e===`battle`?wi(kr)&&($=ze(kr,t,ri(),ii())):e===`type`?wi(Ar)&&Jn(Ar,t,ri(),ii()):e===`tower`?wi(jr)&&($=Un(jr,t,ri(),ii())):(Q(``),yi())}window.addEventListener(`hashchange`,()=>Ti(Ci())),or(U),X(),ci(),Ti(Ci());