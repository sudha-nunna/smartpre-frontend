"use client";

import Link from "next/link";
import { Award, Users, GraduationCap, Briefcase } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupRoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Award className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">11+ SmartPrep</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-600">
            Choose your account type to get started with tailored features.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-xl border-blue-100 hover:shadow-2xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-blue-600" />
              </div>
              <CardTitle>Student</CardTitle>
              <CardDescription>
                Access lessons, quizzes, and full exam practice tailored to your targets.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="rounded-full px-6">
                <Link href="/auth/signup/student">Sign up as Student</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-blue-100 hover:shadow-2xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center">
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
              <CardTitle>Parent</CardTitle>
              <CardDescription>
                Monitor your child&apos;s progress, schedule mocks, and manage subscriptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="rounded-full px-6">
                <Link href="/auth/signup/parent">Sign up as Parent</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-blue-100 hover:shadow-2xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-emerald-600" />
              </div>
              <CardTitle>Teacher / Tutor</CardTitle>
              <CardDescription>
                Create assignments, run classes, and track group performance in real time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="rounded-full px-6">
                <Link href="/auth/signup/teacher">Sign up as Teacher</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

