import { createContext, useContext, useReducer, useEffect } from "react";

const SECS_PER_QUESTIONS = 30;
const initalState = {
  questions: [],
  status: "loading",
  currentStep: 0,
  points: 0,
  answer: null,
  highestscore: 0,
  remainingSeconds: 0,
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
        remainingSeconds: Number(state.questions.length) * SECS_PER_QUESTIONS,
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
        remainingSeconds: Number(state.questions.length) * SECS_PER_QUESTIONS,
        highestscore: state.highestscore,
        status: "ready",
      };
    case "failed":
      return { ...state, status: "failed" };
    default:
      throw new Error("Action unkown");
  }
};
const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [
    {
      status,
      questions,
      currentStep,
      points,
      highestscore,
      answer,
      remainingSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initalState);
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({ type: "received", payload: data });
      } catch {
        dispatch({ type: "failed" });
      }
    };
    fetchQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        status,
        totalQuestions,
        totalPoints,
        currentStep,
        currentQuestion,
        points,
        answer,
        highestscore,
        remainingSeconds,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
const useQuizProvider = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Please use Context Provider inside Cities Provider");
  }
  return context;
};

export { QuizProvider, useQuizProvider };
