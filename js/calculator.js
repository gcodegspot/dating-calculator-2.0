/* ══════════════════════════════════════════════════════════
   DATING LIQUIDITY INDEX (DLI) - CALCULATOR & MATH ENGINE
══════════════════════════════════════════════════════════ */

/**
 * Bio options for Male profiles
 */
const BIO_OPTIONS_MALE = {
  normal: {
    code: 'normal',
    badgeClass: 'text-term-green',
    title: 'дефолтное описание',
    desc: 'днем тыры, вечером пыры, ценю баланс, ищу спутницу, чтобы разделять моменты жизни.'
  },
  empty: {
    code: 'empty',
    badgeClass: 'text-term-mid',
    title: 'пустое описание',
    desc: 'в профиле вообще нет текста'
  },
  aggro: {
    code: 'aggro',
    badgeClass: 'text-term-amber',
    title: 'список требований и условий к девушке',
    desc: '«не пиши если...», перечень критериев отбора и пассивная агрессия'
  },
  insta: {
    code: 'insta',
    badgeClass: 'text-term-blue',
    title: 'только ссылка на соцсети',
    desc: 'ссылка на Instagram или Telegram без личного описания'
  },
  esoteric: {
    code: 'esoteric',
    badgeClass: 'text-term-cyan',
    title: 'астрология / таро / эзотерика',
    desc: 'химтрейлы / дизайн человека / медитация / йога / ретриты'
  },
  alpha: {
    code: 'alpha',
    badgeClass: 'text-term-red',
    title: 'цитаты / мудрость / заезженные штуки',
    desc: '«не предлагайте мне секс втроем. если бы я хотел разочаровать двух людей, я бы поехал к родителям»'
  }
};

/**
 * Bio options for Female profiles
 */
const BIO_OPTIONS_FEMALE = {
  normal: {
    code: 'normal',
    badgeClass: 'text-term-green',
    title: 'дефолтное описание',
    desc: 'люблю кофе, путешествия и спонтанные поездки, ищу своего человека для уютных вечеров.'
  },
  empty: {
    code: 'empty',
    badgeClass: 'text-term-mid',
    title: 'пустое описание',
    desc: 'в профиле вообще нет текста (только фотографии)'
  },
  aggro: {
    code: 'aggro',
    badgeClass: 'text-term-amber',
    title: 'список требований к парню',
    desc: '«рост от 185, нищеброды и пополамщики мимо, на "привет как дела" не отвечаю»'
  },
  insta: {
    code: 'insta',
    badgeClass: 'text-term-blue',
    title: 'только ссылка на соцсети',
    desc: '«редко тут бываю, пиши сразу в инсту / тг @...»'
  },
  esoteric: {
    code: 'esoteric',
    badgeClass: 'text-term-cyan',
    title: 'астрология / таро / эзотерика',
    desc: 'натальные карты, асцендент в скорпионе, дизайн человека, ретриты и медитации'
  },
  alpha: {
    code: 'alpha',
    badgeClass: 'text-term-red',
    title: 'заезженные цитаты / статусы',
    desc: '«меня трудно найти, легко потерять и невозможно забыть», цитаты из пабликов'
  }
};

/**
 * Photo presentation options
 */
const PHOTO_OPTIONS = {
  lifestyle: {
    code: 'lifestyle',
    badgeClass: 'text-term-green',
    title: 'лайфстайл и окружение',
    desc: 'в реальной жизни / спорт / хобби / путешествия / естественный социальный контекст'
  },
  normal: {
    code: 'normal',
    badgeClass: 'text-term-green',
    title: 'обычные селфи со смартфона',
    desc: 'простые повседневные кадры без заморочек и студийного света'
  },
  linkedin: {
    code: 'linkedin',
    badgeClass: 'text-term-blue',
    title: 'деловые / корпоративные фото',
    desc: 'костюм, деловой дресс-код, офис, спикерские кадры или нейро-фотосессия'
  },
  studio: {
    code: 'studio',
    badgeClass: 'text-term-cyan',
    title: 'постановочная студия',
    desc: 'студийная съемка вне офиса, искусственный свет, модельные позы'
  },
  selfie: {
    code: 'selfie',
    badgeClass: 'text-term-amber',
    title: 'селфи в зеркало / авто / зале',
    desc: 'лифт, спортзал, зеркало в туалете или за рулем с одного и того же ракурса'
  },
  anti: {
    code: 'anti',
    badgeClass: 'text-term-red',
    title: 'анти-визуал / нечеткие фото',
    desc: 'размытые кадры, темные очки на всех снимках, обрезки бывших или чужие лица'
  }
};

