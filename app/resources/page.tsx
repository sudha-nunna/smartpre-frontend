

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Download,
  Play,
  Star,
  ArrowRight,
  Calculator,
  PenTool,
  Brain,
  Shapes,
  FileText,
  Video,
  Award,
  CheckCircle,
  Facebook,
  Twitter,
  Mail,
  HelpCircle
} from "lucide-react"

// Map resource icon string to actual icon component
const resourceIconMap: Record<string, React.ElementType> = {
  filetext: FileText,
  videotutorials: Video,
  video: Video,
  play: Play,
  bookopen: BookOpen,
  helpcircle: HelpCircle,
  // add more as needed
};

// 🔹 Map string values (from DB) to actual icon components
const iconMap: Record<string, React.ElementType> = {
  calculator: Calculator,
  pentool: PenTool,
  brain: Brain,
  shapes: Shapes,
}

export default function ResourcesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [subjects, setSubjects] = useState<any[]>([])

   const [resourceTypes, setResourceTypes] = useState([]);

  useEffect(() => {
    // Fetch subjects dynamically from backend
    fetch("https://smartprep-backend-2.onrender.com/api/subjects") 
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data)
        if (data.length > 0) {
          setSelectedSubject(data[0].id) // default select first subject
        }
      })
      .catch((err) => console.error("Error fetching subjects:", err))
  }, [])


    useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("https://smartprep-backend-2.onrender.com/api/resource-types"); // your backend API
        const data = await res.json();
        setResourceTypes(data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);



  const featuredResources = [
    {
      title: "Complete Mathematics Workbook",
      subject: "Mathematics",
      type: "PDF Download",
      pages: 120,
      difficulty: "Intermediate",
      rating: 4.9,
      downloads: 2500,
      preview: true,
      file:"/files/11-Plus-Maths-preparation-guide.pdf"
    },
    {
      title: "English Comprehension Mastery",
      subject: "English",
      type: "Interactive Course",
      lessons: 25,
      difficulty: "All Levels",
      rating: 4.8,
      downloads: 1800,
      preview: true,
      file: "/files/11-Plus-English-preparation-guide.pdf"
    },
    {
      title: "Verbal Reasoning Patterns",
      subject: "Verbal Reasoning",
      type: "Video Series",
      videos: 15,
      difficulty: "Advanced",
      rating: 4.9,
      downloads: 1200,
      preview: true,
      file: "/files/11-Plus-Verbal-Reasoning-preparation-guide.pdf"
    },
    {
      title: "Non-Verbal Logic Puzzles",
      subject: "Non-Verbal Reasoning",
      type: "Practice Set",
      questions: 200,
      difficulty: "Beginner",
      rating: 4.7,
      downloads: 950,
      preview: true,
      file: "/files/11-Plus-NVR-preparation-guide.pdf"
    },
  ]

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = "Check out these amazing 11+ exam resources!"

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=${text}&body=${url}`, "_blank")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">3,000+ Resources Available</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive 11+ <span className="text-blue-600">Study Resources</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access thousands of practice papers, video tutorials, and interactive materials designed to help your
              child excel in every 11+ subject area.
            </p>
          </div>

          {/* Subject Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {subjects.map((subject) => {
              const Icon = iconMap[subject.icon?.toLowerCase()] || BookOpen // fallback
              return (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedSubject === subject.id ? "ring-2 ring-blue-500 shadow-lg" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                        subject.color === "blue"
                          ? "bg-blue-100"
                          : subject.color === "green"
                          ? "bg-green-100"
                          : subject.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          subject.color === "blue"
                            ? "text-blue-600"
                            : subject.color === "green"
                            ? "text-green-600"
                            : subject.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                        }`}
                      />
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription className="text-sm">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-blue-600">{subject.resources}</div>
                      <div className="text-sm text-gray-600">Resources Available</div>
                      <Badge variant="secondary" className="text-xs">
                        {subject.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


      {/* Resource Types */}                                                                                                                                                                                                                                                                                                                                                                                                                                  
    <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What You'll Find</h2>
      <p className="text-xl text-gray-600">
        Diverse learning materials to suit every learning style and preference.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {resourceTypes.map((resource, index) => {
        const IconComponent = resourceIconMap[resource.icon] || FileText;
        return (
          <Card key={index} className="text-center border-blue-100 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">{resource.type}</CardTitle>
              <div className="text-2xl font-bold text-blue-600">{resource.count}+</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">{resource.description}</CardDescription>
              {resource.button && resource.button.action && resource.button.label && (
                <Button
                  size="sm"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={() => window.location.href = resource.button.action}
                >
                  {resource.button.label}
                </Button>
              )}
        
              {!resource.button && resource.link && (
                <Button
                  size="sm"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={() => window.location.href = resource.link}
                >
                  Explore {resource.type}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>


      {/* Featured Resources */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <p className="text-xl text-gray-600">Our most popular and highly-rated study materials.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="border-blue-200 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{resource.subject}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{resource.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {resource.pages
                          ? `${resource.pages} pages`
                          : resource.lessons
                            ? `${resource.lessons} lessons`
                            : resource.videos
                              ? `${resource.videos} videos`
                              : `${resource.questions} questions`}
                      </span>
                      <span>{resource.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{resource.downloads} downloads</span>
                      {resource.preview && <Badge variant="outline">Preview Available</Badge>}
                    </div>
                    <div className="flex gap-2">
                   <a href={resource.file} download className="flex-1">
  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
    <Download className="h-4 w-4 mr-2" />
    Download
  </Button>
</a>


                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Deep Dive */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {subjects.map((subject) => (
                <TabsTrigger key={subject.id} value={subject.id} className="text-sm">
                  {subject.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {subjects.map((subject) => (
              <TabsContent key={subject.id} value={subject.id}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{subject.name} Resources</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">{subject.description}</p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Comprehensive topic coverage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Progressive difficulty levels</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Detailed explanations and solutions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">Regular updates and new content</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Explore {subject.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                       <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                      >
                        Download Sample
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <Card className="border-blue-200 shadow-xl">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
      
                          <div>
                           
                            <img
                              src="https://i.pinimg.com/736x/9f/13/e9/9f13e9adece130946067ac5fa974a8a2.jpg"
                              alt="Sample Question"
                              className="w-150 h-100 object-cover rounded-md"
                            />
                    
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Access All Resources?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get unlimited access to our complete library of 11+ study materials and practice tests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
            >
              View All Subjects
            </Button>
          </div>

          {/* Share section */}
          <div className="pt-8 border-t border-blue-500">
            <p className="text-blue-100 mb-4">Share these resources:</p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" onClick={() => handleShare("facebook")} className="text-white hover:bg-blue-500">
                <Facebook className="h-5 w-5 mr-2" />
                Facebook
              </Button>
              <Button variant="ghost" onClick={() => handleShare("twitter")} className="text-white hover:bg-blue-500">
                <Twitter className="h-5 w-5 mr-2" />
                Twitter
              </Button>
              <Button variant="ghost" onClick={() => handleShare("email")} className="text-white hover:bg-blue-500">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">11+ smartprep</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Comprehensive study resources for 11+ exam success.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Subjects</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mathematics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    English
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Verbal Reasoning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Non-Verbal Reasoning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Practice Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Study Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mock Exams
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutor Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 11+ SmartPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


