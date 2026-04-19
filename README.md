# 🎨 manpuc's Portfolio

マイクロインタラクションやUIの心地よさにこだわって制作された、モダンで洗練されたポートフォリオサイト。Astro 6とVanilla CSSをベースに、高度な視覚効果とパフォーマンスを両立しています。

## ✨ 特徴

- **マイクロインタラクション**: ユーザー体験を向上させる、滑らかで反応の良いアニメーション。
- **磨りガラス効果 (Glassmorphism)**: SVGフィルタ（`feTurbulence`, `feDisplacementMap`）を駆使した、高度で自然な背景ぼかし。
- **ダークモード/ライトモード**: OS設定連動に加え、手動での切り替えにも対応。
- **多言語対応 (JA/EN)**: ワンクリックで言語を切り替え可能。設定はLocalStorageに保存され、次回の訪問時も維持されます。
- **SEO & Sitemap**: 自動生成されるサイトマップ、正規化されたrobots.txt、およびメタタグにより、検索エンジンへの最適化を実施。
- **パフォーマンス最適化**:
  - `Sharp` による画像の自動最適化。
  - `PurgeCSS` による未使用CSSの削除。
  - `Critters` によるクリティカルCSSとフォントのインライン化。
- **レスポンシブデザイン**: すべてのデバイスサイズに対して、最適なレイアウトと操作性を提供。

## 🛠️ 技術スタック

- **Framework**: [Astro 6](https://astro.build/)
- **Styling**: Vanilla CSS (Custom Properties & Scoped Styles)
- **Advanced Effects**: SVG Filters (Fractal Noise & Displacement Mapping)
- **Optimization**: [PurgeCSS](https://purgecss.com/), [Critters](https://github.com/GoogleChromeLabs/critters), [Sharp](https://sharp.pixelplumbing.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [Vercel](https://vercel.com/)
- **SEO**: [@astrojs/sitemap](https://docs.astro.build/ja/guides/integrations-guide/sitemap/)

## 📈 最適化とSEOについて

このプロジェクトでは、最新のウェブ標準に基づいた最適化を施しています：

- **Font Caching**: Google Fontsを非同期で読み込み、レイアウトシフト（CLS）を最小限に。
- **Image Optimization**: WebP形式への自動変換とリサイズにより、転送量を大幅に削減。
- **Clean CSS**: ビルド時に不要なスタイルを完全に排除し、CSSサイズを最小化。
- **Dynamic Sitemap**: ページの追加・変更に合わせてインデックスが自動更新。

---

## 💡 利用ポリシー (Policy)

このポートフォリオは、私の技術の証明であると同時に、他の開発者の学びの助けになることを願って公開しています。

- **Welcome**: 実装ロジックの参考にしたり、コードの一部（スニペット）をあなたのサイトで活用したりするのは大歓迎です！
- **Please**: もし参考になったら、GitHubでStarをくれたり、どこかにクレジットを記載してくれたりすると非常に励みになります。
- **Stop**: サイトを丸ごと複製して自分のポートフォリオとして公開したり、掲載されている私の名前や制作実績データをそのまま使うことはご遠慮ください。

Copyright (c) 2026 manpuc.

Developed with ❤️ for quality user experience.
