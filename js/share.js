/* ══════════════════════════════════════════════════════════
   DATING LIQUIDITY INDEX (DLI) - SHARING & CANVAS EXPORT
══════════════════════════════════════════════════════════ */

/**
 * Canonical application URL
 */
function getAppUrl() {
  return 'https://gcodegspot.github.io/dating-calculator-2.0';
}

/**
 * Format tier label for sharing strings
 */
function formatTierForShare(tier) {
  return tier.label.toLowerCase();
}

/**
 * Build textual summary for Telegram share
 */
function buildTelegramShareText(dli, tier, ks) {
  const tierFormatted = formatTierForShare(tier);
  const percentile = getPercentile(dli);
  const appUrl = getAppUrl();
  return `я ${tierFormatted} (${percentile.text})\nузнай свою дейтинг ликвидность: ${appUrl}`;
}

/**
 * Render dynamic rectangular result card onto an offscreen Canvas
 */
function generateResultImage(dli, tier, ks) {
  const W = 1080;
  const PAD = 56;
  const cardW = W - PAD * 2;
  const cardCX = W / 2;

  const C = {
    bg: '#0d0d0d',
    surface: '#141414',
    border: '#222222',
    dim: '#3d3d3d',
    faint: '#525252',
    mid: '#8a8a8a',
    text: '#d4d4d4',
    bright: '#f5f5f5',
    green: '#4ade80',
    amber: '#fbbf24',
    red: '#f87171',
  };

  const accentColor = tier.color;
  const gender = typeof currentGender !== 'undefined' ? currentGender : 'male';

  // Measure verdict text height
  const measureCanvas = document.createElement('canvas');
  const mCtx = measureCanvas.getContext('2d');
  const vFont = '400 14px "JetBrains Mono", monospace';
  mCtx.font = vFont;

  const verdict = getTierVerdict(dli, tier, ks, gender);
  const words = verdict.split(' ');
  const vLines = [];
  let currentLine = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? (currentLine + ' ' + words[i]) : words[i];
    if (mCtx.measureText(testLine).width > (cardW - 48) && currentLine) {
      vLines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) vLines.push(currentLine);

  const vLineH = 25;
  const vH = Math.max(140, 56 + vLines.length * vLineH + 20);

  // Vertical layout coordinates
  const entries = Object.entries(ks);
  const half = Math.ceil(entries.length / 2);
  const rowH = 54;
  const cardH = 46;

  const headerY = PAD + 12;
  const percentY = headerY + 104;
  const badgeY = percentY + 20;
  const badgeH = 36;
  const metricsY = badgeY + badgeH + 26;
  const mH = 102;
  const coefHeaderY = metricsY + mH + 26;
  const coefTableY = coefHeaderY + 20;
  const coefTableBottom = coefTableY + (half - 1) * rowH + cardH;
  const verdictY = coefTableBottom + 24;
  const verdictBottom = verdictY + vH;

  // Exact rectangular canvas height without bottom empty space
  const H = verdictBottom + PAD;

  const canvas = document.createElement('canvas');
  canvas.width = W * 2;
  canvas.height = H * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  function rect(x, y, w, h, fill, stroke, radius = 0) {
    ctx.beginPath();
    if (radius > 0 && typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, radius);
    } else {
      ctx.rect(x, y, w, h);
    }
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  }

  function text(str, x, y, font, color, align = 'left', baseline = 'alphabetic') {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(str, x, y);
  }

  function mono(str, x, y, size, color, align = 'left', weight = '400') {
    text(str, x, y, `${weight} ${size}px "JetBrains Mono", monospace`, color, align);
  }

  function scanlines() {
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.035)';
      ctx.fillRect(0, y + 2, W, 2);
    }
  }

  function progressBar(x, y, w, value, maxVal, color) {
    rect(x, y, w, 6, C.border, null, 3);
    const filled = Math.max(0, Math.min(w, (value / maxVal) * w));
    if (filled > 0) rect(x, y, filled, 6, color, null, 3);
  }

  // Background
  rect(0, 0, W, H, C.bg);
  scanlines();

  // 1. Header
  if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
  mono('МОЯ ДЕЙТИНГ-ЛИКВИДНОСТЬ', cardCX, headerY, 26, C.bright, 'center', '700');
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

  // 2. Large percentage & Tier badge
  const dliStr = dli.toFixed(1) + '%';
  ctx.font = '700 104px "JetBrains Mono", monospace';
  ctx.fillStyle = accentColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(dliStr, cardCX, percentY);

  const percentile = getPercentile(dli);
  const tierLabel = `[ ${tier.tag.trim()} ]  ${tier.label}  ·  ${percentile.text}`;
  const badgeW = Math.max(420, Math.min(cardW - 40, tierLabel.length * 8.5 + 44));
  rect(cardCX - badgeW / 2, badgeY, badgeW, badgeH, accentColor + '12', accentColor + '40', 6);
  mono(tierLabel, cardCX, badgeY + 23, 13, accentColor, 'center', '600');

  // 3. Three Metrics Cards
  const funnel = getFunnelMetrics(dli, gender);

  const gapM = 16;
  const mW = (cardW - gapM * 2) / 3;
  const metrics = [
    {
      val: funnel.swipesToMatch,
      sub: 'свайпов на 1 мэтч',
      sub2: 'людям с похожим DLI'
    },
    {
      val: funnel.matchesToDate,
      sub: 'мэтчей на 1 свидание',
      sub2: 'приводит к встрече'
    },
    {
      val: funnel.swipesToDate,
      sub: 'свайпов до свидания',
      sub2: funnel.isZero ? '∞ дней' : `${funnel.daysToDateStr} (по 200/день)`,
      accent: true
    },
  ];

  metrics.forEach((m, i) => {
    const mx = PAD + i * (mW + gapM);
    rect(mx, metricsY, mW, mH, C.surface, C.border, 8);
    mono(m.val, mx + mW / 2, metricsY + 43, 31, m.accent ? accentColor : C.bright, 'center', '700');
    mono(m.sub, mx + mW / 2, metricsY + 70, 12, C.mid, 'center', '500');
    if (m.sub2) mono(m.sub2, mx + mW / 2, metricsY + 88, 11, C.faint, 'center', '400');
  });

  // 4. Coefficients Table
  mono('коэффициенты (черта = норма, розовый = премия)', PAD, coefHeaderY, 13, C.faint, 'left', '500');
  mono(`${entries.length} параметров`, W - PAD, coefHeaderY, 13, C.faint, 'right', '500');

  const colGap = 16;
  const colW = (cardW - colGap) / 2;

  entries.forEach(([, v], i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const rx = PAD + col * (colW + colGap);
    const ry = coefTableY + row * rowH;

    rect(rx, ry, colW, cardH, C.surface, C.border, 6);

    const kCol = v.k > 1.0 ? '#f472b6' : v.k >= 1.0 ? C.green : v.k >= 0.6 ? C.amber : C.red;
    const kLabel = v.k === 0 ? 'DROP' : `x${v.k.toFixed(2)}`;

    mono(v.label, rx + 16, ry + 29, 13, C.text);
    mono(kLabel, rx + colW - 16, ry + 29, 13, kCol, 'right', '600');

    const barX = rx + 165;
    const barW = colW - 165 - 80;
    const tickX = barX + (1.0 / 1.5) * barW;

    // Track background
    rect(barX, ry + 20, barW, 6, C.border, null, 3);

    // Fill
    if (v.k <= 1.0) {
      const filledW = Math.max(0, Math.min(barW, (v.k / 1.5) * barW));
      if (filledW > 0) rect(barX, ry + 20, filledW, 6, kCol, null, 3);
    } else {
      // Base green up to 1.0
      const baseW = (1.0 / 1.5) * barW;
      rect(barX, ry + 20, baseW, 6, C.green, null, 3);
      // Bonus pink above 1.0
      const bonusW = Math.min(barW - baseW, ((v.k - 1.0) / 1.5) * barW);
      if (bonusW > 0) rect(tickX, ry + 20, bonusW, 6, '#f472b6', null, 3);
    }

    // Tick mark at 1.0 (нормальная норма)
    rect(tickX - 1, ry + 17, 2, 12, '#666666', null, 1);
  });

  // 5. Verdict Card (ИТОГОВОЕ ЗАКЛЮЧЕНИЕ)
  rect(PAD, verdictY, cardW, vH, C.surface, C.border, 8);

  text('$', PAD + 24, verdictY + 28, '700 13px "JetBrains Mono", monospace', C.green);
  text('--tier analysis', PAD + 38, verdictY + 28, '500 13px "JetBrains Mono", monospace', C.mid);

  ctx.font = vFont;
  ctx.fillStyle = C.text;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  vLines.forEach((line, idx) => {
    ctx.fillText(line, PAD + 24, verdictY + 58 + idx * vLineH);
  });

  return canvas;
}

