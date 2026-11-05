/* 我爱去图书馆 — 首页数据与交互
   ★ 改歌手资料 / 主题配色 / 代表曲目：artists-data.js（首页与歌手子页共用）
   ★ 改主题：每个音乐人的 theme（paper/paper2/ink/accent/accent2/heroAccent）与 art（主视觉图）
   ★ 改歌单音源：TRACKS 里的 play（可直链试听的歌曲 id）、netease（原版 id，用于内嵌播放器）
     也可把任意来源的 mp3 放进 assets/audio/，命名 01.mp3 ~ 10.mp3，页面会优先播放它
   ★ 改搜索外链平台：NETEASE_SEARCH 常量（详情抽屉里的代表作仍用它）
   默认主题由 DEFAULT_ID 指定（痛仰 · 哪吒）。 */

const DEFAULT_ID = 'tongyang';

/* ARTISTS 已抽到 artists-data.js（首页与歌手子页共用）；本文件只负责首页交互 */

/* play   = 平台公开可直链播放的版本 id（点击即自动播放）
   netease= 原版 id，用于官方内嵌播放器 / 搜索外链
   ver    = 直链版本与原版不同时的说明，会显示在播放条上
   没有 play 的曲目（版权限制）会自动使用官方内嵌播放器，同样留在本页 */
const TRACKS = [
  { title: '云烟成雨', artist: '房东的猫', genre: '民谣', play: 1843021092, netease: 513360721, ver: '现场版' },
  { title: '大风吹', artist: '草东没有派对', genre: '摇滚', play: null, netease: 411314657 },
  { title: '成都', artist: '赵雷', genre: '民谣', play: 1888108371, netease: 436514312, ver: '现场版' },
  { title: '遇见', artist: '孙燕姿', genre: '华语流行', play: 34200629, netease: 454828887, ver: 'Live 版' },
  { title: '公路之歌', artist: '痛仰乐队', genre: '摇滚', play: 381825, netease: 381825 },
  { title: '夜空中最亮的星', artist: '逃跑计划', genre: '摇滚', play: 2725889599, netease: 25706282, ver: '重制版' },
  { title: '杀死那个石家庄人', artist: '万能青年旅店', genre: '摇滚', play: 386844, netease: 386844 },
  { title: '山海', artist: '草东没有派对', genre: '摇滚', play: null, netease: 411314659 },
  { title: '我记得', artist: '赵雷', genre: '民谣', play: null, netease: 1974443814 },
  { title: '秦皇岛', artist: '万能青年旅店', genre: '摇滚', play: 386835, netease: 386835 }
];

/* ---------- 音源与外链 ---------- */
const NETEASE_SEARCH = 'https://music.163.com/#/search/m/?s=';
const AUDIO_DIR = 'assets/audio/';                 // 可选：本地音频（任意来源），01.mp3 ~ 10.mp3
const OUTER_MP3 = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
const EMBED_PLAYER = id => `https://music.163.com/outchain/player?type=2&id=${id}&auto=1&height=66`;
function neteaseUrl(title, artist) {
  return `${NETEASE_SEARCH}${encodeURIComponent(`${title} ${artist}`)}&type=1`;
}

/* ---------- 渲染音乐人卡片 ----------
   每张卡片注入「自己这份主题」的纸色与墨色：鼠标移上去时，卡片就预览
   点进去之后整站会变成的背景色，而不是共用的一个全局强调色 */
function inkRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
const grid = document.getElementById('artistGrid');
grid.innerHTML = ARTISTS.map((a, i) => {
  const ink = a.theme.ink;
  const hoverVars = [
    `--card-accent:${a.theme.accent}`,
    `--card-paper:${a.theme.paper}`,
    `--card-ink:${ink}`,
    `--card-ink-70:${inkRgba(ink, .72)}`,
    `--card-ink-55:${inkRgba(ink, .55)}`,
    `--card-ink-28:${inkRgba(ink, .28)}`
  ].join('; ');
  return `
  <article class="artist-card${a.featured ? ' featured' : ''}${a.wide ? ' wide' : ''}${a.id === DEFAULT_ID ? ' is-active' : ''}"
       role="button" tabindex="0" data-id="${a.id}"
       style="${hoverVars}; transition-delay:${(i % 3) * 80}ms"
       aria-label="把整站主题切换为 ${a.name}，取意自《${a.album}》">
    <div class="card-top">
      <span class="card-num">NO.${a.num}</span>
      <span class="card-from">${a.from}</span>
    </div>
    ${a.badge ? `<span class="badge">${a.badge}</span>` : ''}
    <div class="card-main">
      <p class="card-en">${a.en}</p>
      <h3 class="card-name">${a.name}</h3>
      <p class="card-tagline">${a.tagline}</p>
    </div>
    <div class="card-bottom">
      <span class="card-genre">《${a.album}》</span>
      <div class="card-actions">
        <button class="card-info" type="button" data-info="${a.id}" aria-label="查看 ${a.name} 的资料">资料</button>
        <a class="card-songs" href="artist.html?id=${a.id}" aria-label="查看 ${a.name} 的歌曲">TA 的歌 →</a>
        <span class="card-action" aria-hidden="true">换主题 ↗</span>
      </div>
    </div>
  </article>
`; }).join('');

