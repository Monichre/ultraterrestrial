const MemoryClient = require('mem0ai')

export const mem0AI = new MemoryClient(
  process.env.NEXT_PUBLIC_MEM0_API_KEY || ''
)
