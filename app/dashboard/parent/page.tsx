"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Calculator, BookOpen, Brain, Target, Calendar } from "lucide-react";
import { getApiUrl } from "@/lib/api-config";

export default function ParentDashboardPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [childBoard, setChildBoard] = useState<any | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }
    try {
      const parsed = JSON.parse(storedUser) as { role?: string; childEmail?: string };
      const role = (parsed.role || "").toLowerCase();
      if (role !== "parent") {
        router.replace("/dashboard");
        return;
      }

      const token = localStorage.getItem("token");
      const childEmail = (parsed.childEmail || "").toLowerCase().trim();
      if (!childEmail) {
        setError("No child email is linked to this parent account yet.");
        setIsLoading(false);
        return;
      }

      (async () => {
        try {
          setIsLoading(true);
          setError(null);

          // 1) Resolve child user by email
          const childRes = await fetch(getApiUrl(`/api/users/by-email/${encodeURIComponent(childEmail)}`), {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          if (!childRes.ok) {
            const data = await childRes.json().catch(() => ({}));
            throw new Error(data?.msg || data?.message || "Could not find child account by email.");
          }
          const childUser = await childRes.json();
          const childId = childUser?._id || childUser?.id;
          if (!childId) {
            throw new Error("Child account is missing an id.");
          }

          // 2) Fetch child LearningBoard (creates default if missing)
          const boardRes = await fetch(getApiUrl(`/api/learning-boards/${encodeURIComponent(childId)}`));
          if (!boardRes.ok) {
            const data = await boardRes.json().catch(() => ({}));
            throw new Error(data?.message || "Failed to load child dashboard data.");
          }
          const boardData = await boardRes.json();
          setChildBoard(boardData);

          // 3) Fetch leaderboard
          const lbRes = await fetch(getApiUrl("/api/leaderboard"));
          if (lbRes.ok) {
            const lb = await lbRes.json();
            setLeaderboard(Array.isArray(lb) ? lb : []);
          } else {
            setLeaderboard([]);
          }
        } catch (e: any) {
          setError(e?.message || "Failed to load dashboard data.");
        } finally {
          setIsLoading(false);
        }
      })();
    } catch {
      router.replace("/auth/login");
    }
  }, [router]);

  const childName = childBoard?.name || "Your Child";

  const scoresBySubject = useMemo(() => {
    const map: Record<string, number> = {};
    const scores = childBoard?.scores || [];
    for (const s of scores) {
      if (s?.subject) map[String(s.subject)] = Number(s.score || 0);
    }
    return map;
  }, [childBoard]);

  const subjects = useMemo(
    () => [
      { label: "Mathematics", icon: Calculator, color: "bg-blue-500", score: scoresBySubject["Mathematics"] ?? 0 },
      { label: "English", icon: BookOpen, color: "bg-green-500", score: scoresBySubject["English"] ?? 0 },
      { label: "Verbal Reasoning", icon: Brain, color: "bg-purple-500", score: scoresBySubject["Verbal Reasoning"] ?? 0 },
      { label: "Non-Verbal Reasoning", icon: Target, color: "bg-orange-500", score: scoresBySubject["Non-Verbal Reasoning"] ?? 0 },
    ],
    [scoresBySubject],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Parent Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor {childName}&apos;s progress, upcoming sessions, and weekly insights.
            </p>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="p-4 text-red-700">{error}</CardContent>
          </Card>
        )}

        {isLoading ? (
          <Card className="border-blue-100 bg-white/70">
            <CardContent className="p-6">Loading dashboard...</CardContent>
          </Card>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Progress Overview
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Subject performance snapshot
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                {subjects.map((s) => {
                  const pct = Math.max(0, Math.min(100, Math.round(s.score)));
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-700" />
                        <span className="text-gray-700">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <Badge className={`${s.color} text-white`}>{pct}%</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription className="text-blue-100">
                Tutoring, mocks and workshops
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-blue-900">Math Tutoring</div>
                  <div className="text-sm text-blue-600">Tomorrow, 4:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-l-4 border-green-500">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-green-900">Mock Exam</div>
                  <div className="text-sm text-green-600">Friday, 10:00 AM</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl border-l-4 border-purple-500">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-purple-900">Logic Workshop</div>
                  <div className="text-sm text-purple-600">Saturday, 2:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <CardTitle>Weekly Insights</CardTitle>
              <CardDescription className="text-amber-100">
                Attendance and study time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">{childBoard?.streaks?.total ?? 0}</div>
                <div className="text-sm text-gray-600">Hours studied this week</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{childBoard?.attendance?.present ?? 0}</div>
                  <div className="text-xs text-green-700">Attendance</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{childBoard?.progress?.testsTaken ?? 0}</div>
                  <div className="text-xs text-blue-700">Tests completed</div>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                View detailed report
              </Button>
            </CardContent>
          </Card>
        </div>
        )}

        {!isLoading && leaderboard.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Monthly Leaderboard</h2>
            <Card className="bg-white shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((u: any) => (
                    <div key={u._id || u.userId} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {u.rank}
                      </div>
                      <img src={u.avatar || "/placeholder.svg"} alt={u.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{u.name}</div>
                      </div>
                      <div className="font-bold text-muted-foreground">{u.score?.toLocaleString?.() ?? u.score} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

