import Options from "./Options";

const Question = ({ currentQuestion, dispatch }) => {
  return (
    <div>
      <h4> {currentQuestion.question} </h4>
      <Options options={currentQuestion.options} dispatch={dispatch} />
    </div>
  );
};

export default Question;
