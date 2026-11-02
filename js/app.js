/* ══════════════════════════════════════════════════════════
   DATING LIQUIDITY INDEX (DLI) - APP CONTROLLER & UI
══════════════════════════════════════════════════════════ */

/* ─── State ────────────────────────────────────────────── */
let currentGender = 'male';
let hasUnusualHobbies = false;
let lastResult = null;

/* ─── Hobby Toggle ─────────────────────────────────────── */
function setHobby(val) {
  hasUnusualHobbies = val;
  if (typeof window !== 'undefined') window.hasUnusualHobbies = hasUnusualHobbies;
  const btnNo = document.getElementById('hobby-no');
  const btnYes = document.getElementById('hobby-yes');
  if (!btnNo || !btnYes) return;
  btnNo.className = 'hobby-btn font-mono text-xs py-3 px-4 border border-term-border transition-all duration-150';
  btnYes.className = 'hobby-btn font-mono text-xs py-3 px-4 border border-term-border transition-all duration-150';
  if (val) {
    btnYes.classList.add('active-hobby-yes');
    btnNo.classList.add('text-term-faint');
  } else {
    btnNo.classList.add('active-hobby-no');
    btnYes.classList.add('text-term-faint');
  }
  updateUI();
}

/* ─── Bio Dropdown ─────────────────────────────────────── */
function getBioOptions() {
  return currentGender === 'female' ? BIO_OPTIONS_FEMALE : BIO_OPTIONS_MALE;
}

function setBioButtonContent(data) {
  if (!data) return;
  const badge = document.getElementById('bio-btn-badge');
  const title = document.getElementById('bio-btn-title');
  const desc = document.getElementById('bio-btn-desc');
  if (badge) {
    badge.textContent = data.code;
    badge.className = `${data.badgeClass} text-xs font-semibold px-1.5 py-0.5 bg-term-border/50 shrink-0`;
  }
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
}

function updateBioDropdownForGender(gender) {
  const options = gender === 'female' ? BIO_OPTIONS_FEMALE : BIO_OPTIONS_MALE;
  const menu = document.getElementById('bio-dropdown-menu');
  const select = document.getElementById('bio-type');
  const currentVal = select ? select.value : 'normal';

  if (menu) {
    menu.innerHTML = Object.entries(options).map(([key, item]) => {
      const isCurrent = key === currentVal;
      const borderClass = isCurrent ? 'border-term-green bg-term-border/20' : 'border-transparent';
      return `
      <div class="p-3 hover:bg-term-border/30 cursor-pointer transition-colors bio-option-item font-mono border-l-2 ${borderClass}"
        data-val="${key}" onclick="selectBio('${key}')">
        <div class="flex items-center gap-2 mb-1">
          <span class="${item.badgeClass} text-xs font-semibold px-1.5 py-0.5 bg-term-border/60 shrink-0">${item.code}</span>
          <span class="text-xs sm:text-sm text-term-bright font-medium">${item.title}</span>
        </div>
        <p class="text-xs text-term-mid leading-relaxed whitespace-normal pl-0.5">
          ${item.desc}
        </p>
      </div>`;
    }).join('');
  }

  setBioButtonContent(options[currentVal] || options['normal']);
}

