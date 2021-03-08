import {useEffect, useState} from 'react';
import '../Components/App.scss';
import '../Components/Card.css'

const App = () => {

  const [location, setLocation] = useState('Istanbul');
  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setcity] = useState('')

  useEffect(() => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=af1f9a8f56364e889a4100341210703&q=${location}`)
        .then(response => response.json())
        .then(data => setWeatherInfo({data}))
  }, [location])

  const onChangeHandler = (event) =>{
    setcity(event.target.value)
    city.length >3 && setLocation(city)
  }


  return (
    <div className="weather-wrapper">
      <input placeholder="City..."  onChange={(event) => onChangeHandler(event)} />
          {weatherInfo.data && 
            <>
              <div className="container" id="container">
              <span className="city">{weatherInfo.data.location.name}</span>
              <span className="temp">{weatherInfo.data.current.temp_c} &#176;C</span>
              <div className="wcloud">
                <div className="cloud1" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
                <div className="cloud2" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
                <div className="cloud3" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
              </div>
              <div className="wcloud2">
                <div className="cloud1" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
                <div className="cloud2" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
                <div className="cloud3" style={{backgroundColor: 'white', boxShadow: 'none'}}></div>
              </div>
              <div className="mountain1"></div>
              <div className="mountain2"></div>
              <div className="mountain3"></div>
              <div className="mountain4"></div>
              <div className="bottom">
                <div className="cloud">
                  {/* <div className="cloud1"></div>
                  <div className="cloud2"></div>
                  <div className="cloud3"></div> */}
                <img src={weatherInfo.data.current.condition.icon}  className="cloud1 cloud2 cloud3"/> 
                </div>
              
                <p className="summary">{weatherInfo.data.current.condition.text}</p>
              </div>
              </div>
            </>  
          }
    </div>
  );
}

export default App;
