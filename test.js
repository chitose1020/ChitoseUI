window.onload = () => {
//ドロップダウンの作成
const sel1 = UI.dropdown(document.getElementById("sel1"));
sel1.setOnChange((value) => {console.log(value);});
const sel2 = UI.dropdown(document.getElementById("sel2"));
sel2.setMaxHeight(50);
//スライダーの作成
const slider1 = UI.slider(document.getElementById("slider1"));
slider1.setRange(50,0);
slider1.setWidth(300);
slider1.setColors("black","blue");
const loading1 = UI.loading(document.getElementById("loading1"));
loading1.show();
setTimeout(() => {
  loading1.hide();
}, 3000);
const copybtn = UI.copy_button(document.getElementById("copy-btn1"));
}
