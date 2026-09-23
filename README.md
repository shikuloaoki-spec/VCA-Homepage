# VCA 公式サイト
GitHub Pagesにそのままアップロードして動作します（Settings > Pages > main / root）。
- `index.html` 骨組み / `css/style.css` 見た目 / `js/app.js` 描画・ルーティング
- `data/members.json` メンバー追加はここに1件追記（HTML編集不要）。`image`に`images/xxx.png`を指定
- `data/news.json` `projects.json` `activities.json` `rules.json` 各内容
- `data/site.json` 加入申請URL・RULE BOOK URL・問い合わせ先メールを設定
ローカル確認: `python3 -m http.server` → http://localhost:8000