/* ---------- 渲染歌单（整行是按钮，点击在本页播放，不跳转） ---------- */
const trackList = document.getElementById('trackList');
trackList.innerHTML = TRACKS.map((t, i) => `
  <li class="track" style="transition-delay:${Math.min(i, 6) * 45}ms">
    <button class="track-link" type="button" data-i="${i}"
       title="在本页播放《${t.title}》" aria-label="在本页播放《${t.title}》 ${t.artist}">
      <span class="track-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="track-title">${t.title}</span>
      <span class="track-artist">${t.artist}</span>
      <span class="track-tag">${t.genre}</span>
      <span class="track-mark"><span class="mark-label">播放</span><span class="arrow">▶</span></span>
    </button>
  </li>
`).join('');

/* ---------- 站内播放器 ----------
   音源链：本地 assets/audio/NN.mp3 → 平台公开试听直链 → 官方内嵌播放器
   三级兜底全部留在本页，点击歌单不会打开新标签。 */
const playerBar = document.getElementById('playerBar');
const audioEl = document.getElementById('audioEl');
const pbTitle = document.getElementById('pbTitle');
const pbSub = document.getElementById('pbSub');
const pbTime = document.getElementById('pbTime');
const pbDur = document.getElementById('pbDur');
const pbSeek = document.getElementById('pbSeek');
const pbVol = document.getElementById('pbVol');
const pbToggle = document.getElementById('pbToggle');
const pbOfficial = document.getElementById('pbOfficial');
const pbEmbed = document.getElementById('pbEmbed');
const pbFrame = document.getElementById('pbFrame');
const pbTip = document.getElementById('pbTip');
let cur = -1, mode = 'audio', sources = [], sourceIdx = 0;

