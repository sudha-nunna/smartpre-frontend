"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, MapPin, School, Users, BookOpen, Target, Filter, Search, TrendingUp } from "lucide-react"
import RegionSchoolsPage from "../areas/[regionId]/page";

type Region = {
  _id: string;
  region: string;
  county: string;
  schools: string;
  examBoard: string;
  color: string;
};


export default function RegionProfilePage() {
  const [grammarSchoolsData, setGrammarSchoolsData] = useState<Region[]>([])
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedExamBoard, setSelectedExamBoard] = useState("all")
  const [activeTab, setActiveTab] = useState("schools")


  
  const router = useRouter()

  // Fetch schools from backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(" https://smartprep-backend-4.onrender.com/api/regions") 
        const data = await res.json()
        setGrammarSchoolsData(data)
      } catch (error) {
        console.error("Error fetching schools:", error)
      }
    }

    fetchSchools()
  }, [])

  // Filtered data based on region and exam board
 const filteredData = grammarSchoolsData?.filter((item) => {
  const regionMatch =
    selectedRegion === "all" || item.region === selectedRegion;
  const examBoardMatch =
    selectedExamBoard === "all" || item.examBoard?.includes(selectedExamBoard);
  return regionMatch && examBoardMatch;
}) || [];


  // Get unique regions and exam boards for filter dropdowns
  const regions = [...new Set(grammarSchoolsData.map((item) => item.region))]
  const examBoards = [...new Set(grammarSchoolsData.map((item) => item.examBoard.split(" ")[0]))]

  // Calculate total schools
  const totalSchools = filteredData.reduce((sum, item) => {
  const schoolCount = String(item.schools)
    .replace("+", "")
    .replace("(partially selective)", "");
  return sum + (Number.parseInt(schoolCount) || 0);
}, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/15 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/25 rounded-full animate-pulse-soft"></div>

        {/* Character illustrations */}
        <div className="absolute top-8 left-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center animate-wiggle">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Navigation breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 mb-8">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-white font-medium">Region Profile</span>
          </div>

          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Region Profile</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore grammar schools across different regions and find the perfect fit for your child's education
            </p>
          </div>
        </div>
      </div>

      {/* UK Education Boards Section */}
      <div className="bg-gradient-to-r from-red-400 to-pink-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* GL Assessment */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="text-center">
                  <div className="text-xs font-bold text-blue-600">GL</div>
                  <div className="text-xs text-gray-600">ASSESS</div>
                </div>
              </div>
              <span className="text-white font-semibold mt-2 text-sm">GL</span>
            </div>

            {/* CEM */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="text-center">
                  <div className="text-xs font-bold text-purple-600">CEM</div>
                  <div className="text-xs text-gray-600">DURHAM</div>
                </div>
              </div>
              <span className="text-white font-semibold mt-2 text-sm">CEM</span>
            </div>

            {/* SET */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="text-center">
                  <div className="text-xs font-bold text-green-600">SET</div>
                  <div className="text-xs text-gray-600">LONDON</div>
                </div>
              </div>
              <span className="text-white font-semibold mt-2 text-sm">SET</span>
            </div>

            {/* CSSE */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="text-center">
                  <div className="text-xs font-bold text-orange-600">CSSE</div>
                  <div className="text-xs text-gray-600">ESSEX</div>
                </div>
              </div>
              <span className="text-white font-semibold mt-2 text-sm">CSSE</span>
            </div>

            {/* ISEB */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <div className="text-center">
                  <div className="text-xs font-bold text-indigo-600">ISEB</div>
                  <div className="text-xs text-gray-600">INDEP</div>
                </div>
              </div>
              <span className="text-white font-semibold mt-2 text-sm">ISEB</span>
            </div>

           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveTab("schools")}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === "schools"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <School className="mr-2 h-5 w-5" />
            SCHOOL AND FACILITIES
          </Button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
  {/* Title */}
  <div className="text-center mb-8">
    <h3 className="text-xl font-semibold text-gray-800">
      Select Area
    </h3>
    <p className="text-xl font-semibold text-gray-800">
      You can select any Region, County or Exam Board from here
    </p>
  </div>

  {/* Dropdowns */}
  <div className="grid md:grid-cols-3 gap-6">
    {/* Academic Year */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Academic Year
      </label>
      <Select defaultValue="2024-25">
        <SelectTrigger className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2024-25">2024-25</SelectItem>
          <SelectItem value="2023-24">2023-24</SelectItem>
          <SelectItem value="2022-23">2022-23</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Region */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Region
      </label>
      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
        <SelectTrigger className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL REGIONS</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Exam Board */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Exam Board
      </label>
      <Select value={selectedExamBoard} onValueChange={setSelectedExamBoard}>
        <SelectTrigger className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select Exam Board" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL BOARDS</SelectItem>
          {examBoards.map((board) => (
            <SelectItem key={board} value={board}>
              {board}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
</div>


        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <School className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalSchools}+</div>
            <div className="text-sm text-gray-600">Total Grammar Schools</div>
          </Card>

          <Card className="text-center p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{filteredData.length}</div>
            <div className="text-sm text-gray-600">Areas Covered</div>
          </Card>

          <Card className="text-center p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Exam Boards</div>
          </Card>

          <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float-slow">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </Card>
        </div>

        {/* Schools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((school, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden hover-lift"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${school.color} text-white rounded-full px-3 py-1`}>{school.region}</Badge>
                  <div className="text-2xl font-bold text-blue-600">{school.schools}</div>
                </div>
                <CardTitle className="text-lg text-gray-800">{school.county}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Exam Board: {school.examBoard}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Grammar Schools Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Region: {school.region}</span>
                  </div>
                </div>
               <Button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            onClick={() => router.push(`/areas/${school._id}`)}
                    
          >
            <Search className="mr-2 h-4 w-4" />
            View Schools
          </Button>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl border-0">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Right Region?</h3>
            <p className="text-lg mb-6 text-white/90">
              Our expert advisors can help you find the perfect grammar schools in your preferred region
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-full px-8 py-3">
                <GraduationCap className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 rounded-full px-8 py-3 bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Find Nearby Schools
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
