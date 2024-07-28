# 概要
UI作成用のライブラリ的なものを作るためのテスト用リポジトリです。  
気が向いたら更新していきます。  
# 機能
## Dropdown/ドロップダウン
### 追加方法
htmlに`dropdown`クラスを指定したdiv要素を作成し、オプションは`dropdown_option`クラスを指定する。`date-value`を指定することもできる。  
htmlに要素を作成できたら、Javascriptで、
```js
const ドロップダウンを格納する変数名 = UI.dropdown(document.getElementById("ドロップダウンの親要素のID"));
```
を実行する。　そしたらサイトにドロップダウンが生成される。  
### メソッド
`getValue();`現在の値を取得し返す。  
`setOnChange(function);`コールバック関数を指定します。  

## Slider/スライダー
### 追加方法
スライダーを生成したい場合、htmlでdiv要素に`slider`クラスを指定し、初期値を設定したい場合は、`data-initial-value`で設定する。  
htmlに要素を作成できたらJavascriptで、
```js
const スライダーを格納する変数名 = UI.slider(document.getElementById("スライダーの要素のID"));
```
を実行すると、スライダーが作成される
### メソッド
`setRange(max,mini)`スライダーの値の範囲を指定する  
`setHeight(height)`スライダーの高さを指定する  
`setWidth(width)`スライダーの長さを指定する  
`setColor(SliderColor,HandleColor)`スライダー、ハンドルの色を変更する  
`setHandle_r(radius)`ハンドルの半径を変更する  

##loadingspinner/ローディングスピナー
###追加方法
htmlでdiv要素を作成し、
```js
const 格納する変数名 = UI.loading(document.getElementById("div要素のID"));
```
を実行する。
###メソッド
`show()`ローディングスピナーの表示
`hide()`ローディングスピナーを隠す
