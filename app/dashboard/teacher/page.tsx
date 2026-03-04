"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Settings, Calendar, BookOpen, Target } from "lucide-react";

export default function TeacherDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }
    try {
      const parsed = JSON.parse(storedUser) as { role?: string };
      const role = (parsed.role || "").toLowerCase();
      if (role !== "teacher") {
        router.replace("/dashboard");
      }
    } catch {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your classes, assignments, and see how your students are progressing.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                My Students
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Class performance overview
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-l-4 border-green-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ET</span>
                  </div>
                  <span className="font-medium text-green-800">Emma Thompson</span>
                </div>
                <Badge className="bg-green-500 text-white">Excellent</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">OW</span>
                  </div>
                  <span className="font-medium text-blue-800">Oliver Wilson</span>
                </div>
                <Badge className="bg-blue-500 text-white">Good</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl border-l-4 border-yellow-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SC</span>
                  </div>
                  <span className="font-medium text-yellow-800">Sophia Chen</span>
                </div>
                <Badge className="bg-yellow-500 text-white">Needs Help</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Class Performance
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Weekly analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[89%] h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                  </div>
                  <span className="font-bold text-green-600">89%</span>
                </div>
                <span className="text-xs text-muted-foreground">Average score</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  </div>
                  <span className="font-bold text-blue-600">94%</span>
                </div>
                <span className="text-xs text-muted-foreground">Homework completion</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                  </div>
                  <span className="font-bold text-purple-600">+12%</span>
                </div>
                <span className="text-xs text-muted-foreground">Improvement this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-purple-100">
                Class management tools
              </CardDescription>
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

        <Card className="mt-8 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-orange-100">
              Latest class updates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-green-800">
                Emma Thompson completed Math Assessment with 95%
              </span>
              <span className="text-xs text-green-600 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-blue-800">
                New assignment submitted by Oliver Wilson
              </span>
              <span className="text-xs text-blue-600 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-purple-800">
                Sophia Chen requested help with Verbal Reasoning
              </span>
              <span className="text-xs text-purple-600 ml-auto">6 hours ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

