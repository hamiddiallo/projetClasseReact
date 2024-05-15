import React,{ useState } from 'react'
import './App.css'
function App() {
  const [city,setCity] = useState('')
  const [temp, setTemp] = useState('')
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState('')
  const [main,setMain] = useState('')
  const [isReady, setReady] = useState(false)
  const [sunrise,setSunrise] = useState('')
  const [sunset,setSunset] = useState('')
  const [longitude,setLongitude] = useState('')
  const [latitude,setLatitude] = useState('')
  const [AppAndtheme,setAppAndTheme] = useState('')
  React.useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=60&lon=100&appid=d0063a6e7a65010b510a0904f270012b&units=metric ')
    .then(result => result.json())
    .then(jsonresult => {
      /*const temp = jsonresult.main.temp < 0 ? "App temp-glacial" :
      jsonresult.main.temp < 15 ? "App temp-froid" :
      jsonresult.main.temp < 30 ? "App temp-normal" :
      "App temp-chaud";
      */
      let temp = ''
      if(jsonresult.main.temp < 0)
      {
        temp = 'App temp-glacial'
      }else if(jsonresult.main.temp < 15){
        temp = 'App temp-froid'
      }else if(jsonresult.main.temp < 30){
        temp = 'App temp-normal'
      }else{
        temp = 'App temp-chaud'
      }
    setAppAndTheme(temp)
    setCity(jsonresult.name)  
    setTemp(jsonresult.main.temp)
    setMain(jsonresult.weather[0].main)
    setDesc(jsonresult.weather[0].description)
    setIcon(jsonresult.weather[0].icon)
    setSunrise(jsonresult.sys.sunrise)
    setSunset(jsonresult.sys.sunset)
    setLongitude(jsonresult.coord.lon)
    setLatitude(jsonresult.coord.lat)
    setReady(true)
    })
    .catch(err => console.error(err))
    }, [])
    if (isReady) {
      return (<>
        <section>
          <h1 >My Weather App</h1>
            <div className={AppAndtheme}>
              <p><span>city</span> <span>{city}</span></p>
              <p><span>Temperature</span> <span>{temp} °C</span></p>
              <p><span>main</span> <span>{main}</span></p>
              <p><span>Description</span><span>{desc}</span></p>
              <p><span>illustration</span></p>
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"/>
              <p><span>sunrise</span><span>{sunrise}</span></p>
              <p><span>sunset</span><span>{sunset}</span></p>
              </div>
        </section>
        <section>
          <h1 >Put coordinates</h1>
          <form>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input type="text" id="longitude" value={longitude}/>
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input type="text" id="latitude" value={latitude}/>
            </div>
          </form>
        </section>
      </>)
    } else {
      return <div>Loading...</div>;
    }
}

export default App
