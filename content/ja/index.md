---
title: HOMURA プロジェクト
lang: ja
---

# HOMURA（焔）

Human-Overseen Models for Unified Review Automation

システマティックレビュー（SR）は、検索式の設計、スクリーニング、データ抽出という工程のどれにも、専門の訓練と多くの人手が要ります。HOMURA プロジェクトは、大規模言語モデルを使って、専門家でなくても妥当なSRに着手できる状態を目指します。

AI に任せきりにはしません。AI を使った箇所と、人が確認した履歴を見えるようにしたうえで、人手の総量を下げることを目指します。

## お知らせ

- {{DATE}}　[SRデータの募集を始めました](sr-data/)

## ツール

オープンソースで開発しています。

| 工程 | ツール |
| --- | --- |
| 検索式の設計 | [SR Query Builder](https://github.com/youkiti/sr-query-builder-plugin) |
| タイトル・抄録スクリーニング | [TiAb Review](https://github.com/youkiti/tiab-review-plugin) |
| データ抽出 | [SR Data Extraction](https://youkiti.github.io/sr-data-extraction-plugin/) |

## 進め方

1. 過去のSRの記録からベンチマークを作り、ツールの性能を測ります（[SRデータの募集](sr-data/)はこのためのものです）
2. 実際にSRを行う方に使っていただくランダム化比較試験で、ツールの有効性を確かめます

## 研究開発代表者・お問い合わせ

研究開発代表者　片岡裕貴（名古屋大学医学部附属病院 卒後臨床研修・キャリア形成支援センター）

お問い合わせ　HOMURA 研究班 事務担当　鈴木紀子（名古屋大学 総合医学教育センター）
suzuki.noriko.s2@f.mail.nagoya-u.ac.jp

---

本プロジェクトは、国立研究開発法人日本医療研究開発機構（AMED）の支援を受けています（課題管理番号 26rea522132h0001）。
