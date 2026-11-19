import { useEffect } from "react";
import { useQuizProvider } from "../context/QuizContext";

const Timer = () => {
  const { remainingSeconds, dispatch } = useQuizProvider();
  console.log(`Timer ${remainingSeconds}`);
  useEffect(() => {
    const quizTime = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(quizTime);
  }, [dispatch]);
  return (
    <div className="timer">
      0{Math.floor(remainingSeconds / 60)}:
      {(remainingSeconds % 60).toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
