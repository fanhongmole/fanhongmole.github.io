// (function () {
//   'use strict';



//   function get(key) {
//     let json = localStorage.getItem(key);
//     if (json) return JSON.parse(json);
//   }

//   function set(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// })();

export const ms = {
  get(key) {
    let json = localStorage.getItem(key);
    if (json) return JSON.parse(json);
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
