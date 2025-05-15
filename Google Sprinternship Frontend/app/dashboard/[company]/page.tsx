"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Building, Calendar, FileBarChart, Search, Send, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CompanyFinancials } from "@/components/company-financials"
import { CompanyNews } from "@/components/company-news"
import { CompanyOverview } from "@/components/company-overview"
import { CompanyExecutives } from "@/components/company-executives"
import { RecentFilings } from "@/components/recent-filings"
import { mockCompanyData } from "@/lib/mock-data"
import { askGemini } from "@/lib/gemini"


export default function Dashboard({ params }: { params: { company: string } }) {
  const [companyData, setCompanyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [aiQuestion, setAiQuestion] = useState("")
  const [animateIn, setAnimateIn] = useState(false)
  const [aiAnswer, setAiAnswer] = useState<string | null>(null)
  const [isAsking, setIsAsking] = useState(false)

  // Format the company name (ensure first letter is capitalized, rest lowercase)
  const formatCompanyName = (name: string) => {
    if (!name) return name
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const companyName = formatCompanyName(decodeURIComponent(params.company))

  useEffect(() => {
    // In a real app, you would fetch the company data from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setCompanyData(mockCompanyData(companyName))
      setLoading(false)
      // Add a slight delay before triggering animations
      setTimeout(() => setAnimateIn(true), 100)
    }, 1000)
  }, [companyName])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white shadow-lg shadow-blue-100/50 transition-all">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileBarChart className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Analyzing {companyName}...
          </p>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-gray-500">Fetching financial data, news, and reports</p>
            <div className="w-full max-w-xs h-2 mt-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50/30 to-white">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline-block">Back to Search</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search company data..."
                className="w-64 pl-8 md:w-80 border-blue-100 focus-visible:ring-blue-500/20 transition-all"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Export
            </Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow transition-all">
              Save Report
            </Button>
          </div>
        </div>
      </header>

      <main
        className={`flex-1 p-4 md:p-6 space-y-6 transition-opacity duration-500 ease-in-out ${animateIn ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex flex-col gap-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              {companyData.name}
            </h1>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              {companyData.ticker}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-3 mt-1">
            <div className="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100">
              <Building className="mr-1 h-3.5 w-3.5" />
              {companyData.sector}
            </div>
            <div className="inline-flex items-center rounded-md border border-green-100 bg-green-50 px-2.5 py-0.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100">
              <Users className="mr-1 h-3.5 w-3.5" />
              {companyData.employees.toLocaleString()} Employees
            </div>
            <div className="inline-flex items-center rounded-md border border-yellow-100 bg-yellow-50 px-2.5 py-0.5 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-100">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Founded {companyData.founded}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in animation-delay-100">
          <Card className="overflow-hidden border-blue-100 shadow-sm hover:shadow transition-all group">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              <CardTitle className="text-white">Stock Performance</CardTitle>
              <CardDescription className="text-blue-100">Last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 group-hover:translate-y-0 transition-transform">
              <CompanyFinancials data={companyData.stockPerformance} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-red-100 shadow-sm hover:shadow transition-all group">
            <CardHeader className="pb-2 bg-gradient-to-r from-red-500 to-red-400 text-white">
              <CardTitle className="text-white">Revenue Breakdown</CardTitle>
              <CardDescription className="text-red-100">By business segment</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <CompanyFinancials data={companyData.revenueBreakdown} type="pie" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-green-100 shadow-sm hover:shadow transition-all group">
            <CardHeader className="pb-2 bg-gradient-to-r from-green-500 to-green-400 text-white">
              <CardTitle className="text-white">Key Metrics</CardTitle>
              <CardDescription className="text-green-100">Financial highlights</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {companyData.keyMetrics.map((metric: any, index: number) => (
                  <div
                    key={index}
                    className="space-y-1 bg-white p-3 rounded-lg border border-gray-100 transition-transform hover:scale-[1.02]"
                  >
                    <p className="text-sm text-gray-500">{metric.name}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        metric.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                      <ArrowUpRight className={`h-3 w-3 ${metric.change < 0 ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-in animation-delay-200">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-none md:flex bg-blue-50 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Company Overview
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Financial Reports
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              News & Analysis
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Organization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">Company Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompanyOverview data={companyData.overview} />
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">SWOT Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-700 flex items-center gap-1">
                        <span className="bg-blue-600 text-white p-1 rounded-full text-xs">S</span>
                        Strengths
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {companyData.swot.strengths.map((item: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2 bg-red-50 p-3 rounded-lg">
                      <h3 className="font-medium text-red-700 flex items-center gap-1">
                        <span className="bg-red-600 text-white p-1 rounded-full text-xs">W</span>
                        Weaknesses
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {companyData.swot.weaknesses.map((item: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2 bg-green-50 p-3 rounded-lg">
                      <h3 className="font-medium text-green-700 flex items-center gap-1">
                        <span className="bg-green-600 text-white p-1 rounded-full text-xs">O</span>
                        Opportunities
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {companyData.swot.opportunities.map((item: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2 bg-yellow-50 p-3 rounded-lg">
                      <h3 className="font-medium text-yellow-700 flex items-center gap-1">
                        <span className="bg-yellow-600 text-white p-1 rounded-full text-xs">T</span>
                        Threats
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {companyData.swot.threats.map((item: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle className="text-blue-700">Recent SEC Filings</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentFilings filings={companyData.recentFilings} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                  <CardTitle className="text-white">Revenue Growth</CardTitle>
                  <CardDescription className="text-blue-100">Quarterly (in millions)</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <CompanyFinancials data={companyData.revenueGrowth} />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-green-100 shadow-sm hover:shadow transition-all">
                <CardHeader className="pb-2 bg-gradient-to-r from-green-500 to-green-400 text-white">
                  <CardTitle className="text-white">Profit Margins</CardTitle>
                  <CardDescription className="text-green-100">Last 5 years</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <CompanyFinancials data={companyData.profitMargins} />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-red-100 shadow-sm hover:shadow transition-all">
                <CardHeader className="pb-2 bg-gradient-to-r from-red-500 to-red-400 text-white">
                  <CardTitle className="text-white">Expense Breakdown</CardTitle>
                  <CardDescription className="text-red-100">Current fiscal year</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <CompanyFinancials data={companyData.expenseBreakdown} type="pie" />
                </CardContent>
              </Card>
            </div>

            <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle className="text-blue-700">Financial Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyData.financialHighlights.map((highlight: any, index: number) => (
                    <div
                      key={index}
                      className="space-y-2 bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100 transition-transform hover:scale-[1.01]"
                    >
                      <h3 className="font-medium text-blue-700">{highlight.title}</h3>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6 pt-4">
            <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle className="text-blue-700">Recent News & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyNews news={companyData.news} />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">Market Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                      <span className="text-sm font-medium">Analyst Ratings</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{companyData.sentiment.analystRating}/5</span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-8 first:rounded-l-full last:rounded-r-full transition-colors ${
                                  i < Math.floor(companyData.sentiment.analystRating) ? "bg-blue-500" : "bg-gray-200"
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                      <span className="text-sm font-medium">News Sentiment</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{companyData.sentiment.newsSentiment}%</span>
                        <div className="h-2 w-40 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-green-500 transition-all duration-1000"
                            style={{ width: `${companyData.sentiment.newsSentiment}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                      <span className="text-sm font-medium">Social Media Sentiment</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{companyData.sentiment.socialSentiment}%</span>
                        <div className="h-2 w-40 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-blue-500 transition-all duration-1000"
                            style={{ width: `${companyData.sentiment.socialSentiment}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">Key Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {companyData.keyTopics.map((topic: any, index: number) => (
                      <div
                        key={index}
                        className="rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-110 cursor-pointer"
                        style={{
                          backgroundColor: topic.color + "20",
                          color: topic.color,
                          fontSize: `${Math.max(0.75, Math.min(1.25, 0.75 + topic.weight / 100))}rem`,
                          boxShadow: `0 0 0 1px ${topic.color}30`,
                        }}
                      >
                        {topic.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="organization" className="space-y-6 pt-4">
            <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle className="text-blue-700">Key Executives</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyExecutives executives={companyData.executives} />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">Company Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-transform hover:scale-[1.01]">
                      <h3 className="font-medium text-blue-700">Board of Directors</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {companyData.structure.boardSize} members, {companyData.structure.independentDirectors}{" "}
                        independent
                      </p>
                    </div>

                    <div className="rounded-lg border border-green-100 bg-green-50 p-4 transition-transform hover:scale-[1.01]">
                      <h3 className="font-medium text-green-700">Business Units</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        {companyData.structure.businessUnits.map((unit: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {unit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4 transition-transform hover:scale-[1.01]">
                      <h3 className="font-medium text-yellow-700">Subsidiaries</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        {companyData.structure.subsidiaries.map((sub: string, i: number) => (
                          <li key={i} className="list-disc ml-4">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-700">Geographic Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-700">Headquarters</h3>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
                        {companyData.geography.headquarters}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-blue-700">Major Locations</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        {companyData.geography.majorLocations.map((location: string, i: number) => (
                          <div
                            key={i}
                            className="rounded-md bg-gradient-to-r from-blue-100 to-white px-3 py-2 border border-blue-200 transition-transform hover:scale-[1.02]"
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-blue-700">Revenue by Region</h3>
                      <div className="mt-3 space-y-3">
                        {Object.entries(companyData.geography.revenueByRegion).map(
                          ([region, percentage]: [string, any]) => (
                            <div key={region} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{region}</span>
                                <span className="font-medium">{percentage}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                                <div
                                  className="h-2 rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor:
                                      region === "North America"
                                        ? "#4285F4"
                                        : region === "Europe"
                                          ? "#DB4437"
                                          : region === "Asia Pacific"
                                            ? "#F4B400"
                                            : "#0F9D58",
                                  }}
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-blue-100 shadow-sm hover:shadow transition-all overflow-hidden animate-fade-in animation-delay-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 rounded-full blur-2xl"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Ask AI Assistant
            </CardTitle>
            <CardDescription>
              Ask specific questions about {companyData.name}'s financials, strategy, or market position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder={`E.g., What are ${companyData.name}'s main growth drivers?`}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 border-blue-100 focus-visible:ring-blue-500/20"
              />
              {isAsking && (
                <p className="text-sm text-gray-500 mt-4">Thinking...</p>
              )}

              {aiAnswer && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                  <p className="text-sm text-blue-700 whitespace-pre-line">{aiAnswer}</p>
                </div>
              )}
              <Button
                className="bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow transition-all"
                onClick={async () => {
                  setIsAsking(true)
                  try {
                    const answer = await askGemini(aiQuestion)
                    setAiAnswer(answer)
                  } catch (err) {
                    setAiAnswer("Sorry, there was an error contacting the AI.")
                  }
                  setIsAsking(false)
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                Ask
            </Button>
            </div>

            {companyData.aiSuggestions && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {companyData.aiSuggestions.map((suggestion: string, i: number) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => setAiQuestion(suggestion)}
                      className="text-xs bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
