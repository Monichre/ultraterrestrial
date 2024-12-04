/* eslint-disable react/display-name */
'use client'
import { memo, useEffect, useState } from 'react'

import { Handle, Position } from '@xyflow/react'

import { PopoverCloseButton, PopoverContent, PopoverFooter, PopoverForm, PopoverRoot, PopoverSubmitButton, PopoverTextarea, PopoverTrigger } from '@/components/animated'
import { AiStarIcon } from '@/components/icons'
import { AddNote } from '@/components/note/AddNote'
import { Button } from '@/components/ui/button'
import { useMindMap } from '@/contexts'
import { renderEntity } from '@/features/mindmap/components/cards/render-entity-card'
import { TestimonyCoreNodeBottom } from '@/features/mindmap/components/cards/testimony-card'
import { CoreNodeBottom, CoreNodeContainer, CoreNodeContent, CoreNodeTop } from '@/features/mindmap/nodes/core-node-ui'
import { useEntity } from '@/hooks'
import { cn } from '@/utils'
import { Lightbulb, XIcon } from 'lucide-react'

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

const EntityNode = memo( ( node: any ) => {
  console.log( 'node: ', node )
  const { useUpdateNodeInternals, useNodesData, deleteElements } = useMindMap()
  const handleDelete = () => {
    deleteElements( [node.id] )
  }

  const updateNodeInternals = useUpdateNodeInternals()
  const [handles, setHandles]: any = useState( [] )
  console.log( 'handles: ', handles )
  const nodeData = useNodesData( node.id )
  const type = node.data.type

  const component = renderEntity( {
    type: node.data.type,
    data: {
      ...node.data,
      id: node.id,
    },
  } )
  const {

    entity,

    saveNote,
    updateNote,
    userNote,
    connectionListConnections,
    handleHoverEnter,
    findConnections,
  } = useEntity( {
    card: {
      ...node.data,
      id: node.id,
    }
  } )
  console.log( "🚀 ~ file: entity-node.tsx:133 ~ EntityNode ~ entity:", entity )
  useEffect( () => {
    updateNodeInternals( node.id )
    if ( node?.data?.handles && node.data?.handles.length ) {
      const { data } = node
      updateNodeInternals( node.id )
      setHandles( data.handles )

    }

    // if (node?.data?.concise) {
    //   updateNodeInternals(node.id)
    // }
  }, [node, updateNodeInternals, nodeData] )

  return (
    <>
      <PopoverRoot>
        <Handle type='target' position={Position.Top} />
        <CoreNodeContainer className={cn( 'motion-scale-in-0 motion-opacity-in-0 min-w-[200px] core-node-container overflow-visible' )} id={node.id}>
          <CoreNodeTop>
            <div className='flex justify-between w-content align-center items-center ml-auto'>
              <Button variant='outline' onClick={handleDelete} className=' flex items-center px-4 py-2 font-semibold text-zinc-900 dark:text-white dark:bg-black  hover:border-indigo-800 mx-1'>
                <XIcon stroke={'#fff'} className='w-6 h-6 stroke-1' />
              </Button>


            </div>
          </CoreNodeTop>
          <CoreNodeContent className='min-h-[100xp] w-full'>

            {component}

            {handles && handles?.length
              ? handles.map( ( id: string, index: number ) => (
                <Handle
                  key={`${id}-${index}`}
                  type='source'
                  position={Position.Bottom}
                  id={id}
                  isConnectable={true}
                />
              ) )
              : null}
          </CoreNodeContent>
          <CoreNodeBottom>
            {node?.data?.type === 'testimonies' || node?.data?.type === 'testimony' ? <TestimonyCoreNodeBottom card={node.data} >
              <PopoverTrigger><Lightbulb className='text-white stroke-1' size='16' /></PopoverTrigger>

            </TestimonyCoreNodeBottom> : (
              <>
                <div className='flex items-center gap-1 rounded-full bg-neutral-200 py-1 pl-2 pr-2.5 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'>
                  <div className='size-5'>
                    <span
                      className='relative flex shrink-0 overflow-hidden rounded-full aspect-square h-full animate-overlayShow cursor-pointer border-2 shadow duration-200 pointer-events-none'
                      data-state='closed'
                      style={{
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        transform: 'translateX(0px)',
                      }}
                    >
                      <AiStarIcon stroke={'#fff'} className='w-4 h-4 stroke-1' />


                    </span>
                  </div>
                  <span className='text-neutral-600 dark:text-neutral-400'>

                  </span>
                </div>
                <AddNote saveNote={saveNote} userNote={userNote} updateNote={updateNote} />
              </>
            )}






          </CoreNodeBottom>
          <PopoverContent className='bg-black text-white border border-indigo-500/20'>
            <PopoverForm onSubmit={saveNote}>
              {/* <PopoverLabel>Add Note</PopoverLabel> */}
              <PopoverTextarea onChange={updateNote} />
              <PopoverFooter>
                <PopoverCloseButton />
                <PopoverSubmitButton />
              </PopoverFooter>
            </PopoverForm>
          </PopoverContent>
        </CoreNodeContainer>

      </PopoverRoot>
    </>
  )
} )






