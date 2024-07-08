window.onload = () => {
//ドロップダウンの作成
const sel1 = new UI.dropdown(document.getElementById("sel1"));
sel1.setOnChange((value) => {console.log(value);});
const sel2 = new UI.dropdown(document.getElementById("sel2"));
//スライダーの作成
const slider1 = new slider(document.getElementById("slider1"));
}
slider1.setstates(150,50,0);
