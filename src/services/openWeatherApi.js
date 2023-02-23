import axios from 'axios';

const ApiKey = process.env.REACT_APP_WEATHER_API_KEY
const api  = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
    headers: {
        'Content-Type': 'application/json'
    }
})


const getWeatherByCity = (city) => {
    return api.get(`weather?q=${city}&units=metric&appid=${ApiKey}`);
}

const getWeatherByGeoLoc = (lat, long) => {
    return api.get(`weather?lat=${lat}&lon=${long}&units=metric&appid=${ApiKey}`);
}

const getForecastByCity = (city) => {
    return api.get(`forecast?q=${city}&units=metric&appid=${ApiKey}`);
}

const formatForecastByDay = (data) => {
    // console.log(data)
    const newData = {};
    data.forEach(obj => {
        const day = obj.dt_txt.split(" ")[0];//"2023-02-09"
        if(newData[day]){
            newData[day].push(obj);
        }
        else {
            newData[day] = [obj];
        }
    })
    return newData;
}

const formatForecastByHour = (hour) => {
    
    const newData = {};
    hour.forEach(obj => {
        const hour = obj.dt_txt.split(" ")[1];//"00:00:00"
        
        if(newData[hour]){
            newData[hour].push(obj);
        }
        else {
            newData[hour] = [obj];
        }
    })
    return newData;
}

export { getWeatherByCity, getWeatherByGeoLoc, getForecastByCity, formatForecastByDay, formatForecastByHour }
