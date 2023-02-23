import { useState, useEffect } from "react";
import LineChart from "../components/chart/chart";
import { useNavigate } from 'react-router-dom';

const Forecast = () => {

    const params = window.location.search;
    const day = params.split("date=")[1];

    const storedData = sessionStorage.getItem("forecast");
    const storedForecast = storedData ? JSON.parse(storedData) : undefined;
    const forecast = storedForecast[day];

    const labelsHours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];


    const formatHourString = (date) => {
        return date.split(" ")[1].substring(0, 5);

    }

    const formatDayString = (day) => {
        const d = new Date(day);

        const monthDay = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        return `${monthDay}-${month}-${d.getFullYear()}`

    }

    const getComputedDataSet = () => {
        const dataset = new Array(labelsHours.length).fill({}, 0, labelsHours.length);
        labelsHours.forEach((hour, index) => {
            const found = forecast.find(obj => obj.dt_txt.split(" ")[1] === hour + ":00");
            if (found) {
                dataset[index] = found;
            }
        })
        return dataset;
    }

//TO DO
    const navigate = useNavigate();

    const handleToHome = () => {
        navigate('/');
    }
 
    return (
        <div>
            {/* Forecast */}
            <div className= 'flex-container'>
                <h3 className='custom-title'>{`Previziunile orare pentru  data de ${formatDayString(day)}`}</h3>
                <button onClick={handleToHome}  type="button" className="btn btn-primary btn-lg" >Back to general info weather</button>
            </div>
                {/* formatDayString(day)  in loc de day*/}
            <div className="forecast-card-custom">
                {forecast.map(obj => (
                    <div className="f-card-custom" key={obj.dt}>
                        <h3 className="title-hour">{formatHourString(obj.dt_txt)}</h3>
                        <img src={`http://openweathermap.org/img/wn/${obj.weather[0]?.icon}@2x.png`} width={70} />
                        <div className='info-hour'>
                            <p>{`Temperature: ${obj?.main?.temp && Math.round(obj?.main?.temp)}`}&#8451;</p>
                            <p>{`Humidity: ${obj?.main?.humidity}%`}</p>
                            <p>{`Feels like: ${obj?.main?.feels_like && Math.round(obj?.main?.feels_like)}`}&#8451;</p>
                            <p>Pressure:{` ${obj?.main?.pressure && Math.round((obj?.main?.pressure)*0.750)} mmHG`}</p>
                            <p>Wind speed:{` ${obj?.wind?.speed && Math.round(obj?.wind?.speed)} m/s`}</p>
                        </div>
                    </div>
                ))}
                
            </div>
            <div className="forecast-charts-container" style={{ maxHeight: "30rem" }}>

                <LineChart
                    labels={['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']}
                    dataSet={getComputedDataSet().map(obj => obj?.main?.temp)}
                    label="Temperature"
                    title="Temperature" />


                <LineChart
                    labels={['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']}
                    dataSet={getComputedDataSet().map(obj => obj?.main?.humidity)}
                    borderColor="#0044ff"
                    label="Humidity"
                    title="Humidity" />

            </div>
        </div>
    )
}

export default Forecast;