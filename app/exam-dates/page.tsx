"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, BookOpen, Bell } from "lucide-react"

export default function ExamDatesPage() {
  const [selectedYear, setSelectedYear] = useState("2025")

  const examDates = [
    {
      school: "Henrietta Barnett School",
      type: "Grammar",
      registrationDeadline: "15 July 2024",
      examDate: "14 September 2024",
      resultsDate: "31 October 2024",
      location: "Barnet",
      subjects: ["Mathematics", "English", "VR", "NVR"],
      status: "registration-open",
      fee: "Free",
      notes: "Online registration required. Practice papers available on school website.",
    },
    {
      school: "Queen Elizabeth's School",
      type: "Grammar",
      registrationDeadline: "15 July 2024",
      examDate: "14 September 2024",
      resultsDate: "31 October 2024",
      location: "Barnet",
      subjects: ["Mathematics", "English", "VR", "NVR"],
      status: "registration-open",
      fee: "Free",
      notes: "Same consortium as Henrietta Barnett. Single application covers both schools.",
    },
    {
      school: "Wilson's School",
      type: "Grammar",
      registrationDeadline: "31 August 2024",
      examDate: "21 September 2024",
      resultsDate: "1 November 2024",
      location: "Sutton",
      subjects: ["Mathematics", "English", "VR", "NVR"],
      status: "registration-open",
      fee: "Free",
      notes: "Separate registration required. Additional interview for borderline candidates.",
    },
    {
      school: "St. Paul's Girls' School",
      type: "Independent",
      registrationDeadline: "1 November 2024",
      examDate: "25 January 2025",
      resultsDate: "15 March 2025",
      location: "Hammersmith",
      subjects: ["Mathematics", "English", "Science", "Reasoning"],
      status: "upcoming",
      fee: "£150",
      notes: "Two-stage process: written exam followed by interview for shortlisted candidates.",
    },
    {
      school: "King's College School",
      type: "Independent",
      registrationDeadline: "15 October 2024",
      examDate: "18 January 2025",
      resultsDate: "10 March 2025",
      location: "Wimbledon",
      subjects: ["Mathematics", "English", "Science", "Latin"],
      status: "upcoming",
      fee: "£200",
      notes: "Scholarship exams held separately in November. Interview required for all candidates.",
    },
    {
      school: "Latymer Upper School",
      type: "Independent",
      registrationDeadline: "30 September 2024",
      examDate: "11 January 2025",
      resultsDate: "5 March 2025",
      location: "Hammersmith",
      subjects: ["Mathematics", "English", "Reasoning"],
      status: "upcoming",
      fee: "£175",
      notes: "Online reasoning test followed by written papers. Interview for shortlisted candidates.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registration-open":
        return "bg-green-100 text-green-700"
      case "upcoming":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "registration-open":
        return <CheckCircle className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "registration-open":
        return "Registration Open"
      case "upcoming":
        return "Registration Closed"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 rounded-full px-4 py-2">📅 Exam Calendar 2024-2025</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              London 11+
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Exam Dates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete schedule of entrance exam dates, registration deadlines, and key information for London's top
              schools.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <p className="text-amber-800">
              <strong>Important:</strong> Registration deadlines are strict. Late applications are typically not
              accepted. Set reminders and register early to secure your child's exam place.
            </p>
          </div>
        </div>
      </div>

      {/* Year Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center gap-2">
          <Button
            variant={selectedYear === "2024" ? "default" : "outline"}
            onClick={() => setSelectedYear("2024")}
            className="rounded-full"
          >
            2024 Exams
          </Button>
          <Button
            variant={selectedYear === "2025" ? "default" : "outline"}
            onClick={() => setSelectedYear("2025")}
            className="rounded-full"
          >
            2025 Exams
          </Button>
        </div>
      </div>

      {/* Exam Dates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6">
          {examDates.map((exam, index) => (
            <Card
              key={index}
              className="border-2 border-border hover:border-blue-500 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground mb-2">{exam.school}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={exam.type === "Grammar" ? "default" : "secondary"} className="rounded-full">
                        {exam.type}
                      </Badge>
                      <Badge className={`rounded-full ${getStatusColor(exam.status)}`}>
                        {getStatusIcon(exam.status)}
                        <span className="ml-1">{getStatusText(exam.status)}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{exam.fee}</div>
                    <div className="text-sm text-gray-600">Exam Fee</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700">Key Dates</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-red-500" />
                        <div>
                          <div className="text-sm font-medium">Registration Deadline</div>
                          <div className="text-sm text-gray-600">{exam.registrationDeadline}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">Exam Date</div>
                          <div className="text-sm text-gray-600">{exam.examDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="text-sm font-medium">Results Date</div>
                          <div className="text-sm text-gray-600">{exam.resultsDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700">Exam Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{exam.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">{exam.subjects.length} subjects</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Subjects:</div>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700">Additional Notes</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{exam.notes}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Preparation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
