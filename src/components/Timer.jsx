import React, { useEffect, useState } from "react";

const Timer = ({ days, hours, minutes, seconds }) => {
  const [day, setDays] = useState(days);
  const [hour, setHours] = useState(hours);
  const [minute, setMinutes] = useState(minutes);
  const [second, setSeconds] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      const totalInSeconds =
        day * 86400 + hour * 3600 + minute * 60 + second - 1;
      const d = Math.floor(totalInSeconds / 86400);
      const h = Math.floor((totalInSeconds / 3600) % 24);
      const m = Math.floor((totalInSeconds / 60) % 60);
      const s = Math.floor(totalInSeconds % 60);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className="flex-center flex-col items-start border border-black/10 px-4 py-2">
      <p className="font-semibold">Ends In:</p>
      <span className="flex items-end gap-2">
        <p className="timer">
          Days <span>{day}</span>
        </p>
        <span>:</span>
        <p className="timer">
          Hours <span>{hour < 10 ? "0" + hour : hour}</span>
        </p>
        <span>:</span>
        <p className="timer">
          Minutes <span>{minute < 10 ? "0" + minute : minute}</span>
        </p>
        <span>:</span>
        <p className="timer">
          Seconds <span>{second < 10 ? "0" + second : second}</span>
        </p>
      </span>
    </div>
  );
};

export default Timer;
