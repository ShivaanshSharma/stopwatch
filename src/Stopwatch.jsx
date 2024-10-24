import {useState, useEffect, useRef} from 'react';

const Stopwatch = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    const startHandler = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stopHandler = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setElapsedTime(0);
    }

    const formattedTime = () => {
        let minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
        let seconds = Math.floor((elapsedTime / (1000)) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000 /10));

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if (milliseconds < 10) {
            milliseconds = '0' + milliseconds;
        }

        return (`${minutes}:${seconds}:${milliseconds}`);
    }

    return (
        <div className='main'>
            <div className='timer'>
                {formattedTime()}
            </div>
            <div className='buttons'>
                <button onClick={startHandler}>Start</button>
                <button onClick={stopHandler}>Stop</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;