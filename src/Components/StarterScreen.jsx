const StarterScreen = ({ totalQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{totalQuestions} question to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "ready" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StarterScreen;
