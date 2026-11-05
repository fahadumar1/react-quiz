import { useEffect, useReducer } from "react";
import Header from "./Header";
import StarterScreen from "./StarterScreen";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
import Progress from "./Progress";
const initalState = {
  questions: [],
  status: "loading",
  currentStep: 0,
  points: 0,
  answer: null,
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
    case "failed":
      return { ...state, status: "failed" };
    default:
      throw new Error("Action unkown");
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
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
          <StarterScreen
            totalQuestions={state.questions.length}
            dispatch={dispatch}
          />
        )}
        {state.status === "ready" && (
          <>
            <Progress
              totalQuestions={state.questions.length}
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
            <div className="">
              {state.answer !== null ? (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
