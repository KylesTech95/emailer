import fixarrows from "./fixarrows.js";
import getEmail from "./emailhelper.js";
import screentimer from "./screentimer.js";
import fetchFiles from "./fetchfiles.js";

const fName = document.querySelector("#first");
const lName = document.querySelector("#last");
let names = [fName, lName];
const name_con = document.getElementById("name-container");
const textarea = document.getElementById("message");
const arrows = document.querySelectorAll(".arrow");
const form = document.getElementById("form");
const send = document.getElementById("send-submit");
const filer = document.getElementById("filer");
const secret = "/get-email";
let to_field = document.getElementById("to");

// window.addEventListener('keydown',e=>{
//     if(e.key==='Tab')e.preventDefault();
// })
textarea.parentElement.onclick = (e) => {
  let txtArea = e.currentTarget.children[0];
  if (txtArea.classList.contains("textarea-blur")) {
    txtArea.classList.remove("textarea-blur");
  }
};
textarea.onblur = (e) => {
  e.target.classList.add("textarea-blur");
};
textarea.onfocus = (e) => {
  e.target.classList.remove("textarea-blur");
};
getEmail(secret, to_field);
screentimer(window);