/**
 * Chat opener options
 */
const OPENER_OPTIONS = {
  standard: {
    code: 'standard',
    badgeClass: 'text-term-mid',
    title: 'шаблонный «привет, как дела»',
    desc: 'классический шаблонный старт без контекста: «привет, как дела / чем занимаешься?»'
  },
  context: {
    code: 'context',
    badgeClass: 'text-term-green',
    title: 'контекстный вопрос / самоирония',
    desc: 'подмечаешь деталь на фото или зацепку в описании, шутишь без кринжа, лёгкий смол-ток'
  },
  aggressive: {
    code: 'aggro',
    badgeClass: 'text-term-red',
    title: 'агрессивный подкат / пошлость',
    desc: '«твоей маме зять не нужен?», двусмысленный флирт в лоб, пикап-фразы из пабликов'
  },
  silent: {
    code: 'silent',
    badgeClass: 'text-term-amber',
    title: 'молчу и жду, пока напишут мне',
    desc: 'мэтч получен, но первое сообщение не отправляется: жду первого шага от собеседника'
  }
};

/**
 * Visual photo coefficient
 */
function getPhotoK(type, heightCm, faceScore, gender = 'male') {
  switch (type) {
    case 'lifestyle': return 1.25;
    case 'normal': return 1.00;
    case 'linkedin': return 0.80;
    case 'studio':
      if (gender === 'female') return 1.00;
      return (heightCm >= 180 && faceScore >= 7) ? 1.00 : 0.60;
    case 'selfie': return 0.60;
    case 'anti': return 0.35;
    default: return 1.00;
  }
}

/**
 * Male multipliers breakdown
 */
