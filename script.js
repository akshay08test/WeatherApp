'use strict'

// Elements 
const searchInput = document.querySelector(".search--input");
const searchBtn = document.querySelector(".search--btn");

const weatherImg = document.querySelector(".weather--img");
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city--name");
const humidityElem = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");


searchBtn.addEventListener("click", searching);

function searching(e) {
    e.preventDefault()
    const city = searchInput.value;
    cityWeather(city)
}

const apiKey = '1511b446fa01d597ff09e91fd48b927f';

async function cityWeather(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        if (!res.ok) throw new Error(`city ${res.statusText}`)
        const data = await res.json();
        console.log(data)
        renderWeather(data)
    } catch (err) {
        console.log(err);
    }
}

// cityWeather('kolkata')

function renderWeather(data) {
    const humidity = data.main.humidity;
    const dataTemp = data.main.temp;
    temp.textContent = `${Math.round(dataTemp)}°c`;
    cityName.textContent = data.name;
    humidityElem.textContent = `${humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`

    if (humidity <= 5) {
        weatherImg.src = 'icons/bright sun.png';
    } else if (humidity > 5 && humidity <= 20) {
        weatherImg.src = 'icons/sun and cloud.png';
    } else if (humidity > 20 && humidity <= 40) {
        weatherImg.src = 'icons/cloud.png';
    } else if (humidity > 40 && humidity <= 50) {
        weatherImg.src = 'icons/sun and raining cloud.png';
    } else {
        weatherImg.src = 'icons/raining.png';
    }

    if (dataTemp < 0) weatherImg.src = 'icons/snowfal.png';
}

