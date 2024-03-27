import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("get-weather-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const country = document.getElementById("country").value;
      const city = document.getElementById("city").value;
      getWeather(city, country);
    });
});

async function getWeather(city, country) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=df67aa84a282d51ededfd18722a1121a&units=metric`
    );
    const data = await response.json();
    console.log(data);

    const divCity = document.getElementById("temperature-city");
    const divIcon = document.getElementById("icon-temperature");
    const cartaTiempo = document.getElementById("carta-del-tiempo");

    const { main, weather, wind, name } = data;
    const { temp, feels_like, humidity } = main;
    const { speed, deg } = wind;
    const icon = weather[0].icon;

    document.getElementById("temperature").textContent = temp;
    divIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">`;
    document.getElementById("feels-like").textContent = feels_like;
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("wind-speed").textContent = speed;
    document.getElementById("wind-direction").textContent = deg;

    cartaTiempo.innerHTML = "";
    divCity.innerHTML = "";
    const h3Element = document.createElement("h3");
    h3Element.textContent = `Tiempo en ${name}`;
    document.getElementById("weather-info").style.display = "block";
    divCity.appendChild(h3Element);
  } catch (error) {
    alert(
      "Hubo un error al obtener los datos del clima. Por favor, inténtelo de nuevo."
    );
    console.error("Error:", error);
  }
}