/**
 * Safely trigger browser file download for a Canvas element
 */
function downloadCanvas(canvas, fileName) {
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (dlErr) {
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }, 'image/png');
  }
}

/**
 * Handle Telegram and Native sharing workflow
 */
async function shareResult(dli, tier, ks) {
  const btn = document.getElementById('share-btn');
  const txt = document.getElementById('share-btn-text');
  const original = txt ? txt.textContent : 'отправить диагноз в telegram';

  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
  if (txt) txt.textContent = 'генерируем...';

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const canvas = generateResultImage(dli, tier, ks);
    const shareText = buildTelegramShareText(dli, tier, ks);
    const [line1, line2] = shareText.split('\n');
    const fileName = `dating-liquidity-${Math.round(dli)}pct.png`;
    const tgUrl = 'https://t.me/share/url?url=' + encodeURIComponent(line1) + '&text=' + encodeURIComponent(line2);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 2 && /Macintosh/.test(navigator.userAgent));

    let sharedViaNative = false;

    if (isMobile && typeof navigator.share === 'function') {
      try {
        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        if (blob) {
          const file = new File([blob], fileName, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Моя дейтинг-ликвидность',
              text: shareText,
            });
            sharedViaNative = true;
          } else {
            await navigator.share({
              title: 'Моя дейтинг-ликвидность',
              text: shareText,
            });
            sharedViaNative = true;
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          sharedViaNative = true;
        }
      }
    }

    if (!sharedViaNative) {
      downloadCanvas(canvas, fileName);

      // Copy image to clipboard for quick paste
      if (navigator.clipboard && window.ClipboardItem) {
        canvas.toBlob(blob => {
          if (blob) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).catch(() => {});
          }
        }, 'image/png');
      }

      // Open Telegram share
      const win = window.open(tgUrl, '_blank', 'noopener');
      if (!win) {
        window.location.href = tgUrl;
      }
    }

    if (txt) txt.textContent = '✓ открыто!';
    if (btn) {
      btn.style.color = '#4ade80';
      btn.style.opacity = '1';
    }
  } catch (e) {
    console.error('Share error:', e);
    if (txt) txt.textContent = original;
  }

  setTimeout(() => {
    if (btn) {
      btn.style.color = '';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
    if (txt) txt.textContent = original;
  }, 3500);
}

