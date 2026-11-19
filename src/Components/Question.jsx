import { useQuizProvider } from "../context/QuizContext";
import Options from "./Options";

const Question = () => {
  const { currentQuestion, dispatch, answer: givenAnswer } = useQuizProvider();
  return (
    <div>
      <h4> {currentQuestion.question} </h4>
      <Options
        options={currentQuestion}
        dispatch={dispatch}
        givenAnswer={givenAnswer}
      />
    </div>
  );
};

export default Question;
