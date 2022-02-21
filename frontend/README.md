# frontend

BusinessFlow のフロントエンド。

## Setup

1. 依存関係のインストール

```bash
yarn install
```

2. 環境変数の設定

```bash
cp .env.example .env
```

3. 開発サーバーの起動

```bash
yarn run dev
```

## Project layout

```
└─ src/
   ├─ components/
   ├─ features/
   ├─ hooks/
   ├─ lib/
   │ ├─ models/
   │ └─ repositories/
   └─ pages/
```

### `components`

再利用可能なコンポーネントをここに入れます。

原則として `components/<コンポーネント名(UpperCamel)>/index.tsx` という形式にします。

### `features`

独立した機能をこのディレクトリに入れます。
例えば、フローを描写するためのロジックは一つの独立した機能のため、このディレクトリ以下に`Diagrams`という名前のディレクトリを作成し、そこにフローを描写するためのロジックを入れます。

### `hooks`

再利用可能な hook をここに入れます。

原則として `hooks/<useから始まるhook名>.ts(x)` という形式にします。

### `lib`

ここには React に直接依存しないようなロジックを入れます。

#### `models`

フロー編集画面で登場するような Task や Path などの model をここに入れます。

#### `repositories`

外部の API とのやり取りに関するロジックをここに入れます。

### `pages`

- https://nextjs.org/docs/basic-features/pages

## Test

テストをする際には以下のコマンドを使用します。

```bash
yarn run test
```
