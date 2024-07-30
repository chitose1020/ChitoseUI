//ドロップダウン
class dropdown {
  value;
  OnChange;
  pulldown;

  constructor(el_parent) {
    // HTMLElementか判定
    if (!(el_parent instanceof HTMLElement)) return;

    // オプション定義＆数測定
    const options = el_parent.querySelectorAll(".dropdown_option");
    if (options.length < 1) return;
   //親要素にスタイル追加
   el_parent.style.position = "relative";
   el_parent.style.display = "inline-block";
   el_parent.style.cursor = "pointer";
   el_parent.style.width = "200px";

// プルダウンの作成
   this.pulldown = document.createElement("div");
   this.pulldown.classList.add("dropdown_pulldown");
   this.pulldown.style.position = "absolute";
   this.pulldown.style.width = "100%";
   this.pulldown.style.border = "1px solid #ccc";
   this.pulldown.style.display = "none";
   this.pulldown.style.zIndex = "1000";
   this.pulldown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
   this.pulldown.style.overflowY = "auto";
   this.pulldown.style.maxHeight = "200px";
   this.pulldown.style.backgroundColor = "transparent";

    // 表示領域の作成
   const display = document.createElement("div");
   display.classList.add("dropdown_display");
   display.style.padding = "10px";
   display.style.border = "1px solid #ccc";
   display.style.backgroundColor = "#fff";
   display.style.display = "flex";
   display.style.alignItems = "center";
   display.style.justifyContent = "space-between";
    display.addEventListener("click", () => {
      this.pulldown.style.display = this.pulldown.style.display === "none" ? "block" : "none";
    });

    // 選択中の表示
    const preview = document.createElement("div");
    preview.classList.add("dropdown_preview");

    // 選択中のオプションがなかったら一番上のオプションを選択
    const selected = el_parent.querySelectorAll(".dropdown-selected");
    if (selected.length < 1) {
      preview.appendChild(this.createPreview(options[0]));
      this.selectOption(options[0], preview, this.pulldown);
      this.value = options[0].dataset.value;
    } else {
      preview.appendChild(this.createPreview(selected[0]));
      this.selectOption(options[0], preview, this.pulldown);
      this.value = selected[0].dataset.value; 
    }

    display.appendChild(preview);

    const icon = document.createElement("div");
    icon.classList.add("dropdown_icon");
    icon.style.display = "inline-block";
    icon.textContent = "▼";  // アイコンのテキストを追加
    icon.style.fontSize = "12px";
    icon.style.color = "#666";
    display.appendChild(icon);

// 親要素にディスプレイ、プルダウンを追加
    el_parent.appendChild(display);
    el_parent.appendChild(this.pulldown);

// オプションにイベントを追加＆プルダウンの子要素にする
    options.forEach(option => {
     option.style.padding = "10px";
     option.style.cursor = "pointer";
     option.style.borderBottom = "1px solid #ccc";
      option.addEventListener("mouseover", () => {
       option.style.filter = "brightness(90%)";
      });
      option.addEventListener("mouseout", () => {
        option.style.filter = "brightness(100%)";
      });
      option.addEventListener("click", () => this.selectOption(option, preview, this.pulldown));
     this.pulldown.appendChild(option);
    });

// 画面外クリックで閉じる
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
       this.pulldown.style.display = "none";
      }
    });
  }

// プレビュー生成
  createPreview(option) {
    const preview = option.cloneNode(true);
    preview.classList.add("dropdown_preview-child");
    preview.classList.remove("dropdown_option");
    preview.style.backgroundColor = "";
    preview.style.color = "";
    preview.style.padding = "";
    preview.style.borderBottom = "";
    return preview;
  }

// オプション選択
  selectOption(option, preview, pulldown) {
    const options = option.parentElement.querySelectorAll(".dropdown_option");
    options.forEach(el => el.style.backgroundColor = "#fff");
    option.style.backgroundColor = "#c4c4c4"
    preview.innerHTML = '';
    preview.appendChild(this.createPreview(option));
    pulldown.style.display = "none";


// オプション変更検出
    if (this.value !== option.dataset.value) {
      this.value = option.dataset.value;
       if(typeof this.OnChange === 'function') this.OnChange(option.dataset.value);
    }
  }

//value取得
  getValue() {
   return this.value;
  }

//コールバック関数の指定
  setOnChange(func){
   this.OnChange = func;
  }

//スタイル設定
  setMaxHeight(height){
   this.pulldown.style.maxHeight = `${height}px`;
  }
}


//スライダー
class slider {
 el_parent;
 handle;
 track;
 value;
 dragging;
 OnChange;
 max = 100;
 min = 0;

