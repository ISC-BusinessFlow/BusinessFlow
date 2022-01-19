# backend

BusinessFlow のバックエンド。

## Setup

1. 依存関係のインストール

```bash
yarn install
```

2. 環境変数の設定

```bash
cp .env.local .env
```

3. docker を使って DB を起動する

```bash
docker-compose up --build
```

4. Prisma を使って migration をする

```bash
yarn run prisma:migrate
yarn run prisma db seed
```

5. `@prisma/client`を生成する

```bash
yarn run prisma generate
```

6. 開発サーバーの起動

```bash
yarn run dev
```

## Format

### Prisma

`schema.prisma` のフォーマットを整形したいときは以下のコマンドを実行してください。

```bash
yarn run prisma:format
```

**なお、`schema.prisma`を編集したときは`yarn run prisma:format`コマンドを使用して、整形してから GitHub 上に push するようにしてください。**
