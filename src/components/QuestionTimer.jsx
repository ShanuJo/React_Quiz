import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    // setTimeout(()=>{
    //     onTimeout();
    // }, timeout);


    useEffect(() => {
        const timeOutRef = setTimeout(onTimeout, timeout); // shorter version of above
        return()=>{
            clearTimeout(timeOutRef);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
        }, 100)
        return()=> {
            clearInterval(timeInterval);
        }
    }, [])


    return (
        <progress id="question-time" value={remainingTime} max={timeout} className={mode} />
    )
}
