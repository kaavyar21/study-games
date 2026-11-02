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
    `,n.querySelector(`button`).addEventListener(`click`,t.onAddSample),e.append(n)}}var L=[{view:`match`,title:`Match`,icon:`🧩`},{view:`quiz`,title:`Speed Quiz`,icon:`⚡`},{view:`type`,title:`Type It`,icon:`✍️`},{view:`battle`,title:`Battle`,icon:`⚔️`},{view:`tower`,title:`Tower Duel`,icon:`🏰`}],$e=4;function et(e,t,n){return e.length===1&&e[0].name===`Sample: World Capitals`&&Object.keys(t).length===0&&Object.keys(n).length===0}function tt(e,t,n){let r=$e-e.cards.length;if(r>0)return{kind:`add-cards`,reason:`Add ${r===1?`1 more card`:`${r} more cards`} to start playing.`};if(n>0){let e=L.find(({view:e})=>e===`type`);return{kind:`practice`,game:e,reason:`Practice ${n===1?`1 card`:`${n} cards`} you've missed in ${e.title}.`}}let i=L.find(({view:n})=>!t[e.id]?.[n]);return i?{kind:`play`,game:i,reason:`Next up: ${i.title}.`}:{kind:`play`,game:L[0],reason:`You've won every game here. Back to ${L[0].title}!`}}function nt(e,t){e.innerHTML=`
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
  `,e.querySelector(`.home-try-sample`).addEventListener(`click`,()=>t.onStartGame(L[0],!1))}function rt(e,t){let n=e.id===t.currentDeck.id,r=t.weakCountFor(e),i=document.createElement(`article`);return i.className=`deck-tile${n?` current`:``}`,i.innerHTML=`
    <button class="deck-select" type="button" aria-pressed="${n}">
      <span class="deck-name"></span>
      <span class="deck-card-count">${N(e.cards.length)}</span>
      ${r>0?`<span class="home-weak">🎯 ${r} to practice</span>`:``}
      ${n?`<span class="current-badge">Current</span>`:``}
    </button>
  `,i.querySelector(`.deck-name`).textContent=e.name,i.querySelector(`.deck-select`).addEventListener(`click`,()=>t.onSelectDeck(e.id)),i}function it(e){let{currentDeck:t,scores:n,weakCountFor:r,onStartGame:i}=e,a=tt(t,n,r(t)),o=document.createElement(`section`);o.className=`home-study`,o.setAttribute(`aria-label`,`Study this deck`),o.innerHTML=`
    <p class="home-study-reason"></p>
    <div class="home-actions"></div>
    <p class="home-jump-label">Or jump into a game</p>
    <div class="home-games"></div>
  `,o.querySelector(`.home-study-reason`).textContent=a.reason;let s=o.querySelector(`.home-actions`);if(a.kind===`add-cards`)s.innerHTML=`<a class="primary-button" href="#write">+ Add cards</a>`;else{let e=document.createElement(`button`);e.type=`button`,e.className=`primary-button`,e.textContent=`▶ Start studying`,e.addEventListener(`click`,()=>i(a.game,a.kind===`practice`)),s.append(e)}let c=L.map(e=>{let t=document.createElement(`a`);return t.className=`secondary-button`,t.href=`#${e.view}`,t.textContent=`${e.icon} ${e.title}`,t});return o.querySelector(`.home-games`).append(...c),o}function at(e,t){if(t.isNewVisitor){nt(e,t);return}let n=document.createElement(`h1`);n.id=`home-title`,n.textContent=`Your decks`;let r=document.createElement(`div`);r.className=`deck-grid`,r.append(...t.decks.map(e=>rt(e,t))),e.replaceChildren(n,r,it(t))}var ot=/^(?:[-*•]|\d+[.)])\s+/,st=/\s+[-–—](?:\s+|$)/;function ct(e){let t=e.indexOf(`	`);if(t!==-1)return{index:t,length:1};let n=st.exec(e);if(n)return{index:n.index,length:n[0].length};let r=e.indexOf(`:`);return r===-1?null:{index:r,length:1}}function lt(e){let t=e.replace(/^ +| +$/g,``).replace(ot,``),n=ct(t);return n?[t.slice(0,n.index).trim(),t.slice(n.index+n.length).trim()]:null}var ut=e=>e.trim().toLowerCase();function dt(e,t){let n=new Set(t.map(e=>ut(e.term))),r=new Set,i=[],a=[];for(let t of e.split(/\r?\n/)){let e=t.trim();if(e===``)continue;let o=lt(t);if(!o){a.push({line:e,reason:`No dash, colon, or tab between term and definition`});continue}let[s,c]=o;if(s===``||c===``){a.push({line:e,reason:`Missing a term or a definition`});continue}let l=ut(s);n.has(l)?a.push({line:e,reason:r.has(l)?`Same term as an earlier line`:`Already in this deck`}):(n.add(l),r.add(l),i.push({id:crypto.randomUUID(),term:s,definition:c}))}return{cards:i,skipped:a}}function ft(e){let t=[],n=[],r=``,i=!1;for(let a=0;a<e.length;a++){let o=e[a];i?o===`"`&&e[a+1]===`"`?(r+=`"`,a++):o===`"`?i=!1:r+=o:o===`"`?i=!0:o===`,`?(n.push(r),r=``):o===`
