# HOMURA プロジェクトのウェブサイト

HOMURA（Human-Overseen Models for Unified Review Automation）の概要と、SRデータの募集を案内する静的Astroサイトです。日本語はルート、英語は `/en/` に配置します。

公開URL: https://youkiti.github.io/homura-project/

## ローカルでのビルド

Node.js 22.23.4 以上の22系を使用します（Astro 7 の要件。CI は 22.23.5）。

```sh
npm ci
npm run build
npm run check
```

生成物は `dist/` に出力されます。`check` は内部リンク・参照先の存在と、未置換のプレースホルダーを検査します。

## 内容の更新

本文は `content/ja/` と `content/en/` のMarkdownを編集します。ページの対応とURLは `src/pages/[...page].astro` で指定しています。契約書にはfront matterがないため、タイトルと言語はページ側で補っています。

SRデータの受付状況は `src/site-config.mjs` の `status.ja` と `status.en` を変更します。同じファイルに申込フォームURLと告知日もまとめています。Markdownの `{{STATUS}}`、`{{FORM_URL}}`、`{{DATE}}` はビルド時に置換されます。

## 公開

プルリクエストではGitHub Actionsでビルドと検査を実行します。`main` へのpush、またはDeploy to GitHub Pagesワークフローの手動実行で、検査後の `dist/` をGitHub Pagesへデプロイします。
