  /* ============================================================
     おとの れんしゅう（音韻意識）
     ことばを「おと（はく）」に わけて かぞえる・はじめ／おわりの おと・しりとり・ちいさい「っ」「ゃ」「ー」・おとを とる／ぎゃくに いう
     ============================================================ */
  const WORDS_SRC = `🍎 りんご|🐶 いぬ|🐱 ねこ|🐟 さかな|🐰 うさぎ|🐘 ぞう|🦒 きりん|🦁 ライオン らいおん|🐼 パンダ ぱんだ|🐢 かめ|🦀 かに|🐙 たこ|🦑 いか|🐻 くま|🐵 さる|🐮 うし|🐴 うま|🐷 ぶた|🐤 ひよこ|🐸 かえる|🐍 へび|🐳 くじら|🐬 いるか|🍌 バナナ ばなな|🍓 いちご|🍉 すいか|🍇 ぶどう|🍑 もも|🍊 みかん|🍅 トマト とまと|🥕 にんじん|🥚 たまご|🍞 パン ぱん|🍙 おにぎり|🍣 すし|🍰 ケーキ けーき|👟 くつ|🧢 ぼうし|👓 めがね|☂️ かさ|📖 ほん|✏️ えんぴつ|✂️ はさみ|⏰ とけい|🔑 かぎ|🪑 いす|📞 でんわ|📺 テレビ てれび|🚗 くるま|🚃 でんしゃ|🚌 バス ばす|🚢 ふね|✈️ ひこうき|🚲 じてんしゃ|🚀 ロケット ろけっと|⭐ ほし|🌙 つき|☀️ たいよう|☁️ くも|❄️ ゆき|🌸 さくら|🌳 き|⛰️ やま|🌊 うみ|✋ て|👂 みみ|👄 くち|🎺 ラッパ らっぱ|🥁 たいこ|🎸 ギター ぎたー|⚽ ボール ぼーる|🎫 きっぷ|🦦 ラッコ らっこ|🦗 バッタ ばった|🦋 ちょうちょ|🥬 キャベツ きゃべつ|🥔 じゃがいも|👕 シャツ しゃつ|🥒 きゅうり|🥛 ぎゅうにゅう|🌷 チューリップ ちゅーりっぷ|🕯️ ろうそく|🐑 ひつじ|🐐 やぎ|🐭 ねずみ|🐯 とら|🦊 きつね|🐨 コアラ こあら|🐧 ペンギン ぺんぎん|🦆 あひる|🌰 くり|🍄 きのこ|🍆 なす|🌽 とうもろこし|🧹 ほうき|🎈 ふうせん|👻 おばけ|🤖 ロボット ろぼっと|⚡ かみなり|🌈 にじ|⛄ ゆきだるま|🪞 かがみ|🏠 いえ|🚓 パトカー ぱとかー|🚑 きゅうきゅうしゃ|🚒 しょうぼうしゃ|🍦 アイス あいす|🍕 ピザ ぴざ|🍛 カレー かれー|🐞 てんとうむし|🐝 はち|🐜 あり|🦉 ふくろう|🐿️ りす|🦈 さめ|🐊 わに|🍋 レモン れもん|🍒 さくらんぼ|🎁 プレゼント ぷれぜんと|🔔 すず|🧦 くつした|🖍️ クレヨン くれよん|🥄 スプーン すぷーん|🍳 フライパン ふらいぱん|🏫 がっこう|🚪 ドア どあ|💡 でんき|🍵 おちゃ|🍡 だんご|🦷 は|👁️ め|🍫 チョコ ちょこ|🐓 にわとり|🦜 インコ いんこ|🧸 くま|🪥 はぶらし|🍜 ラーメン らーめん|🧃 ジュース じゅーす|🐛 いもむし|🐌 かたつむり|🌻 ひまわり|🍁 もみじ|🦔 はりねずみ|🐋 くじら`;
  const SMALL = /[ゃゅょぁぃぅぇぉゎャュョァィゥェォヮ]/;
  const mora = s => { const o = []; for (const c of String(s)) { if (SMALL.test(c) && o.length) o[o.length - 1] += c; else o.push(c); } return o; };
  const WORDS = []; const seen = new Set();
  WORDS_SRC.split('|').forEach(x => { const a = x.trim().split(' '); const e = a[0], d = a[1], r = a[2] || a[1]; if (seen.has(r)) return; seen.add(r); WORDS.push({ e, d, r, m: mora(r), dm: mora(d) }); });
  const special = w => /[っゃゅょー]/.test(w.r);
  const plainM = m => m.length === 1 && !/[っんー]/.test(m);
  const GAMES = [
    { id: 'clap', e: '👏', n: 'いくつの おと？', s: 'おとの かずだけ てを たたく', c: '#F08C00' },
    { id: 'first', e: '🔤', n: 'はじめの おと', s: 'さいしょの おとは どれ？', c: '#D6336C' },
    { id: 'last', e: '🔚', n: 'おわりの おと', s: 'さいごの おとは どれ？', c: '#AE3EC9' },
    { id: 'where', e: '🔎', n: 'どこに ある？', s: 'その おとは なんばんめ？', c: '#1C7ED6' },
    { id: 'same', e: '🖼️', n: 'おなじ おとの なかま', s: 'おなじ おとで はじまる え', c: '#0CA678' },
    { id: 'shiri', e: '🐍', n: 'しりとり', s: 'おわりの おとから つなげる', c: '#2B8A3E' },
    { id: 'special', e: '🎵', n: 'ちいさい「っ」「ゃ」と「ー」', s: 'ただしい かきかたは どれ？', c: '#E8590C' },
    { id: 'swap', e: '🔁', n: 'おとを とる・ぎゃくに', s: 'おとを ぬいたら？ うしろから いうと？', c: '#5F3DC4' }
  ];
  const APP = {
    id: 'oto-renshu', title: 'おとの れんしゅう', ls: 'otorenshu.v1', db: false, sw: true, color: '#D6336C',
    defaults: { level: 1, showText: true, qn: 5 },
    newProfile: (name, icon) => ({ id: 'p' + Math.random().toString(36).slice(2, 9), name, icon, best: {}, log: [] }),
    normProfile(p) { p.best = p.best && typeof p.best === 'object' ? p.best : {}; p.log = Array.isArray(p.log) ? p.log : []; },
    childScreens: ['play'], topScreens: ['home'],
    renderHome: () => renderHome(),
    profileNote: p => 'れんしゅう ' + p.log.length + 'かい',
    helpNote: 'ひらがなの よみかきの まえに だいじな「おとの きづき（音韻意識）」を あそびで そだてます。ことばを はく（モーラ）に わけて かぞえる → はじめ・おわりの おと → おとの いち → しりとり → とくしゅおん（っ・ゃゅょ・ー）→ おとを とる・ぎゃくに いう の じゅんに むずかしく なります。「もじを みせない」に すると、えと おと だけで かんがえる れんしゅうに なります。かぞえかた：「きゃ」は 1つ、「っ」「ん」「ー」は それぞれ 1つ と かぞえます。'
  };
