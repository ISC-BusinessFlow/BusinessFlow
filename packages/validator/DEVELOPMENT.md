# DEVELOPMENT

## Setup

1. 依存関係のインストール

```bash
yarn install
```

## Project layout

```
├─ __tests__/
├─ generate/
├─ rule.yml
├─ src/
└─ templates/
```

### `__tests__`

`generate` ディレクトリ以下にある自動生成されたコードに関するテストをここに記述します。

`getTaskRule` と `getPathRule` についてはスナップショットテストを行い、コードを変更しても返ってくるルールが変わらないことをテストしています。O

### `generate`

`validator` パッケージの実際のロジックがここに記述されます。`generate` ディレクトリ以下のコードは自動生成されるため、編集しないでください。

### `rule.yml`

`validator` のルールを記述するファイルです。このファイルの内容をもとにコードを自動生成します。

### `src`

`rule.yml` を読み込んでコードを生成するためのロジックがここに記述されます。

### `templates`

コードを自動生成する際に使用するテンプレートがここに記述されます。
テンプレートエンジンには[ejs](https://ejs.co/)を使用しています。

## Code generate

コードを実際に生成するには以下のコマンドを使用します。

```bash
yarn run generate
```

**なお、生成したコードは `yarn run lint-fix` コマンドを使用して、整形してから GitHub 上に push するようにしてください。**

## Test

テストをする際には以下のコマンドを使用します。

```bash
yarn run test
```

## Build

このパッケージをビルドするときは以下のコマンドを使用します。

```bash
yarn run build
```

このコマンドにより`dist`ディレクトリ以下に`js`ファイルと型定義ファイルが生成されます。