const fmtTime = s => {
  s = Math.floor(s || 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

function markPlaying(i) {
  document.querySelectorAll('.track').forEach((el, k) => {
    const on = k === i;
    el.classList.toggle('is-playing', on);
    const label = el.querySelector('.mark-label');
    const arrow = el.querySelector('.arrow');
    if (label) label.textContent = on ? '播放中' : '播放';
    if (arrow) arrow.textContent = on ? '❚❚' : '▶';
  });
}

function useEmbed() {
  mode = 'embed';
  audioEl.pause();
  audioEl.removeAttribute('src');
  audioEl.load();
  playerBar.classList.add('is-embed');
  pbEmbed.hidden = false;
  pbFrame.src = EMBED_PLAYER(TRACKS[cur].netease);
  pbOfficial.textContent = '返回直链';
  /* 本就没有直链、本地也没放文件时，切回直链只会立刻降级，隐藏这个按钮 */
  pbOfficial.hidden = !TRACKS[cur].play;
  pbTip.textContent = TRACKS[cur].play
    ? '当前音源暂不可用，已切换为官方内嵌播放器 · 点播放器上的 ▶ 开始'
    : '这首受版权限制，已用官方内嵌播放器播放原版 · 点播放器上的 ▶ 开始';
}

function loadSource() {
  if (sourceIdx >= sources.length) { useEmbed(); return; }
  playerBar.classList.remove('is-embed');
  pbEmbed.hidden = true;
  pbFrame.src = 'about:blank';
  pbOfficial.textContent = '官方版';
  pbOfficial.hidden = false;
  pbTime.textContent = '0:00';
  pbDur.textContent = '0:00';
  pbSeek.value = 0;
  audioEl.src = sources[sourceIdx];
  audioEl.load();
  const p = audioEl.play();
  if (p && p.catch) p.catch(err => {
    /* 浏览器禁止自动出声时，等用户点播放键，不要误判为音源失效 */
    if (err && err.name === 'NotAllowedError') {
      pbTip.textContent = '点击 ▶ 开始播放';
      playerBar.classList.add('is-paused');
    }
  });
}

function playTrack(i) {
  cur = (i + TRACKS.length) % TRACKS.length;
  const t = TRACKS[cur];
  playerBar.hidden = false;
  document.body.classList.add('has-player');
  pbTitle.textContent = t.title;
  pbSub.textContent = `${t.artist}${t.ver ? ' · ' + t.ver : ''} · 本页播放`;
  pbTip.textContent = '';
  markPlaying(cur);

  mode = 'audio';
  sources = [AUDIO_DIR + String(cur + 1).padStart(2, '0') + '.mp3'];
  if (t.play) sources.push(OUTER_MP3(t.play));
  sourceIdx = 0;
  loadSource();
}

function closePlayer() {
  audioEl.pause();
  audioEl.removeAttribute('src');
  audioEl.load();
  pbFrame.src = 'about:blank';
  playerBar.hidden = true;
  document.body.classList.remove('has-player');
  markPlaying(-1);
  cur = -1;
}

trackList.addEventListener('click', e => {
  const btn = e.target.closest('.track-link');
  if (btn) playTrack(Number(btn.dataset.i));
});
document.getElementById('pbPrev').addEventListener('click', () => playTrack(cur - 1));
document.getElementById('pbNext').addEventListener('click', () => playTrack(cur + 1));
document.getElementById('pbClose').addEventListener('click', closePlayer);
pbToggle.addEventListener('click', () => {
  if (mode !== 'audio') return;
  if (audioEl.paused) audioEl.play().catch(() => {}); else audioEl.pause();
});
pbOfficial.addEventListener('click', () => {
  if (mode === 'embed') playTrack(cur); else useEmbed();
});
pbVol.addEventListener('input', () => { audioEl.volume = Number(pbVol.value); });
pbSeek.addEventListener('input', () => {
  if (audioEl.duration) audioEl.currentTime = pbSeek.value / 1000 * audioEl.duration;
});
audioEl.volume = 0.8;
audioEl.addEventListener('error', () => { if (mode === 'audio') { sourceIdx++; loadSource(); } });
audioEl.addEventListener('playing', () => { pbToggle.textContent = '❚❚'; playerBar.classList.remove('is-paused'); });
audioEl.addEventListener('pause', () => { pbToggle.textContent = '▶'; playerBar.classList.add('is-paused'); });
audioEl.addEventListener('timeupdate', () => {
  pbTime.textContent = fmtTime(audioEl.currentTime);
  if (audioEl.duration && isFinite(audioEl.duration)) {
    pbDur.textContent = fmtTime(audioEl.duration);
    pbSeek.value = Math.round(audioEl.currentTime / audioEl.duration * 1000);
  }
});
audioEl.addEventListener('ended', () => playTrack(cur + 1));

/* ---------- 详情抽屉 ---------- */
const overlay = document.getElementById('overlay');
const overlayBody = document.getElementById('overlayBody');
const overlayClose = document.getElementById('overlayClose');

function openDetail(id) {
  const a = ARTISTS.find(x => x.id === id);
  if (!a) return;
  overlayBody.innerHTML = `
    <div class="detail-hero" style="--detail-color:${a.theme.accent}">
      <div class="detail-num">NO.${a.num} / 07</div>
      <h2 class="detail-name" id="detailName">${a.name}</h2>
      <div class="detail-en">${a.en}</div>
      <div class="detail-meta">
        <span>${a.from}</span><span>${a.genre}</span><span>《${a.album}》</span>${a.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>
    <div class="detail-body">
      <p class="detail-tagline">「${a.tagline}」</p>
      <p class="detail-bio">${a.bio}</p>
      <p class="detail-sub">代 表 作 / SELECTED SONGS</p>
      <ul class="detail-songs">
        ${a.songs.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><a href="${neteaseUrl(s, a.name)}" target="_blank" rel="noopener noreferrer" title="在网易云音乐搜索《${s}》">${s}<i>↗</i></a></li>`).join('')}
      </ul>
      <a class="detail-enter" href="artist.html?id=${a.id}">进入 ${a.name} 的歌曲页 →</a>
      <div class="detail-note"><b>我 的 一 句 话</b>${a.note}</div>
    </div>`;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  overlayClose.focus();
}
function closeDetail() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
overlayClose.addEventListener('click', closeDetail);
overlay.addEventListener('click', e => { if (e.target === overlay) closeDetail(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeDetail(); });

/* ---------- 随机一首 ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(html) {
  toast.innerHTML = html;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}
function randomTrack() {
  const i = Math.floor(Math.random() * TRACKS.length);
  const t = TRACKS[i];
  showToast(`<small>今 天 先 听 这 首</small>〈${t.title}〉 — ${t.artist}<button type="button" class="toast-link" data-play="${i}">在本页播放 ▶</button>`);
}
document.getElementById('randomBtn').addEventListener('click', randomTrack);
toast.addEventListener('click', e => {
  const btn = e.target.closest('[data-play]');
  if (btn) { playTrack(Number(btn.dataset.play)); toast.classList.remove('show'); return; }
  toast.classList.remove('show');
});

/* ---------- 主题切换：点卡片换掉整站配色 + 首屏主视觉 ---------- */
const heroBg = document.getElementById('heroBg');
const heroKicker = document.getElementById('heroKicker');
const heroDesc = document.getElementById('heroDesc');
const heroVertical = document.getElementById('heroVertical');
const heroCount = document.getElementById('heroCount');
const themeName = document.getElementById('themeName');
const themeAlbum = document.getElementById('themeAlbum');
const themeReset = document.getElementById('themeReset');
let swapTimer;

function applyTheme(id, opts = {}) {
  const a = ARTISTS.find(x => x.id === id) || ARTISTS.find(x => x.id === DEFAULT_ID);
  const t = a.theme;
  const root = document.documentElement.style;

  /* 真实专辑封面是浅色方形画：单独减弱首屏遮罩，避免封面被压灰 */
  const heroEl = document.querySelector('.hero');
  if (heroEl) heroEl.classList.toggle('cover-mode', !!a.coverMode);

  root.setProperty('--paper', t.paper);
  root.setProperty('--paper-2', t.paper2);
  root.setProperty('--ink', t.ink);
  root.setProperty('--red', t.accent);
  root.setProperty('--red-bright', t.accent2);
  root.setProperty('--hero-accent', t.heroAccent);
  /* 整站其余 hover（歌单、按钮、播放条）统一用当前主题背景色深一档 + 墨色文字，
     卡片 hover 不走这里：每张卡片在渲染时就绑定了自己那份主题的纸色 */
  root.setProperty('--hover-bg', t.paper2);
  root.setProperty('--hover-ink', t.ink);
  /* 真实浅色照片/封面主题的遮罩用主题自己的暗色，避免被炭黑压脏 */
  root.setProperty('--shade-rgb', t.shadeRgb || '13,10,8');
  root.setProperty('--muted', t.muted || '#7c6c5c');
  root.setProperty('--line', t.line || 'rgba(25,20,16,.18)');
  const accentLine = document.querySelector('.hero-title .accent');
  if (accentLine) {
    /* 标题这行带入场动画/过渡，切主题时先撤掉，避免旧色被动画帧或过渡值锁住 */
    if (!opts.initial) accentLine.style.animation = 'none';
    accentLine.style.transition = 'none';
    accentLine.style.setProperty('color', t.heroAccent, 'important');
  }

  if (opts.initial) {
    heroBg.style.backgroundImage = `url("${a.art}")`;
  } else {
    heroBg.style.opacity = '0';
    clearTimeout(swapTimer);
    swapTimer = setTimeout(() => {
      heroBg.style.backgroundImage = `url("${a.art}")`;
      heroBg.style.opacity = '1';
    }, 280);
  }

  heroKicker.innerHTML = `<span class="kicker-line"></span> ${a.kicker}`;
  heroDesc.innerHTML = a.heroDesc;
  heroVertical.textContent = a.vertical;
  heroCount.textContent = `NO.${a.num} / 07`;
  themeName.textContent = a.name;
  themeAlbum.textContent = a.themeNote || `《${a.album}》色调 · ${a.artLabel}`;
  themeReset.hidden = a.id === DEFAULT_ID;
  document.title = `我爱去图书馆 · ${a.name} · 我反复听的七种声音`;
  document.querySelectorAll('.artist-card').forEach(c => c.classList.toggle('is-active', c.dataset.id === a.id));

  if (opts.scroll) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
  if (opts.toast) showToast(`<small>主 题 已 切 换</small>${a.name} ·《${a.album}》配色`);
}

document.querySelectorAll('.artist-card').forEach(card => {
  card.addEventListener('click', e => {
    const infoBtn = e.target.closest('.card-info');
    if (infoBtn) { openDetail(infoBtn.dataset.info); return; }
    /* 卡片上的「TA 的歌」是真链接，别被整卡换主题的点击吞掉 */
    if (e.target.closest('a')) return;
    applyTheme(card.dataset.id, { scroll: true, toast: true });
  });
  card.addEventListener('keydown', e => {
    if (e.target !== card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyTheme(card.dataset.id, { scroll: true, toast: true });
    }
  });
});
themeReset.addEventListener('click', () => applyTheme(DEFAULT_ID, { scroll: true, toast: true }));

/* 预加载全部主视觉，切换时不闪 */
ARTISTS.forEach(a => { const img = new Image(); img.src = a.art; });
applyTheme(DEFAULT_ID, { initial: true });

/* ---------- 回到顶部 ----------
   header 是 fixed 元素，浏览器会认为它已在视口内，纯锚点跳转不会滚动；
   这里显式滚到文档顶部，同时保留 #top 空锚点作为无 JS 时的兜底。 */
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
});

/* 首屏动画兜底：无论动画是否被浏览器暂停，1.8s 后文字一定可见 */
setTimeout(() => document.body.classList.add('anim-done'), 1800);

/* ---------- 滚动入场 ---------- */
const targets = document.querySelectorAll('.reveal, .artist-card, .track');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
} else {
  targets.forEach(el => el.classList.add('is-visible'));
}
