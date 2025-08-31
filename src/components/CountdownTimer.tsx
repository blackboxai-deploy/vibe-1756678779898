"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialMinutes?: number;
  onExpire?: () => void;
  className?: string;
}

export default function CountdownTimer({ 
  initialMinutes = 15, 
  onExpire,
  className = "" 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`text-center ${className}`}>
      <p className="font-medium text-lg">
        Tempo restante da sua reserva: {formatTime(timeLeft)}
      </p>
      {timeLeft <= 0 && (
        <p className="text-red-500 font-semibold mt-2">
          Reserva expirada. Consulte novamente.
        </p>
      )}
    </div>
  );
}