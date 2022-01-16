# `validator`

Task や Path の関連付けに関するバリデーションをするパッケージ。

## Usage

```typescript
import { validateRelation, getTaskRule, getPathRule } from 'validator';

const { isValid, errors } = validateRelation({ fromId: 1, pathId: 1, toId: 1 });
const taskRule = getTaskRule(1);
const pathRule = getPathRule(1);
```

## API

### `validateRelation`

```typescript
const { isValid, errors } = validateRelation({ fromId: 1, pathId: 1, toId: 1 });
```

`validateRelation`は Task と Path の関連付けに対するバリデーションを行います。

関連付けに問題があるときはエラーを返します。

<details>

### 返り値

##### isValid

| -            | -                                               |
| ------------ | ----------------------------------------------- |
| Description: | Task と Path の関連付けが有効かどうかを返します |
| Type:        | `boolean`                                       |

##### Error

| -            | -                                               |
| ------------ | ----------------------------------------------- |
| Description: | Task と Path の関連付けに対するエラーを返します |
| Type:        | `object`                                        |

### 引数

##### fromId

| -            | -                     |
| ------------ | --------------------- |
| Description: | Task の id を指定する |
| Type:        | `number`              |

##### pathId

| -            | -                     |
| ------------ | --------------------- |
| Description: | Path の id を指定する |
| Type:        | `number`              |

##### toId

| -            | -                     |
| ------------ | --------------------- |
| Description: | Task の id を指定する |
| Type:        | `number`              |

</details>

### `getTaskRule`

```typescript
const { from, to } = getTaskRule(1);
```

`getTaskRule`は 特定の id の Task に関するルールを返します。

<details>

### 返り値

##### from

| -            | -                                                            |
| ------------ | ------------------------------------------------------------ |
| Description: | 特定の Task の前に来る Task と Path に関するルールを返します |
| Type:        | `object`                                                     |

##### to

| -            | -                                                            |
| ------------ | ------------------------------------------------------------ |
| Description: | 特定の Task の次に来る Task と Path に関するルールを返します |
| Type:        | `object[]`                                                   |

### 引数

##### id

| -            | -                     |
| ------------ | --------------------- |
| Description: | Task の id を指定する |
| Type:        | `number`              |

</details>

### `getPathRule`

```typescript
const { from, to } = getPathRule(1);
```

`getPathRule`は 特定の id の Path に関するルールを返します。

<details>

### 返り値

##### from

| -            | -                                                            |
| ------------ | ------------------------------------------------------------ |
| Description: | 特定の Path の前に来る Task と Path に関するルールを返します |
| Type:        | `object`                                                     |

##### to

| -            | -                                                            |
| ------------ | ------------------------------------------------------------ |
| Description: | 特定の Path の次に来る Task と Path に関するルールを返します |
| Type:        | `object`                                                     |

### 引数

##### id

| -            | -                     |
| ------------ | --------------------- |
| Description: | Path の id を指定する |
| Type:        | `number`              |

</details>
