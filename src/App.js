import { useState } from "react";
import "./App.css";
import axios from "axios";
import HumidityIcon from "./humidity.png";
import WeatherIcon from "./Weather.png";
import TempIcon from "./temprature.png";
import BackIcon from "./BackIcon.png";
import WeatherMap from "./weatherMap.jpg";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState();
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    
    axios.get(`https://wether-nn8l.onrender.com/external/?location=${location}`).then((response) => {
      setData(response.data);
      setError(null)
    })
    .catch((error) => {
      setError(error.response.data.error)
    });

  };

  return (
    <div className="App">
      {data == null || error != null ? (
        <div className="input-card">
          <div>
            <h1 style={{ color: "#6AA2AF" }}>Weather App</h1>
          </div>
          <img src={WeatherMap} alt="Card Image" width="100%" />
          <div className="input-card-content">
            <input
              type="text"
              placeholder="City..."
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={fetchWeatherData}>Search</button>
            {error != null ? <p style={{ color: "#c90425" }} >{error}</p> : null}
          </div>
        </div>
      ) : (
        <div className="content-card">
          <div className="content-header">
            <button onClick={() => setData(null)}>
              <img src={BackIcon} width={25} />
            </button>
            <h2 style={{ color: "#6AA2AF" }}>Weather App</h2>
          </div>
          <img src={data.icon} width={150} />
          <h1>{data.temprature}° C</h1>
          <p>{data.weather}</p>
          <p>
            {data.city}, {data.country}
          </p>
          <div className="footer">
            <div className="left">
              <img src={TempIcon} width={35} />
              <h3>{data.feelslike}° C</h3>
              <p>Feels like</p>
            </div>
            <div className="right">
              <img src={HumidityIcon} width={35} />
              <h3>{data.humidity}%</h3>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
