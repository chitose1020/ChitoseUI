# 概要
UI作成用のライブラリ的なものを作るためのテスト用リポジトリです。
気が向いたら更新していきます。
# 機能
Drop down : htmlに`dropdown`クラスを指定したdiv要素を作成し、
オプションは`dropdown_option`クラスを指定する。`date-value`を指定することもできる。
htmlに要素を作成できたら、Javascriptで、
```js
const ドロップダウンを格納する変数名 = new dropdown(document.getElementById("ドロップダウンの親要素のID"));
```
とする。　そしたらサイトにドロップダウンが生成される。利点としては、画像も使えるということや、スタイルのカスタマイズもできるということ。
