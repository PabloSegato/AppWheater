import { useState } from "react";
import "../src/WeatherApp.css";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "46d2dc6152301b055dc39571b0325d06";
  const difKelvin = 273.15; //convercion a C°

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${urlBase}?q=${city}&appid=${API_KEY}&lang=es`,
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      throw alert(`Ha habido un error ${error}`);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="card-weather">
        {weatherData && (
          <div className="contenerdor-card">
            <div className="datos-derecha">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <h2>{Math.floor(weatherData.main.temp - difKelvin)}ºC</h2>
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="imagen-izquierda">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
            <div className="ultima-informacion">
              <span>
                {weatherData.main.humidity}%<p>HUMEDAD</p>
              </span>
              <span>
                {weatherData.main.pressure}
                <p>PRESIÓN</p>
              </span>
              <span>
                {" "}
                {weatherData.wind.speed} km/h <p>VIENTO</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
