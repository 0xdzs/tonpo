import { Card, Grid, Metric, Text } from '@tremor/react'

const metrics = [
  { title: 'Total Users', value: '8,282', change: '+12.3%' },
  { title: 'Active Users', value: '2,420', change: '+8.1%' },
  { title: 'Revenue', value: '$12,384', change: '+14.2%' },
  { title: 'Conversion Rate', value: '3.42%', change: '+4.3%' },
]

export default function MetricsGrid() {
  return (
    <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-4">
          <Text>{metric.title}</Text>
          <Metric>{metric.value}</Metric>
          <Text className="text-green-500">{metric.change}</Text>
        </Card>
      ))}
    </Grid>
  )
} 