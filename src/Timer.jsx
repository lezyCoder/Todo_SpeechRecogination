import { useState, useRef } from "react";

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);

    const handleStart = () => {
        if (intervalRef.current) return; // prevent multiple intervals
        intervalRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    return (
        <div className="w-1/2 h-full flex justify-center items-center flex-col border">
            <div className="timer p-10 text-9xl">
                {timer}
            </div>

            <div className="btn flex gap-2 p-10">
                <button className="border" onClick={handleStart}>Start</button>
                <button className="border" onClick={handlePause}>Pause</button>
            </div>
        </div>
    );
};

export default Timer;
