"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchUserProgress } from "@/lib/features/userProgress/userProgressSlice"
import { TrendingUp, Clock, Target, Award, Flame, Star } from "lucide-react"

export function ProgressDashboard() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const {
    subjectProgress,
    achievements,
    studyStreak,
    totalTestsCompleted,
    totalTimeStudied,
    overallAverageScore,
    isLoading,
  } = useAppSelector((state) => state.userProgress)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProgress(user.id))
    }
  }, [dispatch, user?.id])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{totalTestsCompleted}</div>
            <div className="text-sm text-gray-600">Tests Completed</div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{overallAverageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{Math.round(totalTimeStudied / 60)}h</div>
            <div className="text-sm text-gray-600">Time Studied</div>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardContent className="p-6 text-center">
            <Flame className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">{studyStreak.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Subject Progress</CardTitle>
            <CardDescription>Your performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                  <Badge variant="outline">{subject.averageScore}% avg</Badge>
                </div>
                <Progress value={(subject.completedTests / subject.totalTests) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {subject.completedTests}/{subject.totalTests} tests
                  </span>
                  <span>Best: {subject.bestScore}%</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-500">Strong:</span>
                  {subject.strongTopics.slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-yellow-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">{achievement.category}</Badge>
                </div>
              ))}

              {achievements.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Complete your first test to unlock achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
