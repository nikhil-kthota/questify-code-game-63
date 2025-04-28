import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const QuestionBankPage = () => {
  // Mock data - in a real app, this would come from API
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      text: "What is the correct syntax for declaring a variable in JavaScript?", 
      options: [
        { id: "a", text: "var name = value;" },
        { id: "b", text: "variable name = value;" },
        { id: "c", text: "v name = value;" },
        { id: "d", text: "var = name + value;" }
      ], 
      correctAnswer: "a",
      difficulty: "beginner",
      missionId: 1,
      explanation: "The correct syntax for declaring a variable in JavaScript is 'var name = value;'."
    },
    { 
      id: 2, 
      text: "What does the 'this' keyword refer to in JavaScript?", 
      options: [
        { id: "a", text: "It refers to the current function" },
        { id: "b", text: "It refers to the parent element" },
        { id: "c", text: "It refers to the object it belongs to" },
        { id: "d", text: "It refers to the global window object always" }
      ], 
      correctAnswer: "c",
      difficulty: "intermediate",
      missionId: 2,
      explanation: "In JavaScript, 'this' refers to the object it belongs to."
    },
    { 
      id: 3, 
      text: "How do you create a function in JavaScript?", 
      options: [
        { id: "a", text: "function = myFunction()" },
        { id: "b", text: "function myFunction()" },
        { id: "c", text: "function:myFunction()" },
        { id: "d", text: "create myFunction()" }
      ], 
      correctAnswer: "b",
      difficulty: "beginner",
      missionId: 1,
      explanation: "To create a function in JavaScript, you use the 'function' keyword followed by the function name and parentheses."
    },
    { 
      id: 4, 
      text: "Which hook is used for side effects in React?", 
      options: [
        { id: "a", text: "useState" },
        { id: "b", text: "useEffect" },
        { id: "c", text: "useContext" },
        { id: "d", text: "useReducer" }
      ], 
      correctAnswer: "b",
      difficulty: "intermediate",
      missionId: 4,
      explanation: "useEffect is the React hook used for performing side effects in function components."
    },
    { 
      id: 5, 
      text: "What is the time complexity of searching in a sorted array using binary search?", 
      options: [
        { id: "a", text: "O(1)" },
        { id: "b", text: "O(n)" },
        { id: "c", text: "O(log n)" },
        { id: "d", text: "O(n log n)" }
      ], 
      correctAnswer: "c",
      difficulty: "advanced",
      missionId: null,
      explanation: "The time complexity of binary search is O(log n) because it repeatedly divides the search interval in half."
    },
  ]);

  // Mock missions
  const missions = [
    { id: 1, name: "JavaScript Variables" },
    { id: 2, name: "Functions & Scope" },
    { id: 3, name: "Control Flow" },
    { id: 4, name: "React Components" },
    { id: 5, name: "React Hooks" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMissionName = (missionId: number | null) => {
    if (missionId === null) return "Unassigned";
    const mission = missions.find(m => m.id === missionId);
    return mission ? mission.name : "Unknown";
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
          <p className="text-muted-foreground">Manage questions for missions and quizzes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question</Label>
                <Textarea id="question-text" placeholder="Enter your question" />
              </div>
              
              <div className="space-y-2">
                <Label>Answer Options</Label>
                <div className="space-y-3">
                  {["a", "b", "c", "d"].map(letter => (
                    <div key={letter} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {letter.toUpperCase()}
                      </div>
                      <Input placeholder={`Option ${letter.toUpperCase()}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="correct-answer">Correct Answer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="d">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mission">Assign to Mission</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {missions.map(mission => (
                      <SelectItem key={mission.id} value={mission.id.toString()}>
                        {mission.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation (Shown after answering)</Label>
                <Textarea id="explanation" placeholder="Enter explanation for the correct answer" />
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Question</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-difficulties">All difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All missions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-missions">All missions</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {missions.map(mission => (
                  <SelectItem key={mission.id} value={mission.id.toString()}>
                    {mission.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No questions found with your search criteria</p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="border">
                  <CardHeader className="py-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-base font-medium">{question.text}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {question.options.map(option => (
                        <div 
                          key={option.id}
                          className={`p-2 border rounded-md flex items-center gap-2 ${
                            option.id === question.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-950/30" : ""
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {option.id.toUpperCase()}
                          </div>
                          <span className="text-sm">{option.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getMissionName(question.missionId)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBankPage;