  constructor(el_parent) {
//HTMLElemntか判定
    if (!(el_parent instanceof HTMLElement)) return;
   this.el_parent = el_parent;
   this.el_parent.style.position = "relative";
   this.el_parent.style.width = "100px";
   this.el_parent.style.height = "5px";
   this.el_parent.style.cursor = "grab";

//スライダーのトラック生成
   this.track = document.createElement("div");
   this.track.style.width = "100%";
   this.track.style.height = "100%";
   this.track.style.backgroundColor = "#ccc";
   this.track.style.borderRadius = "5px";
//ハンドル生成
   this.handle = document.createElement("div");
   this.handle.style.position = "absolute";
   this.handle.style.width = "20px";
   this.handle.style.height = "20px";
   this.handle.style.top = "50%";
   this.handle.style.transform = "translate(-50%, -50%)";
   this.handle.style.backgroundColor = "#333";
   this.handle.style.borderRadius = "50%";

   this.el_parent.appendChild(this.track);
   this.el_parent.appendChild(this.handle);

    //タッチ操作の無効化
   this.el_parent.style.touchAction = "none";

//初期値設定
   this.value = parseFloat(this.el_parent.getAttribute("data-initial-value")) || 0;
   this.handle.style.left = `${((this.value - this.min) / (this.max - this.min)) * 100}%`;

    //イベントの追加
   this.el_parent.addEventListener("mousedown", (e) => this.dragstart(e));
   window.addEventListener("mouseup", () => this.dragstop());
   window.addEventListener("mousemove", (e) => this.drag(e));
//モバイル対応
   this.el_parent.addEventListener("touchstart", (e) => this.dragstart(e), { passive: false });
   window.addEventListener("touchend", () => this.dragstop(), { passive: false });
   window.addEventListener("touchmove", (e) => this.drag(e), { passive: false });

  }

//ドラッグスタート
  dragstart(e){
   this.dragging = true;
   document.body.parentElement.style.cursor = "grabbing";
   this.el_parent.style.cursor = "grabbing";
   e.preventDefault();
  }

//ドラッグストップ
  dragstop(){
   this.dragging = false;
   document.body.parentElement.style.cursor = "auto";
   this.el_parent.style.cursor = "grab";
  }

//ドラッグ中
   drag(e){
   if (!this.dragging) return;
//親要素の位置情報,寸法取得 
   const rect = this.el_parent.getBoundingClientRect();
//タッチかクリックか
   const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//割合計算
   let value = ((clientX - rect.left) / rect.width) * (this.max - this.min) + this.min;
//制限
   value = Math.max(this.min, Math.min(this.max, value));
//位置反映
   this.handle.style.left = `${((value - this.min) / (this.max - this.min)) * 100}%`;
   this.value = value;
    if (typeof this.OnChange === "function")this.OnChange(this.value);
  }

//範囲指定
  setRange(max, min){
   this.max = max;
   this.min = min;
   this.value = Math.max(this.min, Math.min(this.max, this.value));
   this.handle.style.left = `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
  }

//スタイル設定
  setWidth(width){
   this.el_parent.style.width = `${width}px`;
   this.handle.style.left = `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
  }
  setHeight(height){
   this.track.style.height = `${height}px`
  }
  setHandle_r(r){
   this.handle.style.width = `${r * 2}px`
   this.handle.style.height = `${r * 2}px`
  }
  setColors(color1,color2){
   this.track.style.backgroundColor = color1;
   this.handle.style.backgroundColor = color2;
  }

//コールバック関数の指定
  setOnChange(func){
   this.OnChange = func;
  }
}

class loading {
  constructor(el_parent) {
    if (!(el_parent instanceof HTMLElement)) return;
   this.spinner = document.createElement("div");
   this.spinner.style.position = "fixed";
   this.spinner.style.top = "0";
   this.spinner.style.left = "0";
   this.spinner.style.width = "100%";
   this.spinner.style.height = "100%";
   this.spinner.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
   this.spinner.style.display = "none";
   this.spinner.style.alignItems = "center";
   this.spinner.style.justifyContent = "center";
   this.spinner.style.zIndex = "9999";

   this.el_spinner = document.createElement("div");
   this.el_spinner.style.width = "50px";
   this.el_spinner.style.height = "50px";
   this.el_spinner.style.border = "6px solid #ccc";
   this.el_spinner.style.borderTopColor = "#333";
   this.el_spinner.style.borderRadius = "50%";
    
  //アニメーション追加
   this.AddAnimate();
   el_parent.appendChild(this.spinner);
   this.spinner.appendChild(this.el_spinner);
   
  }
  AddAnimate(){
    const animate = () => {
     this.el_spinner.style.transform = `rotate(${this.angle}deg)`;
     this.angle = (this.angle + 6) % 360;
     requestAnimationFrame(animate);
   };
   this.angle = 0;
   animate(); 
  }
  show(){
   this.spinner.style.display = "flex";
  }

  hide(){
   this.spinner.style.display = "none";
  }
}

class copy_btn {
  constructor(el_parent) {
   if (!(el_parent instanceof HTMLElement)) return;
   this.el_parent = el_parent;
   this.text = el_parent.dataset.text;
   el_parent.style.backgroundColor = "";
   this.tooltip = document.createElement("div");
   this.tooltip.dataset.text = "copy";
   el_parent.appendChild(this.tooltip);
   el_parent.addEventListener("click",() => {
    console.log(this.text);
   })
  }
}

class tooltip {
  constructor(el_parent) {
    if (!(el_parent instanceof HTMLElement)) return;
   this.el_tooltip = document.createElement("div");
   this.el_tooltip.style.display = "none";
   this.el_tooltip.style.position = "absolute";
   this.el_tooltip.textContent = el_parent.dataset.text;
    this.el_tooltip.addEventListener("mouseover",() => {
     this.el_tooltip.style.display = "block";
    });
    this.el_tooltip.addEventListener("mouseout", () => {
     this.el_tooltip.style.display = "none";
    });
  }

  ChangeText(text){
   this.text = text;
   this.tooltip.textContent = this.text;
  }
}

//オブジェクト格納
const UI = {
  dropdown : (el_parent) => { return new dropdown(el_parent);},
  slider : (el_parent) => { return new slider(el_parent);},
  loading : (el_parent) => {return new loading(el_parent);},
  copy_button : (el_parent) => {return new copy_btn(el_parent);},
  tooltip : (el_parent) => {return new tooltip(el_parent);},
}
