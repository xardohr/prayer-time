"use strict";

const anotherCityBtn = document.querySelector(".another-city-container");
const inputForm = document.querySelector(".form");
const input = document.querySelector(".input");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const overlay3 = document.querySelector(".overlay3");
const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const todayTime = document.querySelector(".today-time");
const temp = document.querySelector(".temp");
const searchBtn = document.querySelector(".search-icon");
const celcius = document.querySelector(".celcius");

//
const fajr = document.querySelector(".fajr-time");
const sunrise = document.querySelector(".sunrise-time");
const duhr = document.querySelector(".dohr-time");
const asr = document.querySelector(".asr-time");
const maghrib = document.querySelector(".maghrib-time");
const isha = document.querySelector(".isha-time");

anotherCityBtn.addEventListener("click", function () {
  inputForm.classList.remove("hidden");
  overlay2.classList.remove("hidden");
  overlay3.classList.remove("hidden");
});

// hide input when clicking on Escape button
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !overlay2.matches(".hidden") &&
    !overlay3.matches(".hidden")
  ) {
    hideOverlay();
  }
});
// hide input when clicking outside the input

overlay3.addEventListener("click", function (e) {
  if (
    !inputForm.classList.contains(".hidden") &&
    !inputForm.classList.contains(e.target)
  ) {
    hideOverlay();
  }
});
overlay.addEventListener("click", function (e) {
  if (
    !inputForm.classList.contains(".hidden") &&
    !inputForm.classList.contains(e.target)
  ) {
    hideOverlay();
  }
});

function hideOverlay() {
  overlay2.classList.add("hidden");
  overlay3.classList.add("hidden");
  inputForm.classList.add("hidden");
  input.value = "";
}

// API implementation

async function getPrayerTime(city) {
  try {
    const response = await fetch(
      `https://dailyprayer.abdulrcs.repl.co/api/${city}`
    );
    const prayerTimeData = await response.json();
    console.log(prayerTimeData);

    // deploy in the DOM
    todayTime.textContent = prayerTimeData.date;
    fajr.textContent = prayerTimeData.today.Fajr;
    sunrise.textContent = prayerTimeData.today.Sunrise;
    duhr.textContent = prayerTimeData.today.Dhuhr;
    maghrib.textContent = prayerTimeData.today.Maghrib;
    isha.textContent = prayerTimeData.today["Isha'a"];
    asr.textContent = prayerTimeData.today.Asr;
    cityName.textContent = prayerTimeData.city;
  } catch (error) {
    const errorMessage = `Enter a valid city name`;
    alert(errorMessage);
    console.error(error);
    input.value = "";
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=d46d34a0468f4667b3d143437233003&q=${city}&aqi=no`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);

    // display on DOM
    countryName.textContent = weatherData.location.country;
    temp.textContent = weatherData.current.temp_c;
  } catch (error) {
    const errorMessage = `Enter a valid city name`;
    alert(errorMessage);
    console.error(error);
    userInput.value = "";
  }
}

getPrayerTime("mecca");
getWeather("mecca");

// const response = await fetch(
//   `https://muslimsalat.com/${city}.json?key=e47719b5eb9ff8fd638233b01d971c22`
// );

// app algorithm

searchBtn.addEventListener("click", function () {
  getPrayerTime(input.value);
  getWeather(input.value);
  hideOverlay();
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    getPrayerTime(input.value);
    getWeather(input.value);
    hideOverlay();
  }
});
