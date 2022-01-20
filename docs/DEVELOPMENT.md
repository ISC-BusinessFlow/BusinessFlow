# DEVELOPMENT

## Project layout

```
├─ .eslintrc.js
├─ .prettierrc.js
├─ backend/
├─ backend/
├─ frontend/
├─ docs/
└─ packages/
```

このプロジェクトでは`yarn workspaces` と `lerna` を使ったモノリポ構成になっています。

### `.eslintrc.js`

プロジェクト全体で使う ESLint の設定です。

この設定は `backend` や `frontend` 側からも参照して使われることがあります。

### `.prettierrc.js`

プロジェクト全体で使う Prettier の設定です。

この設定は `backend` や `frontend` 側からも参照して使われることがあります。

### `backend`

BusinessFlow の backend 側になります。

詳しくは`backend`の[ドキュメント](../backend/README.md)を参照してください。

### `frontend`

BusinessFlow の frontend 側になります。

詳しくは`frontend`の[ドキュメント](../frontend/README.md)を参照してください。

### `docs`

BusinessFlow の全体に関わるドキュメントがあります。

### `packages`

`frontend` や `backend` などの複数のパッケージから参照したいコードがここにあります。

## Command

### `lint`

プロジェクト全体に対して Lint でのチェックをしたいときは以下のコマンドを実行します。

```bash
yarn run lint
```

### `lint-fix`

プロジェクト全体に対して Lint でのルールに反している箇所に対して、自動的に修正したい場合は以下のコマンドを実行します。

```bash
yarn run lint-fix
```

## Issue

このプロジェクトに問題がある場合や、新機能を追加したいときは GitHub 上で Issue を作成します。

その Issue に関する PR を作成する際には `issue-<issueの番号>` というブランチにしてください。