EntityNode.displayName = 'EntityNode'

export { EntityNode }

// {/* {( node?.data?.entities?.length > 0 && props.data.type && props.data.input ? ( */ }

// <AskAI question={askQuestion( { entities: node?.data?.entities?.map( ( { data }: any ) => data?.name ), input: props.data.input, type: props.data.type } )} table={props?.data?.type} updateAnalysis={updateAnalysis} >
//   <WaypointsIcon stroke={DOMAIN_MODEL_COLORS.personnel} className='w-4 h-4 stroke-1' />
// </AskAI>
//           ) : null )}

const AIToolsGrid = () => {
  return (
    <div
      className="content-center items-center box-border flex-col text-xs h-min justify-start relative w-[65.75rem] flex rounded-3xl gap-[0.63rem] overflow-hidden p-6 bg-neutral-950"
      style={{
        willChange: "transform",
      }}>
      <div
        className="content-start items-start flex-col h-min justify-start relative w-full flex gap-6"
        style={{
          flexShrink: "0",
        }}>
        <div
          className="content-center items-center h-min justify-between relative w-full flex"
          style={{
            flexShrink: "0",
          }}>
          <div
            className="content-start items-start flex-grow flex-wrap h-min justify-start relative w-[60.25rem] flex gap-3"
            style={{
              flexShrink: "0",
            }}>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-5">All</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-11">Audio</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-20">Blockchain</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-10">Code</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-28">Content Writer</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-8">GPT</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-28">Graphic Design</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-11">Image</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-12">Interior</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-11">Music</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-11">Video</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-24">Voice to Text</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                  <div
                    className="flex-col justify-start absolute flex"
                    style={{
                      flexShrink: "0",
                    }}>
                    <h3 className="text-white font-medium h-5 leading-[1.13rem] w-20">Web Design</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer h-10 relative w-10"
            style={{
              flexShrink: "0",
            }}>
            <div
              className="h-10 opacity-40 w-10 flex rounded-xl overflow-hidden"
              style={{
                pointerEvents: "none",
              }}>
              <button
                className="items-center h-10 justify-center text-center w-10 flex"
                style={{
                  appearance: "auto",
                }}>
                <svg className="text-white h-6 w-6 overflow-hidden" fill="rgb(0, 0, 0)" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" fill="rgb(255, 255, 255)" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className="content-start items-start flex-col h-min justify-start relative w-full flex gap-6"
          style={{
            flexShrink: "0",
          }}>
          <div
            className="auto-rows-min grid-cols-[490px_490px] grid-rows-[repeat(2,_min-content)] h-min justify-center relative w-full grid gap-6"
            style={{
              flexShrink: "0",
            }}>
            <div
              className="self-start justify-self-start relative w-[30.63rem]"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <a className="content-start items-start bg-neutral-900 text-blue-700 cursor-pointer flex-col flex-wrap h-min justify-start relative w-[30.63rem] flex rounded-3xl overflow-hidden p-6" href="https://bonsai.fyi/./blog/runwayml">
                  <div
                    className="content-start items-start flex-col h-min justify-start relative w-full flex gap-[0.63rem]"
                    style={{
                      flexShrink: "0",
                    }}>
                    <div
                      className="content-start items-start h-min justify-between relative w-full flex"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="h-16 relative w-16 rounded-xl"
                        style={{
                          flexShrink: "0",
                        }}>
                        <div
                          className="h-16 absolute select-none w-16 rounded-xl"
                          style={{
                            pointerEvents: "none",
                          }}>
                          <div className="contents rounded-xl">
                            <img
                              className="h-16 object-cover w-16 rounded-xl overflow-clip"
                              src="https://framerusercontent.com/images/WdrtGoQQPLQi2qu9217HMOGW7a8.png"
                              style={{
                                overflowClipMargin: "content-box",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-start items-start flex-col h-min justify-start min-w-[12.50rem] pt-3 relative w-full flex gap-1"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="flex-col justify-start absolute w-full flex"
                        style={{
                          flexShrink: "0",
                          wordBreak: "break-word",
                        }}>
                        <h2 className="text-white text-lg font-medium h-6 leading-[1.38rem] w-96">RunwayML</h2>
                      </div>
                      <div
                        className="flex-col justify-start absolute w-full flex"
                        style={{
                          flexShrink: "0",
                          wordBreak: "break-word",
                        }}>
                        <p className="text-zinc-500 font-medium h-12 leading-[1.63rem] w-96">Applying the composition and style of an image or text prompt to the structure of a source video </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-center items-center h-min justify-start pt-3.5 relative w-full flex gap-2 overflow-hidden"
                    style={{
                      flexShrink: "0",
                    }}>
                    <div
                      className="content-center items-center h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="flex-col justify-start absolute flex"
                        style={{
                          flexShrink: "0",
                        }}>
                        <p className="text-white font-medium h-5 leading-5 w-11">Video</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div
              className="self-start justify-self-start relative w-[30.63rem]"
              style={{
                flexShrink: "0",
              }}>
              <div className="contents">
                <a className="content-start items-start bg-neutral-900 text-blue-700 cursor-pointer flex-col flex-wrap h-min justify-start relative w-[30.63rem] flex rounded-3xl overflow-hidden p-6" href="https://bonsai.fyi/./blog/forefront-ai">
                  <div
                    className="content-start items-start flex-col h-min justify-start relative w-full flex gap-[0.63rem]"
                    style={{
                      flexShrink: "0",
                    }}>
                    <div
                      className="content-start items-start h-min justify-between relative w-full flex"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="h-16 relative w-16 rounded-xl"
                        style={{
                          flexShrink: "0",
                        }}>
                        <div
                          className="h-16 absolute select-none w-16 rounded-xl"
                          style={{
                            pointerEvents: "none",
                          }}>
                          <div className="contents rounded-xl">
                            <img
                              className="h-16 object-cover w-16 rounded-xl overflow-clip"
                              src="https://framerusercontent.com/images/lRLFFu2N9fMyUoKSiU0Nc2C904.png"
                              style={{
                                overflowClipMargin: "content-box",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-start items-start flex-col h-min justify-start min-w-[12.50rem] pt-3 relative w-full flex gap-1"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="flex-col justify-start absolute w-full flex"
                        style={{
                          flexShrink: "0",
                          wordBreak: "break-word",
                        }}>
                        <h2 className="text-white text-lg font-medium h-6 leading-[1.38rem] w-96">Forefront.ai</h2>
                      </div>
                      <div
                        className="flex-col justify-start absolute w-full flex"
                        style={{
                          flexShrink: "0",
                          wordBreak: "break-word",
                        }}>
                        <p className="text-zinc-500 font-medium h-12 leading-[1.63rem] w-96">Get access to GPT-4, image generation, custom personas, shareable chats, and more.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-center items-center h-min justify-start pt-3.5 relative w-full flex gap-2 overflow-hidden"
                    style={{
                      flexShrink: "0",
                    }}>
                    <div
                      className="content-center items-center h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="flex-col justify-start absolute flex"
                        style={{
                          flexShrink: "0",
                        }}>
                        <p className="text-white font-medium h-5 leading-5 w-8">GPT</p>
                      </div>
                    </div>
                    <div
                      className="content-center items-center h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden"
                      style={{
                        flexShrink: "0",
                      }}>
                      <div
                        className="flex-col justify-start absolute flex"
                        style={{
                          flexShrink: "0",
                        }}>
                        <p className="text-white font-medium h-5 leading-5 w-11">Video</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIToolsGrid;

