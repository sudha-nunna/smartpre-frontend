"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { SocialShare } from "./social-share"
import { Gift, Users, Copy, CheckCircle, Star } from "lucide-react"

interface ReferralShareProps {
  referralCode: string
  referralUrl: string
  rewards?: {
    referrer: string
    referee: string
  }
}

export function ReferralShare({
  referralCode,
  referralUrl,
  rewards = { referrer: "1 month free", referee: "Free trial extended" },
}: ReferralShareProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareContent = {
    title: "Join me on 11 Plus DIY - The best 11+ exam preparation platform!",
    description: `Use my referral code ${referralCode} to get started with extended free trial. Comprehensive study materials, practice tests, and expert guidance to help your child succeed in their 11+ exams.`,
    hashtags: ["11Plus", "Education", "ExamPrep", "StudyTogether"],
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600" />
            Refer Friends & Earn Rewards
          </CardTitle>
          <CardDescription>
            Share 11 Plus DIY with friends and family. You both get rewards when they sign up!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rewards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">You Get</h4>
              <p className="text-blue-600 font-medium">{rewards.referrer}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">They Get</h4>
              <p className="text-green-600 font-medium">{rewards.referee}</p>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <Label htmlFor="referral-code">Your Referral Code</Label>
            <div className="flex gap-2">
              <Input id="referral-code" value={referralCode} readOnly className="flex-1 font-mono" />
              <Button
                variant="outline"
                onClick={handleCopyCode}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Referral URL */}
          <div className="space-y-2">
            <Label htmlFor="referral-url">Referral Link</Label>
            <div className="flex gap-2">
              <Input id="referral-url" value={referralUrl} readOnly className="flex-1 text-sm" />
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(referralUrl)}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Share */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Share with friends:</h4>
            <SocialShare
              url={referralUrl}
              title={shareContent.title}
              description={shareContent.description}
              hashtags={shareContent.hashtags}
              variant="inline"
              showLabels={true}
              size="md"
            />
          </div>

          {/* Quick Share Messages */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Quick share messages:</h4>
            <div className="space-y-2">
              <Card className="p-3 bg-gray-50">
                <p className="text-sm text-gray-700">
                  "Hey! I've been using 11 Plus DIY for my child's exam prep and it's amazing. Use code{" "}
                  <Badge variant="secondary">{referralCode}</Badge> to get an extended free trial!"
                </p>
              </Card>
              <Card className="p-3 bg-gray-50">
                <p className="text-sm text-gray-700">
                  "Found the perfect 11+ study platform! Comprehensive tests, great explanations, and real results.
                  Check it out with my referral code: <Badge variant="secondary">{referralCode}</Badge>"
                </p>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
