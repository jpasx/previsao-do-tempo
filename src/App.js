import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const API_KEY = "334bf7a7a3624ae3cba6562332d7ab65";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      // 🔹 Clima atual
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert("Cidade não encontrada!");
        return;
      }
      setWeather(data);

      // 🔹 Previsão 5 dias / 3h
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`
      );
      const forecastData = await resForecast.json();

      // Apenas 8 próximas previsões (24h)
      setForecast(forecastData.list.slice(0, 8));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="App">
      {/* 🌥️ Fundo com nuvens animadas */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Título */}
      <h1>🌤️ Previsão do Tempo</h1>

      {/* Caixa de busca */}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Digite a cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px 0 0 8px",
            border: "none",
            width: "250px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            background: "linear-gradient(to right, #1e3c72, #2a5298)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🔍 Buscar
        </button>
      </div>

      {/* Clima atual */}
      {weather && (
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "20px",
            borderRadius: "15px",
            margin: "20px auto",
            width: "320px",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <h3>{weather.weather[0].description.toUpperCase()}</h3>
          <img
            alt="Ícone do clima"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <h1 style={{ color: "#ff5f8f" }}>{Math.round(weather.main.temp)}°C</h1>
          <p>💨 Vento: {weather.wind.speed} m/s</p>
          <p>💧 Umidade: {weather.main.humidity}%</p>
          <p>🌡️ Sensação: {Math.round(weather.main.feels_like)}°C</p>
        </div>
      )}

      {/* Gráfico de previsão */}
      {forecast.length > 0 && (
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "20px",
            borderRadius: "15px",
            margin: "20px auto",
            width: "90%",
            maxWidth: "600px",
            backdropFilter: "blur(8px)",
          }}
        >
          <h3>📊 Previsão (próximas horas)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={forecast.map((f) => ({
                time: new Date(f.dt * 1000).getHours() + "h",
                temp: f.main.temp,
              }))}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#ff4081" />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {forecast.map((f, index) => (
              <div key={index}>
                <p>{new Date(f.dt * 1000).getHours()}h</p>
                <img
                  alt="Ícone previsão"
                  src={`http://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
                />
                <p>{Math.round(f.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marca d'água */}
      <div className="footer">
        Desenvolvido por <strong>jp_asx</strong> —{" "}
        <a href="https://github.com/jp-asx" target="_blank" rel="noreferrer">
          github.com/jp-asx
        </a>
      </div>
    </div>
  );
}

export default App;