function getMaleK(faceScore) {
  const ks = {};

  const h = document.getElementById('m-height')?.value || '180-184';
  const heightMap = { '185+': 1.15, '180-184': 1.00, '175-179': 0.75, '170-174': 0.50, '<170': 0.25 };
  ks.height = { label: 'Рост', k: heightMap[h] ?? 1.00, raw: h };

  const age = document.getElementById('m-age')?.value || '25-28';
  const income = document.getElementById('m-job')?.value || 'stable';
  let ageK = 1.00;
  if (age === '18-24') ageK = 0.60;
  else if (age === '25-28') ageK = 0.85;
  else if (age === '29-33') ageK = 1.00;
  else if (age === '34-38') ageK = 0.75;
  else if (age === '39-44') {
    if (income === 'stable' || income === 'business' || income === 'backend') ageK = 0.80;
    else if (income === 'low') ageK = 0.40;
    else ageK = 0.45;
  } else if (age === '45+') ageK = 0.25;
  ks.age = { label: 'Возраст', k: ageK, raw: age };

  const body = document.getElementById('m-body')?.value || 'normal';
  const bodyMap = { athletic: 1.15, normal: 1.00, thin: 0.80, overweight: 0.45, obese: 0.20 };
  ks.body = { label: 'Телосложение', k: bodyMap[body] ?? 1.00, raw: body };

  const children = document.getElementById('m-children')?.value || 'single';
  const childMap = { single: 1.00, divorced: 0.95, 'child-away': 0.60, 'child-with': 0.30 };
  ks.children = { label: 'Дети / статус', k: childMap[children] ?? 1.00, raw: children };

  const isUnusual = typeof hasUnusualHobbies !== 'undefined' ? hasUnusualHobbies : false;

  const job = document.getElementById('m-job')?.value || 'stable';
  let jobK = 1.00;
  if (job === 'stable') jobK = 1.00;
  else if (job === 'backend') {
    if (faceScore >= 7) {
      jobK = 1.00;
    } else {
      jobK = isUnusual ? 0.70 : 0.90;
    }
  }
  else if (job === 'humanitarian') jobK = faceScore >= 7 ? 0.85 : 0.55;
  else if (job === 'business') jobK = 0.70;
  else if (job === 'creative') {
    if (age === '18-24') jobK = faceScore >= 7 ? 0.60 : 0.30;
    else if (age === '25-28' || age === '29-33') jobK = 0.50;
    else jobK = 0.00;
  } else if (job === 'low') {
    jobK = age === '18-24' ? 0.20 : 0.00;
  }
  ks.job = { label: 'Профессия', k: jobK, raw: job };

  // Типаж самопрезентации (мужской)
  const type = document.getElementById('m-type')?.value || 'normie';
  let typeK = 1.00;
  if (type === 'normie') {
    typeK = 1.00;
  } else if (type === 'street') {
    typeK = 0.60;
  } else if (type === 'geek') {
    if (h === '<170') {
      typeK = 0.70;
    } else {
      typeK = faceScore >= 7 ? 1.20 : 0.80;
    }
  } else if (type === 'athlete') {
    typeK = faceScore >= 7 ? 1.20 : 1.00;
  }
  ks.type = { label: 'Типаж', k: typeK, raw: type };

  const pt = document.getElementById('photo-type')?.value || 'lifestyle';
  const heightNum = h === '185+' ? 185 : h === '180-184' ? 182 : h === '175-179' ? 177 : h === '170-174' ? 172 : 168;
  const photoK = getPhotoK(pt, heightNum, faceScore, 'male');
  ks.photo = { label: 'Визуал / фото', k: photoK, raw: pt };

  // Необычные интересы (мужской)
  let hobbyK = 1.0;
  if (isUnusual) {
    if (faceScore >= 7 && heightNum > 180) hobbyK = 1.2;
    else if (faceScore >= 7) hobbyK = 1.0;
    else hobbyK = 0.6;
  }
  ks.hobbies = { label: 'Интересы', k: hobbyK, raw: isUnusual ? 'unusual' : 'normal' };

  // Тип описания / BIO (мужской)
  const bioType = document.getElementById('bio-type')?.value || 'normal';
  let bioK = 1.0;
  if (bioType === 'empty') {
    bioK = 0.80;
  } else if (bioType === 'aggro') {
    bioK = 0.40;
  } else if (bioType === 'insta') {
    bioK = 0.40;
  } else if (bioType === 'esoteric') {
    bioK = 0.50;
  } else if (bioType === 'alpha') {
    bioK = 0.30;
  }
  ks.bio = { label: 'Тип описания', k: bioK, raw: bioType };

  // Сепарация и жилищный статус (мужской)
  const housing = document.getElementById('housing-status')?.value || 'own';
  let housingK = 1.00;
  if (housing === 'dorm') {
    housingK = age === '18-24' ? 0.50 : 0.30;
  } else if (housing === 'coliving' || housing === 'parents') {
    if (age === '18-24') {
      housingK = 0.75;
    } else if (age === '25-28' || age === '29-33') {
      housingK = 0.40;
    } else {
      housingK = 0.10; // 33+ года
    }
  } else {
    housingK = 1.00; // own
  }
  ks.housing = { label: 'Жильё', k: housingK, raw: housing };

  // Радиус доступности (транспортный friction) (мужской)
  const loc = document.getElementById('location-radius')?.value || 'center';
  let locK = 1.00;
  if (loc === 'suburb') locK = 0.80;
  else if (loc === 'oblast') locK = 0.40;
  else locK = 1.00; // center
  ks.location = { label: 'Локация / метро', k: locK, raw: loc };

  // Невербальные маркеры на фото (Скрытый чек-лист)
  const dental = document.getElementById('marker-dental')?.checked;
  const pathos = document.getElementById('marker-pathos')?.checked;
  const sport = document.getElementById('marker-sport')?.checked;

  let markersK = 1.0;
  if (dental) markersK *= 0.75;
  if (pathos) markersK *= 0.40;
  if (sport) markersK *= 0.75;

  ks.markers = {
    label: 'Невербалика фото',
    k: Math.round(markersK * 1000) / 1000,
    raw: dental || pathos || sport ? 'active' : 'none'
  };

  // Стиль первого сообщения / Опенер (мужской)
  const opener = document.getElementById('chat-opener')?.value || 'standard';
  let openerK = 0.85;
  if (opener === 'context') openerK = 1.15;
  else if (opener === 'standard') openerK = 0.85;
  else if (opener === 'aggressive') openerK = 0.50;
  else if (opener === 'silent') openerK = 0.40;

  ks.opener = {
    label: 'Стиль общения',
    k: openerK,
    raw: opener
  };

  return ks;
}

