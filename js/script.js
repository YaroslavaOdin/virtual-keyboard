import { get } from './storage.js';
import Keyboard from './Keyboard.js';

const rowsOrder = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
  ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

const lang = get('kbLang', '"ru"');
localStorage.setItem('sound', 'turn_on');

new Keyboard(rowsOrder).init(lang).generateLayout();

const btn_open = document.querySelector('.btn__openClose');
const keyboard = document.querySelector('.keyboard');
const btn_sound = document.querySelector('.btn__sound');

btn_open.addEventListener('click', () => {
  keyboard.classList.toggle('keyboard__hidden');
});

btn_sound.addEventListener('click', () => {
  if (btn_sound.textContent === 'turn of sound') {
    btn_sound.textContent = 'turn on sound';
    localStorage.setItem('sound', 'turn_of');
  } else {
    btn_sound.textContent = 'turn of sound';
    localStorage.setItem('sound', 'turn_on');
  }
});

const output = document.querySelector(".output");
const start = document.querySelector(".btn__start");
let recognizer = new webkitSpeechRecognition();
let isListening = false;
recognizer.continuous = true;
recognizer.interimResults = true;

recognizer.onresult = function(event)
  {
    output.innerText = '';
    for (let i = 0; i < event.results.length; i++) {
      output.innerHTML += event.results[i][0].transcript;
      }
    }

  let toggleListening = function(event)
  {
    isListening = !isListening;
    if (isListening) {
      start.textContent = 'finish voice typing';
      console.log(localStorage.getItem('kbLang'));
      let lang = localStorage.getItem('kbLang');
      console.log(lang);
      if (lang === "en") {
        console.log('смена языка');
        recognizer.lang = "en-US";
      } else {
        recognizer.lang = "RU";
      }
      recognizer.start();
    } else {
      output.innerText = '';
      start.textContent = 'start voice typing';
      recognizer.stop();
    }
  }

start.addEventListener('click', toggleListening);
