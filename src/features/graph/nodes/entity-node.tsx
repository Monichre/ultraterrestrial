'use client'
import * as React from 'react'
import { memo, useCallback, useEffect } from 'react'

import { ThreeDPinCard } from '@/features/3d/3d-pin'
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useUpdateNodeInternals,
} from '@xyflow/react'
import { GlowingStarsCard } from '@/components/cards'
import { ConnectionCard } from '@/components/cards/connection-card'
import {
  DotGridBackground,
  DotGridBackgroundBlack,
} from '@/components/ui/backgrounds'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'

interface Photo {
  id: string
  name: string
  mediaType: string
  enablePublicUrl: boolean
  signedUrlTimeout: number
  uploadUrlTimeout: number
  size: number
  version: number
  url: string
}

interface DinkyCardProps {
  data: {
    date: string
    description: string
    latitude: number
    location: string
    longitude: number
    photos: Photo[]
    name: string
    color: string
    type: string
    label: string
    fill: string
  }
}

const DinkyCard: React.FC<DinkyCardProps> = ({ data, ...rest }) => {
  console.log('data: ', data)
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
  console.log('rest: ', rest)
  return (
    <Card
      className='card relative overflow-hidden entity-node min-w-[400px] w-auto max-w-[600px]'
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

// function Component() {
//   return (
//     <Card className='overflow-hidden'>
//       <CardHeader>
//         <CardTitle>Product Images</CardTitle>
//         <CardDescription>
//           Lipsum dolor sit amet, consectetur adipiscing elit
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className='grid gap-2'>
//           <Image
//             alt='Product image'
//             className='aspect-square w-full rounded-md object-cover'
//             height='300'
//             src='/placeholder.svg'
//             width='300'
//           />
//           <div className='grid grid-cols-3 gap-2'>
//             <Button>
//               <Image
//                 alt='Product image'
//                 className='aspect-square w-full rounded-md object-cover'
//                 height='84'
//                 src='/placeholder.svg'
//                 width='84'
//               />
//             </Button>
//             <Button>
//               <Image
//                 alt='Product image'
//                 className='aspect-square w-full rounded-md object-cover'
//                 height='84'
//                 src='/placeholder.svg'
//                 width='84'
//               />
//             </Button>
//             <Button className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'>
//               <Upload className='h-4 w-4 text-muted-foreground' />
//               <span className='sr-only'>Upload</span>
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

export const EntityNode = (props: any) => {
  console.log('props: ', props)
  // const updateNodeInternals = useUpdateNodeInternals(props.id)
  // console.log('props: ', props)
  // const updateNodeInternals = useUpdateNodeInternals()

  // useEffect(() => {
  //   updateNodeInternals(props.id)
  // }, [props, updateNodeInternasls])

  // const connections = useHandleConnections({
  //   type: 'target',
  // })
  // console.log('connections: ', connections)
  // const nodesData = useNodesData(
  //   connections.map((connection) => {
  //     console.log('connection: ', connection)
  //     return connection.target
  //   })
  // )
  // console.log('nodesData: ', nodesData)

  return (
    <>
      <Handle type='target' position={Position.Top} />

      <DinkyCard {...props} key={props.id} />
    </>
  )
}

// export const EntityNode = memo(EN)

// import {
//   Handle,
//   Position,
//   useHandleConnections,
//   useNodesData,
// } from "@xyflow/react";

// function ResultNode() {
//   const connections = useHandleConnections({
//     type: "target",
//   });
//   const nodesData = useNodesData(
//     connections.map((connection) => connection.source)
//   );

//   return (
//     <div
//       style={{
//         background: "#eee",
//         color: "#222",
//         padding: 10,
//         fontSize: 12,
//         borderRadius: 10,
//       }}
//     >
//       <Handle type="target" position={Position.Left} />
//       <div>
//         incoming texts:{" "}
//         {nodesData
//           ?.filter((nodeData) => nodeData.data.text !== undefined)
//           .map(({ data }, i) => <div key={i}>{data.text}</div>) || "none"}
//       </div>
//     </div>
//   );
// }

// export default memo(ResultNode);
