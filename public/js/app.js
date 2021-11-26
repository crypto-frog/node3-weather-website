console.log("Client side JS file is loaded");

fetch("http://puzzle.mead.io/puzzle")
  .then((response) => response.json())
  .then((data) => console.log(data));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "loading....";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      data.error;
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.fdata.weather_descriptions;
        messageTwo.textContent = data.location;
      }
      console.log(data.fdata.weather_descriptions);
    });
});