/**
 * Female multipliers breakdown
 */
function getFemaleK(faceScore) {
  const ks = {};

  const age = document.getElementById('f-age')?.value || '23-29';
  const ageMap = { '18-22': 1.15, '23-29': 1.30, '30-37': 0.80, '38-41': 0.50, '42+': 0.40 };
  ks.age = { label: 'Возраст', k: ageMap[age] ?? 1.00, raw: age };

  const body = document.getElementById('f-body')?.value || 'normal';
  const bodyMap = { slim: 1.50, normal: 1.00, curvy: 0.70, plus: 0.30 };
  ks.body = { label: 'Телосложение', k: bodyMap[body] ?? 1.00, raw: body };

  const h = document.getElementById('f-height')?.value || '150-168';
  const heightMap = { '150-168': 1.00, '169-174': 0.90, '175+': 0.65 };
  ks.height = { label: 'Рост', k: heightMap[h] ?? 1.00, raw: h };

  const children = document.getElementById('f-children')?.value || 'none';
  const childMap = { none: 1.00, 'child-12+': 0.40, 'child-under-12': 0.20 };
  ks.children = { label: 'Дети', k: childMap[children] ?? 1.00, raw: children };

  // Необычные интересы (женский)
  const isUnusual = typeof hasUnusualHobbies !== 'undefined' ? hasUnusualHobbies : false;

  const type = document.getElementById('f-type')?.value || 'girl-next-door';
  let typeK = 1.00;
  if (type === 'girl-next-door') typeK = 1.00;
  else if (type === 'alt') {
    const bodyVal = document.getElementById('f-body')?.value || 'normal';
    if (bodyVal === 'slim' && faceScore >= 6) {
      typeK = 0.80;
    } else if (bodyVal === 'curvy' && faceScore >= 8 && isUnusual) {
      typeK = 0.43; // Смягченный штраф: привлекательный альт-профиль с формами и гик-интересами (DLI ~60.8%)
    } else {
      typeK = 0.35;
    }
  } else if (type === 'insta') typeK = 0.65;
  else if (type === 'corporate') typeK = 0.75;
  ks.type = { label: 'Типаж', k: typeK, raw: type };

  // Профессия (женский)
  ks.job = { label: 'Профессия', k: 1.00, raw: 'any' };

  const pt = document.getElementById('photo-type')?.value || 'lifestyle';
  const photoK = getPhotoK(pt, 0, faceScore, 'female');
  ks.photo = { label: 'Визуал / фото', k: photoK, raw: pt };

  // Необычные интересы (женский — бонус для привлекательных гик-девушек)
  let hobbyK = 1.0;
  if (isUnusual) {
    hobbyK = faceScore >= 7 ? 1.2 : 0.6;
  }
  ks.hobbies = { label: 'Интересы', k: hobbyK, raw: isUnusual ? 'unusual' : 'normal' };

  // Тип описания / BIO (женский)
  const bioType = document.getElementById('bio-type')?.value || 'normal';
  let bioK = 1.0;
  if (bioType === 'empty') {
    bioK = 1.0;
  } else if (bioType === 'aggro') {
    bioK = faceScore >= 7 ? 1.0 : 0.70;
  } else if (bioType === 'insta') {
    bioK = faceScore >= 7 ? 0.90 : 0.70;
  } else if (bioType === 'esoteric') {
    bioK = faceScore >= 7 ? 1.0 : 0.80;
  } else if (bioType === 'alpha') {
    bioK = 1.0;
  }
  ks.bio = { label: 'Тип описания', k: bioK, raw: bioType };

  // Сепарация и жилищный статус (женский)
  const housing = document.getElementById('housing-status')?.value || 'own';
  let housingK = 1.00;
  if (housing === 'parents' || housing === 'coliving') {
    housingK = 0.90;
  } else if (housing === 'dorm') {
    housingK = 0.80;
  } else {
    housingK = 1.00; // own
  }
  ks.housing = { label: 'Жильё', k: housingK, raw: housing };

  // Радиус доступности (транспортный friction) (женский)
  const loc = document.getElementById('location-radius')?.value || 'center';
  let locK = 1.00;
  if (loc === 'suburb') locK = 1.00;
  else if (loc === 'oblast') locK = 0.80;
  else locK = 1.00; // center
  ks.location = { label: 'Локация / метро', k: locK, raw: loc };

  // Невербальные маркеры на фото (Скрытый чек-лист)
  const dental = document.getElementById('marker-dental')?.checked;
  const pathos = document.getElementById('marker-pathos')?.checked;
  const sport = document.getElementById('marker-sport')?.checked;

  let markersK = 1.0;
  if (dental) markersK *= 0.75;
  if (pathos) markersK *= 0.40;
  if (sport) markersK *= 0.75;

  ks.markers = {
    label: 'Невербалика фото',
    k: Math.round(markersK * 1000) / 1000,
    raw: dental || pathos || sport ? 'active' : 'none'
  };

  // Стиль первого сообщения / Опенер (женский)
  const opener = document.getElementById('chat-opener')?.value || 'standard';
  let openerK = 0.85;
  if (opener === 'context') openerK = 1.15;
  else if (opener === 'standard') openerK = 0.85;
  else if (opener === 'aggressive') openerK = 0.50;
  else if (opener === 'silent') openerK = 1.00;

  ks.opener = {
    label: 'Стиль общения',
    k: openerK,
    raw: opener
  };

  return ks;
}

