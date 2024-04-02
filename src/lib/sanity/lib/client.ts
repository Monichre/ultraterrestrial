import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
  token:
    'skHkYBW2jPAMrCi5rgocL4NpXVCOJeCRC2RznwQscx8cEMwKi8GUT1ANF5p5wGNbSrExu8SWt9FInoOYzIvH6FMqMQgB36Pu0sG6UmzqfXuM7dWwiSM7KcX9bfcn3f8s4YeVlcHkcwCsXuL2iY3mOeORBhFpY6kUhd1tG6NecAl78IpUbU5H',
})
