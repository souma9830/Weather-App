document.addEventListener("DOMContentLoaded", () => {
    const cityinput = document.getElementById("city-input");
    const btn = document.getElementById("get-weather-btn");
    const weather = document.getElementById("weather-info");
    const cityname = document.getElementById("city-name");
    const temparature = document.getElementById("temparature");
    const details = document.getElementById("description");
    const errormsg = document.getElementById("error-message");
    const API_KEY = "30534e4a891c5ddb060db65b92c01ba3";

    btn.addEventListener("click", async function () {
        const city = cityinput.value.trim();
        if (!city) return;
        try {
            const weatherData = await fetchweatherdata(city);
            displayweather(weatherData);
        } catch (error) {
            errorMessage(error.message);
        }
    });

    async function fetchweatherdata(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City Not Found");
        }
        const data = await response.json();
        return data;
    }

    function displayweather(data) {
        console.log(data);
        const { name, main, weather: weatherDetails } = data;
        cityname.textContent = name;
        temparature.textContent = `${main.temp}°C`;
        details.textContent = weatherDetails[0].description;
        weather.classList.remove("hidden");
        errormsg.classList.add("hidden");
    }

    function errorMessage(msg) {
        weather.classList.add("hidden");
        errormsg.classList.remove("hidden");
        errormsg.textContent = msg;
    }
});
