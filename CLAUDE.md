# CLAUDE.md — まったりブログ (tastasworld.github.io)

このリポジトリで Claude Code が作業する際の前提・規約。

## サイト概要

- Astro 5 静的サイト。GitHub Actions 経由で GitHub Pages にデプロイ
- 公開URL: https://tastasworld.github.io/
- サイト表示名: **「まったりブログ」** (URL/リポジトリ名の `tastasworld` は前面に出さない方針)
- `public/privacy-policy.html` は **絶対に消さない** (Play Store アプリのプライバシーポリシーとして参照されている)

## 記事執筆ワークフロー (重要)

記事は **1次情報 (notes/) → 2次情報 (src/content/posts/)** の2層構成。

```
notes/<slug>/
├── notes.md      # ユーザー専用。所感・思いついたこと。AIは読むだけ
└── images.md     # ユーザー専用。画像の中身説明 (AIは画像ファイルを直接見ない)

src/content/posts/<slug>.mdx   # AIが notes/ を元に推敲・構成する公開記事
```

詳細ルール: `notes/README.md` 参照。

### 厳守事項

- **`notes/` 配下は AI が編集禁止** (ユーザーから明示依頼があった場合のみ可)
- **画像ファイル (jpg/mp4等) は Read で開かない** — トークン消費が大きいため。`images.md` の説明文を根拠にする
- **draft 状態の記事はそのまま** — `draft: false` / `noindex: false` への切替はユーザーが明示的に指示したときのみ
- **publishDate を未来日付に勝手に変えない** — ユーザーが意図的に設定しているため

### dev サーバー (プレビュー)

```bash
cd /home/tashiro/projects/tastasworld.github.io && npm run dev
```

- `http://localhost:4321/` で表示確認
- **dev サーバーでは draft も表示される** (本番ビルドでは除外。`src/pages/index.astro` と `src/pages/posts/[...slug].astro` の getCollection フィルタで `import.meta.env.DEV ||` を判定)

## デプロイ

- main へ push すると `.github/workflows/deploy.yml` が走る
- 本番に出るのは `draft: false` の記事のみ
- 全記事 `noindex: true` がデフォルト (個別記事の frontmatter で上書き可)

## アカウント運用

- このリポジトリへの push は **tastasworld アカウント** で行う (`gh auth switch -u tastasworld`)
- 管理リポジトリ `koichitas/projects` は `koichitas` アカウント
- 作業後は `gh auth switch -u koichitas` に戻す
