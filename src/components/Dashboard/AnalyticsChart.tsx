import { Card, Title, AreaChart } from '@tremor/react'

const chartdata = [
  { date: '2024-01', Users: 2890, Revenue: 2400 },
  { date: '2024-02', Users: 2756, Revenue: 1398 },
  { date: '2024-03', Users: 3322, Revenue: 9800 },
  { date: '2024-04', Users: 3470, Revenue: 3908 },
  { date: '2024-05', Users: 3475, Revenue: 4800 },
]

export default function AnalyticsChart() {
  return (
    <Card>
      <Title>Performance Overview</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={['Users', 'Revenue']}
        colors={['blue', 'green']}
      />
    </Card>
  )
} 