/**
 * Tier determination
 */
function getTier(dli, gender = (typeof currentGender !== 'undefined' ? currentGender : 'male')) {
  if (dli >= 110) return { label: 'Любимчик алгоритмов', tag: 'AAA', color: '#4ade80' };
  if (dli >= 75) return { label: 'Стабильный нормис', tag: ' A ', color: '#4ade80' };
  if (dli >= 45) return { label: 'Дейтинг-трудоголик', tag: ' B ', color: '#fbbf24' };
  if (dli >= 25) return { label: 'Придется попотеть', tag: ' C ', color: '#fbbf24' };
  if (dli >= 10 || gender === 'female') return { label: 'Нишевый артхаус', tag: ' D ', color: '#f87171' };
  return { label: 'Мёртвая петля алгоритма', tag: '!!!', color: '#f87171' };
}

/**
 * Market percentile calculation
 */
function getPercentile(dli) {
  if (dli >= 140) return { text: 'топ-2% рынка', desc: 'максимальная ликвидность' };
  if (dli >= 110) return { text: 'топ-5% рынка', desc: 'высокая ликвидность' };
  if (dli >= 90) return { text: 'топ-15% рынка', desc: 'выше среднего' };
  if (dli >= 75) return { text: 'топ-30% рынка', desc: 'крепкая рыночная норма' };
  if (dli >= 45) return { text: 'топ-50% рынка', desc: 'медианный сегмент' };
  if (dli >= 25) return { text: 'топ-70% рынка', desc: 'повышенный friction' };
  if (dli >= 10) return { text: 'топ-85% рынка', desc: 'нишевый сегмент' };
  if (dli > 0) return { text: 'топ-95% рынка', desc: 'критическое сопротивление' };
  return { text: '0% охвата', desc: 'коллапс воронки' };
}