`||o===`\r`?(o===`\r`&&e[a+1]===`
`&&a++,n.push(r),t.push(n),n=[],r=``):r+=o}return(r!==``||n.length>0)&&(n.push(r),t.push(n)),t}var pt=new Set([`term`,`terms`,`word`,`front`,`question`]);function mt(e){let t=ft(e);t.length>0&&pt.has(t[0][0].trim().toLowerCase())&&t.shift();let n=e=>e.replace(/\s+/g,` `).trim();return t.map(e=>e.map(n)).filter(e=>e.some(e=>e!==``)).map(([e,t=``])=>`${e}\t${t}`).join(`
`)}async function ht(e){let t=e.name.toLowerCase(),n=t.endsWith(`.csv`);if(!n&&!t.endsWith(`.txt`)&&!t.endsWith(`.tsv`))return{error:`Can't read “${e.name}”. Choose a .csv or .txt file.`};if(e.size>1e6)return{error:`“${e.name}” is too big. Choose a file under 1 MB.`};let r=await e.text(),i=n?mt(r):r;return i.trim()===``?{error:`“${e.name}” has no cards in it.`}:{text:i}}var gt=10;function _t(e,t,n){if(e.replaceChildren(),t.cards.length===0&&t.skipped.length===0)return;let r=document.createElement(`p`);if(r.className=`import-summary`,r.textContent=t.cards.length>0?`${N(t.cards.length)} ready to add to ${n}`:`No cards to add yet`,e.append(r),t.cards.length>0){let n=document.createElement(`ul`);n.className=`import-card-list`;for(let e of t.cards){let t=document.createElement(`li`),r=document.createElement(`strong`);r.textContent=e.term,t.append(r,` → ${e.definition}`),n.append(t)}e.append(n)}if(t.skipped.length>0){let n=document.createElement(`p`);n.className=`import-skipped-heading`,n.textContent=`${t.skipped.length} ${t.skipped.length===1?`line`:`lines`} skipped:`;let r=document.createElement(`ul`);r.className=`import-skipped-list`;for(let{line:e,reason:n}of t.skipped.slice(0,gt)){let t=document.createElement(`li`),i=document.createElement(`code`);i.textContent=e,t.append(i,` (${n})`),r.append(t)}if(t.skipped.length>gt){let e=document.createElement(`li`);e.textContent=`…and ${t.skipped.length-gt} more`,r.append(e)}e.append(n,r)}}function vt(e,t){e.innerHTML=`
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
  `;let n=e.querySelector(`.import-text`),r=e.querySelector(`.import-preview`),i=e.querySelector(`.import-add`),a={cards:[],skipped:[]},o=()=>{a=dt(n.value,t.existingCards),_t(r,a,t.deckName),i.disabled=a.cards.length===0,i.textContent=a.cards.length>0?`Add ${N(a.cards.length)}`:`Add cards`};n.addEventListener(`input`,o),i.addEventListener(`click`,()=>t.onAdd(a.cards)),e.querySelector(`.import-cancel`).addEventListener(`click`,t.onClose),t.fromFile?(e.querySelector(`#import-title`).textContent=`Import from ${t.fromFile.name}`,e.querySelector(`.instructions`).textContent=`Check the cards below. You can fix any line in the box before adding them.`,n.value=t.fromFile.text,o(),i.focus()):n.focus()}var yt=6,bt=300,xt=300,St=450,Ct=e=>new Promise(t=>setTimeout(t,e));function wt(e,t){let n=document.createElement(`button`);return n.type=`button`,n.className=`match-tile ${t}-tile`,n.dataset.id=e.id,n.textContent=t===`term`?e.term:e.definition,n.setAttribute(`aria-pressed`,`false`),n}function Tt(e,t){let n=document.createElement(`div`);n.className=`match-column`;let r=document.createElement(`h2`);return r.textContent=e,n.append(r,...t),n}function Et(e,t){e.innerHTML=`
    <p class="empty-message">
      Match needs at least 2 cards with both a term and a definition.
      You have ${t}. Go to <a href="#write">Add cards</a> to add more.
    </p>
  `}function Dt(e,t,n,r,i,a){let o=r.record(`match`,{score:t.points,timeMs:n,outOf:t.maxPoints});M.fanfare(o.isNewBest),e.innerHTML=`
    <div class="finish-panel" role="status">
      <p class="finish-title">Round complete!</p>
      <p class="finish-score"><strong>${t.points}</strong> / ${t.maxPoints} points</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${b(`match`,o)}
      ${I(i)}
      <button class="primary-button" type="button">Play again</button>
    </div>
  `;let s=e.querySelector(`button`);s.addEventListener(`click`,a),s.focus()}function Ot(e,t,n,r,i,a){e.innerHTML=`
    <div class="finish-panel ended" role="status">
      <p class="finish-title">Round ended</p>
      <p class="finish-score"><strong>${t.points}</strong> points so far</p>
      <p>${t.matchedCount} of ${t.cards.length} pairs matched</p>
      <p class="finish-time">Time: ${f(n)}</p>
      ${x(`match`,r.best(`match`))}
      ${I(i)}
      <button class="primary-button" type="button">Play again</button>
    </div>
  `;let o=e.querySelector(`button`);o.addEventListener(`click`,a),o.focus()}function kt(e,t,n,r,i){let o=a(P(n,i));if(Ne(e,i,`Match`,o.length,2)){t.textContent=``;return}if(o.length<2){t.textContent=``,Et(e,o.length);return}let l=new p(s(o)),u=Ce(i),d=performance.now(),f=l.cards.map(e=>wt(e,`term`)),m=c(l.cards).map(e=>wt(e,`definition`));e.innerHTML=`
    <p class="instructions">
      Drag each definition onto its term, or click a definition and then its term.
    </p>
    ${x(`match`,r.best(`match`))}
  `;let h=document.createElement(`div`);h.className=`match-board`,h.append(Tt(`Terms`,f),Tt(`Definitions`,m));let g=document.createElement(`p`);g.className=`match-message`,g.setAttribute(`aria-live`,`polite`);let _=document.createElement(`div`);_.className=`quiz-actions`,_.innerHTML=`<span></span><button class="end-game-button" type="button">End game</button>`,e.append(h,g,_);let v=!1;_.querySelector(`.end-game-button`).addEventListener(`click`,()=>{l.isFinished||(v=!0,t.textContent=``,Ot(e,l,performance.now()-d,r,u.changes,()=>kt(e,t,n,r,i)))});let y=null;function b(){t.textContent=`Points: ${l.points} · ${l.matchedCount} of ${l.cards.length} matched`}function S(e,t){g.textContent=e,g.dataset.kind=t}function C(e){y?.setAttribute(`aria-pressed`,`false`),y=e,y?.setAttribute(`aria-pressed`,`true`)}function w(e){return!e.disabled&&e.dataset.busy!==`true`}function T(e,t,n,r){e.style.transition=r?`translate ${bt}ms ease`:`none`,e.style.translate=t===0&&n===0?``:`${t}px ${n}px`}function E(e){let[t=`0`,n=`0`]=e.style.translate.split(` `);return[parseFloat(t)||0,parseFloat(n)||0]}async function D(a,o){C(null);let s=a.dataset.id,c=[a,o];c.forEach(e=>e.dataset.busy=`true`);let f=l.pointsAvailable(s);if(l.tryMatch(s,o.dataset.id)===`wrong`){u.tracker.miss(s),M.buzz(),S(`Not a match. That definition is now worth ${l.pointsAvailable(s)} ${l.pointsAvailable(s)===1?`point`:`points`}.`,`wrong`),c.forEach(e=>e.classList.add(`wrong`)),T(a,0,0,!0),await Ct(St),c.forEach(e=>{e.classList.remove(`wrong`),e.dataset.busy=`false`});return}l.hasMissed(s)||u.tracker.right(s),M.chime(),S(`Match! +${f} ${f===1?`point`:`points`}`,`correct`),b();let[p,m]=E(a),h=a.getBoundingClientRect(),g=o.getBoundingClientRect();a.classList.add(`combining`),T(a,p+g.left-h.left,m+g.top-h.top,!0),c.forEach(e=>e.classList.add(`correct`)),await Ct(bt),c.forEach(e=>e.classList.add(`vanish`)),await Ct(xt),!v&&(k(c),l.isFinished&&i.isPracticing&&P(n,i).length===0?(t.textContent=``,F(e,i)):l.isFinished&&(t.textContent=``,Dt(e,l,performance.now()-d,r,u.changes,()=>kt(e,t,n,r,i))))}let O=new Map;function k(e){let t=[...h.querySelectorAll(`.match-tile`)].filter(t=>!e.includes(t)),n=new Map(t.map(e=>[e,e.getBoundingClientRect().top]));e.forEach(e=>e.remove());let r=!matchMedia(`(prefers-reduced-motion: reduce)`).matches;for(let e of t){let t=n.get(e)-e.getBoundingClientRect().top;if(t===0)continue;let i=O.get(e);if(i){i.y-=t;let[n,r]=E(e);T(e,n,r+t,!1)}else r&&e.animate([{transform:`translateY(${t}px)`},{transform:`none`}],{duration:bt,easing:`ease`})}}let ee=!1;for(let e of[...f,...m])e.addEventListener(`click`,()=>{if(ee||!w(e))return;if(y===null||y===e){C(y===e?null:e);return}let t=e.classList.contains(`term-tile`);t===y.classList.contains(`term-tile`)?C(e):D(t?y:e,t?e:y)});function A(e){let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.term-tile`);return t&&h.contains(t)&&w(t)?t:null}for(let e of m){let t=!1,n=null;function r(e){n?.classList.remove(`drop-target`),n=e,n?.classList.add(`drop-target`)}function i(n,i){let a=i?null:A(n);r(null),e.classList.remove(`dragging`),O.delete(e),t&&(t=!1,ee=!0,setTimeout(()=>ee=!1,0),a?D(e,a):T(e,0,0,!0))}e.addEventListener(`pointerdown`,t=>{t.button===0&&w(e)&&(O.set(e,{x:t.clientX,y:t.clientY}),e.setPointerCapture(t.pointerId))}),e.addEventListener(`pointermove`,n=>{let i=O.get(e);if(!i)return;let a=n.clientX-i.x,o=n.clientY-i.y;!t&&Math.hypot(a,o)<yt||(t||(t=!0,e.classList.add(`dragging`),C(null)),T(e,a,o,!1),r(A(n)))}),e.addEventListener(`pointerup`,e=>i(e,!1)),e.addEventListener(`pointercancel`,e=>i(e,!0))}b()}var At=700,jt=1600,Mt=1200;function Nt(e,t,n,r){let i=ie(t);if(i.length<4)return Me(e,`Speed Quiz`,i.length),()=>{};let a=new De,o=()=>a.stop();function s(){o(),e.innerHTML=`
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
    `;let m=e.querySelector(`.streak-status`),h=e.querySelector(`.streak-bar`),g=e.querySelector(`.streak-fill`),_=e.querySelector(`.rocket`),v=e.querySelector(`.question-definition`),y=e.querySelector(`.quiz-choices`),S=e.querySelector(`.quiz-message`),C=e.querySelector(`.shield-button`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{o(),A(performance.now()-u,!1)});function w(){C.textContent={ready:`🛡️ Use shield (1 per game)`,active:`🛡️ Shield on: your next miss is free`,used:`🛡️ Shield used`}[s.shield],C.disabled=s.shield!==`ready`,C.classList.toggle(`active`,s.shield===`active`),h.classList.toggle(`shielded`,s.shield===`active`)}C.addEventListener(`click`,()=>{s.activateShield(),w()});function T(){g.style.width=`${s.progress}%`,_.style.left=`${s.progress}%`,h.setAttribute(`aria-valuenow`,String(s.progress)),h.classList.toggle(`hot`,s.isHot),s.isHot?m.textContent=`🔥 Hot streak! ×${s.streak}`:s.streak>0?m.textContent=`Streak: ${s.streak}`:m.textContent=`${s.progress}% to launch`,m.classList.toggle(`hot`,s.isHot)}function E(e,t){S.textContent=e,S.dataset.kind=t}let D=8e3;function O(){let n=Se(d,t,r);n?(p=oe(i,n),v.textContent=p.answer.definition,S.textContent=``,Ae(y,p.choices,k),a.countdown(D,t=>ke(e,t,D),()=>k(null))):(o(),F(e,r))}function k(t){a.stopCountdown();let n=p.answer;if(je(y,n,t),t||ke(e,0,D),t?.id===n.id){l.tracker.right(n.id);let e=s.answerCorrect();M.streak(s.streak),E(s.streak===3?`🔥 Hot streak! +${e}%`:`Correct! +${e}%`,`correct`)}else{l.tracker.miss(n.id);let e=t?`Not quite.`:`Time's up!`;s.answerWrong()?(M.shield(),E(`🛡️ Shield blocked it! ${e} The answer was "${n.term}". Your streak is safe.`,`shielded`)):(M.buzz(),E(`${e} The answer was "${n.term}". −10%`,`wrong`),h.classList.remove(`shake`),h.offsetWidth,h.classList.add(`shake`))}T(),w(),s.isFinished?ee():a.later(O,t?.id===n.id?At:jt)}function ee(){let e=performance.now()-u;m.textContent=`🚀 Liftoff!`,_.classList.add(`launch`),M.liftoff(),a.later(()=>A(e,!0),Mt)}function A(t,r){let i=x(`quiz`,n.best(`quiz`));if(r){let e=n.record(`quiz`,{score:0,timeMs:t});M.fanfare(e.isNewBest),i=b(`quiz`,e)}let a=r?`<p class="finish-title">🚀 Liftoff!</p>
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
      `;let o=e.querySelector(`button`);o.addEventListener(`click`,c),o.focus()}T(),w(),O()}return s(),o}var Pt=.7,Ft={tower:20,wall:10},It={hits:0,blocked:0,shielded:0},Lt=e=>e===`player`?`bot`:`player`,Rt=class{castles={player:{lives:5,coins:0,towers:0,walls:0,defending:!1},bot:{lives:5,coins:0,towers:0,walls:0,defending:!1}};get outcome(){return this.castles.bot.lives===0?`won`:this.castles.player.lives===0?`lost`:`playing`}answer(e,t){let n=this.castles[e];t?n.coins+=10:n.lives=Math.max(0,n.lives-1)}canBuild(e,t){return this.castles[e].coins>=Ft[t]}build(e,t){if(!this.canBuild(e,t))throw Error(`Not enough coins for a ${t}.`);let n=this.castles[e];n.coins-=Ft[t],t===`tower`?n.towers++:n.walls++}defend(e){this.castles[e].defending=!0}stand(e){this.castles[e].coins+=10}fireTowers(e){let t=this.castles[Lt(e)],n=this.castles[e].towers;if(t.defending)return{...It,shielded:n};let r=Math.min(n,t.walls),i=Math.min(n-r,t.lives);return t.walls-=r,t.lives-=i,{hits:i,blocked:r,shielded:0}}playBotTurn(e){this.answer(`bot`,e);let t=It;return e&&(this.canBuild(`bot`,`tower`)&&this.build(`bot`,`tower`),t=this.fireTowers(`bot`)),this.castles.player.defending=!1,t}},zt=`http://www.w3.org/2000/svg`,Bt=800,Vt=250,Ht=[150,195,240,285],Ut=[325,343,361],Wt=70,Gt=170,Kt=178,qt=385,Jt=.6,Yt=[{x:150,y:52,size:1},{x:430,y:34,size:.7},{x:650,y:70,size:1.2}],Xt=[30,118,176,262,331,408,447,529,603,668,742,781],Zt=1100,R=(e,t)=>e===`player`?t:Bt-t,Qt=e=>e===`player`?`bot`:`player`;function $t(e,t,n,r){let i=n/(r*2-1);return Array.from({length:r},(n,r)=>`<rect x="${e+r*i*2}" y="${t-9}" width="${i}" height="10" />`).join(``)}function en(e,t,n,r){let i=Math.floor(r/16);return Array.from({length:i},(r,i)=>{let a=t+(i+1)*16,o=i%2==0?0:10,s=Array.from({length:Math.floor(n/20)},(t,n)=>`<path d="M${e+o+n*20} ${a-16}V${a}" />`).join(``);return`<path d="M${e} ${a}H${e+n}" />${s}`}).join(``)}function tn(e,t){return`<ellipse class="ground-shadow" cx="${e}" cy="253" rx="${t}" ry="6" />`}function nn({x:e,y:t,size:n}){return`
    <g class="scene-cloud">
      <ellipse cx="${e}" cy="${t}" rx="${44*n}" ry="${13*n}" />
      <ellipse cx="${e-16*n}" cy="${t-9*n}" rx="${18*n}" ry="${12*n}" />
      <ellipse cx="${e+14*n}" cy="${t-12*n}" rx="${22*n}" ry="${15*n}" />
    </g>
  `}function rn(e,t){let n=264+t%3*11;return`<path class="grass-tuft" d="M${e} ${n}l-4 -8M${e} ${n}v-10M${e} ${n}l4 -8" />`}function an(e){let t=e===`bot`?`url(#duel-stone-mirrored)`:`url(#duel-stone)`;return`
    <g class="scene-castle" data-side="${e}" ${e===`bot`?`transform="translate(${Bt},0) scale(-1,1)"`:``}>
      ${tn(70,66)}
      <g class="stone" fill="${t}">
        <rect x="16" y="120" width="30" height="130" />
        <rect x="94" y="120" width="30" height="130" />
        <rect x="40" y="150" width="60" height="100" />
        ${$t(16,120,30,3)}${$t(94,120,30,3)}${$t(40,150,60,4)}
      </g>
      <g class="stone-lines">
        ${en(16,120,30,130)}${en(94,120,30,130)}${en(40,150,60,100)}
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
  `}function on(e){return`<ellipse class="scene-shield" data-side="${e}" cx="${R(e,190)}" cy="${Vt}"
    rx="195" ry="170" hidden />`}function sn(){return`
    <svg class="duel-scene" viewBox="0 0 ${Bt} 300" role="img"
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
      <rect width="${Bt}" height="300" fill="url(#duel-sky)" />
      ${Yt.map(nn).join(``)}
      <path class="hills-far" d="M0 215C150 150 300 195 430 165S680 150 800 200V250H0Z" />
      <path class="hills" d="M0 250C120 195 240 225 360 208S620 195 800 240V250H0Z" />
      <rect y="${Vt}" width="${Bt}" height="50" fill="url(#duel-grass)" />
      ${Xt.map(rn).join(``)}
      ${an(`player`)}${an(`bot`)}
      <g class="scene-buildings"></g>
      ${on(`player`)}${on(`bot`)}
      <g class="scene-effects"></g>
    </svg>
  `}function cn(e){let t=e-13;return`
    <g class="scene-tower">
      ${tn(e,20)}
      <g class="stone" fill="url(#duel-stone)">
        <rect x="${t}" y="188" width="26" height="62" />
        ${$t(t-3,188,32,3)}
      </g>
      <g class="stone-lines">${en(t,188,26,62)}</g>
      <rect class="window" x="${e-3}" y="200" width="6" height="14" rx="3" />
    </g>
  `}function ln(e){return`
    <g class="scene-wall">
      ${tn(e,10)}
      <rect class="stone" fill="url(#duel-stone)" x="${e-7}" y="220" width="14" height="30" />
      <g class="stone-lines">${en(e-7,220,14,30)}</g>
    </g>
  `}function un(e,t){let n=Ht.slice(0,t.towers).map(t=>cn(R(e,t))),r=Ut.slice(0,t.walls).map(t=>ln(R(e,t)));return[...n,...r].join(``)}function dn(e,t){let{player:n,bot:r}=t.castles;e.querySelector(`.scene-buildings`).innerHTML=un(`player`,n)+un(`bot`,r);for(let n of[`player`,`bot`]){let{lives:r,defending:i}=t.castles[n];e.querySelector(`.scene-shield[data-side="${n}"]`).toggleAttribute(`hidden`,!i);let a=e.querySelector(`.scene-castle[data-side="${n}"]`);for(let e of a.querySelectorAll(`.damage`))e.classList.toggle(`shown`,r<=Number(e.dataset.at))}}function fn(e,t){let n=document.createElementNS(zt,e);for(let[e,r]of Object.entries(t))n.setAttribute(e,String(r));return n}var pn=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;function mn(e,t,n){let r=e.querySelector(`.scene-effects`),i=fn(`circle`,{class:`impact-flash`,cx:t,cy:n,r:16});r.append(i),i.animate([{opacity:1,r:`6px`},{opacity:0,r:`30px`}],350).onfinish=()=>i.remove();for(let e=0;e<8;e++){let i=fn(`rect`,{class:`impact-chip`,x:t,y:n,width:4,height:4});r.append(i);let a=Math.PI*2*e/8,o=26+e%3*12,s=`translate(${Math.cos(a)*o}px, ${Math.sin(a)*o+16}px)`;i.animate([{transform:`none`,opacity:1},{transform:s,opacity:0}],450).onfinish=()=>i.remove()}}function hn(e,t,n,r){let i=fn(`g`,{class:`scene-arrow`});i.innerHTML=`<path class="arrow-shaft" d="M-16 0H14" />
    <path class="arrow-head" d="M18 0L10 -4V4Z" />
    <path class="arrow-fletching" d="M-16 0L-22 -4M-16 0L-22 4" />`,e.querySelector(`.scene-effects`).append(i);let a=70+Math.abs(n.x-t.x)*.12,o=e=>({x:t.x+(n.x-t.x)*e,y:t.y+(n.y-t.y)*e-a*4*e*(1-e)}),s=Array.from({length:17},(e,t)=>{let n=t/16,r=o(n),i=o(n+.01),a=Math.atan2(i.y-r.y,i.x-r.x)*180/Math.PI;return{transform:`translate(${r.x}px, ${r.y}px) rotate(${a}deg)`}});i.style.visibility=`hidden`;let c=i.animate(s,{duration:750,delay:r,easing:`linear`});window.setTimeout(()=>{i.style.visibility=``},r),c.onfinish=()=>{i.remove(),mn(e,n.x,n.y)}}function gn(e,t,n){let r=Qt(t);[...Array(n.shielded).fill(qt),...Array(n.blocked).fill(Ut[0]),...Array(n.hits).fill(Wt)].forEach((n,i)=>{let a=Ht[i%Ht.length],o=n===Wt?Gt:226,s={x:R(r,n),y:o};pn()?mn(e,s.x,s.y):hn(e,{x:R(t,a),y:Kt},s,i*220)})}function _n(e,t){let n=R(Qt(t),150),r=R(t,100),i=t===`player`?-1:1,a=fn(`g`,{class:`scene-enemy`});a.innerHTML=`<g transform="scale(${i*Jt},${Jt})">
    <circle cx="0" cy="-30" r="6" /><path d="M0 -24V-10M0 -10L-6 0M0 -10L6 0M0 -20L10 -14" />
    <path class="enemy-sword" d="M10 -14L20 -24" /></g>`,e.querySelector(`.scene-effects`).append(a);let o=Array.from({length:13},(e,t)=>({transform:`translate(${n+(r-n)*t/12}px, ${258-(t%2==0?0:4)}px)`}));a.animate(o,Zt).onfinish=()=>{a.remove(),mn(e,r,210)}}var vn=`Tower Duel`,yn=1e3,bn=2200,xn=900,Sn=1e3,Cn=900,wn=1600,Tn=`Right answers earn 10 coins and an action. Wrong answers let an
  enemy through, which costs a life. Last castle with a life wins.`,En={player:`🧑‍🎓 You`,bot:`🤖 Quiz Bot`};function Dn(e){return`
    <div class="duel-status" data-side="${e}">
      <p class="fighter-name">${En[e]}</p>
      <p class="duel-lives"></p>
      <p class="duel-stats"></p>
    </div>
  `}var On=(e,t)=>`${e} ${t}${e===1?``:`s`}`;function kn(e,t){let n=e===`player`?`Your`:`Quiz Bot's`,r=[t.blocked>0?`${On(t.blocked,`wall`)} broke stopping a shot.`:``,t.shielded>0?`The shield stopped ${On(t.shielded,`shot`)}.`:``].filter(Boolean).join(` `),i=t.hits===1?`1 life`:`${t.hits} lives`;return t.hits>0?`${n} towers took ${i}. ${r}`.trim():r}function An(e){let t=e.hits+e.blocked+e.shielded;return 750+Math.max(0,t-1)*220}function jn(e,t,n,r){let i=ie(t);if(i.length<4)return Me(e,vn,i.length),()=>{};let a=new De;function o(){a.stop();let t=P(i,r);if(Ne(e,r,vn,t.length,1))return;let s=new Rt,c=Ce(r),l=new se(t),u=performance.now(),d=0,p=0;e.innerHTML=`
      <p class="instructions duel-rules">${Tn}</p>
      <details class="duel-help">
        <summary>How to play</summary>
        ${Tn}
      </details>
      ${sn()}
      <div class="duel-statuses">${Dn(`player`)}${Dn(`bot`)}</div>
      ${x(`tower`,n.best(`tower`))}
      <div class="battle-stage"></div>
      <p class="quiz-message" aria-live="polite"></p>
      <div class="quiz-actions">
        <span></span>
        <button class="end-game-button" type="button">End game</button>
      </div>
    `;let m=e.querySelector(`.battle-stage`),h=e.querySelector(`.quiz-message`),g=e.querySelector(`.duel-scene`),_=t=>e.querySelector(`.duel-status[data-side="${t}"]`);e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{a.stop(),k(`ended`)});function v(e,t){h.textContent=e,h.dataset.kind=t}function y(){dn(g,s);for(let e of[`player`,`bot`]){let{lives:t,coins:n,towers:r,walls:i}=s.castles[e],a=_(e),o=a.querySelector(`.duel-lives`);o.textContent=`❤️`.repeat(t)+`🖤`.repeat(5-t),o.setAttribute(`aria-label`,`${t} of 5 lives`),a.querySelector(`.duel-stats`).textContent=`🪙 ${n} · 🗼 ${r} · 🧱 ${i}`}}function S(){return s.outcome!==`playing`&&(a.stop(),k(s.outcome),!0)}function C(){if(r.isPracticing&&P(t,r).length===0){a.stop(),F(e,r);return}let n=oe(i,Se(l,t,r));h.textContent=``,m.innerHTML=`
        <p class="question-label"><strong>Your turn.</strong> Which term matches?</p>
        <p class="question-definition"></p>
        <div class="quiz-choices"></div>
      `,m.querySelector(`.question-definition`).textContent=n.answer.definition;let o=m.querySelector(`.quiz-choices`);Ae(o,n.choices,e=>{je(o,n.answer,e);let t=e.id===n.answer.id;d++,t?(s.answer(`player`,!0),y(),p++,c.tracker.right(n.answer.id),M.hit(),v(`Right! +10 coins.`,`correct`),a.later(w,yn)):(c.tracker.miss(n.answer.id),M.hurt(),_n(g,`player`),v(`An enemy got through! You lose a life and your action. The answer was "${n.answer.term}".`,`wrong`),s.answer(`player`,!1),a.later(y,Zt),a.later(()=>S()||D(),bn))})}function w(){let{coins:e,towers:t}=s.castles.player;h.textContent=``,m.innerHTML=`
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
            ⚔️ Attack<small>${t>0?`Fire ${On(t,`tower`)}`:`Build a tower first`}</small>
          </button>
          <button class="quiz-choice" type="button" data-action="defend">
            🛡 Defend<small>Shield stops every arrow next turn</small>
          </button>
          <button class="quiz-choice" type="button" data-action="stand">
            🧍 Stand<small>Hold fire, +10 coins</small>
          </button>
        </div>
      `;for(let e of m.querySelectorAll(`[data-building]`)){let t=e.dataset.building;e.disabled=!s.canBuild(`player`,t),e.addEventListener(`click`,()=>{s.build(`player`,t),y(),w()})}let n=e=>m.querySelector(`[data-action="${e}"]`);n(`attack`).disabled=t===0,n(`attack`).addEventListener(`click`,E),n(`defend`).addEventListener(`click`,()=>{s.defend(`player`),y(),T(`🛡 Shield up! It stops every arrow on Quiz Bot's next turn.`)}),n(`stand`).addEventListener(`click`,()=>{s.stand(`player`),y(),T(`🧍 You hold your ground and collect 10 bonus coins.`)})}function T(e){m.innerHTML=``,v(e,`info`),a.later(D,Sn)}function E(){m.innerHTML=``,h.textContent=``;let e=s.fireTowers(`player`);gn(g,`player`,e),a.later(()=>{y(),e.hits>0&&M.hit(),v(kn(`player`,e),`correct`)},An(e)),a.later(()=>S()||D(),An(e)+xn)}function D(){m.innerHTML=`<p class="question-label">🤖 Quiz Bot is answering…</p>`,h.textContent=``,a.later(O,Cn)}function O(){let e=Math.random()<Pt,t=s.castles.bot.towers,n=s.castles.player.defending,r=s.playBotTurn(e);m.innerHTML=``,e?(s.castles.player.defending=n,dn(g,s),gn(g,`bot`,r),v(`Quiz Bot got it right.${s.castles.bot.towers>t?` It built a tower.`:``}`,`info`),a.later(()=>{s.castles.player.defending=!1,y(),r.hits>0&&M.hurt();let e=kn(`bot`,r);e&&v(e,r.hits>0?`wrong`:`info`)},An(r)),a.later(()=>S()||C(),An(r)+wn)):(_n(g,`bot`),v(`Quiz Bot got it wrong, so your enemy got through!`,`correct`),a.later(()=>{y(),M.hit()},Zt),a.later(()=>S()||C(),wn))}function k(t){let r={won:`🏆 Your castle stands!`,lost:`💥 Quiz Bot wins`,ended:`Duel ended`,playing:`Duel ended`},i=performance.now()-u,{player:a,bot:l}=s.castles,m=x(`tower`,n.best(`tower`));if(t===`won`){let e=n.record(`tower`,{score:a.lives,timeMs:i});M.fanfare(e.isNewBest),m=b(`tower`,e)}else t===`lost`&&M.lose();e.innerHTML=`
        <div class="finish-panel ${t===`won`?``:`ended`}" role="status">
          <p class="finish-title">${r[t]}</p>
          <p>Your lives: <strong>${a.lives}</strong> · Quiz Bot's lives: <strong>${l.lives}</strong></p>
          <p class="finish-time">${p} of ${d} right · Time: ${f(i)}</p>
          ${m}
          ${I(c.changes)}
          <button class="primary-button" type="button">Play again</button>
        </div>
      `;let h=e.querySelector(`button`);h.addEventListener(`click`,o),h.focus()}y(),C()}return o(),()=>a.stop()}function Mn(e){return e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,` `).trim()}function Nn(e,t){let n=Array.from({length:e.length+1},(e,n)=>Array.from({length:t.length+1},(e,t)=>n===0?t:t===0?n:0));for(let r=1;r<=e.length;r++)for(let i=1;i<=t.length;i++){let a=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+a),r>1&&i>1&&e[r-1]===t[i-2]&&e[r-2]===t[i-1]&&(n[r][i]=Math.min(n[r][i],n[r-2][i-2]+1))}return n[e.length][t.length]}function Pn(e,t){let n=Mn(e),r=Mn(t);return n===``?`wrong`:n===r?`exact`:r.length>=5&&Nn(n,r)<=1?`close`:`wrong`}var Fn=class{cards;index=0;correctCount=0;constructor(e,t=Math.random){this.cards=o(a(e),t).slice(0,10)}get current(){return this.cards[this.index]}get isFinished(){return this.index>=this.cards.length}answer(e){if(this.isFinished)throw Error(`The round is already over.`);let t=Pn(e,this.current.term);return t!==`wrong`&&this.correctCount++,this.index++,t}};function In(e,t,n,r){let i=P(t,r);if(Ne(e,r,`Type It`,a(i).length,1))return;if(a(i).length===0){e.innerHTML=`
      <p class="empty-message">
        Type It needs at least 1 card with a term and a definition.
        Go to <a href="#write">Add cards</a> to add some.
      </p>
    `;return}let o=new Fn(i),s=Ce(r),c=performance.now(),l=()=>In(e,t,n,r);e.innerHTML=`
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
    `;let a=e.querySelector(`button`);a.addEventListener(`click`,l),a.focus()}p.addEventListener(`submit`,t=>{t.preventDefault(),v?_()?F(e,r):o.isFinished?T(!0):C():w()}),e.querySelector(`.end-game-button`).addEventListener(`click`,()=>{T(o.isFinished)}),C()}var Ln=`study-games.decks`,Rn=`study-games.current-deck`,zn=`study-games.draft`,Bn=`study-games.best-scores`,Vn=`study-games.sound-on`,Hn=`study-games.weak-cards`,Un=`study-games.weak-only`,Wn=`study-games.cards`;function Gn(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.term==`string`&&typeof t.definition==`string`}function Kn(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.name!=`string`||!Array.isArray(t.cards)?null:{id:t.id,name:t.name,cards:t.cards.filter(Gn)}}function z(e,t){try{let n=e.getItem(t);return n===null?null:JSON.parse(n)}catch{return null}}function B(e,t,n){try{return e.setItem(t,JSON.stringify(n)),!0}catch{return!1}}function qn(e=localStorage){let t=z(e,Ln),n=Array.isArray(t)?t.map(Kn).filter(e=>e!==null):[];if(n.length>0)return n;let r=z(e,Wn);return Array.isArray(r)?[ue(le,r.filter(Gn))]:[Ye()]}function Jn(e,t=localStorage){return B(t,Ln,e)}function Yn(e=localStorage){let t=z(e,Rn);return typeof t==`string`?t:null}function Xn(e,t=localStorage){return B(t,Rn,e)}function Zn(e=localStorage){let t=z(e,zn);return Gn(t)?t:null}function Qn(e,t=localStorage){return B(t,zn,e)}function $n(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.score==`number`&&typeof t.timeMs==`number`&&(t.outOf===void 0||typeof t.outOf==`number`)}function er(e=localStorage){let t=z(e,Bn);if(typeof t!=`object`||!t||Array.isArray(t))return{};let n={};for(let[e,r]of Object.entries(t))if(typeof r==`object`&&r)for(let t of m){let i=r[t];$n(i)&&(n[e]={...n[e],[t]:i})}return n}function tr(e,t=localStorage){return B(t,Bn,e)}function nr(e=localStorage){return z(e,Vn)===!0}function rr(e,t=localStorage){return B(t,Vn,e)}function ir(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function ar(e=localStorage){let t=z(e,Hn);if(!ir(t))return{};let n={};for(let[e,r]of Object.entries(t))if(ir(r))for(let[t,i]of Object.entries(r))Number.isInteger(i)&&i>=0&&(n[e]={...n[e],[t]:i});return n}function or(e,t=localStorage){return B(t,Hn,e)}function sr(e=localStorage){return z(e,Un)===!0}function cr(e,t=localStorage){return B(t,Un,e)}var lr=[`home`,`write`,`cards`,`match`,`quiz`,`battle`,`type`,`tower`,`decks`],ur=document.querySelector(`#deck-picker`),dr=document.querySelector(`#sound-toggle`),fr=document.querySelector(`#weak-only`),pr=document.querySelector(`#weak-count`),mr=document.querySelector(`#match-game`),hr=document.querySelector(`#match-progress`),gr=document.querySelector(`#quiz-game`),_r=document.querySelector(`#battle-game`),vr=document.querySelector(`#type-game`),yr=document.querySelector(`#tower-game`),br=document.querySelector(`#home-content`),xr=document.querySelector(`#decks-list`),Sr=document.querySelector(`#decks-message`),Cr=document.querySelectorAll(`a[data-view]`),wr=document.querySelector(`#card-count`),Tr=document.querySelector(`#write-deck-name`),Er=document.querySelector(`#draft-slot`),Dr=document.querySelector(`#save-card`),Or=document.querySelector(`#write-message`),kr=document.querySelector(`#import-file`),Ar=document.querySelector(`#file-import-message`),jr=document.querySelector(`#file-import-slot`),Mr=document.querySelector(`#cards-title`),Nr=document.querySelector(`#card-grid`),Pr=document.querySelector(`#import-button`),Fr=document.querySelector(`#import-slot`),Ir=document.querySelector(`#empty-message`),Lr=document.querySelector(`#no-weak-message`),Rr=document.querySelector(`#graduate-count`),zr=document.createElement(`p`);zr.className=`practice-banner`;var V=document.querySelector(`#save-status`),H=`Couldn't save. Your browser may be blocking storage.`,Br=`Get one right 3 times in a row to clear it.`;Rr.textContent=`3`;var U=qn(),W=he(U,Yn()).id,G=Zn()??e(),K=er(),q=ar(),J=sr(),Y=()=>he(U,W),Vr=()=>xe(q,W,Y().cards);function Hr(e){return Jn(e)?(U=e,!0):!1}function Ur(e){return Hr(me(U,W,e))}function Wr(){if(J)return{best:()=>void 0,record:(e,t)=>({scores:K,best:t,isNewBest:!1,practice:!0})};let e=W;return{best:t=>g(K,e,t),record:(t,n)=>{let r=_(K,e,t,n);return K=r.scores,tr(K),r}}}function Gr(){let e=W,t=e=>{q=e,or(q),Kr()};return{isPracticing:J,isWeak:t=>be(q,e,t)!==void 0,miss:n=>t(ge(q,e,n)),right:n=>t(_e(q,e,n)),stopPracticing:()=>qr(!1)}}function Kr(){let e=Vr().length;fr.checked=J,fr.disabled=e===0&&!J,pr.textContent=String(e),pr.setAttribute(`aria-label`,`${N(e)} to practice`),fr.parentElement.title=e===0?`Cards you miss in a game show up here.`:`Play and review only the cards you've missed. ${Br}`,zr.textContent=`🎯 Practicing ${N(e)} you've missed. ${Br}`,zr.hidden=e===0}function qr(e){J=e,cr(J),Kr(),di(ci())}fr.addEventListener(`change`,()=>qr(fr.checked));function X(){let e=U.map(e=>{let t=document.createElement(`option`);return t.value=e.id,t.textContent=e.name,t.selected=e.id===W,t});ur.replaceChildren(...e);let t=Y().cards.length;wr.textContent=String(t),wr.setAttribute(`aria-label`,N(t)),Kr()}function Z(e){W=e,Xn(e),X(),di(ci())}ur.addEventListener(`change`,()=>Z(ur.value));function Jr(){let e=A();dr.textContent=e?`🔊`:`🔇`,dr.setAttribute(`aria-pressed`,String(e)),dr.setAttribute(`aria-label`,e?`Sound on`:`Sound off`),dr.title=e?`Sound is on. Click to mute.`:`Sound is off. Click to turn on.`}dr.addEventListener(`click`,()=>{te(!A()),rr(A()),Jr(),M.chime()}),te(nr());function Q(e,t){Or.textContent=e,Or.classList.toggle(`error`,t)}function Yr(){Tr.textContent=Y().name;let e=Ge(G,{onEdit:(e,t)=>{G={...G,[e]:t},Qn(G),Q(``,!1)}});Er.replaceChildren(e),Ke(Er)}function Xr(){let t=Er.querySelector(`.card`),n=i(G);if(n===`term`){Q(`Type a term before saving.`,!0),We(t,`term`);return}if(n===`definition`){Q(`Flip the card and add a definition before saving.`,!0),We(t,`definition`);return}if(!Ur([...Y().cards,G])){Q(H,!0);return}G=e(),Qn(G),X();let r=Y();Q(`Saved to ${r.name}! It has ${N(r.cards.length)}.`,!1),Yr(),We(Er.querySelector(`.card`),`term`)}Dr.addEventListener(`click`,Xr);function Zr(){jr.replaceChildren(),Ar.textContent=``}kr.addEventListener(`change`,async()=>{let e=kr.files?.[0];if(kr.value=``,!e)return;Zr();let t=await ht(e);if(`error`in t){Ar.textContent=t.error;return}let n=Y();vt(jr,{deckName:n.name,existingCards:n.cards,fromFile:{name:e.name,text:t.text},onAdd:t=>{if(!Ur([...Y().cards,...t])){Ar.textContent=H;return}Zr(),X();let n=Y().name;Q(`Added ${N(t.length)} from ${e.name} to ${n}!`,!1)},onClose:Zr}),jr.scrollIntoView({behavior:`smooth`,block:`start`})});function Qr(e){let t=Ur(e);V.textContent=t?`All changes saved`:H,V.classList.toggle(`error`,!t)}function $r(e,t){let i=Y().cards,a=i.find(e=>e.id===t);(!a||r(a)||confirm(`Delete this card from your deck?`))&&(Qr(n(i,t)),q=ve(q,W,t),or(q),e.remove(),X(),ni())}function ei(e){let t=be(q,W,e);return t===void 0?void 0:{right:t,needed:3}}function ti(){return J?Vr():Y().cards}function ni(){let e=Y().cards.length===0;Ir.hidden=!e,Lr.hidden=!J||e||ti().length>0}function ri(){Fr.replaceChildren(),Pr.hidden=!1}Pr.addEventListener(`click`,()=>{Pr.hidden=!0;let e=Y();vt(Fr,{deckName:e.name,existingCards:e.cards,onAdd:e=>{Ur([...Y().cards,...e])?(X(),ii(),V.textContent=`Added ${N(e.length)} to ${Y().name}.`,V.classList.remove(`error`)):(V.textContent=H,V.classList.add(`error`))},onClose:ri})});function ii(){ri();let e=Y();Mr.textContent=J?`${e.name}: weak cards`:e.name;let n=ti().map(e=>{let n=Ge(e,{onEdit:(n,r)=>Qr(t(Y().cards,e.id,n,r)),onDelete:()=>$r(n,e.id),weakProgress:ei(e.id)});return n});Nr.replaceChildren(...n),Ke(Nr),ni(),V.textContent=``}function $(e){Sr.textContent=e}function ai(){Qe(xr,{decks:U,currentDeckId:W,onSelect:e=>{Z(e),$(`Now using ${Y().name}.`)},onCreate:e=>{let t=de(U,e);if(t)return t;let n=ue(e);return Hr([...U,n])?(Z(n.id),$(`Created ${n.name}. It's now your current deck.`),null):H},onRename:(e,t)=>de(U,t,e)||(Hr(fe(U,e,t))?(X(),ai(),$(`Renamed to ${t.trim()}.`),null):H),onDelete:e=>{let t=he(U,e).name;Hr(pe(U,e))?(K=v(K,e),tr(K),q=ye(q,e),or(q),Z(Y().id),$(`Deleted ${t}.`)):$(H)},onAddSample:()=>{let e=Ye();Hr([...U,e])?(Z(e.id),$(`Added ${e.name}. It's now your current deck.`)):$(H)}})}function oi(e,t){J=t,cr(J),Kr(),location.hash=e.view}function si(){at(br,{decks:U,currentDeck:Y(),scores:K,isNewVisitor:et(U,K,q),weakCountFor:e=>xe(q,e.id,e.cards).length,onSelectDeck:Z,onStartGame:oi})}function ci(){let e=location.hash.slice(1);return lr.find(t=>t===e)??`home`}var li=()=>{};function ui(e){return J?Vr().length===0?(e.innerHTML=`
      <p class="empty-message">
        No weak cards to practice in this deck. Miss a card in any game and it shows up here.
        Or turn off <strong>Weak cards only</strong> in the sidebar to play the whole deck.
      </p>
    `,!1):(e.before(zr),!0):!0}function di(e){li(),li=()=>{};for(let e of[mr,gr,_r,vr,yr])e.replaceChildren();hr.textContent=``;for(let t of lr)document.querySelector(`#${t}-view`).hidden=t!==e;for(let t of Cr){let n=t.dataset.view===e;t.classList.toggle(`current`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)}let t=Y().cards;zr.remove(),e===`home`?si():e===`write`?(Q(``,!1),Zr(),Yr()):e===`cards`?ii():e===`match`?ui(mr)&&kt(mr,hr,t,Wr(),Gr()):e===`quiz`?ui(gr)&&(li=Nt(gr,t,Wr(),Gr())):e===`battle`?ui(_r)&&(li=Be(_r,t,Wr(),Gr())):e===`type`?ui(vr)&&In(vr,t,Wr(),Gr()):e===`tower`?ui(yr)&&(li=jn(yr,t,Wr(),Gr())):($(``),ai())}window.addEventListener(`hashchange`,()=>di(ci())),Jn(U),X(),Jr(),di(ci());