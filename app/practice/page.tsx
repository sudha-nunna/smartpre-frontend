"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Award, Clock, Video, Target, Calculator, PenTool, Brain, Shapes, Play, Users, Star, ArrowRight,
  Facebook, Twitter, Mail, MessageCircle, Calendar, User,
} from "lucide-react"
import Link from "next/link"
import { getApiUrl } from "@/lib/api-config"

// Map DB icon names to React components
const iconMap: Record<string, any> = {
  Calculator,
  PenTool,
  Brain,
  Shapes,
  Video,
  MessageCircle,
  Calendar,
  User,
}

export default function PracticePage() {
  const [selectedSubject, setSelectedSubject] = useState("all")

  interface Metrics {
    practiceTests: number
    avgDuration: string
    studentsTested: number
    avgRating: number
  }

  interface Test {
    _id: string
    subject: string
    rating: number
    title: string
    description: string
    questions: any[] // Changed from number to array
    timeLimit: number
    attempts: number
    difficulty: string
    topics: string[]
  }

  interface Activity {
    test: string
    score: number
    date: string
  }

  interface Subject {
    _id: string
    name: string
    icon: string
    color: string
    avgTime: string
    tests: number
    difficulty: string
    description: string
  }

  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])

  // Fetch metrics
  useEffect(() => {
    fetch(getApiUrl("/api/metrics"))
      .then(res => res.json())
      .then(setMetrics)
      .catch(err => console.error("Error fetching metrics:", err))
  }, [])

  // Fetch tests
  useEffect(() => {
    fetch(getApiUrl("/api/tests"))
      .then(res => res.json())
      .then(setTests)
      .catch(err => console.error("Error fetching tests:", err))
  }, [])

  // Fetch subjects
  useEffect(() => {
    fetch(getApiUrl("/api/subjects"))
      .then(res => res.json())
      .then(setSubjects)
      .catch(err => console.error("Error fetching subjects:", err))
  }, [])

  // Fetch recent activity
  useEffect(() => {
    fetch(getApiUrl("/api/activities"))
      .then(res => res.json())
      .then(setRecentActivity)
      .catch(err => console.error("Error fetching activities:", err))
  }, [])


  const filteredTests =
  selectedSubject === "all"
    ? tests
    : selectedSubject === "mixed"
      ? tests.filter((test) => test.subject === "Mixed")
      : tests.filter((test) => test.subject === selectedSubject)
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "mathematics":
        return "bg-blue-100 text-blue-700"
      case "english":
        return "bg-green-100 text-green-700"
      case "verbal reasoning":
        return "bg-purple-100 text-purple-700"
      case "non-verbal reasoning":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = "Check out these amazing 11+ practice tests!"
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=${text}&body=${url}`, "_blank")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">153 Practice Tests Available</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              11+ <span className="text-blue-600">Practice Tests</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Test your knowledge with our comprehensive collection of 11+ practice tests. Track your progress, identify
              weak areas, and build confidence for exam day.
            </p>
          </div>

          {metrics && (
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center border-blue-100">
                <CardContent className="p-6">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{metrics.practiceTests}</div>
                  <div className="text-sm text-gray-600">Practice Tests</div>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-100">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{metrics.avgDuration}</div>
                  <div className="text-sm text-gray-600">Average Duration</div>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-100">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{metrics.studentsTested}</div>
                  <div className="text-sm text-gray-600">Students Tested</div>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-100">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{metrics.avgRating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Subject Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant={selectedSubject === "all" ? "default" : "outline"}
              onClick={() => setSelectedSubject("all")}
              className={selectedSubject === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"}
            >
              All Subjects
            </Button>
            {subjects.map((subject) => {
              const Icon = iconMap[subject.icon]
              return (
                <Button
                  key={subject._id}
                  variant={selectedSubject === subject.name ? "default" : "outline"}
                  onClick={() => setSelectedSubject(subject.name)}
                  className={selectedSubject === subject.name ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 text-blue-600 hover:bg-blue-600 bg-transparent"}
                  
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {subject.name}
                </Button>
              )
            })}
            <Button
              variant={selectedSubject === "mixed" ? "default" : "outline"}
              onClick={() => setSelectedSubject("mixed")}
              className={selectedSubject === "mixed" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200 text-blue-600 hover:bg-blue-600 bg-transparent"}
            >
              Mixed Tests
            </Button>
            
          </div>

          
        </div>
      </section>
      {/* Practice Tests Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedSubject === "all"
                ? "All Practice Tests"
                : selectedSubject === "mixed"
                  ? "Mixed Practice Tests"
                  : `${selectedSubject} Tests`}
                  
            </h2>
            <div className="text-sm text-gray-600">{filteredTests.length} tests available</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTests.map((test) => (
              <Card
                key={test._id}
                className="border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getSubjectColor(test.subject)}>{test.subject}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{test.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">{test.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">{test.questions.length}</div>
                        <div className="text-gray-600">Questions</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{test.timeLimit} min</div>
                        <div className="text-gray-600">Time Limit</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{test.attempts}</div>
                        <div className="text-gray-600">Attempts</div>
                      </div>
                    </div>

                    <div>
                      <Badge className={getDifficultyColor(test.difficulty)} variant="secondary">
                        {test.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</div>
                      <div className="flex flex-wrap gap-1">
                        {test.topics.slice(0, 3).map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {test.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{test.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm font-medium text-gray-900 mb-3">Additional Support:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700 text-xs"
                        >
                          <Video className="h-3 w-3 mr-1" />
                          Video Tutorial
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-200 text-purple-600 hover:bg-purple-100 hover:text-purple-700 text-xs"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Ask Doubt
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Link href={`/practice/test/${test._id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Test
                        </Link>
                      </Button>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhanced Learning Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized help with video tutorials and one-to-one doubt sessions with expert tutors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Video Tutorials Card */}
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Video Tutorials</CardTitle>
                <CardDescription className="text-lg">
                  Watch detailed explanations for every practice test question
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">250+</div>
                    <div className="text-sm text-gray-600">Video Lessons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">HD</div>
                    <div className="text-sm text-gray-600">Quality</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Step-by-step problem solving</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Expert teacher explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Multiple solving methods</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Free Sample Videos
                </Button>
              </CardContent>
            </Card>

            {/* One-to-One Sessions Card */}
            <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">One-to-One Doubt Sessions</CardTitle>
                <CardDescription className="text-lg">Get personalized help from expert 11+ tutors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">15 min</div>
                    <div className="text-sm text-gray-600">Average Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-gray-600">Expert Tutors</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Instant doubt resolution</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Live video sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Personalized study plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Progress tracking</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Free Session
                  </Button>
                  <Button
                     variant="outline"
                    className="w-full border-blue-200 text-blue-600  hover:bg-blue-100 hover:text-blue-700"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Meet Our Tutors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing for sessions */}
          {/* <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Session Pricing</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {pricing.map((plan, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-2xl font-bold ${plan.color} mb-2`}>
                        {plan.price}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{plan.title}</div>
                      <div className="text-xs text-gray-500">{plan.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.length === 0 && (
                  <p className="text-gray-500">No activity yet. Take a test to see results here!</p>
                )}
               {recentActivity?.map((activity: Activity, index) => (
                  <Card key={index} className="border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{activity.test}</h3>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{activity.score}%</div>
                          <div className="text-sm text-gray-600">Score</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={activity.score} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Practicing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their 11+ scores with our practice tests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/practice/test/5">
                Start Free Practice Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
            >
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
          </div>

          {/* Share section */}
          <div className="pt-8 border-t border-blue-500">
            <p className="text-blue-100 mb-4">Share with other students:</p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" onClick={() => handleShare("facebook")} className="text-white hover:bg-blue-500">
                <Facebook className="h-5 w-5 mr-2" />
                Facebook
              </Button>
              <Button variant="ghost" onClick={() => handleShare("twitter")} className="text-white hover:bg-blue-500">
                <Twitter className="h-5 w-5 mr-2" />
                Twitter
              </Button>
              <Button variant="ghost" onClick={() => handleShare("email")} className="text-white hover:bg-blue-500">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">11+ SmartPrep</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Comprehensive practice tests for 11+ exam success.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Practice Tests</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mathematics
                  </a> 
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    English
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Verbal Reasoning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Non-Verbal Reasoning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Timed Tests
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Progress Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Detailed Results
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Performance Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    One-to-One Doubt Sessions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutor Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 11+ SmartPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}