const apiKey = "5a9c113220244148ad7180740251208";
const cityInput = document.getElementById('city-input')
const searchButton = document.getElementById('search-btn')
const weatherResult = document.getElementById('weather-result')
const errorMessage = document.getElementById('error-message')


async function getWeatherData(city) {
    errorMessage.classList.add('hidden')
    weatherResult.classList.add('hidden')
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`)
        if (!response.ok) throw new Error('A cidade inserida não foi encontrada.')
        const data = await response.json()
        renderWeatherData(data)
    } catch {
        errorMessage.classList.remove('hidden')
    }
}


function renderWeatherData(data) {
    weatherResult.classList.remove('hidden')
    weatherResult.innerHTML = `
        <div id="weather-result">
            <h2 id="city-name">${data.location.name}, ${data.location.country}</h2>
            <p id="local-time" class="local-time">Horário local: ${data.location.localtime}</p>

            <div class="weather-main">
                <img id="weather-icon" src="${data.current.condition.icon}" alt="Ícone do tempo">
                <p id="temperature">${data.current.temp_c} °C</p>
            </div>
            <p id="condition">${data.current.condition.text}</p>

            <div class="weather-details">
                <div class="detail-item">
                    <span>Sensação</span>
                    <strong id="feels-like">${data.current.feelslike_c} °C</strong>
                </div>
                <div class="detail-item">
                    <span>Umidade</span>
                    <strong id="humidity">${data.current.humidity}%</strong>
                </div>
                <div class="detail-item">
                    <span>Vento</span>
                    <strong id="wind-speed">${data.current.wind_kph} km/h</strong>
                </div>
                <div class="detail-item">
                    <span>Pressão</span>
                    <strong id="pressure">${data.current.pressure_mb} mb</strong>
                </div>
                <div class="detail-item">
                    <span>Visibilidade</span>
                    <strong id="visibility">${data.current.vis_km} km</strong>
                </div>
                <div class="detail-item">
                    <span>Índice UV</span>
                    <strong id="uv-index">${data.current.uv}</strong>
                </div>
            </div>
        </div>
    `
}


searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim()
    if (city) getWeatherData(city)
})