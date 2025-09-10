"use client";

import { useEffect, useRef, useState } from "react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const focusTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;

export default function useTimer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const togleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDuration(mode));
    setSessions(0);
  };

  const getDuration = (mode: TimerMode) => {
    switch (mode) {
      case "shortBreak":
        return shortBreakTime * 60;

      case "longBreak":
        return longBreakTime * 60;

      default:
        return focusTime * 60;
    }
  };

  const switchMode = (newMode: TimerMode, isSwitch: boolean = false) => {
    setMode(newMode);
    setTimeLeft(getDuration(newMode));

    if (isActive && !isSwitch) {
      soundRef.current?.play();
    }

    if (newMode === "focus" && isActive) {
      setSessions((prev) => prev + 1);
      setIsActive(false);
    }
  };

  useEffect(() => {
    soundRef.current = new Audio("/sounds/notification-bell-sound.mp3");
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      switchMode(mode === "focus" ? "shortBreak" : "focus");
    }
  }, [timeLeft, switchMode]);

  return {
    mode,
    timeLeft,
    isActive,
    togleTimer,
    resetTimer,
    switchMode,
    sessions,
  };
}
function getDuration(mode: string): import("react").SetStateAction<number> {
  throw new Error("Function not implemented.");
}