/**
 * Funnel metrics calculation: match rate, swipes per match, days to date, matches to date, swipes per date
 */
function getFunnelMetrics(dli, gender = (typeof currentGender !== 'undefined' ? currentGender : 'male')) {
  if (dli <= 0) {
    return {
      isZero: true,
      swipesToDate: '∞',
      swipesToMatch: '∞',
      daysToDate: '∞',
      daysToDateStr: '∞ дней',
      daysToMatch: '∞',
      matchesToDate: '∞',
      matchRateStr: '0%'
    };
  }

  const dliFrac = dli / 100;
  const matchRateNum = 15 * dliFrac;
  const matchRateStr = matchRateNum.toFixed(1) + '%';

  // 1) Свайпов на 1 мэтч
  const sMatch = Math.max(1, Math.round(100 / matchRateNum));

  // 2) Мэтчей на 1 свидание:
  // Для парней: базовые 25 мэтчей при DLI = 100%
  // Для девушек: базовые 7 мэтчей при DLI = 100%
  const baseMatches = gender === 'female' ? 7 : 25;
  const mDate = gender === 'female'
    ? Math.max(2, Math.round(baseMatches / dliFrac))
    : Math.max(5, Math.round(baseMatches / dliFrac));

  // 3) Итого свайпов на 1 свидание
  const sDate = sMatch * mDate;

  // 4) Дней в приложении до 1 свидания при темпе 200 свайпов/день
  const daysNum = sDate / 200;
  let daysToDateStr = '';
  if (daysNum < 1) {
    daysToDateStr = '<1 дня';
  } else if (daysNum < 60) {
    daysToDateStr = `≈${Math.round(daysNum)} дн.`;
  } else {
    const months = (daysNum / 30).toFixed(1);
    daysToDateStr = `≈${Math.round(daysNum)} дн. (~${months} мес.)`;
  }

  return {
    isZero: false,
    swipesToDate: sDate.toLocaleString('ru'),
    swipesToMatch: sMatch.toLocaleString('ru'),
    daysToDate: Math.round(daysNum),
    daysToDateStr,
    daysToMatch: daysToDateStr,
    matchesToDate: mDate.toLocaleString('ru'),
    matchRateStr
  };
}

/**
 * Tier analysis verdict generator
 */
