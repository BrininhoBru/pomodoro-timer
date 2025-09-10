"use client";

import useTimer from "../hook/use-timer";

export default function Timer() {
  const {
    mode,
    timeLeft,
    togleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions,
  } = useTimer();
  const [minutes, seconds] = getMinutesAndSeconds(timeLeft);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="max-w-sm bg-neutral-200 shadow-xl w-full p-6 rounded-xl">
      <div className="flex  items-center justify-between mb-4">
        <h2 className="text-xl font-medium capitalize">
          Tempo {mode === "focus" ? "Focado" : "de Pausa"}
        </h2>
        <div className="text-sm text-gray-500">Ciclos: {sessions}</div>
      </div>

      <div className="text-center text-6xl font-mono font-bold mb-6 text-neutral-800">
        {formattedTime}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={togleTimer}
          className={`${
            isActive
              ? "bg-violet-800 hover:bg-violet-900"
              : "bg-violet-500 hover:bg-violet-600"
          } px-5 py-2 rounded-lg text-white`}
        >
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-neutral-200 hover:bg-neutral-300 px-5 py-2 rounded-lg"
        >
          Reiniciar
        </button>
      </div>

      <button
        onClick={() => switchMode(mode === "focus" ? "shortBreak" : "focus", true)}
        className="py-2 w-full bg-neutral-200 hover:bg-neutral-300 rounded-lg text-gray-700"
      >
        Trocar para {mode === "focus" ? "pausa" : "foco"}
      </button>
    </div>
  );
}

function getMinutesAndSeconds(timeLeft: number): [number, number] {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return [minutes, seconds];
}
