"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, Award, Heart } from "lucide-react"

export default function TutorsPage() {
  const [tutors, setTutors] = useState<any[]>([])
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  
  const [priceRange, setPriceRange] = useState([0, 200])
  const [visibleCount, setVisibleCount] = useState(6)

  //  Fetch Tutors
  useEffect(() => {
    fetch(" https://smartprep-backend-6.onrender.com/api/tutors")
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((err) => console.error("Error fetching tutors:", err))
  }, [])

  //  Filter + Search + Sort
  const filteredTutors = tutors
    .filter((tutor) => {
      const matchesSubject =
        selectedSubject === "all" ||
        tutor.subjects.some((subject: string) =>
          subject.toLowerCase().includes(selectedSubject.toLowerCase())
        )

      const matchesLocation =
        selectedLocation === "all" ||
        tutor.location?.toLowerCase().includes(selectedLocation.toLowerCase())

      const matchesSearch = tutor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const tutorPrice = parseInt(
        tutor.rate.replace("£", "").replace("/hour", "")
      )
      const matchesPrice =
        tutorPrice >= priceRange[0] && tutorPrice <= priceRange[1]

      return (
        matchesSubject && matchesLocation && matchesSearch && matchesPrice
      )
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price")
        return parseInt(a.rate.replace("£", "")) -
          parseInt(b.rate.replace("£", ""))
      if (sortBy === "experience")
        return parseInt(b.experience) - parseInt(a.experience)
      return 0
    })

  const visibleTutors = filteredTutors.slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/*  Hero Section */}
      <div className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect <span className="text-orange-400">Tutor</span>
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Explore qualified tutors, subjects, and experience to help you
            succeed.
          </p>
        </div>
      </div>

      {/*  Filters Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 justify-center items-center">
          {/* Subjects */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="verbal reasoning">Verbal Reasoning</option>
          </select>

          {/* Locations */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
          >
            <option value="all">All Locations</option>
            <option value="london">London</option>
            <option value="manchester">Manchester</option>
            <option value="birmingham">Birmingham</option>
            <option value="online">Online</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search tutor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-white text-sm"
          >
            <option value="default">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="price">Price (Low to High)</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
      </div>

      {/*  Tutors Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12 pt-8">
        {visibleTutors.map((tutor, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between border rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center gap-4 relative">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <CardTitle className="text-lg font-bold">{tutor.name}</CardTitle>
                <CardDescription>{tutor.qualification}</CardDescription>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">
                    {tutor.rating} ({tutor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>{tutor.location}</span>
                  <Users className="w-4 h-4" />
                  <span>{tutor.experience} yrs</span>
                </div>
              </div>

            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">{tutor.description}</p>

              {/* Subjects */}
              <div>
                <span className="font-semibold text-sm">Subjects:</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {tutor.subjects.map((sub: string, i: number) => (
                    <Badge key={i} variant="outline">
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <span className="font-semibold text-sm">Specialties:</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {tutor.specialties.map((spec: string, i: number) => (
                    <Badge key={i} className="bg-green-600 text-white">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Teaching Methods */}
              <div>
                <span className="font-semibold text-sm">Teaching Methods:</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {tutor.teachingMethods.map((method: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rates */}
              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="text-blue-600 font-bold">{tutor.rate}</p>
                  <p className="text-green-600 text-sm">{tutor.successRate}</p>
                  <p className="text-xs text-gray-500">{tutor.availability}</p>
                </div>
                {parseInt(tutor.successRate) >= 95 && (
                  <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                    <Award className="w-4 h-4" />
                    Top Rated
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Book your session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*  Load More */}
      {visibleCount < filteredTutors.length && (
        <div className="flex justify-center mt-6  ">
          <Button onClick={() => setVisibleCount((prev) => prev + 6)}>
            Load More
          </Button>
        </div>
      )}

      {/* No Tutors Found */}
      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tutors found.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent hover:bg-gray-100 rounded-full"
            onClick={() => setSearchTerm("")}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}




