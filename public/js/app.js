console.log("Client side JS file is loaded");

fetch("http://puzzle.mead.io/puzzle")
  .then((response) => response.json())
  .then((data) => console.log(data));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "loading....";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";

  fetch(`/weather?address=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      data.error;
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.fdata.weather_descriptions;
        messageTwo.textContent = data.fdata.temperature;
        messageThree.textContent = data.fdata.feelslike;
        messageFour.textContent = data.location;
      }
      console.log(data.fdata.weather_descriptions);
      console.log(
        `Temprature is ${data.fdata.temperature} deg. F., but it feels like ${data.fdata.feelslike} deg. F.`
      );
    });
});
