import { useEffect, useReducer } from "react";
import Header from "./Header";
import StarterScreen from "./StarterScreen";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
import Progress from "./Progress";
import Result from "./Result";
import Footer from "./Footer";
const SECS_PER_QUESTIONS = 30;
const initalState = {
  questions: [],
  status: "loading",
  currentStep: 0,
  points: 0,
  answer: null,
  highestscore: 0,
  remainingSeconds: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "received":
      return {
        ...state,
        questions: action.payload,
        status: "received",
      };
    case "ready":
      return {
        ...state,
        status: "ready",
        remainingSeconds: state.totalQuestions * SECS_PER_QUESTIONS,
      };
    case "check":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.currentStep].correctOption
            ? state.points + state.questions[state.currentStep].points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        currentStep: state.currentStep + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highestscore:
          state.highestscore > state.points ? state.highestscore : state.points,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    case "reset":
      return {
        ...initalState,
        questions: state.questions,
        status: "ready",
      };
    case "failed":
      return { ...state, status: "failed" };
    default:
      throw new Error("Action unkown");
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const totalQuestions = state.questions.length;
  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => {
        if (!res.ok) throw new Error("Server not responding");
        return res.json();
      })
      .then((data) => dispatch({ type: "received", payload: data }))
      .catch(() => dispatch({ type: "failed" }));
  }, []);
  return (
    <>
      <div className="app">
        <Header />
        {state.status === "loading" && <Loader />}
        {state.status === "failed" && <Error />}
        {state.status === "received" && (
          <StarterScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {state.status === "ready" && state.currentStep < totalQuestions && (
          <>
            <Progress
              totalQuestions={totalQuestions}
              currentQuestion={state.currentStep + 1}
              totalPoints={state.questions.reduce(
                (acc, curr) => acc + curr.points,
                0,
              )}
              earnedPoints={state.points}
              hasAnswered={state.answer}
            />
            <Question
              currentQuestion={state.questions[state.currentStep]}
              givenAnswer={state.answer}
              dispatch={dispatch}
            />
            <Footer
              answer={state.answer}
              currentStep={state.currentStep}
              totalQuestions={totalQuestions}
              dispatch={dispatch}
            />
          </>
        )}
        {state.status === "finished" && (
          <Result
            totalPoints={state.questions.reduce(
              (acc, curr) => acc + curr.points,
              0,
            )}
            earnedPoints={state.points}
            dispatch={dispatch}
            highestscore={state.highestscore}
          />
        )}
      </div>
    </>
  );
}

export default App;
