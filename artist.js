/* 我爱去图书馆 — 歌手歌曲子页（初版）
   数据来自 artists-data.js，与首页共用；URL 形如 artist.html?id=zhaolei
   后续优化方向：把首页站内播放器复用过来，点歌名直接在本页播放 */
const ALL = window.ARTISTS || ARTISTS;
const wanted = new URLSearchParams(location.search).get('id');
let index = ALL.findIndex(x => x.id === wanted);
if (index < 0) index = Math.max(0, ALL.findIndex(x => x.id === 'tongyang'));
const a = ALL[index];
const t = a.theme;

/* 整页沿用这位歌手在首页切换后的配色 */
const root = document.documentElement.style;
root.setProperty('--paper', t.paper);
root.setProperty('--paper-2', t.paper2);
root.setProperty('--ink', t.ink);
root.setProperty('--red', t.accent);
root.setProperty('--red-bright', t.accent2);
root.setProperty('--hero-accent', t.heroAccent);
root.setProperty('--muted', t.muted || '#7c6c5c');
root.setProperty('--line', t.line || 'rgba(25,20,16,.18)');
root.setProperty('--hover-bg', t.paper2);
root.setProperty('--hover-ink', t.ink);

document.title = `${a.name} · TA 的歌 · 我爱去图书馆`;
document.getElementById('apHeroBg').style.backgroundImage = `url("${a.art}")`;
document.getElementById('apKicker').textContent = `NO.${a.num} / 07 · ${a.from}`;
document.getElementById('apName').textContent = a.name;
document.getElementById('apEn').textContent = a.en;
document.getElementById('apMeta').textContent = `${a.genre} · 代表专辑《${a.album}》 · ${a.artLabel}`;
document.getElementById('apTagline').textContent = `「${a.tagline}」`;
document.getElementById('apLabel').textContent = `01 / ${a.name} 的歌`;
document.getElementById('apHint').textContent = `先放这 ${a.songs.length} 首 · 点歌名在新标签打开网易云音乐收听`;

const searchUrl = s => `https://music.163.com/#/search/m/?s=${encodeURIComponent(`${s} ${a.name}`)}&type=1`;
document.getElementById('apList').innerHTML = a.songs.map((s, i) => `
  <li>
    <a href="${searchUrl(s)}" target="_blank" rel="noopener noreferrer" title="在网易云音乐搜索《${s}》">
      <span class="ap-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="ap-title">${s}</span>
      <span class="ap-album">《${a.album}》· ${a.name}</span>
      <span class="ap-go">去听 ↗</span>
    </a>
  </li>`).join('');

const prev = ALL[(index - 1 + ALL.length) % ALL.length];
const next = ALL[(index + 1) % ALL.length];
document.getElementById('apOthers').innerHTML = `
  <a class="ap-other" href="artist.html?id=${prev.id}"><span>← 上一组</span><strong>${prev.name}</strong></a>
  <a class="ap-all" href="index.html#artists">全部七组 ↗</a>
  <a class="ap-other ap-other-next" href="artist.html?id=${next.id}"><span>下一组 →</span><strong>${next.name}</strong></a>`;
