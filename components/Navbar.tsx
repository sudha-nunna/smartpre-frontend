"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, User, Home, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  firstName: string;
  // Add other user properties as needed
}
export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false); // Close menu on logout
    router.push("/"); // go back to home
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center animate-pulse-soft">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              11+ SmartPrep
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/schools" className="hover:text-blue-600 transition-colors font-medium">
              Schools
            </Link>
            <Link href="/regions" className="hover:text-blue-600 transition-colors font-medium">
              Region Profile
            </Link>
            <Link href="/practice" className="hover:text-blue-600 transition-colors font-medium">
              Practice Tests
            </Link>
            <Link href="/resources" className="hover:text-blue-600 transition-colors font-medium">
              Resources
            </Link>
            <Link href="/tutors" className="hover:text-blue-600 transition-colors font-medium">
              Tutors
            </Link>

            {!user ? (
              // If NOT logged in
              <>
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              // If logged in
              <>
                <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-500 rounded-full">
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-1" />
                    {user.firstName}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-700 rounded-full"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            )}
          </div>

           {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-md">
          <div className="px-4 py-3 space-y-3 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/schools" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium">
              Schools
            </Link>
            <Link href="/regions" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium">
              Region Profile
            </Link>
            <Link href="/practice" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium">
              Practice Tests
            </Link>
            <Link href="/resources" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium">
              Resources
            </Link>
            <Link href="/tutors" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors font-medium">
              Tutors
            </Link>

            {!user ? (
              <>
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full w-full">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full w-full">
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-full w-full flex justify-start">
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <User className="h-4 w-4 mr-1" />
                    {user.firstName}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 rounded-full w-full flex justify-start"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            )}
        </div>
      </div>
      )}
    </nav>
  );
}
