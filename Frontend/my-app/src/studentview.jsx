import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

const Studentview = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [timer, setTimer] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);

  const formatTimer = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const endTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
    setTimer(0);
  };

  const times = () => {
    setTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const clockInterval = setInterval(times, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const startTimer = () => {
    clearInterval(timeInterval);
    setTimer(0);

    const intervalId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setTimeInterval(intervalId);
  };

  return (
    <div className="student-container">
      <div className="view-card">
      <h1 className="welcome-msg">Hello Students</h1>
      <h1 className="current-time">{time}</h1>
      <h1 className="timer-display">{formatTimer(timer)}</h1>
      <div className="button-group">
      <Button onClick={startTimer}>Start</Button>
      <Button onClick={endTimer}>Resume</Button>
      <Button onClick={resetTimer}>End</Button>
      </div>
      </div>
    </div>
  );
};

export default Studentview;
