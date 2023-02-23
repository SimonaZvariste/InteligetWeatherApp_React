import { useState, useEffect } from "react";

const Clock = ({className}) => {
    const [clock, setClock] = useState();

    useEffect(() => {
        const tick = setInterval(() => {
            const d = new Date();
            const hour = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();

            const formatedHour = hour < 10 ? `0${hour}` : hour;
            const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            setClock(formatedHour + ":" + formatedMinutes + ":" + formatedSeconds)
        }, 1000);

        return () => clearInterval(tick);

    }, [])


    return<div className={className}>{clock}</div>
}

export default Clock;