"use client"

import { CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CompanyNewsProps {
  news: Array<{
    title: string
    source: string
    date: string
    summary: string
    sentiment: "positive" | "negative" | "neutral"
    url: string
  }>
}

export function CompanyNews({ news }: CompanyNewsProps) {
  return (
    <div className="space-y-6">
      {news.map((item, index) => (
        <div
          key={index}
          className="space-y-2 p-4 border rounded-lg last:border-0 transition-all hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-medium text-blue-800">{item.title}</h3>
            <Badge
              className={
                item.sentiment === "positive"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : item.sentiment === "negative"
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }
            >
              {item.sentiment}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">{item.source}</span>
            <span className="mx-2">•</span>
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span>{item.date}</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 transition-colors"
          >
            Read full article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
        </div>
      ))}
    </div>
  )
}
