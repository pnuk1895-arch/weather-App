import { useState , useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search-interface-symbol.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import rainny_icon from '../assets/rainy.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import moon_icon from '../assets/waning-moon.png'

const Weather = () => {

  const [weatherData, setWeatherData]= useState(false)

  const allIcons ={
    "01d": sun_icon,
    "01n": moon_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rainny_icon,
    "10n": rainny_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  const inputRef= useRef()

  const search = async (city)=>{
    try{ 
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      
      const response= await fetch(url);
      
      const data = await response.json();
      console.log(data)
      const icon= allIcons[data.weather[0].icon] || sun_icon
      setWeatherData(
        { humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location:data.name,
          icon: icon
        }
      )
    }
    catch(error){
        console.log(error)
    }
  }
  
  // useEffect(()=>{
  //   search("New Delhi")
  // },[])


  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>{search(inputRef.current.value)}}/>
      </div>
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon} alt=""/>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>  
        </div>    
        <div className='col'>
            <img src={wind_icon} alt=""/>
            <div>
              <p>{weatherData.windSpeed}Km/h</p>
              <span>Wind Speed</span>
            </div>
        </div> 
      </div>
    </div>
  )
} 

export default Weather