# vue-tips-samples

[現場で使える Vue.js tips 集](https://nextpublishing.jp/book/10057.html)のサンプルコード

## このリポジトリについて

現場で使える Vue.js tips 集は「商業版」と「同人版」の 2 種類が存在します。
master ブランチは**商業版**に対応したコードとなっています。
同人版のコードを確認されたい方は[doujinshi ブランチ](https://github.com/mya-ake/vue-tips-samples/tree/doujinshi)をご覧ください。

## サポートページ

本書のサポートページを用意しました。
サポートページでは書籍内で書ききれなかった内容やサンプルコードのデモを置いています。合わせてご参照ください。

https://vue-tips-support-page.mya-ake.org

#### デモサイト

https://vue-tips-support-page.mya-ake.org/demo/

## 章とフォルダー

### 1 章 computed と filter

- [computed_filter](https://github.com/mya-ake/vue-tips-samples/tree/master/computed_filter)

### 2 章 お問い合わせフォームと戦う

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)

### 3 章 フォームのライブラリー実装編

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)

### 4 章 Vuex の tips

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)
- [samples/modal_store](https://github.com/mya-ake/vue-tips-samples/tree/master/samples/modal_store)
  - UI の操作にストアを使う例
- [samples/vuex_transition_problem](https://github.com/mya-ake/vue-tips-samples/tree/master/samples/vuex_transition_problem)
  - 遷移前に表示が変わる問題の例

### 5 章 vue-test-utils でなにをテストするか

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)

### 6 章 vue-i18n の Lazy loading と vue-router

- [i18n](https://github.com/mya-ake/vue-tips-samples/tree/master/i18n)

## 注意

- `npm`でなく`yarn`を使っています
  - `npm`でも動くとは思います
- [vue-cli v3](https://github.com/vuejs/vue-cli)を利用しています
  - ESLint は`ESLint + Prettier`です
  - 追加で`'singleQuote': true`, `'trailingComma': 'all'`を付けています
- Chrome で作業していたので他のブラウザの動作までは確認できていません
  - モダンブラウザなら動くはずです
  - モダンブラウザで動作していなさそうなブラウザがあった場合は[@mya_ake](https://twitter.com/mya_ake)までご連絡ください
  - または[issues](https://github.com/mya-ake/vue-tips-samples/issues)にて起票お願いします

## 更新予定

更新予定などはこのリポジトリの[issues](https://github.com/mya-ake/vue-tips-samples/issues)をご覧ください
