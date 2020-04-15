// http://puzzle.mead.io/puzzle
// console.log("Client side javaScritpt");
// const url = "http://puzzle.mead.io/puzzle";

// fetch(url).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// Weather form
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  // Loading message
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // Fetch api
  const url = "http://localhost:3000/weather?address=" + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
