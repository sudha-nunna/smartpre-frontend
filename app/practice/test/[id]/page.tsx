"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Award, Clock, ArrowLeft, ArrowRight, CheckCircle2, Flag } from "lucide-react"

type Question = {
  _id: string
  question: string
  type: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic: string
}

type TestData = {
  _id: string
  title: string
  description: string
  subject: string
  questions: number
  timeLimit: number
  difficulty: string
}

export default function PracticeTestPage() {
  const params = useParams()
  const testId = params?.id as string | undefined

  const [testData, setTestData] = useState<TestData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [isTestCompleted, setIsTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // ✅ Fetch test data safely
  useEffect(() => {
    if (!testId) return
    const fetchTest = async () => {
      try {
        const res = await fetch(`https://smartprep-backend-2.onrender.com/api/tests/${testId}`)
        if (!res.ok) {
          console.error("Failed to fetch test:", await res.text())
          return
        }
        const data = await res.json()
        setTestData(data.test)
        setQuestions(data.questions || [])
        setTimeLeft((data.test?.timeLimit || 0) * 60)
      } catch (err) {
        console.error("Error fetching test:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTest()
  }, [testId])

  // ✅ Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isTestStarted && !isTestCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTestCompleted(true)
            setShowResults(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTestStarted, isTestCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (qid: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [qid]: answer }))
  }

  const handleSubmitTest = () => {
    setIsTestCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) correct++
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getScoreColor = (score: number) =>
    score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading test...</p>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Failed to load test details.
      </div>
    )
  }

  // ✅ Before test start
  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="sticky top-0 z-50 bg-white border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <Link href="/practice" className="flex items-center gap-2 text-blue-600">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">11+ Smart Prep</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="border-blue-200 shadow-xl">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4 bg-blue-100 text-blue-700">
                {testData.subject}
              </Badge>
              <CardTitle className="text-3xl mb-2">{testData.title}</CardTitle>
              <CardDescription className="text-lg mb-6">{testData.description}</CardDescription>

              <div className="flex flex-wrap justify-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-blue-600 text-2xl font-bold">{testData.questions}</p>
                  <p className="text-gray-500">Questions</p>
                </div>
                <div className="text-center">
                  <p className="text-green-600 text-2xl font-bold">{testData.timeLimit} min</p>
                  <p className="text-gray-500">Time Limit</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-700 text-2xl font-bold">{testData.difficulty}</p>
                  <p className="text-gray-500">Difficulty</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="text-left px-6">
              <h3 className="text-lg font-semibold mb-4">Instructions:</h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Read each question carefully.",
                  "You can navigate between questions.",
                  "The timer starts when you begin.",
                  "Submit before time runs out."
                ].map((txt, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> {txt}
                  </li>
                ))}
              </ul>

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  onClick={() => setIsTestStarted(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  Start Test <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ✅ Results page
  if (showResults) {
    const score = calculateScore()
    const correct = questions.filter(q => answers[q._id] === q.correctAnswer).length
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="border-blue-200 shadow-xl">
            <CardHeader className="text-center">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>{score}%</div>
              <CardTitle className="text-2xl mb-2">Test Completed!</CardTitle>
              <CardDescription>
                You answered {correct} out of {questions.length} questions correctly
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  // ✅ Test page
  const currentQ = questions[currentQuestion]
  if (!currentQ) return null
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="sticky top-0 z-50 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Award className="h-6 w-6 text-blue-600" />
            <span className="font-bold">11 Plus DIY</span>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className={`font-mono ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
              {formatTime(timeLeft)}
            </span>
            <Button variant="outline" size="sm" onClick={handleSubmitTest}>
              <Flag className="h-4 w-4 mr-2" /> Submit
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-blue-200 shadow-lg">
          <CardHeader>
            <Badge className="bg-blue-100 text-blue-700">{currentQ.topic}</Badge>
            <CardTitle className="text-xl mt-2">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQ._id] || ""}
              onValueChange={val => handleAnswerChange(currentQ._id, val)}
            >
              {currentQ.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`option-${idx}`} />
                  <Label
                    htmlFor={`option-${idx}`}
                    className="flex-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(q => q - 1)}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestion(q => q + 1)}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmitTest} className="bg-green-600 text-white">
                  Submit Test
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
