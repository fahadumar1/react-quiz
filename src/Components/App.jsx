import { useEffect, useReducer } from "react";
import Header from "./Header";
import StarterScreen from "./StarterScreen";
import Error from "./Error";
import Loader from "./Loader";
import Question from "./Question";
const initalState = {
  questions: [],
  status: "loading",
  currentStep: 0,
  points: 0,
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
          <Question currentQuestion={state.questions[0]} dispatch={dispatch} />
        )}
      </div>
    </>
  );
}

export default App;
