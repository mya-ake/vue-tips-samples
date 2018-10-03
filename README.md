# vue-tips-samples
[現場で使えるVue.js tips集](https://nextpublishing.jp/book/10057.html)のサンプルコード

## このリポジトリについて

現場で使えるVue.js tips集は「商業版」と「同人版」の2種類が存在します。
masterブランチは**商業版**に対応したコードとなっています。
同人版のコードを確認されたい方は[doujinshiブランチ](https://github.com/mya-ake/vue-tips-samples/tree/doujinshi)をご覧ください。


## サポートページ

本書のサポートページを用意しました。
サポートページでは書籍内で書ききれなかった内容やサンプルコードのデモを置いています。合わせてご参照ください。

https://vue-tips-support-page.mya-ake.org

#### デモサイト

https://vue-tips-support-page.mya-ake.org/demo/


## 章とフォルダー

### 1章 computedとfilter

- [computed_filter](https://github.com/mya-ake/vue-tips-samples/tree/master/computed_filter)

### 2章 お問い合わせフォームと戦う

- [samples/simple_form](https://github.com/mya-ake/vue-tips-samples/tree/master/samples/simple_form)


### 3章 フォームのライブラリー実装編

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)

### 4章 Vuexのtips

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)
- [samples/modal_store](https://github.com/mya-ake/vue-tips-samples/tree/master/samples/modal_store)
  - UIの操作にストアを使う例
- [samples/vuex_transition_problem](https://github.com/mya-ake/vue-tips-samples/tree/master/samples/vuex_transition_problem)
  - 遷移前に表示が変わる問題の例

### 5章 vue-test-utilsでなにをテストするか

- [form](https://github.com/mya-ake/vue-tips-samples/tree/master/form)


### 6章 vue-i18nのLazy loadingとvue-router

- [i18n](https://github.com/mya-ake/vue-tips-samples/tree/master/i18n)


## 注意

- `npm`でなく`yarn`を使っています
  - `npm`でも動くとは思います
- [vue-cli v3](https://github.com/vuejs/vue-cli)を利用しています
  - ESLintは`ESLint + Prettier`です
  - 追加で`'singleQuote': true`, `'trailingComma': 'all'`を付けています
- Chromeで作業していたので他のブラウザの動作までは確認できていません
  - モダンブラウザなら動くはずです
  - モダンブラウザで動作していなさそうなブラウザがあった場合は[@mya_ake](https://twitter.com/mya_ake)までご連絡ください


## 更新予定

更新予定などはこのリポジトリの[issues](https://github.com/mya-ake/vue-tips-samples/issues)をご覧ください
