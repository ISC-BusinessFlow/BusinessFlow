# BusinessFlow

## 初期設定

```bash
yarn install
```

## 新規パッケージを追加

```bash
yarn run lerna create
```

## パッケージを依存関係に追加

pkg2にpkg1の依存関係を追加
```bash
yarn run lerna add <pkg1> --scope=<pkg2>
```
