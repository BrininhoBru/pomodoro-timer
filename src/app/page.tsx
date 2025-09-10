import PatternBackground from "./components/PatternBackground";
import Timer from "./components/Timer";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden">
      <PatternBackground />

      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-bold mb-8 text-neutral-200">
          Temporizador Pomodoro
        </h1>
        <Timer />
      </div>
    </main>
  );
}
