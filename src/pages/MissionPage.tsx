
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sample mission data - in a real app, this would come from an API
const missionData = {
  id: "js-functions",
  name: "Spell Binding",
  description: "Master the art of creating powerful incantations and controlling their magical scope",
  xpReward: 50,
  questions: [
    {
      id: "q1",
      text: "What is the correct syntax for declaring a magical incantation in the Arcane Script?",
      options: [
        { id: "a", text: "incantation = mySpell() {}" },
        { id: "b", text: "incantation mySpell() {}" },
        { id: "c", text: "incantation:mySpell() {}" },
        { id: "d", text: "mySpell = incantation() {}" }
      ],
      correctAnswer: "b",
      explanation: "The correct syntax for declaring an incantation in Arcane Script is 'incantation mySpell() {}'. This creates a named spell that can be invoked later."
    },
    {
      id: "q2",
      text: "What does the 'manifest' statement do in a spell?",
      options: [
        { id: "a", text: "Breaks the spell immediately" },
        { id: "b", text: "Displays magical output to the scrying pool" },
        { id: "c", text: "Determines what magical effect is produced when the spell is cast" },
        { id: "d", text: "Declares a magical variable inside the spell" }
      ],
      correctAnswer: "c",
      explanation: "The 'manifest' statement determines what magical effect will be produced when the spell is cast. It also causes the incantation to stop executing at that point."
    },
    {
      id: "q3",
      text: "What is magical containment?",
      options: [
        { id: "a", text: "The amount of mana a spell consumes" },
        { id: "b", text: "The region within which magical variables can be accessed or modified" },
        { id: "c", text: "The number of variables that can be declared in a spell" },
        { id: "d", text: "The default value of a magical variable" }
      ],
      correctAnswer: "b",
      explanation: "Magical containment refers to the region of your spell where a particular magical variable can be accessed or modified. Arcane Script has incantation containment, ritual containment, and universal containment."
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
        title: "Quest Completed!",
        description: `You gained ${missionData.xpReward} Mana!`,
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="glass-card p-6 text-center">
        <h1 className="text-3xl md:text-5xl font-vt323 mb-2">{missionData.name}</h1>
        <p className="text-lg">{missionData.description}</p>
      </div>
      
      {!missionCompleted ? (
        <Card className="game-panel p-6 space-y-6">
          <div>
            <span className="text-sm text-white/70 block mb-2">
              Challenge {currentQuestionIndex + 1} of {missionData.questions.length}
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
                  className="border-mountain-purple text-sunset-pink"
                />
                <Label 
                  htmlFor={`option-${option.id}`}
                  className="w-full p-3 rounded hover:bg-mountain-dark cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {showingFeedback && (
            <div className={`p-4 rounded-md ${isCorrect ? 'bg-mountain-purple/20' : 'bg-sunset-red/20'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-mountain-purple" />
                    <span className="font-medium">Correct Spell Casting!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-sunset-red" />
                    <span className="font-medium">Your spell fizzled</span>
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
                className="bg-mountain-purple hover:bg-mountain-purple/80 text-white"
              >
                Cast Spell
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-sunset-pink hover:bg-sunset-red text-white"
              >
                {isLastQuestion ? "Complete Quest" : "Next Challenge"}
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card className="game-panel p-8 text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4 neon-glow">🏆</div>
            <h2 className="text-2xl font-vt323 mb-2 text-sunset-pink">Quest Complete!</h2>
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="h-5 w-5 text-mountain-purple" />
              <p className="text-lg">You've gained {missionData.xpReward} Mana!</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button onClick={() => window.history.back()} className="bg-mountain-dark hover:bg-mountain-dark/80">
              Return
            </Button>
            <Button className="bg-sunset-pink hover:bg-sunset-red text-white" asChild>
              <a href="/skill-tree">Spell Paths</a>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MissionPage;
