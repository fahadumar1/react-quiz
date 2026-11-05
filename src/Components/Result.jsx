const Result = ({ earnedPoints, totalPoints, highestscore, dispatch }) => {
  const percentage = (earnedPoints / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{earnedPoints}</strong> out of {totalPoints}{" "}
        {Math.floor(percentage)}%
      </p>
      <p className="highscore">Highscore x {highestscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default Result;