/**
 * Copy result card PNG image directly to clipboard
 */
async function copyCardResult() {
  const result = typeof lastResult !== 'undefined' ? lastResult : (window.lastResult || null);
  if (!result) return;
  const btn = document.getElementById('copy-btn');
  const txt = document.getElementById('copy-btn-text');
  const original = txt ? txt.textContent : 'копировать карточку';

  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
  if (txt) txt.textContent = 'копируем...';

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const canvas = generateResultImage(result.dli, result.tier, result.ks);
    const fileName = `dating-liquidity-${Math.round(result.dli)}pct.png`;

    let copied = false;
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const blobPromise = new Promise(res => canvas.toBlob(res, 'image/png'));
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobPromise })]);
        copied = true;
      } catch (clipErr) {
        try {
          const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
          if (blob) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            copied = true;
          }
        } catch (e2) {
          console.warn('Clipboard write failed, falling back to download:', e2);
        }
      }
    }

    if (copied) {
      if (txt) txt.textContent = '✓ скопировано в буфер!';
      if (btn) btn.style.color = '#4ade80';
    } else {
      downloadCanvas(canvas, fileName);
      if (txt) txt.textContent = '✓ карточка скачана!';
      if (btn) btn.style.color = '#4ade80';
    }
  } catch (err) {
    console.error('Copy card error:', err);
    if (txt) txt.textContent = 'ошибка копирования';
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.color = '';
    }
    if (txt) txt.textContent = original;
  }, 2500);
}

/**
 * Helper to share the currently active calculation
 */
function shareCurrentResult() {
  const result = typeof lastResult !== 'undefined' ? lastResult : (window.lastResult || null);
  if (!result) return;
  shareResult(result.dli, result.tier, result.ks);
}

// ─── Global Scope Export ──────────────────────────────────
if (typeof window !== 'undefined') {
  window.getAppUrl = getAppUrl;
  window.formatTierForShare = formatTierForShare;
  window.buildTelegramShareText = buildTelegramShareText;
  window.generateResultImage = generateResultImage;
  window.downloadCanvas = downloadCanvas;
  window.shareResult = shareResult;
  window.copyCardResult = copyCardResult;
  window.shareCurrentResult = shareCurrentResult;
}

