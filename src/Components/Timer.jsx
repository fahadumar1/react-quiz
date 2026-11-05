import { useEffect } from "react";

const Timer = ({ remainingSeconds, dispatch }) => {
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
