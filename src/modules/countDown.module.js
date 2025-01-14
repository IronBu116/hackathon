import { Module } from "../core/module";

export default class CountDownModule extends Module {
  #container;
  #time;
  #timerHTML;

  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    this.#container = document.querySelector("body");
    const form = this.#render();
    this.#container.append(form);
  }

  #render() {
    const countContainer = document.createElement("div");
    countContainer.className = "count__down-container";

    const inputForm = document.createElement("form");
    inputForm.className = "count__down-form";
    countContainer.append(inputForm);

    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      countContainer.remove();
      const { target } = event;
      this.#time = input.value;
      this.#timerHTML = document.createElement("div");
      this.#timerHTML.className = "timer__html";
      this.#container.append(this.#timerHTML);
      if (this.#time) {
        this.#countDownStart();
      } else {
        this.#countDownStop();
      }
    });

    const title = document.createElement("div");
    title.textContent = "Таймер обратного отсчета";
    title.className = "count__down-title";

    const inputContainer = document.createElement("div");
    inputContainer.className = "count__down-input--container";

    const submitBtn = document.createElement("button");
    submitBtn.className = "count__down-btn";
    submitBtn.textContent = "Подтвердить";
    submitBtn.type = "submit";

    inputForm.append(title, inputContainer, submitBtn);

    const input = document.createElement("input");
    input.id = "timer";
    input.className = "count__down-input";
    input.type = "number";
    input.placeholder = " ";
    input.name = "amount";
    input.min = "1";
    input.required = "";

    const shortInputName = document.createElement("div");
    shortInputName.className = "count__down-short";

    const label = document.createElement("label");
    label.for = "timer";
    label.className = "count__down-placeholder";
    label.textContent = "Кол-во секунд:";
    inputContainer.append(input, shortInputName, label);

    return countContainer;
  }

  #countDownStart() {
    this.#setTime(this.#time);
    this.countInterval = setInterval(this.#decreaseTime.bind(this), 1000);
  }

  #setTime(time) {
    this.#timerHTML.innerHTML = `${time}`;
  }

  #decreaseTime() {
    if (this.#time === 0) {
      this.#timerHTML.innerHTML = `Время вышло`;
      setTimeout(this.#countDownStop.bind(this), 5000);
      clearInterval(this.countInterval);
    } else {
      let current = --this.#time;
      this.#setTime(current);
    }
  }

  #countDownStop() {
    this.#timerHTML.remove();
  }
}
