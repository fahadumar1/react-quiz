import Header from "./Components/Header";
import StarterScreen from "./Components/StarterScreen";
import Error from "./Components/Error";
import Loader from "./Components/Loader";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import Result from "./Components/Result";
import Footer from "./Components/Footer";
import { useQuizProvider } from "./context/QuizContext";
function App() {
  const { status, currentStep, totalQuestions } = useQuizProvider();
  return (
    <>
      <div className="app">
        <Header />
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "received" && <StarterScreen />}
        {status === "ready" && currentStep < totalQuestions && (
          <>
            <Progress />
            <Question />
            <Footer />
          </>
        )}
        {status === "finished" && <Result />}
      </div>
    </>
  );
}

export default App;
