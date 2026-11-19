import { useQuizProvider } from "../context/QuizContext";
import Timer from "./Timer";
const Footer = () => {
  const { answer, currentStep, totalQuestions, remainingSeconds, dispatch } =
    useQuizProvider();
  return (
    <footer className="">
      <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
      {answer !== null ? (
        currentStep < totalQuestions - 1 ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished" })}
          >
            Show Result
          </button>
        )
      ) : (
        ""
      )}
    </footer>
  );
};

export default Footer;
