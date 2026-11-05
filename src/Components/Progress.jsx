const Progress = ({
  totalQuestions,
  currentQuestion,
  totalPoints,
  earnedPoints,
  hasAnswered,
}) => {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={currentQuestion - 1 + Number(hasAnswered !== null)}
      />
      <p>
        Question <strong>{currentQuestion}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{earnedPoints}</strong> /{totalPoints} points
      </p>
    </header>
  );
};

export default Progress;
