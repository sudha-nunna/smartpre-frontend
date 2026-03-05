"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Users, Calendar, Award, TrendingUp, ExternalLink, BookOpen, Search } from "lucide-react"

type School = {
  _id: string
  name: string
  city: string
  state: string
  board: string
  address: string
  website: string
  logoUrl: string
  phone: string
  rating?: number
  students: number
  examDate: string
  subjects: string[]
  description: string
  successRate: number
  fees: string
  region: string
  examBoard?: string
}

type ApiResponse = {
  schools: School[]
  total: number
  page: number
  totalPages: number
}

export default function SchoolsDirectoryPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBoard, setSelectedBoard] = useState("all")
  const [selectedArea, setSelectedArea] = useState("all")

  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // Fetch schools page by page with filters
  const fetchSchools = async (pageNum: number, reset = false) => {
    if (loading) return
    setLoading(true)
    try {
      const query = new URLSearchParams({
        page: pageNum.toString(),
        limit: limit.toString(),
        board: selectedBoard !== "all" ? selectedBoard : "",
        region: selectedArea !== "all" ? selectedArea : "",
        search: searchTerm || "",
      }).toString()

      const res = await fetch(` https://smartprep-backend-6.onrender.com/api/schools?${query}`)
      const data: ApiResponse = await res.json()

      if (reset) {
        setSchools(data.schools)
      } else {
        if (pageNum === 1) {
          setSchools(data.schools)
        } else {
          setSchools((prev) => [...prev, ...data.schools])
        }
      }

      setPage(data.page)
      setHasMore(data.page < data.totalPages)
    } catch (error) {
      console.error("Error fetching schools:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load first page initially
  useEffect(() => {
    fetchSchools(1, true)
  }, [])

  // Refetch when filters change
  useEffect(() => {
    fetchSchools(1, true)
  }, [searchTerm, selectedBoard, selectedArea])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero */}
      <div className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Badge className="mb-4 bg-white text-blue-700 rounded-full px-4 py-2">
            London Schools Directory
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect
            <span className="text-orange-500"> London School</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive guide to London's top grammar schools and independent schools with
            entrance exam requirements and success rates.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search your schools here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-300 w-full"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
            >
              <option value="all">All Types</option>
              <option value="Grammar">Grammar</option>
              <option value="Independent">Independent</option>
            </select>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
            >
              <option value="all">All Areas</option>
              <option value="West Midlands">West Midlands</option>
              <option value="London">London</option>
              <option value="East Midlands">East Midlands</option>
              <option value="Yorkshire">Yorkshire</option>
              <option value="South East">South East</option>
              <option value="South West">South West</option>
              <option value="East of England">East of England</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {schools.map((school, index) => (
            <Card
              key={`${school._id}-${index}`}
              className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 rounded-xl bg-white"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{school.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={school.board.toLowerCase() === "grammar" ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {school.board}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{school.region}</span>
                        <span className="text-sm text-gray-600">({school.city})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(Math.floor(school.rating || 0))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({(school.rating || 0).toFixed(1)}/5)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{school.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                  {school.description}
                </CardDescription>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{school.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">{school.examDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">{school.fees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{school.successRate}% pass rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{school.examBoard}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Entrance Exam Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.subjects?.map((subject, idx) => (
                      <Badge key={`${subject}-${idx}`} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full"
                    onClick={() => window.open(school.website, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Exam Prep
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="text-center mt-8">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : hasMore ? (
            <Button
              onClick={() => fetchSchools(page + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              View More Schools
            </Button>
          ) : (
            <p className="text-gray-500">No more schools to load</p>
          )}
        </div>

        {schools.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No schools found matching your criteria.</div>
            <Button
              variant="outline"
              className="mt-4 bg-transparent hover:bg-gray-100 rounded-full"
              onClick={() => {
                setSearchTerm("")
                setSelectedBoard("all")
                setSelectedArea("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