/*BASE_HERE*/

  /* ============================================================
     ことばの えらびかた
     ============================================================ */
  function pool(opt) {
    const L = Number(S().level) || 1;
    return WORDS.filter(w => {
      if (L === 1 && (w.m.length > 3 || special(w))) return false;
      if (L === 2 && w.m.length > 4) return false;
      if (opt && opt.min && w.m.length < opt.min) return false;
      if (opt && opt.plain && special(w)) return false;
      return true;
    });
  }
  const KANA = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわがぎぐげござじずぜぞだでどばびぶべぼぱぴぷぺぽ'.split('');
  const otherKana = (not, n) => shuffle(KANA.filter(k => not.indexOf(k) < 0)).slice(0, n);
  const recent = [];
  function pickW(list) { const f = list.filter(w => recent.indexOf(w.r) < 0); const w = pick(f.length ? f : list); recent.push(w.r); if (recent.length > 12) recent.shift(); return w; }
  const tts = w => w.r;
  function makeQ(g, prev) {
    if (g === 'clap') return { w: pickW(pool()) };
    if (g === 'first' || g === 'last') {
      const w = pickW(pool().filter(x => plainM(g === 'first' ? x.m[0] : x.m[x.m.length - 1])));
      const ans = g === 'first' ? w.m[0] : w.m[w.m.length - 1];
      return { w, ans, ch: shuffle([ans].concat(otherKana([ans, w.m[0], w.m[w.m.length - 1]], 2))) };
    }
    if (g === 'where') {
      const list = pool({ min: 3 }).filter(x => x.m.some((m, i) => x.m.indexOf(m) === x.m.lastIndexOf(m) && i > 0));
      const w = pickW(list.length ? list : pool({ min: 2 }));
      const idx = shuffle(w.m.map((_, i) => i).filter(i => w.m.indexOf(w.m[i]) === w.m.lastIndexOf(w.m[i])))[0] || 0;
      return { w, idx };
    }
    if (g === 'same') {
      const all = pool();
      const ok = all.filter(w => all.some(x => x !== w && x.m[0] === w.m[0]));
      const w = pickW(ok.length ? ok : WORDS.filter(w => WORDS.some(x => x !== w && x.m[0] === w.m[0])));
      const src = ok.length ? all : WORDS;
      const right = pick(src.filter(x => x !== w && x.m[0] === w.m[0]));
      const wrong = shuffle(src.filter(x => x.m[0] !== w.m[0])).filter((x, i, a) => a.findIndex(y => y.m[0] === x.m[0]) === i).slice(0, 2);
      return { w, ans: right, ch: shuffle([right].concat(wrong)) };
    }
    if (g === 'shiri') {
      const all = pool();
      const nextOf = w => { const l = w.m[w.m.length - 1]; return plainM(l) ? all.filter(x => x !== w && x.m[0] === l) : []; };
      let w = prev && nextOf(prev).length ? prev : null;
      if (!w) w = pickW(all.filter(x => nextOf(x).length) .length ? all.filter(x => nextOf(x).length) : WORDS.filter(x => plainM(x.m[x.m.length - 1])));
      const cands = nextOf(w).length ? nextOf(w) : WORDS.filter(x => x.m[0] === w.m[w.m.length - 1] && x !== w);
      const good = cands.filter(x => nextOf(x).length && x.m[x.m.length - 1] !== 'ん');
      const right = pick(good.length ? good : cands);
      const l = w.m[w.m.length - 1];
      const wrong = shuffle(all.filter(x => x.m[0] !== l && x !== w)).filter((x, i, a) => a.findIndex(y => y.m[0] === x.m[0]) === i).slice(0, 2);
      return { w, ans: right, ch: shuffle([right].concat(wrong)) };
    }
    if (g === 'special') {
      const list = WORDS.filter(special).filter(w => Number(S().level) === 3 || w.m.length <= 5);
      const w = pickW(list);
      return { w, ch: shuffle([w.d].concat(spellWrong(w.d))) };
    }
    if (g === 'swap') {
      const list = pool({ min: 2, plain: true }).filter(w => w.m.length <= 4 && w.m.every(plainM));
      const w = pickW(list);
      const rev = Math.random() < .45 && w.m.slice().reverse().join('') !== w.r;
      if (rev) { const ans = w.m.slice().reverse().join(''); const alt = w.m.length > 2 ? w.m.slice(1).concat(w.m[0]).join('') : w.m[1] + w.m[1]; return { w, kind: 'rev', ans, ch: shuffle([ans, w.r, alt].filter((x, i, a) => a.indexOf(x) === i)) }; }
      const k = w.m.length >= 3 ? ri(0, w.m.length - 1) : 0;
      const ans = w.m.filter((_, i) => i !== k).join('');
      const k2 = (k + 1) % w.m.length; const alt = w.m.filter((_, i) => i !== k2).join('');
      return { w, kind: 'del', k, ans, ch: shuffle([ans, alt, w.r].filter((x, i, a) => a.indexOf(x) === i)) };
    }
  }
  const BIG = { 'っ': 'つ', 'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'ッ': 'ツ', 'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ' };
  const VROWS = ['あかさたなはまやらわがざだばぱゃぁ', 'いきしちにひみりぎじぢびぴぃ', 'うくすつぬふむゆるぐずづぶぷゅぅ', 'えけせてねへめれげぜでべぺぇ', 'おこそとのほもよろをごぞどぼぽょぉ'];
  // 「ー」の まえの もじの ぼいん（ケ → エ、ギタ → ア）
  function vowelOf(c) {
    if (!c) return null;
    const kata = /[ァ-ヶ]/.test(c), hc = kata ? String.fromCharCode(c.charCodeAt(0) - 0x60) : c;
    const r = VROWS.findIndex(x => x.indexOf(hc) >= 0); if (r < 0) return null;
    const v = 'あいうえお'[r]; return kata ? String.fromCharCode(v.charCodeAt(0) + 0x60) : v;
  }
  function spellWrong(d) {
    const cs = Array.from(d), out = new Set();
    const k = cs.findIndex(c => BIG[c] || c === 'ー');
    if (k < 0) return [];
    const c = cs[k];
    out.add(cs.filter((_, i) => i !== k).join(''));
    if (BIG[c]) out.add(cs.map((x, i) => i === k ? BIG[c] : x).join(''));
    else { const v = vowelOf(cs[k - 1]); if (v) out.add(cs.map((x, i) => i === k ? v : x).join('')); }
    // 2つめの とくしゅおん、または もう1つの まちがい
    const k2 = cs.findIndex((x, i) => i > k && (BIG[x] || x === 'ー'));
    if (out.size < 2 && k2 >= 0) out.add(cs.filter((_, i) => i !== k2).join(''));
    if (out.size < 2) out.add(cs.slice(0, k).concat(cs[k], cs.slice(k)).join(''));
    out.delete(d);
    return Array.from(out).slice(0, 2);
  }

  /* ============================================================
     ホーム
     ============================================================ */
  function renderHome() {
    screen = 'home';
    const p = cur(), st = S();
    setView('home', [
      h('h1', { class: 'title' }, '🔤 おとの れんしゅう', h('small', null, 'ことばの おとを きいて、かぞえて、あそぼう')),
      h('div', { class: 'lvl' }, [[1, '🌱 やさしい（2〜3おと）'], [2, '🌿 ふつう'], [3, '🌳 むずかしい']].map(l => h('button', { type: 'button', class: Number(st.level) === l[0] ? 'on' : '', onclick: () => { st.level = l[0]; persist(); sfx.tap(); renderHome(); } }, l[1]))),
      h('div', { class: 'menu' }, GAMES.map(g => h('button', { type: 'button', class: 'mcard', style: '--c:' + g.c, onclick: () => { if (tapOk()) { sfx.tap(); startGame(g.id); } } },
        p.best[g.id + st.level] ? h('span', { class: 'st' }, '⭐'.repeat(p.best[g.id + st.level])) : null, E(g.e), h('b', null, g.n), h('small', null, g.s))))
    ]);
  }

  /* ============================================================
     ゲーム
     ============================================================ */
  let G = null;
  function startGame(id) { G = { id, i: 0, ok: 0, res: [], q: null, miss: 0, t0: Date.now() }; keepAwake(); nextQ(); }
  function nextQ() {
    if (G.i >= Number(S().qn)) { endGame(); return; }
    G.q = makeQ(G.id, G.q && G.id === 'shiri' ? G.q.ans : null); G.miss = 0;
    renderQ();
  }
  function judge(ok, el) {
    if (ok) {
      if (G.done) return; G.done = true;
      sfx.ok(); if (el) FX.small(el, { variant: 1 });
      G.res[G.i] = G.miss === 0; if (G.miss === 0) G.ok++;
      after(1500, () => { G.i++; G.done = false; nextQ(); });
      return true;
    }
    G.miss++; sfx.ng(); return false;
  }
  const sayW = (w, end) => speak(tts(w), { end });
  function head() { return h('div', { class: 'qhead' }, h('div', { class: 'prog' }, Array.from({ length: Number(S().qn) }, (_, k) => h('i', { class: k < G.i ? (G.res[k] ? 'ok' : '') : k === G.i ? 'now' : '' }))), h('span', { style: 'color:var(--sub)' }, GAMES.find(g => g.id === G.id).e + ' ' + GAMES.find(g => g.id === G.id).n)); }
  function bigPic(w, showTxt) {
    return h('div', { class: 'word' }, h('div', { class: 'big' }, E(w.e), h('button', { type: 'button', class: 'sp', 'aria-label': 'きく', onclick: () => sayW(w) }, '🔊')),
      showTxt ? h('div', { class: 'txt' }, w.d) : null);
  }
  // 1おとずつ ひかりながら よむ
  function beat(tiles, w, done) {
    let k = 0; const ms = 640 / (Number(S().rate) || .95);
    tiles.forEach(t => t.classList.remove('on'));
    const step = () => {
      if (k > 0) tiles[k - 1].classList.remove('on');
      if (k >= w.m.length) { if (done) after(200, done); return; }
      tiles[k].classList.add('on'); tone(660 + k * 60, 0, .12, 'triangle', .25);
      if (!/^[ーっ]$/.test(w.m[k])) speak(w.m[k]); else stopSpeak(); // 「ー」「っ」は こえを ださない 1はく
      k++; after(ms, step);
    };
    step();
  }
  const tileRow = (w, opt) => h('div', { class: 'tiles' }, w.dm.map((m, i) => h('div', { class: 'tile' + (m.length > 1 ? ' two' : '') + (opt && opt.hide ? ' q' : '') }, m)));
  function renderQ() {
    screen = 'play'; G.done = false;
    const q = G.q, w = q.w, st = S(), id = G.id;
    if (id === 'clap') {
      let n = 0; const dots = h('div', { class: 'dots' });
      const tiles = tileRow(w, { hide: true }); tiles.style.visibility = 'hidden';
      const clap = h('button', { type: 'button', class: 'clap', 'aria-label': 'たたく', onclick: () => { if (G.done || n >= 10) return; n++; dots.append(h('i')); tone(520 + n * 40, 0, .1, 'square', .2); } }, '👏');
      const ok = h('button', { type: 'button', class: 'big-btn go', onclick: () => {
        if (!tapOk(500) || G.done) return;
        if (!n) { toast('👏 を おとの かずだけ おしてね'); return; }
        tiles.style.visibility = ''; const ts = [...tiles.children]; ts.forEach(t => t.classList.remove('q'));
        if (n === w.m.length) { judge(true, tiles); speak(n + 'つ。せいかい'); after(500, () => beat(ts, w)); }
        else { judge(false); speak('いっしょに たたいて みよう'); after(1300, () => beat(ts, w, () => { n = 0; dots.innerHTML = ''; speak('もういちど どうぞ'); after(900, () => { ts.forEach(t => t.classList.add('q')); tiles.style.visibility = 'hidden'; }); })); }
      } }, '✓ できた');
      setView('q split', [head(), bigPic(w, false), h('div', { class: 'rest' },
        h('div', { class: 'ask' }, 'おとの かずだけ 👏 を たたこう'), dots, tiles,
        h('div', { class: 'claprow' }, h('button', { type: 'button', class: 'mid-btn', onclick: () => { n = 0; dots.innerHTML = ''; } }, '↺ やりなおし'), clap, ok))]);
      sayW(w);
      return;
    }
    if (id === 'first' || id === 'last') {
      const tiles = tileRow(w); const ts = [...tiles.children]; const k = id === 'first' ? 0 : ts.length - 1;
      ts[k].classList.add('q', 'hl'); ts[k].textContent = '？';
      setView('q split', [head(), bigPic(w, false), h('div', { class: 'rest' },
        h('div', { class: 'ask' }, id === 'first' ? 'はじめの おとは どれ？' : 'おわりの おとは どれ？'), st.showText ? tiles : null,
        h('div', { class: 'ch txt' }, q.ch.map(c => { const b = h('button', { type: 'button', onclick: () => {
          if (!tapOk(500) || G.done) return;
          speak(c);
          if (judge(c === q.ans, b)) { b.classList.add('ok'); ts[k].classList.remove('q'); ts[k].textContent = w.dm[k]; after(500, () => beat(ts, w)); }
          else b.classList.add('ng');
        } }, c); return b; })))]);
      speak(tts(w) + '。' + (id === 'first' ? 'はじめ' : 'おわり') + 'の おとは どれ？');
      return;
    }
    if (id === 'where') {
      const tiles = h('div', { class: 'tiles' }, w.dm.map((m, i) => { const b = h('button', { type: 'button', class: 'tile q' + (m.length > 1 ? ' two' : ''), onclick: () => {
        if (!tapOk(400) || G.done) return;
        if (judge(i === q.idx, b)) { [...tiles.children].forEach(t => t.classList.remove('q')); b.classList.add('ok'); speak(w.m[q.idx] + 'は ' + (q.idx + 1) + 'ばんめ'); after(900, () => beat([...tiles.children], w)); }
        else { b.classList.add('ng'); speak((i + 1) + 'ばんめは ' + w.m[i]); b.classList.remove('q'); }
      } }, m); return b; }));
      setView('q split', [head(), bigPic(w, false), h('div', { class: 'rest' },
        h('div', { class: 'ask' }, '「', h('span', { class: 'hl' }, w.dm[q.idx]), '」は どこ？'), tiles,
        h('div', { class: 'actions' }, h('button', { type: 'button', class: 'mid-btn', onclick: () => sayW(w) }, '🔊 ゆっくり きく'))) ]);
      speak(tts(w) + '。' + w.m[q.idx] + 'は どこ？');
      return;
    }
    if (id === 'same' || id === 'shiri') {
      const l = id === 'same' ? w.m[0] : w.m[w.m.length - 1];
      const top = id === 'same' ? bigPic(w, st.showText) : h('div', { class: 'chain' },
        h('div', { class: 'lk' }, E(w.e), st.showText ? h('small', null, w.dm.slice(0, -1).join(''), h('b', null, w.dm[w.dm.length - 1])) : null), h('span', { class: 'ar' }, '➡'), h('div', { class: 'lk q' }, '？'));
      setView('q split', [head(), top, h('div', { class: 'rest' },
        h('div', { class: 'ask' }, id === 'same' ? 'おなじ おとで はじまる のは どれ？' : '「' + w.dm[w.dm.length - 1] + '」から はじまる のは どれ？'),
        h('div', { class: 'ch' }, q.ch.map(c => { const b = h('button', { type: 'button', onclick: () => {
          if (!tapOk(500) || G.done) return;
          sayW(c);
          if (judge(c === q.ans, b)) { b.classList.add('ok'); after(700, () => speak(tts(w) + '、' + tts(c))); }
          else b.classList.add('ng');
        } }, E(c.e), st.showText ? h('small', null, c.d) : null); return b; })))]);
      speak(tts(w) + '。' + (id === 'same' ? l + 'で はじまる のは どれ？' : 'おわりの おとは ' + l + '。' + l + 'から はじまる のは どれ？'));
      return;
    }
    if (id === 'special') {
      setView('q split', [head(), bigPic(w, false), h('div', { class: 'rest' },
        h('div', { class: 'ask' }, 'よく きいて。ただしい かきかたは どれ？'),
        h('div', { class: 'ch txt' }, q.ch.map(c => { const b = h('button', { type: 'button', onclick: () => {
          if (!tapOk(500) || G.done) return;
          if (judge(c === w.d, b)) { b.classList.add('ok'); sayW(w); }
          else { b.classList.add('ng'); speak('もういちど きいて みよう'); after(1200, () => sayW(w)); }
        } }, c); return b; })),
        h('div', { class: 'actions' }, h('button', { type: 'button', class: 'mid-btn', onclick: () => { const t = tileRow(w); const box = $('.rest .tiles'); if (box) box.remove(); $('.rest').append(t); beat([...t.children], w); } }, '👏 おとに わけて きく')))]);
      sayW(w);
      return;
    }
    if (id === 'swap') {
      const tiles = tileRow(w); const ts = [...tiles.children];
      const askT = q.kind === 'rev' ? ['「', h('span', { class: 'hl' }, w.d), '」を うしろから いうと？'] : ['「', w.d, '」から 「', h('span', { class: 'hl' }, w.dm[q.k]), '」を とると？'];
      if (q.kind === 'del') ts[q.k].classList.add('hl');
      setView('q split', [head(), bigPic(w, false), h('div', { class: 'rest' },
        h('div', { class: 'ask' }, askT), tiles,
        h('div', { class: 'ch txt' }, q.ch.map(c => { const b = h('button', { type: 'button', onclick: () => {
          if (!tapOk(500) || G.done) return;
          speak(c);
          if (judge(c === q.ans, b)) { b.classList.add('ok'); if (q.kind === 'del') ts[q.k].style.visibility = 'hidden'; else { tiles.style.flexDirection = 'row-reverse'; } }
          else b.classList.add('ng');
        } }, c); return b; })))]);
      speak(q.kind === 'rev' ? tts(w) + 'を うしろから いうと？' : tts(w) + 'から ' + w.m[q.k] + 'を とると？');
    }
  }
  function endGame() {
    const p = cur(), n = Number(S().qn), star = G.ok >= n ? 3 : G.ok >= n * .6 ? 2 : 1, key = G.id + S().level;
    p.best[key] = Math.max(p.best[key] || 0, star);
    p.log.push({ t: Date.now(), g: G.id, lv: S().level, ok: G.ok, n, sec: Math.round((Date.now() - G.t0) / 1000) });
    if (p.log.length > 1000) p.log.splice(0, p.log.length - 1000);
    persist();
    screen = 'end';
    setView('center', [h('div', { class: 'center' },
      h('div', { class: 'stars' }, [0, 1, 2].map(i => h('span', { class: i < star ? '' : 'off', style: 'animation-delay:' + (i * .2) + 's' }, '⭐'))),
      h('h1', { class: 'title' }, n + 'もん できた！', h('small', null, 'いっかいで せいかい ' + G.ok + 'もん')),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'big-btn go', onclick: () => { if (tapOk()) startGame(G.id); } }, '🔁 もういちど'),
        h('button', { type: 'button', class: 'big-btn white', onclick: () => { if (tapOk()) renderHome(); } }, '🏠 えらぶ がめん')))]);
    sfx.clear(); if (star === 3) FX.big(); else FX.small(document.querySelector('.title'));
    speak('よく できました');
  }

  /* ============================================================
     プリント
     ============================================================ */
  const PF = '<div class="pf">© MieeL　おとの れんしゅう　www.mieel-support-school.com</div>';
  const HD = (t, s) => '<div class="phd"><h1>' + t + '</h1><small>' + (s || '') + '</small><div class="nm">なまえ ＿＿＿＿＿＿＿＿</div></div>';
  function printPool(lv) {
    return WORDS.filter(w => lv === 1 ? w.m.length <= 3 && !special(w) : lv === 2 ? w.m.length <= 4 : lv === 4 ? special(w) : true);
  }
  function buildPages(type, o) {
    o = o || {};
    const lv = Number(o.lv) || 1, list = shuffle(printPool(lv));
    if (type === 'clap') {
      const rows = list.slice(0, 8).map(w => '<div class="prow2"><span class="pe">' + w.e + '</span>' + (o.txt === 'on' ? '<span class="wd">' + esc(w.d) + '</span>' : '') + '<div class="cs">' + '<i></i>'.repeat(Math.max(6, w.m.length)) + '</div></div>').join('');
      return ['<div class="ppage">' + HD('👏 おとの かず', 'たたいて かぞえ、○を ぬろう') + '<div class="prows">' + rows + '</div>' + PF + '</div>'];
    }
    if (type === 'boxes') {
      const rows = list.slice(0, 8).map(w => '<div class="prow2"><span class="pe">' + w.e + '</span><div class="bx">' + w.dm.map((m, i) => '<i class="' + (m.length > 1 ? 'sm' : '') + '">' + (o.hint === 'first' && i === 0 ? esc(m) : o.hint === 'all' ? '<span style="color:#ccc">' + esc(m) + '</span>' : '') + '</i>').join('') + '</div></div>').join('');
      return ['<div class="ppage">' + HD('✏️ かいて みよう', '1はこに 1つの おと') + '<div class="prows">' + rows + '</div>' + PF + '</div>'];
    }
    // しりとり
    const all = printPool(Math.max(2, lv === 4 ? 3 : lv));
    // ながく つながる まで なんども ためす
    let chain = [];
    for (let t = 0; t < 300 && chain.length < 9; t++) {
      const c0 = [pick(all.filter(w => plainM(w.m[w.m.length - 1])))];
      for (let k = 0; k < 9; k++) {
        const l = c0[c0.length - 1].m.slice(-1)[0];
        const c = shuffle(all.filter(w => w.m[0] === l && c0.indexOf(w) < 0 && plainM(w.m[w.m.length - 1])));
        if (!c.length || c0.length >= 9) break; c0.push(c[0]);
      }
      if (c0.length > chain.length) chain = c0;
    }
    const cells = chain.map((w, i) => '<div class="c"><span class="no">' + (i + 1) + (i < chain.length - 1 ? ' ➡' : '') + '</span><span class="pe">' + w.e + '</span><div class="bx">' + w.dm.map((m, k) => '<i>' + (i === 0 || (o.hint === 'first' && k === 0) || o.hint === 'all' ? '<span style="color:' + (i === 0 ? '#333' : '#ccc') + '">' + esc(m) + '</span>' : '') + '</i>').join('') + '</div></div>').join('');
    return ['<div class="ppage">' + HD('🐍 しりとり', 'かいて つなげよう') + '<div class="pchain">' + cells + '</div>' + PF + '</div>'];
  }
  const LV = [[1, 'やさしい'], [2, 'ふつう'], [3, 'むずかしい'], [4, 'っ・ゃ・ー']];
  window.MieelPrintAPI = {
    version: 1,
    app: { id: 'oto-renshu', title: 'おとの れんしゅう', icon: '🔤' },
    list() {
      return [
        { id: 'clap', name: 'いくつの おと？（○を ぬる）', icon: '👏', params: [{ key: 'lv', label: 'ことば', opts: LV, def: 1 }, { key: 'txt', label: 'もじ', opts: [['off', 'えだけ'], ['on', 'もじも']], def: 'off' }] },
        { id: 'boxes', name: 'ことばを かこう（はこ）', icon: '✏️', params: [{ key: 'lv', label: 'ことば', opts: LV, def: 1 }, { key: 'hint', label: 'ヒント', opts: [['none', 'なし'], ['first', 'はじめの もじ'], ['all', 'なぞりがき']], def: 'first' }] },
        { id: 'shiri', name: 'しりとり', icon: '🐍', params: [{ key: 'lv', label: 'ことば', opts: LV.slice(0, 3), def: 2 }, { key: 'hint', label: 'ヒント', opts: [['none', 'なし'], ['first', 'はじめの もじ'], ['all', 'なぞりがき']], def: 'none' }] }
      ];
    },
    build(id, params) { return Promise.resolve({ pages: buildPages(id, params), css: document.querySelector('style').textContent }); }
  };

  /* ============================================================
     先生用せってい
     ============================================================ */
  APP.renderSettings = function (add, st, vp, pidSel) {
    add(h('h3', null, '🔤 もんだい'),
      srow('むずかしさ', seg(st.level, [[1, 'やさしい'], [2, 'ふつう'], [3, 'むずかしい']], v => setS('level', Number(v))), 'やさしい：2〜3おと・ちいさい もじ なし／ふつう：4おとまで'),
      srow('1かいの もんだい', seg(st.qn, [[5, '5もん'], [8, '8もん'], [10, '10もん']], v => setS('qn', Number(v)))),
      chk('もじを みせる（はじめ・おわり、なかま、しりとり）', 'showText', 'オフに すると、えと おとだけで かんがえます'));
    add(h('h3', null, '📊 きろく'), pidSel());
    const log = vp.log.slice().reverse().slice(0, 40), LVN = ['', 'やさしい', 'ふつう', 'むずかしい'];
    add(log.length ? h('table', { class: 'rec-table' }, h('tr', null, ['日時', 'あそび', 'レベル', 'いっかいで せいかい'].map(x => h('th', null, x))),
      log.map(r => { const d = new Date(r.t), g = GAMES.find(x => x.id === r.g); return h('tr', null, h('td', null, (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0')), h('td', null, g ? g.e + ' ' + g.n : r.g), h('td', null, LVN[r.lv] || ''), h('td', null, r.ok + ' / ' + r.n)); })) : h('p', { class: 'note' }, 'まだ きろくが ありません。'));
  };
  if (TEST) window.__ot = { store: () => store, WORDS, makeQ, mora, startGame, G: () => G, spellWrong, persist };
  startApp();
