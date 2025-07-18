import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import calm from './Video/calm.mp4'
import desert from './Video/desert.mp4'
import snowfall from './Video/snowfall.mp4'
import rain from './Video/rain.mp4'

function App() {
  let [city, setCity] = useState('');
  let [video, setVideo] = useState(desert);
  let cur = {
    "coord": {
        "lon": 88.3697,
        "lat": 22.5697
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 39.03,
        "feels_like": 34.82,
        "temp_min": 29.03,
        "temp_max": 29.03,
        "pressure": 999,
        "humidity": 80,
        "sea_level": 999,
        "grnd_level": 998
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.13,
        "deg": 137,
        "gust": 5.44
    },
    "clouds": {
        "all": 100
    },
    "dt": 1750787400,
    "sys": {
        "country": "IN",
        "sunrise": 1750721003,
        "sunset": 1750769659
    },
    "timezone": 19800,
    "id": 1275004,
    "name": "Kolkata",
    "cod": 200
}
  let [wDetails, setwDetails] = useState();
  let getData = (event) => {
  event.preventDefault(); // move this up

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=f1aee28d641ce84a5f5bf2786b6af5be`)
    .then((res) => res.json())
    .then((finalRes) => {
      if (finalRes.cod === '404') {
        setwDetails(undefined);
      } else {
        setwDetails(finalRes);

        // ✅ Use finalRes here to choose correct video
        const temp = finalRes.main.temp;
        const clouds = finalRes.clouds.all;

        if (temp > 35) {
          setVideo(desert);
        } else if (temp < 19) {
          setVideo(snowfall);
        } else if (clouds > 97) {
          setVideo(rain);
        } else {
          setVideo(calm);
        }
      }
    })
    .catch((err) => {
      console.log("Error fetching weather:", err);
      setwDetails(undefined);
    });
};
  
  
  
  return (
    <div className="App">    
      <div className='header'><span>Weather App</span></div> 
      <form className='search' onSubmit={getData} >
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter the name of City'></input>
        <button onClick={()=>setCity(city)}>🔍 Search</button>

      </form>
      <div className='master'>
        
        {
          wDetails !== undefined ? 
          <div className='weather'>
    <video key={video} autoPlay muted loop className='weather-bg'>
      <source src={video} type="video/mp4" />
    </video>
    <div className='weather-content'>
      <div className='loc'>
        <h2 className='country'>📍Country : {wDetails.sys.country}</h2>
        <h2 className='city'>City : {city}</h2>
      </div>
      <h2 className='temp'>🌡Temperature : {wDetails.main.temp} *C</h2>
      <h2 className='wind'>🌫Wind Speed : {wDetails.wind.speed} km/h</h2>
      <h2 className='cloud'>☔🌧Clouds : {wDetails.clouds.all} %</h2>
      <div className='coord'>
        <span>📍Latitude : {wDetails.coord.lat}</span>
        <span>📍Longitude : {wDetails.coord.lon}</span>
      </div>
      <h3>🌍 Feels Like {wDetails.main.feels_like} *C</h3>
    </div>
  </div>
  :
  "No City Found"
}

      </div>
    </div>
  );
}

export default App;
