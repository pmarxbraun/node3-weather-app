console.log("Client side JS file");

const weatherFrom = document.querySelector("form");
const searchForm = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  const adress = searchForm.value;
  messageTwo.textContent = "";
  messageOne.textContent = "Looking for weather ...";

  fetch("/weather/?adress=" + adress).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.name;
      messageTwo.textContent = `Il fait ${data.temperature}  et la probabilité de pluie est de ${data.rain}%`;
    });
  });
});
