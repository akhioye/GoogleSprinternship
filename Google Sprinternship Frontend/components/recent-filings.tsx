"use client"

import { FileText } from "lucide-react"

interface RecentFilingsProps {
  filings: Array<{
    type: string
    date: string
    description: string
    url: string
  }>
}

export function RecentFilings({ filings }: RecentFilingsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filings.map((filing, index) => (
        <a
          key={index}
          href={filing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
        >
          <div className="rounded-md bg-blue-100 p-2 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{filing.type}</span>
              <span className="text-xs text-gray-500">{filing.date}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{filing.description}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
