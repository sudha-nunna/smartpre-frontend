"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";
import { ProgressShare } from "@/components/social/progress-share";
import { ReferralShare } from "@/components/social/referral-share";
import { SocialShare } from "@/components/social/social-share";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchUserProgress } from "@/lib/features/userProgress/userProgressSlice";
import { Award, BookOpen, Target, TrendingUp, Users, Gift, Share2 } from "lucide-react";

export default function StudentDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { subjectProgress, totalTestsCompleted, totalTimeStudied, overallAverageScore, studyStreak } = useAppSelector(
    (state) => state.userProgress,
  );

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  // Fetch progress for the current user if we have an id
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    let userId: string | undefined = user?.id;
    if (!userId && storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as { _id?: string; id?: string };
        userId = parsed._id || parsed.id;
      } catch {
        // ignore
      }
    }

    if (userId) {
      dispatch(fetchUserProgress(userId));
    }
  }, [dispatch, user?.id]);

  const displayName = (() => {
    if (user?.firstName) return user.firstName;
    if (typeof window === "undefined") return "Student";
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as { firstName?: string };
        return parsed.firstName || "Student";
      } catch {
        return "Student";
      }
    }
    return "Student";
  })();

  const mockReferralData = {
    referralCode: "STUDY2024",
    referralUrl: "https://11plusdiy.com/signup",
  };

  const progressStats = {
    testsCompleted: totalTestsCompleted,
    averageScore: overallAverageScore,
    timeStudied: totalTimeStudied,
    streak: studyStreak.currentStreak,
  };

  const subjectData = subjectProgress.map((subject) => ({
    name: subject.subject,
    progress: (subject.completedTests / subject.totalTests) * 100,
    score: subject.averageScore,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">11+ SmartPrep</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">
                Practice Tests
              </Link>
              <span className="text-blue-600 font-medium">Student Dashboard</span>
              <Button asChild variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Link href="/profile">Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
              <p className="text-gray-600 mt-2">Track your progress and continue your 11+ journey</p>
            </div>
            <div className="flex items-center gap-4">
              <ProgressShare stats={progressStats} subjects={subjectData} />
              <SocialShare
                title="Check out my 11+ study progress on 11 Plus DIY!"
                description="Comprehensive 11+ exam preparation with practice tests, study materials, and progress tracking."
                hashtags={["11Plus", "Education", "StudyProgress"]}
                variant="button"
                showLabels={true}
              />
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="mb-8">
          <ProgressDashboard />
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild className="h-20 bg-blue-600 hover:bg-blue-700 flex-col gap-2">
                  <Link href="/practice">
                    <BookOpen className="h-6 w-6" />
                    <span>Take Practice Test</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-20 border-blue-200 text-blue-600 hover:bg-blue-50 flex-col gap-2 bg-transparent"
                >
                  <Link href="/resources">
                    <TrendingUp className="h-6 w-6" />
                    <span>Study Resources</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-20 border-green-200 text-green-600 hover:bg-green-50 flex-col gap-2 bg-transparent"
                >
                  <Link href="/progress">
                    <Award className="h-6 w-6" />
                    <span>View Progress</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-20 border-purple-200 text-purple-600 hover:bg-purple-50 flex-col gap-2 bg-transparent"
                >
                  <Link href="/community">
                    <Users className="h-6 w-6" />
                    <span>Join Community</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-yellow-600" />
                Refer & Earn
              </CardTitle>
              <CardDescription>Share with friends and get rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-yellow-600">FREE MONTH</div>
                <div className="text-sm text-gray-600">for each successful referral</div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full border-yellow-200 text-yellow-600 hover:bg-yellow-50 bg-transparent"
              >
                <Link href="#referral">
                  <Share2 className="h-4 w-4 mr-2" />
                  Start Referring
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Referral Section */}
        <div id="referral" className="mb-8">
          <ReferralShare referralCode={mockReferralData.referralCode} referralUrl={mockReferralData.referralUrl} />
        </div>

        {/* Recent Activity */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest study sessions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mathematics Test Completed</h4>
                    <p className="text-sm text-gray-600">Scored 85% • 2 hours ago</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">+5 points</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Achievement Unlocked</h4>
                    <p className="text-sm text-gray-600">5-day study streak • Yesterday</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Streak Master</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Study Session</h4>
                    <p className="text-sm text-gray-600">English comprehension • 3 days ago</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">45 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

