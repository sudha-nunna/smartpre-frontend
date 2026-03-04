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
import { SocialShare } from "./social-share"
import { Trophy, Star, Target, Flame, Share2 } from "lucide-react"

interface AchievementShareProps {
  achievement: {
    title: string
    description: string
    category: string
    icon?: string
  }
  score?: number
  testName?: string
  streak?: number
}

export function AchievementShare({ achievement, score, testName, streak }: AchievementShareProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getShareContent = () => {
    if (score && testName) {
      return {
        title: `I just scored ${score}% on ${testName}!`,
        description: `Check out my progress on 11 Plus DIY - the best platform for 11+ exam preparation.`,
        hashtags: ["11Plus", "Education", "StudySuccess", "ExamPrep"],
      }
    }

    if (streak) {
      return {
        title: `I'm on a ${streak}-day study streak!`,
        description: `Consistent practice is key to 11+ success. Join me on 11 Plus DIY!`,
        hashtags: ["StudyStreak", "11Plus", "Education", "Motivation"],
      }
    }

    return {
      title: `I just unlocked: ${achievement.title}!`,
      description: `${achievement.description} Join me on 11 Plus DIY for comprehensive 11+ exam preparation.`,
      hashtags: ["Achievement", "11Plus", "Education", "Success"],
    }
  }

  const shareContent = getShareContent()

  const getAchievementIcon = () => {
    if (achievement.icon) return achievement.icon

    switch (achievement.category) {
      case "score":
        return <Star className="h-8 w-8 text-yellow-500" />
      case "streak":
        return <Flame className="h-8 w-8 text-orange-500" />
      case "completion":
        return <Target className="h-8 w-8 text-green-500" />
      default:
        return <Trophy className="h-8 w-8 text-blue-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Share Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Your Achievement</DialogTitle>
          <DialogDescription>Let others know about your success!</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Achievement Preview */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">{getAchievementIcon()}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{shareContent.title}</h3>
              <p className="text-gray-600 mb-4">{shareContent.description}</p>
              <div className="flex justify-center gap-2 flex-wrap">
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
            <h4 className="font-medium text-gray-900">Share on social media:</h4>
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
