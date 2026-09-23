/* VCA app.js — データ(data/*.json)を読み込み、ハッシュルーティングで各ページを描画する */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const D = {};
const PAGES = [["home","HOME"],["about","ABOUT"],["members","MEMBERS"],["activities","ACTIVITIES"],["projects","PROJECTS"],["news","NEWS"],["rules","RULES"],["contact","CONTACT"],["join","JOIN"]];
const empty = t => `<div class="empty">${t}</div>`;
const img = (src, alt = "") => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : "";
const avatar = (m, lg) => `<div class="avatar ${lg ? "lg" : ""}">${img(m.image, m.name) || esc(m.name[0])}</div>`;
const hd = (t, p) => `<div class="page-hd"><div class="in"><h1>${t}</h1><p>${p}</p></div></div>`;
const wrap = h => `<section><div class="in">${h}</div></section>`;
const link = (url, label, cls = "btn pri") => url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>` : "";
const sorted = a => [...a].sort((x, y) => String(y.date).localeCompare(String(x.date)));

const cardMember = m => `<button class="card" data-member="${esc(m.id)}">${avatar(m)}<h3>${esc(m.name)}</h3><p><b>${esc(m.role)}</b></p><div style="margin:8px 0">${(m.genres||[]).map(g=>`<span class="tag">${esc(g)}</span>`).join("")}</div><p>${esc(m.intro)}</p></button>`;
const cardProject = p => `<a class="card" ${p.url ? `href="${esc(p.url)}" target="_blank" rel="noopener"` : ""}><div class="thumb">${img(p.thumbnail, p.title)}</div><span class="tag g">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></a>`;
const rowNews = n => `<li><a ${n.url ? `href="${esc(n.url)}" target="_blank" rel="noopener"` : ""}><time>${esc(n.date)}</time><span><span class="tag">${esc(n.category)}</span></span><span><b>${esc(n.title)}</b><br><small style="color:var(--sub)">${esc(n.summary)}</small></span></a></li>`;
const cardAct = a => `<div class="card"><span class="tag g">${esc(a.key)}</span><h3>${esc(a.label)}</h3><p>${esc(a.text)}</p></div>`;

const views = {
home: () => `
<div class="hero"><div class="in"><div class="en">Virtual Creators Association</div><h1>VCA</h1><div class="ja">バーチャルクリエイターズ協会</div>
<div class="copy">一人では届かない場所へ。</div>
<p class="d">個人で活動するVTuber・バーチャルクリエイター・創作活動者をつなぎ、コラボレーション、企画、技術共有、共同制作を生み出す団体です。</p>
<div class="btns"><a class="btn pri" href="#/about">ABOUT VCA</a><a class="btn" href="#/join">JOIN VCA</a></div></div></div>
<section class="alt"><div class="in"><h2>活動の循環</h2><p class="lead">出会いで終わらず、実績として次の活動につながる。VCAはこの循環をつくります。</p>
<div class="cycle">${[["MEMBERS","出会う"],["COLLABORATION","協力する"],["CREATION","作品が生まれる"],["PROJECT","企画になる"],["NEXT","次の活動へ"]].map(([a,b])=>`<div class="step"><b>${a}</b><span>${b}</span></div>`).join("")}</div>
<div class="loopback">NEXT から、新しい出会いへ戻る</div></div></section>
${wrap(`<h2>NEWS</h2><div class="news"><ul>${sorted(D.news).slice(0,3).map(rowNews).join("")}</ul></div><a class="more" href="#/news">NEWS一覧</a>`)}
<section class="alt"><div class="in"><h2>注目PROJECT</h2><p class="lead">VCAから生まれた企画・制作です。</p>${(()=>{const f=D.projects.filter(p=>p.featured).slice(0,3);return f.length?`<div class="grid">${f.map(cardProject).join("")}</div>`:empty("最初のプロジェクトを準備中です。")})()}<a class="more" href="#/projects">PROJECTS一覧</a></div></section>
${wrap(`<h2>MEMBERS</h2><p class="lead">VTuber、編集者、絵師、音楽、プログラマー。ジャンルを横断して参加しています。</p><div class="grid">${D.members.slice(0,4).map(cardMember).join("")}</div><a class="more" href="#/members">MEMBERS一覧</a>`)}
<section class="alt"><div class="in"><h2>ACTIVITIES</h2><p class="lead">6つの軸で、活動を生み出します。</p><div class="grid">${D.activities.map(cardAct).join("")}</div></div></section>
${wrap(`<h2>JOIN VCA</h2><p class="lead">あなたの活動を、誰かの活動とつなげませんか。</p><a class="btn pri" href="#/join">加入について見る</a>`)}`,

about: () => hd("ABOUT", "VCAとは何か") + wrap(`<div class="prose">
<h3>VCAとは</h3><p>Virtual Creators Association（VCA／ヴィーカ）は、個人で活動するVTuber、バーチャルクリエイター、動画制作者、イラストレーター、音楽制作者、プログラマーなどをつなぐ「協会」です。</p>
<div class="quote">会社ではない。しかし、会社のように人・企画・制作をつなげられる組織を目指す。</div>
<h3>設立理念</h3><p>交流の場をつくることが目的ではありません。人が出会い、コラボレーションし、作品や企画が生まれ、プロジェクトになり、実績として次の活動につながる。この循環をつくることが目的です。</p>
<h3>「一人では届かない場所へ。」</h3><p>個人の活動には、時間・技術・人脈の限界があります。仲間の力を借りることで、一人では届かなかった規模の企画や表現に手が届く。この言葉には、その意味を込めています。</p>
<h3>活動方針</h3><p>ジャンルを問わず、互いの得意を活かし合うこと。参加者が主体となって企画を動かすこと。生まれた成果を、実績として残し発信すること。</p>
<h3>初心者から経験者まで</h3><p>活動歴は問いません。初心者には学べる場と仲間を、経験者には技術を活かす機会と新しい挑戦を。立場の違う人が混ざることで、活動が生まれやすくなります。</p>
<h3>VCAが目指す組織</h3><p>将来的に、企業ではなくても企業のように人・企画・制作・活動をつなぎ、クリエイターを支えられる組織を目指します。</p></div>`),

members: () => { const roles = [...new Set(D.members.flatMap(m => m.genres || []))];
  return hd("MEMBERS", "ジャンルを横断したVCAのメンバー") + wrap(`<div class="filters" id="filters"><button class="on" data-f="">ALL</button>${roles.map(r=>`<button data-f="${esc(r)}">${esc(r)}</button>`).join("")}</div><div class="grid" id="mgrid">${D.members.map(cardMember).join("")}</div>`); },

activities: () => hd("ACTIVITIES", "VCAの活動カテゴリー") + wrap(`<div class="grid">${D.activities.map(cardAct).join("")}</div>`),

projects: () => hd("PROJECTS", "VCAから何が生まれたか") + wrap(D.projects.length ? `<div class="grid">${sorted(D.projects).map(cardProject).join("")}</div>` : empty("プロジェクトは準備中です。")),

news: () => hd("NEWS", "VCAからのお知らせ") + wrap(D.news.length ? `<div class="news"><ul>${sorted(D.news).map(rowNews).join("")}</ul></div>` : empty("お知らせはまだありません。")),

join: () => hd("JOIN", "VCAに加入する") + wrap(`<div class="prose"><p>VCAは、個人で活動するVTuber・バーチャルクリエイター・創作活動者が、互いにつながり、新しい活動を生み出すための団体です。</p></div><h3 style="margin:32px 0 16px">こんな方へ</h3>
<ul class="check">${["誰かとコラボしたい","個人ではできない企画をやりたい","技術や知識を共有したい","自分の技術を他のクリエイターに活かしたい","新しい活動仲間を探している","将来的に大きな企画に挑戦したい"].map(t=>`<li>${t}</li>`).join("")}</ul>
<div class="btns">${link(D.site.joinUrl, "JOIN VCA（加入申請へ）") || `<span class="empty">加入申請ページは準備中です。<a class="more" href="#/contact">CONTACTから問い合わせる</a></span>`}</div>`),

rules: () => hd("RULES", "VCA RULE BOOK") + wrap(`<div class="btns" style="margin:0 0 32px">${link(D.site.rulebookUrl, "RULE BOOKを開く") || `<span class="empty">RULE BOOKは準備中です。</span>`}</div><div class="acc prose">${D.rules.map(r=>`<details><summary>${esc(r.title)}</summary><p>${esc(r.text)}</p></details>`).join("")}</div>`),

contact: () => hd("CONTACT", "お問い合わせ") + wrap(`<form id="cf"><label>種別<select name="type">${["一般問い合わせ","VCA加入","コラボレーション","クリエイター連携","メディア","その他"].map(t=>`<option>${t}</option>`).join("")}</select></label><label>お名前／活動名<input name="name" required></label><label>連絡先（メールまたはSNS）<input name="contact" required></label><label>内容<textarea name="body" rows="6" required></textarea></label><button class="btn pri" type="submit">メールアプリで送信</button>${D.site.contactUrl ? `<p>フォームで送る場合は ${link(D.site.contactUrl,"問い合わせフォーム","more")}</p>`:""}</form>`)
};

function openMember(id) {
  const m = D.members.find(x => x.id === id); if (!m) return;
  const list = (t, a) => a?.length ? `<h4>${t}</h4><ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>` : "";
  const links = Object.entries(m.links || {}).filter(([, u]) => u).map(([k, u]) => `<a class="tag" href="${esc(u)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("");
  const works = (m.works || []).map(w => w.url ? `<li><a href="${esc(w.url)}" target="_blank" rel="noopener">${esc(w.title)}</a></li>` : `<li>${esc(w.title)}</li>`).join("");
  $("#modal-body").innerHTML = `${avatar(m, true)}<h3>${esc(m.name)}</h3><p><b>${esc(m.role)}</b></p><p>${esc(m.about || m.intro)}</p>${list("得意分野", m.skills)}${list("VCA内でできること", m.canDo)}${links ? `<h4>SNS・YouTube</h4>${links}` : ""}${works ? `<h4>制作実績</h4><ul>${works}</ul>` : ""}`;
  $("#modal").hidden = false; $(".x").focus();
}
const closeModal = () => { $("#modal").hidden = true; };

