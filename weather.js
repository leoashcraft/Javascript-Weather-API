const submit = document.getElementById("submit")
const weatherDataElem = document.getElementById("weatherData")
weatherDataElem.style.display = "none"

function convertToFaranheit(kelvin) {
    const convert = (kelvin - 273.15) * 9/5 + 32
    return convert.toFixed(3)
}

async function getData(url) {
    let rawdata = await fetch(url);
    let jsondata = await rawdata.json();
    return jsondata
}

function displayData(data) {
    const icon = data.weather[0].icon;
    const main = data.main;
    const high = convertToFaranheit(main.temp_max);
    const low = convertToFaranheit(main.temp_min);
    const forecast = convertToFaranheit(main.temp);
    const humidity = convertToFaranheit(main.humidity);


    const titleElem = document.getElementById("title");
    titleElem.textContent = city.value;

    const tempElem = document.getElementById("temp");
    tempElem.textContent = forecast;

    const highElem = document.getElementById("high");
    highElem.textContent = high;

    const lowElem = document.getElementById("low");
    lowElem.textContent = low;

    const humidityElem = document.getElementById("humidity");
    humidityElem.textContent = humidity;

    const image_src = `https://openweathermap.org/img/w/${icon}.png`;
    const imageElem = document.getElementById("weatherImg");
    imageElem.src = image_src;

}



submit.addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    const api_key = '98b5d9b9ea51b1780e37010d928f5a2b'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const data = getData(url);

    data.then(response => {
        weatherDataElem.style.display = "block"
        displayData(response);
    })
    .catch(err => {
        weatherDataElem.style.display = "block";
        weatherDataElem.style.textAlign = "center";
        weatherDataElem.textContent = "Unable to process"
    })
})