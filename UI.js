//ドロップダウン
class dropdown {
  #value;
  #OnChange;

  constructor(el_parent) {
    // HTMLElementか判定
    if (!(el_parent instanceof HTMLElement)) return;

    // オプション定義＆数測定
    const options = el_parent.querySelectorAll(".dropdown_option");
    if (options.length < 1) return;

    // プルダウンの作成
    const pulldown = document.createElement("div");
    pulldown.classList.add("dropdown_pulldown");

    // 表示領域の作成
    const display = document.createElement("div");
    display.classList.add("dropdown_display");
    display.addEventListener("click", () => {
      pulldown.classList.toggle("dropdown-spread");
    });

    // 選択中の表示
    const preview = document.createElement("div");
    preview.classList.add("dropdown_preview");

    // 選択中のオプションがなかったら一番上のオプションを選択
    const selected = el_parent.querySelectorAll(".dropdown-selected");
    if (selected.length < 1) {
      preview.appendChild(this.createPreview(options[0]));
      this.selectOption(options[0], preview, pulldown);
      this.#value = options[0].dataset.value;
    } else {
      preview.appendChild(this.createPreview(selected[0]));
      this.#value = selected[0].dataset.value; 
    }

    display.appendChild(preview);

    const icon = document.createElement("div");
    icon.classList.add("dropdown_icon");
    display.appendChild(icon);

// 親要素にディスプレイ、プルダウンを追加
    el_parent.appendChild(display);
    el_parent.appendChild(pulldown);

// オプションにイベントを追加＆プルダウンの子要素にする
    options.forEach(option => {
      option.addEventListener("click", () => this.selectOption(option, preview, pulldown));
      pulldown.appendChild(option);
    });

// 画面外クリックで閉じる
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        pulldown.classList.remove("dropdown-spread");
      }
    });
  }

// プレビュー生成
  createPreview(option) {
    const preview = option.cloneNode(true);
    preview.classList.add("dropdown_preview-child");
    preview.classList.remove("dropdown_option");
    return preview;
  }

// オプション選択
  selectOption(option, preview, pulldown) {
    const options = option.parentElement.querySelectorAll(".dropdown_option");
    options.forEach(el => el.classList.remove("dropdown-selected"));
    option.classList.add("dropdown-selected");
    preview.innerHTML = '';
    preview.appendChild(this.createPreview(option));
    pulldown.classList.remove("dropdown-spread");

// オプション変更検出
    if (this.#value !== option.dataset.value) {
      this.#value = option.dataset.value;
       if(typeof this.#OnChange === 'function') this.#OnChange(option.dataset.value);
    }
  }

//value取得
  getValue() {
   return this.#value;
  }
//コールバック関数の指定
  setOnChange(func){
   this.#OnChange = func;
  }
}


//スライダー
class slider {
 #el_parent;
 #handle;
 #value;
 #dragging;
 #OnChange;
 #max = 100;
 #min = 0;

  constructor(el_parent) {
//HTMLElemntか判定
    if (!(el_parent instanceof HTMLElement)) return;
   this.#el_parent = el_parent;
//スライダーのトラック生成
   const track = document.createElement("div");
   track.classList.add("slider_track");
//ハンドル生成
   this.#handle = document.createElement("div");
   this.#handle.classList.add("slider_handle");
   
//親要素にトラック,ハンドルを追加
   this.#el_parent.appendChild(track);
   this.#el_parent.appendChild(this.#handle);
   this.#el_parent.style.touchAction = "none";

//初期値設定
   this.#value = parseFloat(this.#el_parent.getAttribute("data-initial-value")) || 0;
   this.#handle.style.left = `${((this.#value - this.#min) / (this.#max - this.#min)) * 100}%`;

//イベントの追加
   this.#el_parent.addEventListener("mousedown", (e) => this.dragstart(e));
   window.addEventListener("mouseup", () => this.dragstop());
   window.addEventListener("mousemove", (e) => this.drag(e));
//モバイル対応
   this.#el_parent.addEventListener("touchstart", (e) => this.dragstart(e), { passive: false });
   window.addEventListener("touchend", () => this.dragstop(), { passive: false });
   window.addEventListener("touchmove", (e) => this.drag(e), { passive: false });

  }

//ドラッグスタート
  dragstart(e){
   this.#dragging = true;
   document.body.parentElement.style.cursor = "grabbing";
   this.#el_parent.classList.add("slider_grabbing");
   e.preventDefault();
  }

//ドラッグストップ
  dragstop(){
   this.#dragging = false;
   document.body.parentElement.style.cursor = "auto";
   this.#el_parent.classList.remove("slider_grabbing");
  }

//ドラッグ中
   drag(e){
   if (!this.#dragging) return;
//親要素の位置情報,寸法取得 
   const rect = this.#el_parent.getBoundingClientRect();
//タッチかクリックか
   const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//割合計算
   let value = ((clientX - rect.left) / rect.width) * (this.#max - this.#min) + this.#min;
//制限
   value = Math.max(this.#min, Math.min(this.#max, value));
//位置反映
   this.#handle.style.left = `${((value - this.#min) / (this.#max - this.#min)) * 100}%`;
   this.#value = value;
    if (typeof this.#OnChange === "function")this.#OnChange(this.#value);
   
  }

  setstates(width,max,min){
   this.#el_parent.style.width = `${width}px`;
   this.#max = max;
   this.#min = min;
   this.#value = Math.max(this.#min, Math.min(this.#max, this.#value));
   this.#handle.style.left = `${((this.#value - this.#min) / (this.#max - this.#min)) * 100}%`;
  }
//コールバック関数の指定
  setOnChange(func){
   this.#OnChange = func;
  }
}

//オブジェクト格納
const UI = {
  dropdown : dropdown,
  slider : slider,
}