function route() {
  const key = (location.hash.replace(/^#\//, "") || "home").split("?")[0];
  const page = views[key] ? key : "home";
  $("#app").innerHTML = views[page](); window.scrollTo(0, 0);
  $("#nav").classList.remove("open"); $(".burger").setAttribute("aria-expanded", "false");
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.p === page));
  document.title = (page === "home" ? "" : PAGES.find(p => p[0] === page)[1] + " | ") + "VCA バーチャルクリエイターズ協会";
}

document.addEventListener("click", e => {
  const mc = e.target.closest("[data-member]"); if (mc) return openMember(mc.dataset.member);
  const f = e.target.closest("[data-f]");
  if (f) { document.querySelectorAll("#filters button").forEach(b => b.classList.toggle("on", b === f));
    $("#mgrid").innerHTML = D.members.filter(m => !f.dataset.f || (m.genres || []).includes(f.dataset.f)).map(cardMember).join("") || empty("該当するメンバーはいません。"); }
  if (e.target === $("#modal") || e.target.closest(".x")) closeModal();
  if (e.target.closest(".burger")) { const o = $("#nav").classList.toggle("open"); $(".burger").setAttribute("aria-expanded", o); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
document.addEventListener("submit", e => {
  if (e.target.id !== "cf") return; e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  location.href = `mailto:${D.site.email}?subject=${encodeURIComponent("[VCA] " + d.type)}&body=${encodeURIComponent(`お名前: ${d.name}\n連絡先: ${d.contact}\n\n${d.body}`)}`;
});

(async () => {
  try {
    const [members, news, projects, activities, rules, site] = await Promise.all(["members", "news", "projects", "activities", "rules", "site"].map(n => fetch(`data/${n}.json`).then(r => r.json())));
    Object.assign(D, { members, news, projects, activities, rules, site });
  } catch (err) {
    $("#app").innerHTML = `<section><div class="in">${empty("データを読み込めませんでした。GitHub Pages等のサーバー経由で開いてください（ファイルを直接開くと読み込めません）。")}</div></section>`; return;
  }
  $("#nav").innerHTML = PAGES.map(([k, l]) => `<a href="#/${k === "home" ? "" : k}" data-p="${k}" class="${k === "join" ? "join" : ""}">${l}</a>`).join("");
  window.addEventListener("hashchange", route); route();
})();
