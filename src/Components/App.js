import {useEffect, useState} from 'react';
import '../Components/App.scss';
import '../Components/Card.css'

const App = () => {

  const [location, setLocation] = useState('Istanbul');
  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setcity] = useState('')
  const [weatherInforForSevenDays, setweatherInforForSevenDays] = useState([])

  useEffect(() => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=af1f9a8f56364e889a4100341210703&q=${location}`)
        .then(response => response.json())
        .then(data => setWeatherInfo({data}))
  }, [location])

  const onChangeHandler = (event) =>{
    setcity(event.target.value)
    city.length >3 && setLocation(city)
  }
  
  const onClickHandler = (event) => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=af1f9a8f56364e889a4100341210703&q=${location}&days=7`)
    .then(response => response.json())
    .then(data => setweatherInforForSevenDays(data.forecast.forecastday));
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
                <img src={weatherInfo.data.current.condition.icon}  className="cloud1 cloud2 cloud3"/> 
                </div>
              
                <p className="summary">{weatherInfo.data.current.condition.text}</p>
              </div>
              </div>
            </>  
          }

          <button className="button" onClick={(event) => onClickHandler (event)}>3 Günlük </button>
          {weatherInfo.data && 
            <div className="seven-days">
              {weatherInforForSevenDays.map(item => (
             <div className="three-days-wrapper">
                  <div className="container" id="container">
                <span className="city">{item.date}  </span>
                <span className="temp">{item.day.avgtemp_c} &#176;C</span>
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
                  <img src={item.day.condition.icon}  className="cloud1 cloud2 cloud3"/> 
                  </div>
                
                  <p className="summary">{item.day.condition.text}</p>
                </div>
                </div>
             </div>
              ))}
            </div>
          }
    </div>
  );
}

export default App;
