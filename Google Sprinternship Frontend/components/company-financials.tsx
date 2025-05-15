"use client"

import { useEffect, useRef } from "react"

interface CompanyFinancialsProps {
  data: any
  type?: "line" | "bar" | "pie"
}

export function CompanyFinancials({ data, type = "line" }: CompanyFinancialsProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // In a real app, you would use a charting library like Chart.js, Recharts, or D3.js
    // For this demo, we'll just show a placeholder with the chart type icon

    const chartContainer = chartRef.current
    chartContainer.innerHTML = ""

    const chartPlaceholder = document.createElement("div")
    chartPlaceholder.className =
      "flex flex-col items-center justify-center h-48 relative overflow-hidden rounded-lg group"

    // Add decorative background based on chart type
    if (type === "line") {
      chartPlaceholder.classList.add("bg-gradient-to-br")
      chartPlaceholder.classList.add("from-blue-50")
      chartPlaceholder.classList.add("to-white")
    } else if (type === "bar") {
      chartPlaceholder.classList.add("bg-gradient-to-br")
      chartPlaceholder.classList.add("from-green-50")
      chartPlaceholder.classList.add("to-white")
    } else if (type === "pie") {
      chartPlaceholder.classList.add("bg-gradient-to-br")
      chartPlaceholder.classList.add("from-red-50")
      chartPlaceholder.classList.add("to-white")
    }

    // Add subtle decorative elements
    if (type === "line") {
      const lineBg = document.createElement("div")
      lineBg.className = "absolute inset-0 flex items-end justify-between px-4 pb-8 opacity-20"

      for (let i = 0; i < 12; i++) {
        const bar = document.createElement("div")
        const randomHeight = Math.floor(Math.random() * 60) + 20
        bar.className = "bg-blue-500 w-1 rounded-t-sm transition-transform group-hover:scale-y-110"
        bar.style.height = `${randomHeight}%`
        lineBg.appendChild(bar)
      }

      chartPlaceholder.appendChild(lineBg)
    } else if (type === "bar") {
      const barBg = document.createElement("div")
      barBg.className = "absolute inset-0 flex items-end justify-around px-4 pb-8 opacity-20"

      for (let i = 0; i < 6; i++) {
        const bar = document.createElement("div")
        const randomHeight = Math.floor(Math.random() * 60) + 20
        bar.className = "bg-green-500 w-8 rounded-t-sm transition-transform group-hover:scale-y-110"
        bar.style.height = `${randomHeight}%`
        barBg.appendChild(bar)
      }

      chartPlaceholder.appendChild(barBg)
    } else if (type === "pie") {
      const pieBg = document.createElement("div")
      pieBg.className = "absolute inset-0 flex items-center justify-center opacity-20"

      const pie = document.createElement("div")
      pie.className = "bg-red-500 w-32 h-32 rounded-full transition-transform group-hover:scale-105"

      const cutout = document.createElement("div")
      cutout.className =
        "absolute bg-white w-16 h-16 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

      pie.appendChild(cutout)
      pieBg.appendChild(pie)
      chartPlaceholder.appendChild(pieBg)
    }

    let icon
    if (type === "line") {
      icon = document.createElement("div")
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-blue-500"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>`
    } else if (type === "bar") {
      icon = document.createElement("div")
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-green-500"><rect width="4" height="5" x="3" y="14" rx="1"></rect><rect width="4" height="10" x="10" y="9" rx="1"></rect><rect width="4" height="15" x="17" y="4" rx="1"></rect></svg>`
    } else if (type === "pie") {
      icon = document.createElement("div")
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-red-500"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`
    }

    icon.className = "relative z-10"

    const chartLabel = document.createElement("div")
    chartLabel.className = "mt-4 text-sm font-medium text-gray-700 relative z-10"
    chartLabel.textContent = "Interactive chart visualization would appear here"

    chartPlaceholder.appendChild(icon!)
    chartPlaceholder.appendChild(chartLabel)
    chartContainer.appendChild(chartPlaceholder)
  }, [data, type])

  return (
    <div className="group">
      <div ref={chartRef} className="w-full h-48 transition-transform duration-300 group-hover:scale-[1.01]"></div>
    </div>
  )
}
