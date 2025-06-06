let wheather = document.getElementById("wheather");

for (let i = 1; i <= 9; i++) {
    wheather.innerHTML += `
        <div id="box">
            <p>09:00</p>
            <div class="wheather-line"></div>
            <i class="fa-solid fa-cloud"></i>
            <h3>9<sup>o</sup>C</h3>
        </div>
    `;
}

let form = document.getElementById("form");
let degreeCent = document.getElementById("degreeCent");
let recent_wheater = document.getElementById("recent-wheater");

async function fetchWeather(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b04de2aa459744a98de160935250703&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        let res = await response.json();
        console.log(res);
        
        degreeCent.innerHTML = `
            <h1>${res.current.temp_c}°C</h1>
            <div class="wind">
                <i class="fa-solid fa-wind"></i>
                <p>Wind Speed: ${res.current.wind_mph} kph</p>
            </div>
            <div class="humidity">
                <i class="fa-solid fa-water"></i>
                <p>Humidity: ${res.current.humidity}%</p>
            </div>
            <div class="wind-line"></div>
            <div class="information">
                <div class="country one">
                    <i class="fa-solid fa-flag"></i>
                    <p>Country: ${res.location.country}</p>
                </div>
                <div class="temperature one">
                    <i class="fa-solid fa-temperature-low"></i>
                    <p>Temperature: ${res.current.temp_f}°F</p>
                </div>
                <div class="time one">
                    <i class="fa-solid fa-clock"></i>
                    <p>Date & Time: ${res.location.localtime}</p>
                </div>
                <div class="city one">
                    <i class="fa-solid fa-city"></i>
                    <p>City: ${res.location.name}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

// Load default city weather
fetchWeather("Karachi");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let userValue = e.target.input.value.trim();
    if (userValue === "") {
        alert("Please enter a valid city.");
        return;
    }
    
    fetchWeather(userValue);
    form.reset();
});

let date = new Date().toDateString();
recent_wheater.innerHTML = `<p>${date}</p>`;

let changeBackground = () => {
    let body = document.getElementById("body");
    let background = body.style.backgroundImage;
    
    if (background.includes("rain-4371075_1920.jpg")) {
        body.style.backgroundImage = "url(./sea-6326812_1280.jpg)";
    } else {
        body.style.backgroundImage = "url(./rain-4371075_1920.jpg)";
    }
    body.style.transition = "0.3s";
};
