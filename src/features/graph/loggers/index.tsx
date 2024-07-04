import {
  EdgeLabelRenderer,
  Panel,
  useNodes,
  NodeChange,
  OnNodesChange,
  useStore,
  useStoreApi,
} from '@xyflow/react'
import { useEffect, useRef, useState, type Key } from 'react'

type ChangeLoggerProps = {
  color?: string
  limit?: number
}

type ChangeInfoProps = {
  change: NodeChange
}

export function ChangeInfo({ change }: ChangeInfoProps) {
  const id = 'id' in change ? change.id : '-'
  const { type } = change

  return (
    <div style={{ marginBottom: 4 }}>
      <div>node id: {id}</div>
      <div>
        {type === 'add' ? JSON.stringify(change.item, null, 2) : null}
        {type === 'dimensions'
          ? `dimensions: ${change.dimensions?.width} × ${change.dimensions?.height}`
          : null}
        {type === 'position'
          ? `position: ${change.position?.x.toFixed(
              1
            )}, ${change.position?.y.toFixed(1)}`
          : null}
        {type === 'remove' ? 'remove' : null}
        {type === 'select' ? (change.selected ? 'select' : 'unselect') : null}
      </div>
    </div>
  )
}

export function ChangeLogger({ limit = 20 }: ChangeLoggerProps) {
  const [changes, setChanges] = useState<NodeChange[]>([])
  const onNodesChangeIntercepted = useRef(false)
  const onNodesChange = useStore((s: { onNodesChange: any }) => s.onNodesChange)
  const store = useStoreApi()

  useEffect(() => {
    if (!onNodesChange || onNodesChangeIntercepted.current) {
      return
    }

    onNodesChangeIntercepted.current = true
    const userOnNodesChange = onNodesChange

    const onNodesChangeLogger: OnNodesChange = (changes: any) => {
      userOnNodesChange(changes)

      setChanges((oldChanges) => [...changes, ...oldChanges].slice(0, limit))
    }

    store.setState({ onNodesChange: onNodesChangeLogger })
  }, [onNodesChange, limit])

  return (
    <div className='react-flow__devtools-changelogger'>
      <div className='react-flow__devtools-title'>Change Logger</div>
      {changes.length === 0 ? (
        <>no changes triggered</>
      ) : (
        changes.map((change, index) => (
          <ChangeInfo key={index} change={change} />
        ))
      )}
    </div>
  )
}

export function NodeInspector() {
  const nodes = useNodes()

  return (
    <EdgeLabelRenderer>
      <div className='react-flow__devtools-nodeinspector'>
        {nodes.map((node: any) => {
          const x = node.positionAbsolute?.x || 0
          const y = node.positionAbsolute?.y || 0
          const width = node.width || 0
          const height = node.height || 0

          return (
            <NodeInfo
              key={node.id}
              id={node.id}
              selected={node.selected}
              type={node.type || 'default'}
              x={x}
              y={y}
              width={width}
              height={height}
              data={node.data}
            />
          )
        })}
      </div>
    </EdgeLabelRenderer>
  )
}

type NodeInfoProps = {
  id: string
  type: string
  selected: boolean
  x: number
  y: number
  width?: number
  height?: number
  data: any
}

function NodeInfo({
  id,
  type,
  selected,
  x,
  y,
  width,
  height,
  data,
}: NodeInfoProps) {
  if (!width || !height) {
    return null
  }

  return (
    <div
      className='react-flow__devtools-nodeinfo'
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y + height}px)`,
        width: width * 2,
      }}
    >
      <div>id: {id}</div>
      <div>type: {type}</div>
      <div>selected: {selected ? 'true' : 'false'}</div>
      <div>
        position: {x.toFixed(1)}, {y.toFixed(1)}
      </div>
      <div>
        dimensions: {width} × {height}
      </div>
      <div>data: {JSON.stringify(data, null, 2)}</div>
    </div>
  )
}

export function ViewportLogger() {
  const viewport = useStore(
    (s: { transform: number[] }) =>
      `x: ${s.transform[0].toFixed(2)}, y: ${s.transform[1].toFixed(
        2
      )}, zoom: ${s.transform[2].toFixed(2)}`
  )

  return <Panel position='top-right'>{viewport}</Panel>
}
