import type { CoreModel } from '@/lib/xata/models'

export type ImageProps = {
  id: string
  url: string
  signedUrl?: string
  attributes: {
    height: number
    width: number
  }
}
export type ModelWithImage = CoreModel & {
  photo?: ImageProps[]
  photos?: ImageProps[]
}
export type ModelImage = {}
export const formatModelWithImage = (model: ModelWithImage) => {
  console.log('model: ', model)
  if (model?.photo?.length) {
    return {
      ...model,
      photo: model?.photo[0],
    }
  }
  if (model?.photos?.length) {
    return {
      ...module,
      photo: model?.photos[0],
    }
  }
  return {
    ...model,
    photo: {
      url: '/atro-4.png',
    },
  }
}
