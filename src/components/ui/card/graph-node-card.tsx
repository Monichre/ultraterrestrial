import { DotGridBackgroundBlack } from '@/components/ui/backgrounds'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export type GraphNodeCardData = {
  data: {
    date: string
    description: string
    latitude: number
    longitude: number
    location: string
    photos: string[]
    name: string
    color: string
    type: string
    label: string
    fill: string
  }
}

export const GraphNodeCard: React.FC<GraphNodeCardData> = ({
  data,
  ...rest
}) => {
  const {
    date,
    description,
    latitude,
    location,
    longitude,
    photos,
    name,
    color,
    type,
    label,
    fill,
  } = data

  return (
    <Card
      className='bg-card relative overflow-hidden entity-node min-w-[400px] w-auto max-w-[600px]'
      style={{ borderColor: color }}
      {...rest}
    >
      <DotGridBackgroundBlack />
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative z-20'>
        {label}
      </CardHeader>
      <CardContent className='relative z-20'>
        <div className='text-2xl font-bold'>{name}</div>
        {/* <p className='text-xs text-muted-foreground text-white'>
          {description}
        </p> */}

        {/* <img src={photos[0].url} alt={photos[0].name} className='mt-2' /> */}

        <div className='mt-2'>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Location: {location}</p>
          <p>
            Coordinates: {latitude}, {longitude}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
