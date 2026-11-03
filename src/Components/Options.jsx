const Options = ({
  options: { options, correctOption },
  dispatch,
  givenAnswer,
}) => {
  console.log(givenAnswer, correctOption);
  return (
    <div className="options">
      {options.map((curr, i) => {
        return (
          <button
            className={`btn btn-option ${i === givenAnswer ? "answer" : ""}  ${givenAnswer !== null ? (correctOption === i ? "correct" : "wrong") : ""}`}
            key={curr}
            onClick={() => dispatch({ type: "check", payload: i })}
            disabled={givenAnswer !== null}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
