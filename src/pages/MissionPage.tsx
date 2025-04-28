
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sample mission data - in a real app, this would come from an API
const missionData = {
  id: "js-functions",
  name: "JavaScript Functions & Scope",
  description: "Learn about JavaScript functions, parameters, return values, and variable scope",
  xpReward: 50,
  questions: [
    {
      id: "q1",
      text: "What is the correct syntax for declaring a function in JavaScript?",
      options: [
        { id: "a", text: "function = myFunction() {}" },
        { id: "b", text: "function myFunction() {}" },
        { id: "c", text: "function:myFunction() {}" },
        { id: "d", text: "myFunction = function() {}" }
      ],
      correctAnswer: "b",
      explanation: "The correct syntax for declaring a function in JavaScript is 'function myFunction() {}'. This creates a function named myFunction that can be called later."
    },
    {
      id: "q2",
      text: "What does the 'return' statement do in a function?",
      options: [
        { id: "a", text: "Exits the function immediately" },
        { id: "b", text: "Outputs a value to the console" },
        { id: "c", text: "Specifies the value that the function outputs when called" },
        { id: "d", text: "Declares a variable inside the function" }
      ],
      correctAnswer: "c",
      explanation: "The 'return' statement specifies the value that will be provided as the output of the function when it is called. It also causes the function to stop executing at that point."
    },
    {
      id: "q3",
      text: "What is variable scope?",
      options: [
        { id: "a", text: "The size of a variable in memory" },
        { id: "b", text: "The region of code where a variable is accessible" },
        { id: "c", text: "The number of variables that can be declared" },
        { id: "d", text: "The default value of a variable" }
      ],
      correctAnswer: "b",
      explanation: "Variable scope refers to the region of your code where a particular variable can be accessed or modified. JavaScript has function scope, block scope, and global scope."
    },
  ]
};

const MissionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  
  const currentQuestion = missionData.questions[currentQuestionIndex];
  const hasAnswered = selectedAnswers[currentQuestion?.id];
  const isCorrect = hasAnswered && hasAnswered === currentQuestion?.correctAnswer;
  const isLastQuestion = currentQuestionIndex === missionData.questions.length - 1;

  const handleSelectAnswer = (value: string) => {
    if (showingFeedback) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value
    });
  };

  const handleSubmitAnswer = () => {
    setShowingFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowingFeedback(false);
    
    if (isLastQuestion) {
      setMissionCompleted(true);
      toast({
        title: "Mission Completed!",
        description: `You earned ${missionData.xpReward} XP!`,
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-vt323 mb-2">{missionData.name}</h1>
        <p className="text-muted-foreground">{missionData.description}</p>
      </div>
      
      {!missionCompleted ? (
        <Card className="p-6 space-y-6">
          <div>
            <span className="text-sm text-muted-foreground block mb-2">
              Question {currentQuestionIndex + 1} of {missionData.questions.length}
            </span>
            <h2 className="text-xl font-medium">{currentQuestion.text}</h2>
          </div>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion?.id] || ""}
            onValueChange={handleSelectAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${option.id}`} 
                  disabled={showingFeedback}
                />
                <Label 
                  htmlFor={`option-${option.id}`}
                  className="w-full p-2 rounded hover:bg-muted cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {showingFeedback && (
            <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Not quite right</span>
                  </>
                )}
              </div>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            {!showingFeedback ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={!hasAnswered}
                className="questify-button-primary"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="questify-button-primary"
              >
                {isLastQuestion ? "Complete Mission" : "Next Question"}
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-vt323 mb-2">Mission Complete!</h2>
            <p>You've earned {missionData.xpReward} XP!</p>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button onClick={() => window.history.back()}>
              Back
            </Button>
            <Button className="questify-button-primary" asChild>
              <a href="/skill-tree">Skill Tree</a>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MissionPage;
