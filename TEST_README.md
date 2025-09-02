# 自動テストについて

このプロジェクトのロジック処理に対する自動テストを作成しました。

## セットアップ

必要な依存関係をインストール:
```bash
npm install
```

## テストファイル

以下のロジックコンポーネントに対してテストを作成しました：

### 1. **Vuex Store テスト** (`src/__tests__/store.spec.js`)
- ウィンドウ状態管理のテスト
- z-index管理のテスト
- ウィンドウカウント管理のテスト

### 2. **Position Logic テスト** (`src/__tests__/position.spec.js`)
- ウィンドウの位置管理ロジックのテスト
- ドラッグ&ドロップ機能のテスト
- リサイズ機能のテスト
- 初期化処理のテスト

### 3. **Script Logic テスト** (`src/__tests__/script.spec.js`)
- clear メソッドの動作確認テスト

## テストの実行

すべてのテストを実行:
```bash
npm test
```

ウォッチモードでテストを実行（ファイル変更を監視）:
```bash
npm run test:watch
```

カバレッジレポート付きでテストを実行:
```bash
npm run test:coverage
```

## テストフレームワーク

- **Jest**: JavaScriptテストフレームワーク
- **Vue Test Utils**: Vue.jsコンポーネントのテストユーティリティ
- **Babel**: ES6+のコードをトランスパイル

## プロジェクト構造

```
src/
├── __tests__/          # テストファイル
│   ├── store.spec.js   # Vuexストアのテスト
│   ├── position.spec.js # 位置管理ロジックのテスト
│   └── script.spec.js  # スクリプトロジックのテスト
├── logic/              # ロジックファイル
│   ├── store.js        # Vuexストア
│   ├── position.js     # 位置管理ミックスイン
│   └── script.js       # スクリプトミックスイン
└── ...

## 今後の改善点

1. テストカバレッジの向上
2. E2Eテストの追加
3. より詳細なエッジケースのテスト
4. モックの改善