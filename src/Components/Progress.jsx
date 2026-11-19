import { useQuizProvider } from "../context/QuizContext";

const Progress = () => {
  const {
    totalQuestions,
    currentStep,
    totalPoints,
    points: earnedPoints,
    answer: hasAnswered,
  } = useQuizProvider();
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={currentStep + 1 + Number(hasAnswered !== null)}
      />
      <p>
        Question <strong>{currentStep + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{earnedPoints}</strong> /{totalPoints} points
      </p>
    </header>
  );
};

export default Progress;
