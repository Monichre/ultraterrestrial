import { getXataClient } from '@/lib/xata/client'
import { WhosWhoGallery } from './components/whos-who-gallery'

export default async function WhosWho() {
  const xata = getXataClient()
  const data: any = await xata.db.personnel
    .select([
      'name',
      'bio',
      'role',
      'photo',
      'facebook',
      'twitter',
      'website',
      'instagram',
      'rank',
      'credibility',
      'popularity',
    ])
    .filter({
      rank: { $isNot: 0 },
    })
    .getAll()

  const personnel = await data.toSerializable()()
  return <WhosWhoGallery personnel={personnel} />
}
