"use client";

import type React from "react";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Award,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ParentSignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    childEmail: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (id === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleCheckboxChange =
    (key: "agreeToTerms" | "subscribeNewsletter") =>
    (checked: boolean | "indeterminate") => {
      setFormData((prev) => ({ ...prev, [key]: checked as boolean }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    if (!formData.childEmail) {
      toast.error("Please enter your child's email address.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://smartprep-backend-3.onrender.com";
      axios.defaults.baseURL = apiUrl;
      axios.defaults.withCredentials = true;

      const res = await axios.post("/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        childEmail: formData.childEmail,
        password: formData.password,
        subscribeNewsletter: formData.subscribeNewsletter,
        role: "parent",
      });

      toast.success("Parent account created successfully!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/profile");
    } catch (err) {
      let errorMessage = "An unexpected error occurred.";
      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Toaster richColors position="top-center" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Award className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              11+ SmartPrep
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parent Sign Up
          </h1>
          <p className="text-gray-600">
            Create a parent account to track your child&apos;s 11+ journey.
          </p>
        </div>

        <Card className="border-blue-100 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Parent Account</CardTitle>
            <CardDescription className="text-center">
              Monitor progress, schedule mocks, and manage subscriptions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="childEmail">Child&apos;s Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="childEmail"
                    type="email"
                    placeholder="Enter your child's email"
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.childEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600">
                      Passwords don't match
                    </p>
                  )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange("agreeToTerms")}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={handleCheckboxChange("subscribeNewsletter")}
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-600">
                    Subscribe to our newsletter for study tips and updates
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || !formData.agreeToTerms}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Parent Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Are you a student or teacher?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Choose a different role
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Free 7-day trial with full access</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Cancel anytime, no commitment</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Expert tutor support included</span>
          </div>
        </div>
      </div>
    </div>
  );
}

