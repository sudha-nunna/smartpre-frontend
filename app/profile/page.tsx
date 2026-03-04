
"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getApiUrl } from "@/lib/api-config"
import {
  User,
  Settings,
  Trophy,
  Crown,
  LogOut,
  GraduationCap,
  Target,
  Calendar,
  BookOpen,
  TrendingUp,
  Star,
  Brain,
  Calculator,
} from "lucide-react"

type UserRole = "parent" | "child" | "teacher"

type StoredUser = {
  _id?: string
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  role?: "student" | "parent" | "teacher"
  childEmail?: string
}

type LearningBoard = {
  userId: string
  name: string
  avatar?: string
  role: "child" | "parent" | "teacher"
  attendance?: { present?: number; absent?: number }
  streaks?: { current?: number; longest?: number; total?: number }
  progress?: { overallScore?: number; testsTaken?: number; badges?: number }
  leaderboard?: { points?: number; rank?: number }
  quests?: { title?: string; status?: "completed" | "in-progress" | "pending" }[]
  scores?: { subject?: string; score?: number }[]
  funStats?: { problemsSolved?: number; mathSkillUp?: number }
  powerUps?: { streakDays?: number; leaderboardRank?: number; badgesWon?: number }
}

type LeaderboardEntry = {
  _id?: string
  userId: string
  name: string
  avatar?: string
  score: number
  rank: number
}

type RecentActivity = {
  _id: string
  test: string
  date: string
  score: number
  createdAt?: string
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] || ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return (first + last).toUpperCase() || "U"
}

