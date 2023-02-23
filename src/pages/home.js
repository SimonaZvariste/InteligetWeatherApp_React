import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getWeatherByCity, getWeatherByGeoLoc, getForecastByCity, formatForecastByDay, formatForecastByHour } from "../services/openWeatherApi";
import Clock from "../components/clock/clock";


const Home = () => {

    const storedDataWeather = sessionStorage.getItem("weather");
    const storedWeather = storedDataWeather ? JSON.parse(storedDataWeather) : undefined;
    const storedDataForecast = sessionStorage.getItem("forecast");
    const storedForecast = storedDataForecast ? JSON.parse(storedDataForecast) : undefined;
    const [weather, setWeather] = useState(storedWeather);
    const [forecast, setForecast] = useState(storedForecast);

    const queryRef = useRef();

    useEffect(() => {
        const fetchData = (e) => {
            if (e.key === 'Enter' && queryRef.current.value) {
                getWeatherByCity(queryRef.current.value)
                    .then(res => {
                        setWeather(res.data);
                        sessionStorage.setItem("weather", JSON.stringify(res.data));
                    })
                    .catch(error => console.log(error))
                getForecastByCity(queryRef.current.value)
                    .then(res => {
                        setForecast(formatForecastByDay(res.data.list))
                        sessionStorage.setItem("forecast", JSON.stringify(formatForecastByDay(res.data.list)))
                    })
                    .catch(error => console.log(error))
            }
        }
        document.addEventListener('keypress', fetchData)
        return () => document.removeEventListener('keypress', fetchData)
    }, [])

    useEffect(() => {
        if (navigator?.geolocation && !storedWeather) {
            navigator.geolocation.getCurrentPosition((position) => {
                getWeatherByGeoLoc(position.coords.latitude, position.coords.longitude)
                    .then(res => {
                        setWeather(res.data)
                        sessionStorage.setItem("weather", JSON.stringify(res.data));
                        getForecastByCity(res.data.name)
                            .then(res => {
                                setForecast(formatForecastByDay(res.data.list))
                                sessionStorage.setItem("forecast", JSON.stringify(formatForecastByDay(res.data.list)))
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            });
        }
    }, [])

    const dateFunction = (data) => {
        let months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
        let days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
        let day = days[data.getDay()];
        let date = data.getDate();
        let month = months[data.getMonth()];
        let year = data.getFullYear();
        return `${day}, ${date} ${month} ${year}`
    }

    const hourFunction = () => {
        const d = new Date();  
        const hour = d.getHours();
 
        return hour;
    }
    

    const setBgImage = () => {
        if (weather?.weather) {
            const weatherDescription = weather.weather[0].main;
            const map = {
                "Mostly Sunny": {
                    night: "cloudyNightSky.jpg",
                    day: 'mostlySunnyDay.jpg'
                },
                "Clear": {
                    night: "clearNight.jpg",
                    day: "sunnyDay1.jpg"
                },
                "Clouds": {
                    night: "cloudyNight.jpg",
                    day: 'cloudyDay.jpg'
                },    
                "Snow": {
                    night:"snowyNight.jpg",
                    day: 'snow2.jpg'
                }, 
                "Rain": {
                    night: "rainyNight2.jpg",
                    day: 'rain1.jpg'
                },
                "Fog": {
                    night: "foggyNight2.jpg",
                    day: 'foggyDay.jpg'
                },
                "Mist": {
                    night: "foggyNight2.jpg",
                    day: 'foggyDay.jpg'
                },
                "Thunderstorm": {
                    night: "thunderstorm.jpg",
                    day: 'thunderstorm.jpg'
                },
                "Squall": {
                    night: "squall.jpg",
                    day: 'squall.jpg'
                },
                "Tornada": {
                    night: "tornada.jpg",
                    day: 'tornada.jpg'
                },
                "Drizzle": {
                    night: "drizzle.jpg",
                    day: 'drizzle.jpg'
                },
                "Haze": {
                    night: "haze.jpg",
                    day: 'haze.jpg'
                }
            };
            // console.log(hourFunction())
            return {
                
                // backgroundImage: `url("bgImages/${map[weatherDescription]}")`,
               
                backgroundImage: hourFunction() <= 6 || hourFunction()>= 18 ? `url("bgImages/${map[weatherDescription].night}")`: `url("bgImages/${map[weatherDescription].day}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                transition: '0.4 ease-out'
            }
        }
        return
    }

    const formatDayString = (day) => {
        const d = new Date(day);

        const monthDay = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        return `${monthDay}-${month}-${d.getFullYear()}`

    }

    const getTempAvr = (day) => {
        const sum = forecast[day].reduce((acc, obj) => acc + obj.main.temp, 0);
        const avr = Math.round(sum / forecast[day].length);
        return avr;
    }

    return (
        <div style={setBgImage()}>
            <main>
                <div className='search-city'>
                    <input type='text'
                        className='search-bar'
                        placeholder='Type name of the city..'
                        ref={queryRef}
                        defaultValue={storedWeather?.name || ""}
                    />
                </div>

                <div className='city-name'>
                    <div className='city'>{weather?.name}</div>
                    <div className='info-day'>{dateFunction(new Date())}</div>
                    <Clock className="info-day" />
                </div>

                <div className='weather-info'>
                    <div className='temperatura'>
                        {weather?.main?.temp && Math.round(weather?.main?.temp)}&#8451;
                        <p>{`Se simte ca ${weather?.main?.feels_like && Math.round(weather?.main?.feels_like)}℃ Umiditate ${weather?.main?.humidity}%`}</p>
                    </div>
                </div>
                <div className="container-card-custom">
                    {forecast && Object.keys(forecast).map(day => (
                        <div className="card-custom" key={day}>
                            <h3 className="title">{formatDayString(day)}</h3>
                            <div className="bar">
                                <div className="emptybar"></div>
                                <div className="filledbar"></div>
                                <div>
                                    <p>{getTempAvr(day)}&#8451;</p>
                                    <Link to={`/forecast?date=${day}`} className="card-link">Click pentru detalii!</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </main>


        </div>
    )

}

export default Home;