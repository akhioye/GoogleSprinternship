"use client"

interface CompanyOverviewProps {
  data: {
    description: string
    businessModel: string
    competitiveAdvantage: string
    recentDevelopments: string[]
  }
}

export function CompanyOverview({ data }: CompanyOverviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-blue-600">Company Description</h3>
        <p className="mt-1 text-sm text-gray-600">{data.description}</p>
      </div>

      <div>
        <h3 className="font-medium text-green-600">Business Model</h3>
        <p className="mt-1 text-sm text-gray-600">{data.businessModel}</p>
      </div>

      <div>
        <h3 className="font-medium text-red-600">Competitive Advantage</h3>
        <p className="mt-1 text-sm text-gray-600">{data.competitiveAdvantage}</p>
      </div>

      <div>
        <h3 className="font-medium text-yellow-600">Recent Developments</h3>
        <ul className="mt-2 space-y-1">
          {data.recentDevelopments.map((development, index) => (
            <li key={index} className="text-sm text-gray-600 list-disc ml-4">
              {development}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