export default function ProfilePage() {
  const [userRole, setUserRole] = useState<UserRole>("parent")
  const [me, setMe] = useState<StoredUser | null>(null)
  const [myBoard, setMyBoard] = useState<LearningBoard | null>(null)
  const [childBoard, setChildBoard] = useState<LearningBoard | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialise role from logged-in user (if available)
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (!storedUser || !token) return
    try {
      const parsed = JSON.parse(storedUser) as StoredUser
      setMe(parsed)

      const role = (parsed.role || "").toLowerCase()
      if (role === "parent") setUserRole("parent")
      else if (role === "teacher") setUserRole("teacher")
      else setUserRole("child")
    } catch {
      // ignore parsing errors
    }
  }, [])

  // Fetch board + leaderboard + recent activity from DB
  useEffect(() => {
    if (typeof window === "undefined") return
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (!storedUser || !token) return

    ;(async () => {
      try {
        setIsLoading(true)
        setError(null)

        const parsed = JSON.parse(storedUser) as StoredUser
        const myId = parsed._id || parsed.id
        if (!myId) {
          setError("Missing user id. Please log in again.")
          return
        }

        // My LearningBoard (creates a default if not present)
        const myBoardRes = await fetch(getApiUrl(`/api/learning-boards/${encodeURIComponent(myId)}`))
        const myBoardData = await myBoardRes.json().catch(() => null)
        if (!myBoardRes.ok) {
          setError(myBoardData?.message || "Failed to load dashboard data.")
          return
        }
        setMyBoard(myBoardData)

        // If parent: also load child board using childEmail
        const role = (parsed.role || "").toLowerCase()
        if (role === "parent") {
          const childEmail = (parsed.childEmail || "").toLowerCase().trim()
          if (childEmail) {
            const childRes = await fetch(getApiUrl(`/api/users/by-email/${encodeURIComponent(childEmail)}`), {
              headers: { Authorization: `Bearer ${token}` },
            })
            const childData = await childRes.json().catch(() => null)
            if (childRes.ok) {
              const childId = childData?._id || childData?.id
              if (childId) {
                const childBoardRes = await fetch(getApiUrl(`/api/learning-boards/${encodeURIComponent(childId)}`))
                const childBoardData = await childBoardRes.json().catch(() => null)
                if (childBoardRes.ok) {
                  setChildBoard(childBoardData)
                }
              }
            }
          }
        }

        // Leaderboard
        const lbRes = await fetch(getApiUrl("/api/leaderboard"))
        const lb = await lbRes.json().catch(() => [])
        setLeaderboard(Array.isArray(lb) ? lb : [])

        // Recent activity
        const actRes = await fetch(getApiUrl("/api/activities"))
        const act = await actRes.json().catch(() => [])
        setActivities(Array.isArray(act) ? act : [])
      } catch (e: any) {
        setError(e?.message || "Failed to load dashboard data.")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const meId = useMemo(() => (me?._id || me?.id || ""), [me?._id, me?.id])
  const meName = useMemo(() => {
    const name = `${me?.firstName || ""} ${me?.lastName || ""}`.trim()
    return name || "User"
  }, [me?.firstName, me?.lastName])

  const availableTabs: UserRole[] = useMemo(() => {
    const role = (me?.role || "").toLowerCase()
    if (role === "parent") return ["parent", "child"]
    if (role === "teacher") return ["teacher"]
    return ["child"]
  }, [me?.role])

  const boardForView: LearningBoard | null = useMemo(() => {
    if (!me) return myBoard
    const role = (me.role || "").toLowerCase()

    if (userRole === "teacher") return myBoard
    if (userRole === "parent") return childBoard || myBoard

    // child tab
    if (role === "parent") return childBoard || myBoard
    return myBoard
  }, [childBoard, me, myBoard, userRole])

  const overallScore = boardForView?.progress?.overallScore ?? 0
  const testsTaken = boardForView?.progress?.testsTaken ?? 0
  const badgesCount = boardForView?.progress?.badges ?? 0

  const presentDays = boardForView?.attendance?.present ?? 0
  const absentDays = boardForView?.attendance?.absent ?? 0

  const streakCurrent = boardForView?.streaks?.current ?? 0
  const streakLongest = boardForView?.streaks?.longest ?? 0
  const streakTotal = boardForView?.streaks?.total ?? 0

  const points = boardForView?.leaderboard?.points ?? 0
  const rankFromLeaderboard = leaderboard.find((e) => e.userId === (boardForView?.userId || meId))?.rank
  const rank = boardForView?.leaderboard?.rank ?? rankFromLeaderboard ?? 0

  const badgeTemplates = useMemo(
    () => [
      { name: "Math Master", icon: Calculator, color: "bg-blue-500" },
      { name: "Reading Champion", icon: BookOpen, color: "bg-green-500" },
      { name: "Logic Expert", icon: Brain, color: "bg-purple-500" },
      { name: "Perfect Score", icon: Target, color: "bg-pink-500" },
      { name: "Study Streak", icon: Trophy, color: "bg-orange-500" },
      { name: "Top Performer", icon: Crown, color: "bg-red-500" },
    ],
    [],
  )

  const badges = useMemo(() => {
    const earnedCount = clamp(badgesCount, 0, badgeTemplates.length)
    return badgeTemplates.map((b, idx) => ({ ...b, earned: idx < earnedCount }))
  }, [badgeTemplates, badgesCount])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Card className="bg-red-50 border-red-200 shadow-sm rounded-2xl mb-6">
            <CardContent className="p-4 text-red-700">{error}</CardContent>
          </Card>
        )}

        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-white shadow-xl rounded-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                {meName}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {(me?.role || "").toLowerCase() === "parent"
                  ? `Parent Account${childBoard?.name ? ` - ${childBoard.name}'s Progress` : ""}`
                  : (me?.role || "").toLowerCase() === "teacher"
                    ? "Teacher Account"
                    : "Student Account"}
              </CardDescription>

              {/* Role Selector */}
              <div className="flex justify-center gap-2 mt-4">
                {availableTabs.includes("parent") && (
                  <Button
                    variant={userRole === "parent" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setUserRole("parent")}
                    className="rounded-full"
                  >
                    Parent
                  </Button>
                )}
                {availableTabs.includes("child") && (
                  <Button
                    variant={userRole === "child" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setUserRole("child")}
                    className="rounded-full"
                  >
                    Child
                  </Button>
                )}
                {availableTabs.includes("teacher") && (
                  <Button
                    variant={userRole === "teacher" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setUserRole("teacher")}
                    className="rounded-full"
                  >
                    Teacher
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Settings & Theme */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="h-5 w-5" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-blue-500">{presentDays}</div>
                  <div className="text-muted-foreground">Days</div>
                </div>
                <div>
                  <div className="font-semibold text-red-500">{absentDays}</div>
                  <div className="text-muted-foreground">Days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Streaks */}
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="h-5 w-5 text-orange-500" />
                Study Streaks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">{streakCurrent}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-semibold text-blue-500">{streakLongest}</div>
                  <div className="text-muted-foreground">Longest</div>
                </div>
                <div>
                  <div className="font-semibold text-green-500">{streakTotal}</div>
                  <div className="text-muted-foreground">Total Days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{overallScore}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-semibold text-blue-500">{testsTaken}</div>
                  <div className="text-muted-foreground">Tests Taken</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-500">{badgesCount}</div>
                  <div className="text-muted-foreground">Badges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Crown className="h-5 w-5 text-red-500" />
                Your Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">{rank ? `#${rank}` : "—"}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
                <div className="text-lg font-semibold text-blue-500 mt-2">
                  {Number(points).toLocaleString()} pts
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-based Dashboard Content */}
        {userRole === "parent" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <h2
                className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent`}
              >
                Parent Dashboard
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Child Progress Card */}
              <Card
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl rounded-2x1 overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-5" />
                    Progress Section
                  </CardTitle>
                  <CardDescription className="text-emerald-100">Subject Performance Overview</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    {[
                      { subject: "Mathematics", icon: Calculator, color: "bg-blue-500" },
                      { subject: "English", icon: BookOpen, color: "bg-green-500" },
                      { subject: "Verbal Reasoning", icon: Brain, color: "bg-purple-500" },
                      { subject: "Non-Verbal Reasoning", icon: Target, color: "bg-orange-500" },
                    ].map((s) => {
                      const scoreRaw =
                        boardForView?.scores?.find((x) => x.subject === s.subject)?.score ?? 0
                      const score = clamp(Number(scoreRaw) || 0, 0, 100)
                      const Icon = s.icon
                      return (
                        <div key={s.subject} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-gray-700" />
                            <span className="text-gray-700">{s.subject}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full"
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <Badge className={`${s.color} text-white`}>{score}%</Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-8 w-5" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription className="text-blue-100">Scheduled Activities</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border-l-4 border-blue-500">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-900">Math Tutoring</div>
                        <div className="text-sm text-blue-600">Tomorrow, 4:00 PM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-l-4 border-green-500">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-900">Mock Exam</div>
                        <div className="text-sm text-green-600">Friday, 10:00 AM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl border-l-4 border-purple-500">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-purple-900">Logic Workshop</div>
                        <div className="text-sm text-purple-600">Saturday, 2:00 PM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Parent Insights */}
              <Card
                className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-8 w-5" />
                    Weekly Insights
                  </CardTitle>
                  <CardDescription className="text-amber-100">Performance Analytics</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {boardForView?.funStats?.problemsSolved ?? 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      Problems Solved This Week
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">
                        {boardForView?.attendance?.present ?? 0}
                      </div>
                      <div className="text-xs text-green-700">Present Days</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">
                        {boardForView?.progress?.testsTaken ?? 0}
                      </div>
                      <div className="text-xs text-blue-700">Tests Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {userRole === "child" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h2
                className={`text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent`}
              >
                My Learning Adventure! 
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Today's Quests */}
              <Card
                className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-10 w-5" />
                    Today's Quests ⚡
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {(boardForView?.quests || []).slice(0, 3).map((q, idx) => {
                    const status = q.status || "pending"
                    const isDone = status === "completed"
                    const isActive = status === "in-progress"

                    const bg = isDone
                      ? "from-green-100 to-green-50 border-green-200"
                      : isActive
                        ? "from-blue-100 to-blue-50 border-blue-200"
                        : "from-purple-100 to-purple-50 border-purple-200"

                    const dot = isDone
                      ? "bg-green-500"
                      : isActive
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-300"

                    return (
                      <div
                        key={`${q.title || "quest"}-${idx}`}
                        className={`flex items-center gap-3 p-3 bg-gradient-to-r ${bg} rounded-xl border`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${dot}`}>
                          {isDone && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className="text-gray-800 font-medium">
                          {q.title || "New Quest"}
                        </span>
                      </div>
                    )
                  })}

                  {(boardForView?.quests || []).length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No quests yet. Start a practice test to generate today’s tasks.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Super Scores */}
              <Card
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-10 w-5" />
                    Super Scores! 
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {(boardForView?.scores || []).slice(0, 3).map((s, idx) => {
                    const score = clamp(Number(s.score || 0), 0, 100)
                    const palette =
                      idx % 3 === 0
                        ? { from: "from-green-100", to: "to-green-50", badge: "from-green-500 to-green-600", text: "text-green-800" }
                        : idx % 3 === 1
                          ? { from: "from-blue-100", to: "to-blue-50", badge: "from-blue-500 to-blue-600", text: "text-blue-800" }
                          : { from: "from-purple-100", to: "to-purple-50", badge: "from-purple-500 to-purple-600", text: "text-purple-800" }

                    return (
                      <div
                        key={`${s.subject || "Subject"}-${idx}`}
                        className={`flex justify-between items-center p-3 bg-gradient-to-r ${palette.from} ${palette.to} rounded-xl`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${palette.text}`}>{s.subject || "Subject"}</span>
                        </div>
                        <Badge className={`bg-gradient-to-r ${palette.badge} text-white text-lg px-3 py-1`}>
                          {score}%
                        </Badge>
                      </div>
                    )
                  })}

                  {(boardForView?.scores || []).length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No scores yet. Complete a test to see results here.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fun Stats */}
              <Card
                className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-10 w-5" />
                    Amazing Facts! 
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <div className="text-4xl mb-2"></div>
                    <div className="text-2xl font-bold text-orange-600">
                      {boardForView?.funStats?.problemsSolved ?? 0}
                    </div>
                    <div className="text-sm text-orange-700">Problems Solved!</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                    <div className="text-4xl mb-2"></div>
                    <div className="text-2xl font-bold text-green-600">
                      +{boardForView?.funStats?.mathSkillUp ?? 0}%
                    </div>
                    <div className="text-sm text-green-700">Math Skills Up!</div>
                  </div>
                </CardContent>
              </Card>

              {/* Power-ups */}
              <Card
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-10 w-5" />
                    Power-ups! 
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="text-center p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                    <div className="text-3xl mb-1"></div>
                    <div className="text-xl font-bold text-purple-600">
                      {boardForView?.powerUps?.streakDays ?? streakCurrent}
                    </div>
                    <div className="text-xs text-purple-700">Day Streak!</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                    <div className="text-3xl mb-1"></div>
                    <div className="text-xl font-bold text-blue-600">
                      {rank ? `#${rank}` : "—"}
                    </div>
                    <div className="text-xs text-blue-700">Leaderboard</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                    <div className="text-3xl mb-1">🏆</div>
                    <div className="text-xl font-bold text-green-600">{badgesCount}</div>
                    <div className="text-xs text-green-700">Badges Won!</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {userRole === "teacher" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h2
                className={`text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent`}
              >
                Teacher Dashboard
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Student Progress */}
              <Card
                className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    My Students
                  </CardTitle>
                  <CardDescription className="text-indigo-100">Class Performance Overview</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    {leaderboard.slice(0, 3).map((p, idx) => {
                      const palette =
                        idx === 0
                          ? { from: "from-green-100", to: "to-green-50", border: "border-green-500", badge: "bg-green-500", text: "text-green-800" }
                          : idx === 1
                            ? { from: "from-blue-100", to: "to-blue-50", border: "border-blue-500", badge: "bg-blue-500", text: "text-blue-800" }
                            : { from: "from-yellow-100", to: "to-yellow-50", border: "border-yellow-500", badge: "bg-yellow-500", text: "text-yellow-800" }

                      return (
                        <div
                          key={p._id || p.userId}
                          className={`flex justify-between items-center p-3 bg-gradient-to-r ${palette.from} ${palette.to} rounded-xl border-l-4 ${palette.border}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${palette.badge} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-xs font-bold">{getInitials(p.name)}</span>
                            </div>
                            <span className={`font-medium ${palette.text}`}>{p.name}</span>
                          </div>
                          <Badge className={`${palette.badge} text-white`}>{p.score} pts</Badge>
                        </div>
                      )
                    })}

                    {leaderboard.length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No students on leaderboard yet.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Class Analytics */}
              <Card
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Class Performance
                  </CardTitle>
                  <CardDescription className="text-emerald-100">Weekly Analytics</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                            style={{ width: `${clamp(overallScore, 0, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-green-600">{overallScore}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Avg score</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            style={{ width: `${clamp(testsTaken * 5, 0, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-blue-600">{testsTaken}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Tests taken</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                            style={{ width: `${clamp(badgesCount * 10, 0, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-purple-600">{badgesCount}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Badges</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-xl rounded-2xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-purple-100">Class Management Tools</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                    <Target className="h-4 w-4 mr-2" />
                    Schedule Test
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card
              className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl rounded-2xl overflow-hidden mt-6"
            >
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-orange-100">Latest Class Updates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {activities.slice(0, 3).map((a, idx) => {
                    const palette =
                      idx % 3 === 0
                        ? { from: "from-green-100", to: "to-green-50", dot: "bg-green-500", text: "text-green-800", time: "text-green-600" }
                        : idx % 3 === 1
                          ? { from: "from-blue-100", to: "to-blue-50", dot: "bg-blue-500", text: "text-blue-800", time: "text-blue-600" }
                          : { from: "from-purple-100", to: "to-purple-50", dot: "bg-purple-500", text: "text-purple-800", time: "text-purple-600" }

                    return (
                      <div
                        key={a._id}
                        className={`flex items-center gap-3 p-3 bg-gradient-to-r ${palette.from} ${palette.to} rounded-xl`}
                      >
                        <div className={`w-2 h-2 ${palette.dot} rounded-full`}></div>
                        <span className={palette.text}>
                          {a.test} — scored {a.score}%
                        </span>
                        <span className={`text-xs ${palette.time} ml-auto`}>{a.date}</span>
                      </div>
                    )
                  })}

                  {activities.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No recent activity yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Badges Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Achievement Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={`bg-white shadow-lg rounded-2xl text-center p-4 ${badge.earned ? "opacity-100" : "opacity-50"}`}
              >
                <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <badge.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-foreground">{badge.name}</div>
                {badge.earned && <Star className="h-4 w-4 text-yellow-500 mx-auto mt-1" />}
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Monthly Leaderboard
          </h3>
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-xl ${
                      user.userId === (boardForView?.userId || meId)
                        ? "bg-blue-50 border-2 border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1
                          ? "bg-gold-500 text-white"
                          : user.rank === 2
                            ? "bg-gray-400 text-white"
                            : user.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-blue-500 text-white"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{user.name}</div>
                    </div>
                    <div className="font-bold text-muted-foreground">
                      {user.score.toLocaleString()} pts
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}