function getTierVerdict(dli, tier, ks, gender = (typeof currentGender !== 'undefined' ? currentGender : 'male')) {
  const penaltyEntries = Object.entries(ks)
    .filter(([, v]) => v.k < 0.99)
    .sort((a, b) => a[1].k - b[1].k);

  const driverEntries = Object.entries(ks)
    .filter(([, v]) => v.k > 1.05)
    .sort((a, b) => b[1].k - a[1].k);

  function formatFactor(key, v) {
    if (key === 'height') return gender === 'male' ? 'ростовой ценз' : 'высокий рост';
    if (key === 'housing') return 'логистика жилья (проживание не отдельно)';
    if (key === 'location') return 'транспортный friction (удалённость)';
    if (key === 'photo') return 'подача фото';
    if (key === 'markers') return 'невербальные маркеры фото';
    if (key === 'job') return 'фильтр по профессии';
    if (key === 'bio') return 'специфика описания профиля';
    if (key === 'age') return 'возрастная категория';
    if (key === 'body') return 'телосложение';
    if (key === 'children') return 'семейный статус / дети';
    if (key === 'type') return 'типаж самопрезентации';
    if (key === 'hobbies') return 'нишевые интересы';
    if (key === 'opener') return 'стиль первого сообщения / переписки';
    return v.label.toLowerCase();
  }

  function formatDriver(key, v) {
    if (key === 'height') return 'высокий рост';
    if (key === 'body') return gender === 'female' ? 'стройная фигура' : 'атлетичная форма';
    if (key === 'photo') return 'лайфстайл-визуал';
    if (key === 'hobbies') return 'нишевые интересы';
    if (key === 'age') return 'пиковый возраст';
    if (key === 'type') return 'выигрышный типаж';
    if (key === 'opener') return 'остроумный стиль переписки';
    return v.label.toLowerCase();
  }

  const topPenalties = penaltyEntries.slice(0, 2).map(([k, v]) => formatFactor(k, v));
  const penaltyStr = topPenalties.length > 0 ? topPenalties.join(' и ') : 'ряд небольших штрафов';

  const topDrivers = driverEntries.slice(0, 2).map(([k, v]) => formatDriver(k, v));
  const driverStr = topDrivers.length > 0 ? topDrivers.join(' и ') : '';

  const zeroEntry = penaltyEntries.find(([, v]) => v.k === 0);
  const zeroFactor = zeroEntry ? formatFactor(zeroEntry[0], zeroEntry[1]) : '';

  const activeTier = tier || getTier(dli, gender);
  const tag = activeTier.tag ? activeTier.tag.trim() : '';

  const funnel = getFunnelMetrics(dli, gender);
  const mCount = funnel.matchesToDate;

  if (tag === 'AAA') {
    return `Дефолтный карт-бланш платформы. Все ключевые мультипликаторы${driverStr ? ' (особенно ' + driverStr + ')' : ''} работают в синергии и усиливают друг друга. Профиль в топе алгоритмов: на 1 оффлайн-свидание нужно всего ~${mCount} мэтчей.`;
  }
  if (tag === 'A') {
    return `Крепкая рыночная позиция. Анкета сбалансирована: базовые параметры в комфортной зоне${driverStr ? ', а ' + driverStr + ' дают приятный буст' : ''}. Критических штрафов нет: на 1 свидание уходит комфортные ~${mCount} мэтчей на органическом трафике.`;
  }
  if (tag === 'B') {
    return `Рабочий, но энергозатратный профиль. Ликвидность есть, однако итоговый индекс ощутимо срезают ${penaltyStr}. Из-за растущего сопротивления в диалогах для 1 свидания потребуется уже ~${mCount} мэтчей.`;
  }
  if (tag === 'C') {
    return `Повышенное сопротивление алгоритмов. Придется попотеть: анкета уступает конкурентам из-за ${penaltyStr}. Конверсия в переписках снижена — чтобы организовать 1 свидание, придётся перебрать около ~${mCount} мэтчей.`;
  }
  if (tag === 'D') {
    if (gender === 'female') {
      return `Специфический сегмент воронки. Сработал кумулятивный эффект мультипликатора: наложились ${penaltyStr}. Однако за счет входящего потока нулевой ликвидности у девушек не бывает: на 1 свидание нужно ~${mCount} мэтчей.`;
    }
    return `Экстремально высокий CAC лида. Мультипликаторы (${penaltyStr}) загнали профиль в глубокую нишу. На 1 свидание уйдёт ~${mCount} мэтчей при постоянном риске гостинга.`;
  }
  return `Коллапс воронки. Сработал критический стоп-фактор (${zeroFactor || penaltyStr}), который фактически заблокировал профиль в выдаче алгоритмов масс-маркета.`;
}

// ─── Global Scope Export ──────────────────────────────────
if (typeof window !== 'undefined') {
  window.BIO_OPTIONS_MALE = BIO_OPTIONS_MALE;
  window.BIO_OPTIONS_FEMALE = BIO_OPTIONS_FEMALE;
  window.PHOTO_OPTIONS = PHOTO_OPTIONS;
  window.OPENER_OPTIONS = OPENER_OPTIONS;
  window.getPhotoK = getPhotoK;
  window.getMaleK = getMaleK;
  window.getFemaleK = getFemaleK;
  window.getTier = getTier;
  window.getPercentile = getPercentile;
  window.getFunnelMetrics = getFunnelMetrics;
  window.getTierVerdict = getTierVerdict;
}

