class dropdown {
  #value;
  #onChange;

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
       if(typeof this.#onChange === 'function') this.#onChange(option.dataset.value);
    }
  }

//value取得
  getValue() {
   return this.#value;
  }
//コールバック関数の指定
  setOnChange(func){
   this.#onChange = func;
  }
}

const sel1 = new dropdown(document.getElementById("sel1"));
sel1.setOnChange((value) => {console.log(value);});
const sel2 = new dropdown(document.getElementById("sel2"));