function toggleBioDropdown(e) {
  if (e) e.stopPropagation();
  closePhotoDropdown();
  closeOpenerDropdown();
  const menu = document.getElementById('bio-dropdown-menu');
  const arrow = document.getElementById('bio-dropdown-arrow');
  if (!menu) return;
  const isOpen = !menu.classList.contains('hidden');
  if (isOpen) {
    closeBioDropdown();
  } else {
    menu.classList.remove('hidden');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

function closeBioDropdown() {
  const menu = document.getElementById('bio-dropdown-menu');
  const arrow = document.getElementById('bio-dropdown-arrow');
  if (menu) menu.classList.add('hidden');
  if (arrow) arrow.style.transform = 'rotate(0deg)';
}

function selectBio(val) {
  const select = document.getElementById('bio-type');
  if (select) {
    select.value = val;
    updateUI();
  }
  const options = getBioOptions();
  setBioButtonContent(options[val]);
  document.querySelectorAll('.bio-option-item').forEach(el => {
    const isCurrent = el.dataset.val === val;
    el.classList.toggle('border-term-green', isCurrent);
    el.classList.toggle('border-transparent', !isCurrent);
    el.classList.toggle('bg-term-border/20', isCurrent);
  });
  closeBioDropdown();
}

/* ─── Photo Dropdown ───────────────────────────────────── */
function togglePhotoDropdown(e) {
  if (e) e.stopPropagation();
  closeBioDropdown();
  closeOpenerDropdown();
  const menu = document.getElementById('photo-dropdown-menu');
  const arrow = document.getElementById('photo-dropdown-arrow');
  if (!menu) return;
  const isOpen = !menu.classList.contains('hidden');
  if (isOpen) {
    closePhotoDropdown();
  } else {
    menu.classList.remove('hidden');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

function closePhotoDropdown() {
  const menu = document.getElementById('photo-dropdown-menu');
  const arrow = document.getElementById('photo-dropdown-arrow');
  if (menu) menu.classList.add('hidden');
  if (arrow) arrow.style.transform = 'rotate(0deg)';
}

function selectPhoto(val) {
  const select = document.getElementById('photo-type');
  if (select) {
    select.value = val;
    updateUI();
  }
  const data = PHOTO_OPTIONS[val];
  if (data) {
    const badge = document.getElementById('photo-btn-badge');
    const title = document.getElementById('photo-btn-title');
    const desc = document.getElementById('photo-btn-desc');
    if (badge) {
      badge.textContent = data.code;
      badge.className = `${data.badgeClass} text-xs font-semibold px-1.5 py-0.5 bg-term-border/50 shrink-0`;
    }
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
  }
  document.querySelectorAll('.photo-option-item').forEach(el => {
    const isCurrent = el.dataset.val === val;
    el.classList.toggle('border-term-green', isCurrent);
    el.classList.toggle('border-transparent', !isCurrent);
    el.classList.toggle('bg-term-border/20', isCurrent);
  });
  closePhotoDropdown();
}

/* ─── Opener Dropdown ─────────────────────────────────── */
function toggleOpenerDropdown(e) {
  if (e) e.stopPropagation();
  closeBioDropdown();
  closePhotoDropdown();
  const menu = document.getElementById('opener-dropdown-menu');
  const arrow = document.getElementById('opener-dropdown-arrow');
  if (!menu) return;
  const isOpen = !menu.classList.contains('hidden');
  if (isOpen) {
    closeOpenerDropdown();
  } else {
    menu.classList.remove('hidden');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

function closeOpenerDropdown() {
  const menu = document.getElementById('opener-dropdown-menu');
  const arrow = document.getElementById('opener-dropdown-arrow');
  if (menu) menu.classList.add('hidden');
  if (arrow) arrow.style.transform = 'rotate(0deg)';
}

function selectOpener(val) {
  const select = document.getElementById('chat-opener');
  if (select) {
    select.value = val;
    updateUI();
  }
  const data = typeof OPENER_OPTIONS !== 'undefined' ? OPENER_OPTIONS[val] : null;
  if (data) {
    const badge = document.getElementById('opener-btn-badge');
    const title = document.getElementById('opener-btn-title');
    const desc = document.getElementById('opener-btn-desc');
    if (badge) {
      badge.textContent = data.code;
      badge.className = `${data.badgeClass} text-xs font-semibold px-1.5 py-0.5 bg-term-border/50 shrink-0`;
    }
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
  }
  document.querySelectorAll('.opener-option-item').forEach(el => {
    const isCurrent = el.dataset.val === val;
    el.classList.toggle('border-term-green', isCurrent);
    el.classList.toggle('border-transparent', !isCurrent);
    el.classList.toggle('bg-term-border/20', isCurrent);
  });
  closeOpenerDropdown();
}

/* ─── Gender Switch ────────────────────────────────────── */
function setGender(g) {
  currentGender = g;
  if (typeof window !== 'undefined') window.currentGender = currentGender;
  const btnM = document.getElementById('btn-male');
  const btnF = document.getElementById('btn-female');

  if (btnM && btnF) {
    btnM.className = 'gender-btn py-3 px-4 font-medium text-sm border border-term-border flex items-center justify-center gap-2';
    btnF.className = 'gender-btn py-3 px-4 font-medium text-sm border border-term-border flex items-center justify-center gap-2';

    if (g === 'male') {
      btnM.classList.add('active-male');
      btnF.classList.add('text-term-faint');
    } else {
      btnF.classList.add('active-female');
      btnM.classList.add('text-term-faint');
    }
  }

  const optParents = document.getElementById('housing-opt-parents');
  if (optParents) {
    optParents.textContent = g === 'male'
      ? 'coliving — проживание с родителями или друзьями'
      : 'coliving — с родителями / с подругой';
  }

  const pathosText = document.getElementById('marker-pathos-text');
  if (pathosText) {
    pathosText.textContent = g === 'male'
      ? 'Фото у чужих авто / пачки денег / кальянный неон'
      : 'Арендованные букеты роз / сильный фотошоп кожи';
  }

  renderGenderFields();
  updateBioDropdownForGender(g);
  hideResult();
}

/* ─── Face Slider ──────────────────────────────────────── */
function onFaceChange(val) {
  const el = document.getElementById('face-score-val');
  if (el) {
    el.textContent = val;
    el.style.color = val >= 8 ? '#4ade80' : val >= 5 ? '#fbbf24' : '#f87171';
  }
  updateUI();
}

/* ─── Shared UI Helpers ────────────────────────────────── */
function selectHTML(id, label, options, onchange = 'updateUI()') {
  const opts = options.map(([val, txt]) =>
    `<option value="${val}">${txt}</option>`
  ).join('');
  return `
  <div class="space-y-2">
    <label class="text-sm text-term-text" for="${id}">${label}</label>
    <select id="${id}"
      class="w-full bg-term-surface border border-term-border px-3 py-2.5 text-term-text font-mono truncate transition-colors hover:border-term-dim focus:border-term-faint focus:outline-none"
      onchange="${onchange}">
      ${opts}
    </select>
  </div>`;
}

function sectionCard(title, content) {
  return `
<div class="term-card p-4 sm:p-5 space-y-5">
  <div class="prompt-label">
    <span class="prompt-prefix">$</span>${title}
  </div>
  ${content}
</div>`;
}

/* ─── Render Form Fields ───────────────────────────────── */
function renderMaleFields() {
  const heightSel = selectHTML('m-height', 'Рост', [
    ['185+', '≥ 185 см'],
    ['180-184', '180–184 см'],
    ['175-179', '175–179 см'],
    ['170-174', '170–174 см'],
    ['<170', '< 170 см'],
  ]);

  const ageSel = selectHTML('m-age', 'Возраст', [
    ['18-24', '18–24'],
    ['25-28', '25–28'],
    ['29-33', '29–33'],
    ['34-38', '34–38'],
    ['39-44', '39–44'],
    ['45+', '45+'],
  ]);

  const bodySel = selectHTML('m-body', 'Телосложение', [
    ['athletic', 'athletic — спортивное / рельеф'],
    ['normal', 'normal — среднее'],
    ['thin', 'thin — худощавое'],
    ['overweight', 'overweight — плотное / лишний вес'],
    ['obese', 'obese — крупное / ожирение'],
  ]);

  const childSel = selectHTML('m-children', 'Семейный статус / дети', [
    ['single', 'single — холост, без детей'],
    ['divorced', 'divorced — разведён, без детей'],
    ['child-away', 'child_away — есть ребёнок (живёт отдельно)'],
    ['child-with', 'child_with — есть ребёнок (под опекой)'],
  ]);

  const jobSel = selectHTML('m-job', 'Профессия / доход', [
    ['stable', 'stable — понятная работа / логист / менеджер / фронтенд / аналитик'],
    ['backend', 'backend — архитектор / бэкенд / фуллстек / девопс'],
    ['humanitarian', 'humanitarian — гуманитарий / лингвист / философ / редактор'],
    ['business', 'business — свой бизнес / стартап'],
    ['creative', 'creative — творческий фриланс'],
    ['low', 'low — курьер / бармен / разнорабочий'],
  ]);

  const typeSel = selectHTML('m-type', 'Типаж самопрезентации', [
    ['normie', 'normie — нормис (пояснения излишни)'],
    ['street', 'street — пацан с соседнего района («ненавижу манипуляции и меркантильных»...)'],
    ['geek', 'geek — базовый айтишник или ботаник'],
    ['athlete', 'athlete — спортсмен / атлет'],
  ]);

  return sectionCard('--params male', heightSel + ageSel + bodySel + childSel + jobSel + typeSel);
}

function renderFemaleFields() {
  const ageSel = selectHTML('f-age', 'Возраст', [
    ['18-22', '18–22'],
    ['23-29', '23–29'],
    ['30-37', '30–37'],
    ['38-41', '38–41'],
    ['42+', '42+'],
  ]);

  const bodySel = selectHTML('f-body', 'Телосложение', [
    ['slim', 'slim — стройное / спортивное'],
    ['normal', 'normal — среднее'],
    ['curvy', 'curvy — с формами'],
    ['plus', 'plus — плюс-сайз'],
  ]);

  const heightSel = selectHTML('f-height', 'Рост', [
    ['150-168', '150–168 см'],
    ['169-174', '169–174 см'],
    ['175+', '≥ 175 см'],
  ]);

  const childSel = selectHTML('f-children', 'Наличие детей', [
    ['none', 'none — без детей'],
    ['child-12+', 'child_12+ — ребёнок старше 12 лет'],
    ['child-under-12', 'child_u12 — ребёнок до 12 лет'],
  ]);

  const typeSel = selectHTML('f-type', 'Типаж самопрезентации', [
    ['girl-next-door', 'girl_next_door — естественный / casual'],
    ['alt', 'alt — неформальный / тату / пирсинг'],
    ['insta', 'insta — подчеркнуто гламурный'],
    ['corporate', 'corporate — строгий / деловой'],
  ]);

  const jobSel = `
  <div class="space-y-2">
    <label class="text-sm text-term-text">Профессия / сфера</label>
    <div class="w-full bg-term-surface border border-term-border px-3 py-2.5 text-term-mid font-mono text-xs sm:text-sm flex items-center justify-between">
      <span>любая</span>
      <span class="text-term-dim text-xs">не влияет на скор</span>
    </div>
  </div>`;

  return sectionCard('--params female', ageSel + bodySel + heightSel + childSel + typeSel + jobSel);
}

function renderGenderFields() {
  const container = document.getElementById('gender-specific-fields');
  if (container) {
    container.innerHTML = currentGender === 'male' ? renderMaleFields() : renderFemaleFields();
  }
}

function updateUI() {
  hideResult();
}

function hideResult() {
  const r = document.getElementById('result-block');
  if (r) {
    r.classList.remove('visible');
    r.innerHTML = '';
  }
}

/* ─── Calculation Trigger ──────────────────────────────── */
function calculate() {
  const faceScore = parseInt(document.getElementById('face-score')?.value || '5', 10);
  const ks = currentGender === 'male' ? getMaleK(faceScore) : getFemaleK(faceScore);

  let product = 1.0;
  for (const key of Object.keys(ks)) {
    product *= ks[key].k;
  }
  // У женщин нет коллапса воронки: входящий трафик есть всегда (floor: 1.0%)
  const minDli = currentGender === 'female' ? 1.0 : 0.0;
  // Округление до 2 знаков для предотвращения погрешностей точности IEEE 754 при сравнении с порогами тиров
  const dli = Math.max(minDli, Math.round(product * 10000) / 100);
  renderResult(dli, ks);
  incrementCalcCounter();
}

/* ─── Result Presentation ──────────────────────────────── */
function renderResult(dli, ks) {
  const tier = getTier(dli, currentGender);
  const percentile = getPercentile(dli, currentGender);
  lastResult = { dli, tier, ks };
  if (typeof window !== 'undefined') window.lastResult = lastResult;
  const dliStr = dli.toFixed(1);
  const isZero = dli === 0;
  const verdict = getTierVerdict(dli, tier, ks, currentGender);

  const funnel = getFunnelMetrics(dli, currentGender);

  const accentColor = tier.color;

  const coefHTML = Object.entries(ks).map(([key, v]) => {
    const isOverNorm = v.k > 1.0;
    const baseCol = v.k >= 1.0 ? '#4ade80' : v.k >= 0.6 ? '#fbbf24' : '#f87171';
    const labelCol = isOverNorm ? '#f472b6' : baseCol;
    const label = v.k === 0 ? 'HARD_DROP' : `x${v.k.toFixed(2)}`;

    // Scale is 0..1.5, so 1.0 corresponds to 66.67%
    const normPct = 66.67;
    let basePct = 0;
    let bonusPct = 0;

    if (isOverNorm) {
      basePct = normPct;
      bonusPct = Math.min(33.33, Math.max(0, Math.round(((v.k - 1.0) / 1.5) * 1000) / 10));
    } else {
      basePct = Math.min(normPct, Math.max(0, Math.round((v.k / 1.5) * 1000) / 10));
      bonusPct = 0;
    }

    return `
    <div class="space-y-1.5">
      <div class="flex justify-between items-center">
        <span class="text-xs text-term-mid font-mono">${v.label.toLowerCase().replace(/ /g, '_')}</span>
        <span class="font-mono text-xs font-medium" style="color:${labelCol}">${label}</span>
      </div>
      <div class="progress-track relative" style="height: 4px; background: #1f1f1f;">
        <!-- Черточка на 1.0 (нормальная норма) -->
        <div class="absolute -top-1 -bottom-1 w-[2px] bg-[#666666] z-10" style="left: ${normPct}%; pointer-events: none;" title="норма 1.0x"></div>
        <!-- Базовое заполнение (до 1.0) -->
        <div class="progress-fill absolute left-0 top-0 bottom-0" data-target-width="${basePct}%" style="width:0%;background:${baseCol}"></div>
        <!-- Премиальное заполнение правее 1.0 (розовое) -->
        ${bonusPct > 0 ? `<div class="progress-fill absolute top-0 bottom-0" data-target-width="${bonusPct}%" style="left: ${normPct}%; width:0%; background:#f472b6;"></div>` : ''}
      </div>
    </div>`;
  }).join('');

  const html = `
<div class="space-y-4">
  <div class="term-card p-4 sm:p-6 text-center">
    <div class="font-mono text-xs text-term-faint uppercase tracking-widest mb-3">output: dating_liquidity_index</div>
    <div class="dli-value text-5xl sm:text-7xl mb-3" style="color:${accentColor}">
      ${dliStr}<span class="text-2xl sm:text-3xl">%</span>
    </div>
    <div class="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 font-mono text-xs px-2.5 sm:px-3 py-1.5 border" style="color:${accentColor};border-color:${accentColor}40">
      <span style="color:${accentColor}">[${tier.tag}]</span>
      <span>${tier.label}</span>
    </div>
    <div class="font-mono text-xs text-term-mid mt-3 flex items-center justify-center gap-1.5">
      <span class="text-term-dim">рыночный срез:</span>
      <span class="text-term-bright font-semibold">${percentile.text}</span>
      <span class="text-term-faint">(${percentile.desc})</span>
    </div>
    ${isZero ? `<p class="text-red-400 text-xs mt-3 font-mono">!! HARD_DROP — funnel_collapsed = true</p>` : ''}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
    <!-- 1) Свайпов на 1 мэтч -->
    <div class="metric-card term-card p-3 sm:p-4 text-center flex flex-col justify-between">
      <div>
        <div class="font-mono text-xl sm:text-2xl font-semibold text-term-bright mb-1">${funnel.swipesToMatch}</div>
        <div class="font-mono text-xs text-term-text font-medium leading-tight">свайпов на мэтч</div>
      </div>
      <div class="font-mono text-[10px] sm:text-[11px] text-term-faint mt-2 leading-tight">
        нужно сделать людям с похожим DLI
      </div>
    </div>

    <!-- 2) Мэтчей на 1 свидание -->
    <div class="metric-card term-card p-3 sm:p-4 text-center flex flex-col justify-between">
      <div>
        <div class="font-mono text-xl sm:text-2xl font-semibold text-term-bright mb-1">${funnel.matchesToDate}</div>
        <div class="font-mono text-xs text-term-text font-medium leading-tight">мэтчей на 1 свидание</div>
      </div>
      <div class="font-mono text-[10px] sm:text-[11px] text-term-faint mt-2 leading-tight">
        у людей с похожим DLI
      </div>
    </div>

    <!-- 3 & 4) Суммарно свайпов и дней на 1 свидание -->
    <div class="metric-card term-card p-3 sm:p-4 text-center flex flex-col justify-between" style="border-color:${accentColor}50">
      <div>
        <div class="font-mono text-xl sm:text-2xl font-semibold mb-1" style="color:${accentColor}">
          ${funnel.swipesToDate} <span class="text-xs sm:text-sm font-normal text-term-mid">свайпов</span>
        </div>
        <div class="font-mono text-xs text-term-bright font-medium leading-tight">суммарно до 1 свидания</div>
      </div>
      <div class="font-mono text-[10px] sm:text-[11px] text-term-faint mt-2 leading-tight">
        ≈ <span class="text-term-bright font-semibold">${funnel.daysToDateStr}</span> в приложении (по 200 свайпов/день)
      </div>
    </div>
  </div>

  <div class="term-card p-4 sm:p-5 space-y-4">
    <div class="flex items-center justify-between">
      <div class="prompt-label">
        <span class="prompt-prefix">$</span>--breakdown coefficients
      </div>
      <div class="font-mono text-[10px] text-term-faint">
        <span class="inline-block w-1.5 h-1.5 bg-[#666666] mr-1 align-middle"></span>черта = норма
        <span class="inline-block w-1.5 h-1.5 bg-[#f472b6] ml-2 mr-1 align-middle"></span>розовый = премия
      </div>
    </div>
    <div class="space-y-3">${coefHTML}</div>
  </div>

  <div class="term-card p-4 sm:p-5 space-y-2.5">
    <div class="prompt-label">
      <span class="prompt-prefix">$</span>--tier analysis
    </div>
    <p class="font-mono text-xs sm:text-sm text-term-text leading-relaxed">
      ${verdict}
    </p>
  </div>

  <div class="space-y-2 pt-1">
    <a href="https://t.me/gcodegspot" target="_blank" rel="noopener"
      class="w-full py-3.5 px-4 font-mono text-xs sm:text-sm border border-term-border bg-term-surface text-term-text hover:border-term-green hover:text-term-bright hover:bg-term-border/30 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 group">
      <span class="text-term-faint group-hover:text-term-mid transition-colors">придумала и разработала</span>
      <span class="text-term-green font-semibold">@gcodegspot</span>
      <svg class="w-3.5 h-3.5 text-term-dim group-hover:text-term-green transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
    </a>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button id="share-btn"
        onclick="shareCurrentResult()"
        class="py-3 px-3 sm:px-4 font-mono font-medium text-[11px] sm:text-xs border border-term-border text-term-mid hover:border-[#29a8eb] hover:text-[#29a8eb] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2">
        <svg class="flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        <span id="share-btn-text">отправить диагноз в telegram</span>
      </button>
      <button id="copy-btn"
        onclick="copyCardResult()"
        class="py-3 px-3 sm:px-4 font-mono font-medium text-[11px] sm:text-xs border border-term-border text-term-mid hover:border-term-text hover:text-term-bright active:scale-95 transition-all duration-150 flex items-center justify-center gap-2">
        <svg class="flex-shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span id="copy-btn-text">копировать карточку</span>
      </button>
    </div>
  </div>
</div>`;

  const block = document.getElementById('result-block');
  if (block) {
    block.innerHTML = html;
    block.classList.add('visible');

    setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    setTimeout(() => {
      block.querySelectorAll('.progress-fill').forEach(el => {
        el.style.width = el.dataset.targetWidth || '0%';
      });
    }, 100);
  }
}

/* ─── Global Event Listeners & Init ────────────────────── */
const closeDropdownsIfOutside = (e) => {
  const bioContainer = document.getElementById('bio-dropdown-container');
  if (bioContainer && !bioContainer.contains(e.target)) {
    closeBioDropdown();
  }
  const photoContainer = document.getElementById('photo-dropdown-container');
  if (photoContainer && !photoContainer.contains(e.target)) {
    closePhotoDropdown();
  }
  const openerContainer = document.getElementById('opener-dropdown-container');
  if (openerContainer && !openerContainer.contains(e.target)) {
    closeOpenerDropdown();
  }
};

document.addEventListener('click', closeDropdownsIfOutside);
document.addEventListener('touchstart', closeDropdownsIfOutside, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBioDropdown();
    closePhotoDropdown();
    closeOpenerDropdown();
  }
});

// Prevent horizontal scroll offset bug in Chromium for native selects (with event capture for dynamic fields)
['scroll', 'focus', 'change'].forEach(evt => {
  document.addEventListener(evt, (e) => {
    if (e.target && e.target.tagName === 'SELECT') {
      e.target.scrollLeft = 0;
    }
  }, true);
});

// Initialize default state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setGender('male'));
} else {
  setGender('male');
}

// ─── Global Scope Export ──────────────────────────────────
if (typeof window !== 'undefined') {
  window.currentGender = currentGender;
  window.hasUnusualHobbies = hasUnusualHobbies;
  window.lastResult = lastResult;
  window.setHobby = setHobby;
  window.setGender = setGender;
  window.onFaceChange = onFaceChange;
  window.toggleBioDropdown = toggleBioDropdown;
  window.closeBioDropdown = closeBioDropdown;
  window.selectBio = selectBio;
  window.togglePhotoDropdown = togglePhotoDropdown;
  window.closePhotoDropdown = closePhotoDropdown;
  window.selectPhoto = selectPhoto;
  window.toggleOpenerDropdown = toggleOpenerDropdown;
  window.closeOpenerDropdown = closeOpenerDropdown;
  window.selectOpener = selectOpener;
  window.updateUI = updateUI;
  window.hideResult = hideResult;
  window.calculate = calculate;
  window.renderResult = renderResult;
  window.incrementCalcCounter = incrementCalcCounter;
  window.loadCalcCounter = loadCalcCounter;
}

/* ─── Calculation Counter ──────────────────────────────────
   Uses countapi.xyz — a free, zero-auth hit counter API.
   Counter increments only on actual calculate() calls,
   not on page loads, to reflect real usage.
   Namespace: dli-calc / Key: calculations-v1
   ─────────────────────────────────────────────────────── */
const COUNTER_URL = 'https://api.countapi.xyz/hit/dli-calc/calculations-v1';
const COUNTER_READ_URL = 'https://api.countapi.xyz/get/dli-calc/calculations-v1';

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return n.toString();
}

function updateCounterEl(value) {
  const el = document.getElementById('calc-counter-value');
  if (!el) return;
  el.textContent = formatCount(value);
  // reveal the badge smoothly
  const badge = document.getElementById('calc-counter-badge');
  if (badge) badge.classList.remove('opacity-0');
}

function incrementCalcCounter() {
  fetch(COUNTER_URL)
    .then(r => r.json())
    .then(data => {
      if (data && data.value != null) {
        updateCounterEl(data.value);
      } else {
        // Key might not exist yet — create it on first hit
        return fetch('https://api.countapi.xyz/create?namespace=dli-calc&key=calculations-v1&value=1')
          .then(r => r.json())
          .then(d => { if (d && d.value != null) updateCounterEl(d.value); });
      }
    })
    .catch(() => { /* silent — counter is non-critical */ });
}

function loadCalcCounter() {
  fetch(COUNTER_READ_URL)
    .then(r => r.json())
    .then(data => { if (data && data.value != null) updateCounterEl(data.value); })
    .catch(() => { /* silent */ });
}

// Load current count on page start (read-only, no increment)
loadCalcCounter();

