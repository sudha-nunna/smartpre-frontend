"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { SocialShare } from "./social-share"
import { TrendingUp, Target, Clock, Share2 } from "lucide-react"

interface ProgressShareProps {
  stats: {
    testsCompleted: number
    averageScore: number
    timeStudied: number
    streak: number
  }
  subjects?: Array<{
    name: string
    progress: number
    score: number
  }>
}

export function ProgressShare({ stats, subjects = [] }: ProgressShareProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareContent = {
    title: `My 11+ Study Progress: ${stats.testsCompleted} tests completed with ${stats.averageScore}% average!`,
    description: `I've been studying consistently and making great progress. Join me on 11 Plus DIY for comprehensive 11+ exam preparation!`,
    hashtags: ["11Plus", "StudyProgress", "Education", "ExamPrep", "Success"],
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Share Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Your Progress</DialogTitle>
          <DialogDescription>Show others how well you're doing!</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Preview */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">My 11+ Study Journey</h3>
                <p className="text-gray-600">Consistent practice leads to success!</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg">
                  <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{stats.testsCompleted}</div>
                  <div className="text-xs text-gray-600">Tests Completed</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{stats.averageScore}%</div>
                  <div className="text-xs text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{Math.round(stats.timeStudied / 60)}h</div>
                  <div className="text-xs text-gray-600">Time Studied</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-lg font-bold text-gray-900">{stats.streak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>

              {/* Subject Progress */}
              {subjects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">Subject Progress:</h4>
                  {subjects.slice(0, 3).map((subject) => (
                    <div key={subject.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{subject.name}</span>
                        <span className="text-gray-600">{subject.score}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center gap-2 flex-wrap mt-4">
                {shareContent.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Share Component */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Share your progress:</h4>
            <SocialShare
              title={shareContent.title}
              description={shareContent.description}
              hashtags={shareContent.hashtags}
              variant="inline"
              showLabels={true}
              size="md"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
