"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Star,
  Users,
  BookOpen,
  Calculator,
  PenTool,
  Brain,
  Target,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Play,
  ArrowRight,
  Award,
  TrendingUp,
  School,
  User,
} from "lucide-react"

export default function LondonEntranceExamsHomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [achievementsData, setAchievementsData] = useState({
    perfectScores: 0,
    scoreImprovement: 0,
    scholarships: 0,
  })

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Assuming an endpoint like /api/achievements returns the data
        const res = await fetch(" https://smartprep-backend-4.onrender.com/api/stats", { cache: "no-store" })
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        // setAchievementsData(data)
        setAchievementsData(data)
      } catch (error) {
        console.error("Failed to fetch achievements:", error)
        // Data will fallback to the initial state if the fetch fails.
      }
    }
    fetchAchievements()
  }, [])

  const programs = [
    {
      icon: Calculator,
      title: "Mathematics",
      age: "Ages 9-11",
      description:
        "Master arithmetic, algebra, geometry and problem-solving skills essential for London grammar school entrance.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: PenTool,
      title: "English Language",
      age: "Ages 9-11",
      description: "Develop reading comprehension, creative writing, and grammar skills for top London schools.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Brain,
      title: "Verbal Reasoning",
      age: "Ages 9-11",
      description: "Build logical thinking and vocabulary skills through word puzzles and comprehension exercises.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Target,
      title: "Non-Verbal Reasoning",
      age: "Ages 9-11",
      description: "Enhance pattern recognition and spatial awareness for visual logic questions.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: BookOpen,
      title: "Mock Exams",
      age: "All levels",
      description: "Practice with authentic past papers from top London grammar and independent schools.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: School,
      title: "School Selection",
      age: "Parent guidance",
      description: "Expert advice on choosing the right London schools and application strategies.",
      color: "bg-teal-100 text-teal-600",
    },
  ]

  //testimonials images should be in public/photo folder
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Parent from Hampstead, Daughter at St. Paul's Girls' School",
      content:
        "Thanks to this program, Emma secured places at three top London schools. The tutors understood exactly what each school was looking for.",
      rating: 5,
      image: "https://c8.alamy.com/comp/CN5KT1/a-young-13-14-year-old-teenage-girl-uk-CN5KT1.jpg",
    },
    {
      name: "James Wilson",
      role: "Parent from Richmond, Son at King's College School",
      content:
        "The mock exams were incredibly realistic. Oliver felt completely prepared for his 11+ and CEE exams. Highly recommend!",
      rating: 5,
      image: "https://c8.alamy.com/comp/BD0JM9/portrait-of-teenage-girl-BD0JM9.jpg",
    },
    {
      name: "Priya Patel",
      role: "Parent from Islington, Daughter at Henrietta Barnett School",
      content:
        "Excellent preparation for grammar school entrance. Anaya's confidence grew tremendously and she achieved outstanding results.",
      rating: 5,
      image: "https://c8.alamy.com/comp/GDECTD/close-up-portrait-of-teen-girl-of-14-years-GDECTD.jpg",
    },
    
  ]

  const stats = [
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "8+", label: "Years Experience", icon: Award },
    { number: "50+", label: "London Schools", icon: School },
    { number: "1000+", label: "Students Placed", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-indigo-100/50 to-purple-100/50"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-indigo-400 rounded-full animate-bounce-gentle opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-purple-400 rounded-full animate-pulse-soft opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="mb-7 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full px-4 py-2 text-sm font-medium">
                🎓 11+ SmartPrep - Excellence in Education
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Secure Your Child's
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Future{" "}
                </span>
                at Elite Schools
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Expert 11+ entrance exam preparation with SmartPrep's proven methodology. Join over 1000 successful
                students who secured places at their dream schools with our comprehensive preparation program.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-full hover-lift"
                  onClick={() => (window.location.href = "/auth/signup")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Assessment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-4 rounded-full hover-lift bg-transparent"
                  onClick={() => (window.location.href = "#success-stories")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Success Stories
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:animate-bounce-gentle">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 hover-lift">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center animate-wiggle">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Exam Schedule 2024</h3>
                      <p className="text-muted-foreground">Key London School Dates</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-foreground">Sept 2024 - Registration Opens</span>
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-foreground">Jan 2025 - 11+ Exams</span>
                      <Target className="h-4 w-4 text-red-500 ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <School className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-foreground">Mar 2025 - Results Day</span>
                      <Award className="h-4 w-4 text-gold-500 ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                      <GraduationCap className="h-5 w-5 text-indigo-600" />
                      <span className="text-sm font-medium text-foreground">Sept 2025 - School Starts</span>
                      <TrendingUp className="h-4 w-4 text-green-500 ml-auto" />
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements around the card */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-float-slow">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2">Our Programs</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Master Every
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Subject & Skill
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive preparation covering all aspects of London's 11+ entrance exams with expert tutoring and
              proven methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="border-2 border-border hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden hover-lift"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft`}
                  >
                    <program.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                  <Badge variant="secondary" className="rounded-full">
                    {program.age}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </CardDescription>
                  <Button variant="ghost" className="mt-4 text-blue-600 hover:bg-blue-50 rounded-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories & Results Section */}
      <section id="success-stories" className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 rounded-full px-4 py-2">Success Stories</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Outstanding
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Results & Placements
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our students consistently achieve exceptional results and secure places at London's most prestigious
              schools.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-sm text-muted-foreground">First Choice Success</div>
            </Card>

            <Card className="text-center p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <School className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
              <div className="text-sm text-muted-foreground">Top London Schools</div>
            </Card>

            <Card className="text-center p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-sm text-muted-foreground">Above National Average</div>
            </Card>

            <Card className="text-center p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-white/80 backdrop-blur-sm hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float-slow">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Parent Satisfaction</div>
            </Card>
          </div>

          {/* School Placements */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">Recent School Placements (2024)</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600 text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Grammar Schools
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Henrietta Barnett School - 12 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Queen Elizabeth's School - 8 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Latymer School - 6 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    St. Olave's Grammar - 5 students
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600 text-lg flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Independent Schools
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    St. Paul's School - 7 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Westminster School - 5 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    King's College School - 9 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Dulwich College - 4 students
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-purple-600 text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Girls' Schools
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    St. Paul's Girls' School - 6 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    North London Collegiate - 8 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Godolphin & Latymer - 5 students
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Francis Holland School - 4 students
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-3">
                <Award className="mr-2 h-5 w-5" />
                View All Success Stories
              </Button>
            </div>
          </div>
  {/* Student Achievements */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Perfect Scores</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">{achievementsData.perfectScores}</p>
              <p className="text-muted-foreground">Students achieved 100% in at least one subject</p>
            </Card>

            <Card className="p-6 text-center border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Score Improvement</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">+{achievementsData.scoreImprovement}%</p>
              <p className="text-muted-foreground">Average improvement from first to final mock</p>
            </Card>

            <Card className="p-6 text-center border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover-lift">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Scholarships</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">{achievementsData.scholarships}</p>
              <p className="text-muted-foreground">Academic scholarships awarded to our students</p>
            </Card>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-card to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary rounded-full px-4 py-2">Parent Reviews</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              What Families
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Love About Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from the parents who trust us with their most precious gifts.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl rounded-3xl overflow-hidden hover-lift">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[activeTestimonial].name}
                    className="w-28 h-28 rounded-full border-4 border-primary/20"
                  />
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current animate-pulse-soft" />
                  ))}
                </div>

                <blockquote className="text-xl text-foreground mb-6 italic leading-relaxed font-medium">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>

                <div>
                  <div className="font-bold text-foreground text-lg">{testimonials[activeTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Child's
            <br />
            Place with 11+ SmartPrep?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful families who trusted 11+ SmartPrep with their child's entrance exam preparation.
            Book your free assessment today and start the journey to academic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-4 rounded-full hover-lift"
              onClick={() => (window.location.href = "/auth/signup")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Free Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full hover-lift bg-transparent"
              onClick={() => window.open("tel:+442071234567")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (020) 7123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">11+ SmartPrep</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Premier 11+ entrance exam preparation with smart, proven methods helping students secure places at top
                grammar and independent schools.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Subjects</h3>
              <ul className="space-y-3 text-gray-300">
                <li>Mathematics</li>
                <li>English Language</li>
                <li>Verbal Reasoning</li>
                <li>Non-Verbal Reasoning</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Resources</h3>
              <ul className="space-y-3 text-gray-300">
                <li>Practice Tests</li>
                <li>School Finder</li>
                <li>Exam Dates</li>
                <li>Results Tracker</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Contact Info</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Central London, Multiple Locations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>(020) 7123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>info@11plus-smartprep.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 11+ SmartPrep. All rights reserved. Smart preparation for academic success.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
