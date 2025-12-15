import { useState, useRef } from "react";

const Timer = () => {
    const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
    const intervalRef = useRef(null);

    const handleStart = () => {
        if (intervalRef.current) return; // prevent multiple intervals
        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0; // Stop at 0
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimer(30 * 60);
    };

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-1/2 h-full flex justify-center items-center flex-col">
            <div className="timer p-10 text-9xl font-mono">
                {formatTime(timer)}
            </div>

            <div className="btn flex gap-4 p-10">
                <button 
                    className="outline-none p-2 w-20 rounded bg-green-800 hover:scale-90 transition-transform ease-in-out cursor-pointer text-white" 
                    onClick={handleStart}
                >
                    Start
                </button>
                <button 
                    className="outline-none p-2 w-20 rounded bg-red-800 hover:scale-90 transition-transform ease-in-out cursor-pointer text-white" 
                    onClick={handlePause}
                >
                    Pause
                </button>
                <button 
                    className="outline-none p-2 w-20 rounded bg-blue-800 hover:scale-90 transition-transform ease-in-out cursor-pointer text-white" 
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;