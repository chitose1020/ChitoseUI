# 概要
UI作成用のライブラリ的なものを作るためのテスト用リポジトリです。
気が向いたら更新していきます。
# 機能
## Dropdown/ドロップダウン
htmlに`dropdown`クラスを指定したdiv要素を作成し、
オプションは`dropdown_option`クラスを指定する。`date-value`を指定することもできる。
htmlに要素を作成できたら、Javascriptで、
```js
const ドロップダウンを格納する変数名 = new UI.dropdown(document.getElementById("ドロップダウンの親要素のID"));
```
とする。　そしたらサイトにドロップダウンが生成される。利点としては、画像も使えるということや、スタイルのカスタマイズもできるということ。
いつかJavasriptからスタイルの変更ができるように変更するかも
## Slider/スライダー
スライダーを生成したい場合、htmlでdiv要素に`slider`クラスを指定し、初期値を設定したい場合は、`data-initial-value`で設定する。
Javascriptでは、
```js
const スライダーを格納する変数名 = new UI.slider(document.getElementById("スライダーの要素のID"));
```
として、横幅や値の制限の設定は、
```js
スライダーを格納した変数名.setstates(横幅,最大値,最小値);
```
とする。
