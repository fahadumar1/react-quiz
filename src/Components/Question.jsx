import Options from "./Options";

const Question = ({ currentQuestion, givenAnswer, dispatch }) => {
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
