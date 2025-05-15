"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileBarChart, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const router = useRouter()

  const validateCompanyName = (name: string): string | null => {
    // Trim whitespace
    const trimmedName = name.trim()

    // Check if empty
    if (!trimmedName) {
      return "Please enter a company name"
    }

    // Check for minimum length
    if (trimmedName.length < 2) {
      return "Company name must be at least 2 characters long"
    }

    // Check for maximum length
    if (trimmedName.length > 50) {
      return "Company name must be less than 50 characters long"
    }

    // Check if name starts with a letter
    if (!/^[a-zA-Z]/.test(trimmedName)) {
      return "Company name must start with a letter"
    }

    // Check for valid characters (letters, numbers, spaces, and common punctuation)
    if (!/^[a-zA-Z0-9\s\-&'.(),]+$/.test(trimmedName)) {
      return "Company name contains invalid characters"
    }

    // Simple profanity check (this would be more sophisticated in a real app)
    const profanityList = ["badword", "inappropriate", "offensive"]
    const lowerCaseName = trimmedName.toLowerCase()
    for (const word of profanityList) {
      if (lowerCaseName.includes(word)) {
        return "Please enter an appropriate company name"
      }
    }

    return null // No errors
  }

  const formatCompanyName = (name: string) => {
    if (!name) return name
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const handleAnalyze = () => {
    // Validate the company name
    const error = validateCompanyName(companyName)

    if (error) {
      setValidationError(error)
      return
    }

    setValidationError(null)
    setIsLoading(true)

    // Format the company name (first letter capitalized, rest lowercase)
    const trimmedName = companyName.trim()
    const formattedName = formatCompanyName(trimmedName)

    // In a real app, you might want to check if the company exists
    // For demo purposes, we'll just navigate to the dashboard
    setTimeout(() => {
      router.push(`/dashboard/${encodeURIComponent(formattedName)}`)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-yellow-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full max-w-3xl px-4 py-12 space-y-10 text-center relative z-10">
        <div className="space-y-4 animate-fade-down">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <FileBarChart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
            Company Intelligence Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter a company name to analyze financial reports, news, and key information
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8 animate-fade-up">
          <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row relative">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 opacity-30 rounded-lg blur-lg transition-all group-hover:opacity-40 group-focus-within:opacity-40"></div>
              <Input
                placeholder="Enter company name (e.g., Google, Apple, Tesla)"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  if (validationError) {
                    // Clear the error when user starts typing again
                    setValidationError(null)
                  }
                }}
                className={`h-14 text-lg bg-white relative pl-12 shadow-sm transition-shadow focus-visible:shadow-md ${
                  validationError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-blue-500/20"
                }`}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <Search className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            {validationError && (
              <div className="text-red-500 text-sm font-medium text-left w-full ml-2 -mt-1 flex items-center gap-1 absolute -bottom-6 left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {validationError}
              </div>
            )}
            <Button
              onClick={handleAnalyze}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-200"
              disabled={!companyName || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Analyze
                </div>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl">
            <div className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-blue-50 to-white p-4 border border-blue-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-700">Financial Data</span>
            </div>
            <div className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-red-50 to-white p-4 border border-red-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="bg-red-100 p-2 rounded-full mb-2">
                <svg
                  className="h-5 w-5 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-red-700">SEC Filings</span>
            </div>
            <div className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-yellow-50 to-white p-4 border border-yellow-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="bg-yellow-100 p-2 rounded-full mb-2">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6z"></path>
                  <path d="M5 8h14"></path>
                  <path d="M5 12h14"></path>
                  <path d="M5 16h14"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-yellow-700">News Analysis</span>
            </div>
            <div className="flex flex-col items-center justify-center h-24 rounded-xl bg-gradient-to-br from-green-50 to-white p-4 border border-green-200 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="bg-green-100 p-2 rounded-full mb-2">
                <svg
                  className="h-5 w-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
                  <path d="M8 9h8"></path>
                  <path d="m9 16 3-8 3 8"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-green-700">Market Trends</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 max-w-2xl mx-auto animate-fade-in">
          <p className="text-sm text-blue-700">
            We analyze 10-K/10-Q reports, annual reports, news, and other public information to create a comprehensive
            dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
