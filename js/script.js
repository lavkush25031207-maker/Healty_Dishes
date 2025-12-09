// var manu = document.querySelector(".menu");
// var closer = document.querySelector(".closer");
// var nav = document.querySelector("nav")

// manu.onclick = function () {
//     // console.log("Hi");
//     nav.classList.remove("hide")
//     nav.classList.add("show")
// }

// closer.onclick = function () {
//     nav.classList.remove("show");
//     nav.classList.add("hide")
// }

const [manu, closer, nav] = [
  document.querySelector(".menu"),
  document.querySelector(".closer"),
  document.querySelector("nav")
];
manu.onclick = () => nav.classList.replace("hide", "show");
closer.onclick = () => nav.classList.replace("show", "hide");


var know_more= document.querySelector(".know-more")
var words = document.querySelector(".more-word");

know_more.onclick = function () {
    // console.log("Hi");
    words.classList.toggle("hide")
    words.classList.toggle("show")
}