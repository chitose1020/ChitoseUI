window.onload = () => {
//ドロップダウンの作成
const sel1 = new UI.dropdown(document.getElementById("sel1"));
sel1.setOnChange((value) => {console.log(value);});
const sel2 = new UI.dropdown(document.getElementById("sel2"));
sel2.setMaxHeight(50);
//スライダーの作成
const slider1 = new slider(document.getElementById("slider1"));
slider1.setRange(50,0);
slider1.setWidth(300);
slider1.setColors("black","blue");
const loading1 = new loading(document.getElementById("loading1"));
}
