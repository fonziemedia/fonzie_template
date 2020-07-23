const bootstrap4_enabled = typeof $().emulateTransitionEnd == "function";
console.log("bootstrap4 enabled: " + bootstrap4_enabled);

const mainContainer = $(".main-content");
const myImage = new Image();
myImage.id = "kitten";
myImage.src = "./assets/img/300.jpg";

myImage.onload = () => {
  mainContainer.append(myImage);
  console.log("image loaded!");
};

document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    //same as "DOMContentLoaded" event or jQuery.ready
    // All HTML DOM elements are now accessible
  }

  if (event.target.readyState === "complete") {
    // same as $(window).bind("load", runFunction);
    //Now external resources are loaded too, like css,src etc...

    const image = $("#kitten");
    image.on("click", function (e) {
      e.preventDefault();
      alert("meow!");
    });
  }
});
