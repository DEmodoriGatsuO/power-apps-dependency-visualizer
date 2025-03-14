# Power Apps 依存関係ビジュアライザー

Power Appsキャンバスアプリケーションのコントロール間の依存関係を視覚化するWeb用ツールです。開発者がコントロールやスクリーン間の複雑な関係を理解するのに役立ちます。

<div align="center">
<img src="https://github.com/DEmodoriGatsuO/power-apps-dependency-visualizer/blob/main/screenshots/main-view.png" alt="Power Apps 依存関係ビジュアライザー" width="800"/>
</div>

*Created by Claude (Anthropic)*

## 主な機能

- **依存関係グラフ可視化**: 力学モデルを用いたコントロール関係のインタラクティブな可視化
- **階層構造表示**: コントロール間の親子関係を明確に把握可能
- **プロパティベースの依存関係**: 数式内の参照に基づく依存関係を特定
- **インタラクティブ操作**: ズーム、パン、および特定の領域に焦点を当てるための操作が可能
- **検索とフィルター**: 大規模なアプリケーションでも特定のコントロールを素早く発見
- **詳細分析**: 任意のコントロールについて、入力依存と出力依存の両方を検証可能
- **多言語対応**: 日本語と英語のインターフェイスを提供
- **サーバー不要**: ブラウザのみで動作し、サーバーサイド処理は不要

## 使用例

- **アプリケーション構造分析**: 複雑なPower Appsを一目で理解
- **影響分析**: 変更によって影響を受ける可能性のあるコントロールを特定
- **デバッグ**: アプリケーションの問題を引き起こす依存関係の問題を発見
- **ドキュメント作成**: Power Appsの構造を視覚的に文書化
- **知識移転**: 新しいチームメンバーがアプリケーションの設計を理解するのを支援

## 使い方

1. **YAMLソースコードを入力**:
   - Power AppsのYAMLソースコードを入力ボックスに貼り付け
   - または、サンプルデータを使用してツールを試すことも可能

2. **依存関係を解析**:
   - 「依存関係を解析」ボタンをクリックしてYAMLコードを処理
   - ツールがコントロール間の関係を抽出・分析

3. **視覚化結果を探索**:
   - グラフビューとテーブルビューを切り替え
   - ノードにカーソルを合わせて詳細を確認
   - ズームコントロールで特定の領域に集中
   - テーブルビューで特定のコントロールを検索

## 導入方法

### 方法1: 直接Webアクセス

[Power Apps Dependency Visualizer](https://demodorigatsuo.github.io/power-apps-dependency-visualizer/)にアクセスしてオンラインでツールを使用できます。

### 方法2: ローカルデプロイメント

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/DEmodoriGatsuO/power-apps-dependency-visualizer.git
   ```

2. ウェブブラウザで `index.html` を開く

3. サーバーのセットアップやインストールは不要です！

### 方法3: GitHub Pages

1. このリポジトリをフォーク
2. Settings > Pages に移動
3. ソースをメインブランチに設定
4. ビジュアライザーが `https://[あなたのユーザー名].github.io/power-apps-dependency-visualizer/` で利用可能になります

## Power AppsからYAMLを抽出する方法

Power AppsからYAMLソースコードを抽出する手順:

1. Power Appsを編集モードで開く
2. ファイル > 名前を付けて保存 を選択
3. 保存先として「このコンピューター」を選択
4. .msappファイルを保存
5. .msappファイルの拡張子を.zipに変更
6. .zipファイルを解凍
7. 解凍したコンテンツ内のYAMLファイルを探す

## 技術的詳細

Power Apps 依存関係ビジュアライザーは以下の技術を使用しています:

- **D3.js**: インタラクティブな力学モデルグラフ可視化
- **js-yaml**: YAMLソースコードの解析
- **HTML5/CSS3/JavaScript**: ユーザーインターフェースとアプリケーションロジック

すべての処理はクライアントサイドで行われるため、Power Appsコードのプライバシーとセキュリティが確保されます。

## 貢献

貢献大歓迎です！Pull Requestをお気軽にお送りください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています - 詳細はLICENSEファイルをご覧ください。

## 謝辞

- Created by Claude (Anthropic)
- より良いPower Apps可視化ツールの必要性から着想
- Power AppsとPower Platformコミュニティに感謝

---

*免責事項: これは公式のMicrosoftツールではありません。Power AppsはMicrosoft Corporationの商標です。*