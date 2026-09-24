# VCA 公式サイト
GitHub Pagesにそのままアップロードして動作します（Settings > Pages > main / root）。
- `index.html` 骨組み / `css/style.css` 見た目 / `js/app.js` 描画・ルーティング
- `data/members.json` メンバー追加はここに1件追記（HTML編集不要）。`image`に`images/xxx.png`を指定
- `data/news.json` `projects.json` `activities.json` `rules.json` 各内容
- `data/site.json` 加入申請URL・RULE BOOK URL・問い合わせ先メールを設定
ローカル確認: `python3 -m http.server` → http://localhost:8000

## 画像の入れ方（images/ に置いてJSONにパスを書く）
- ロゴ: `site.json` の `logo` → 例 `images/logo.png`（高さ36px表示・横長／透過PNG推奨）
- キービジュアル: `keyVisual` → 例 `images/kv.png`（透過PNG推奨・縦横比自由）
- 立ち絵: `members.json` の `portrait` → 例 `images/aoki-ciclo-full.png`（縦長3:4、上半身が見える構図が最適）
- 顔アイコン: `image`（立ち絵が無い場合に円形表示）／サムネイル: news・projects の `thumbnail`
- 画像は1枚500KB以下（webp/png）が目安
