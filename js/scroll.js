const mediaParent = document.querySelector(".media-parent");

mediaParent.addEventListener("scroll", function () {
    if (mediaParent.scrollLeft > 0) {
        mediaParent.style.width = "100%";
    } else {
        mediaParent.style.width = "80%";
    }
});


// mediaParent.addEventListener("scroll", function () {
//     mediaParent.style.width = "100%";
// });
