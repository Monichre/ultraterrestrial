// #docs: https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/examples.md#stream-tweets-in-real-time

import { TwitterApi, ETwitterStreamEvent } from 'twitter-api-v2'

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi(process.env.TWITTER_API_BEARER_TOKEN || '')

const twitterUsers = [
  '@JeremyCorbell',
  '@hollywoodufos',
  '@SteveBassett',
  '@I_D_Official',
  '@UFO_Rabbit_Hole',
  '@planethunter56',
  '@UAPJedi',
  '@UFOB_',
  '@ExploreSCU',
  '@rosscoulthart',
  '@Alien_Scientist',
  '@TheProjectUnity',
  '@alejandrotrojas',
  '@openmindstv',
  '@BrandonFugal',
  '@Coulthart_Zabel',
  '@HighPeaks77',
  '@uapcaucus',
  '@tomdelonge',
  '@Debriefmedia',
  '@ufouapam',
  '@ChrisKMellon',
  '@LueElizondo',
  '@g_knapp',
  '@JeremyCorbell',
  '@TheUfoJoe',
  '@PostDisclosure',
  '@tinyklaus',
  '@GalileoProject1',
]

export const searchUserTimeline = async (id) => {
  // id = 12 in the example provided
  const jackTimeline = await twitterClient.v2.userTimeline(id, {
    expansions: [
      'attachments.media_keys',
      'attachments.poll_ids',
      'referenced_tweets.id',
    ],
    'media.fields': ['url'],
  })

  // jackTimeline.includes contains a TwitterV2IncludesHelper instance
  for await (const tweet of jackTimeline) {
    const medias = jackTimeline.includes.medias(tweet)
    const poll = jackTimeline.includes.poll(tweet)

    if (medias.length) {
      console.log(
        'This tweet contains medias! URLs:',
        medias.map((m) => m.url)
      )
    }
    if (poll) {
      console.log(
        'This tweet contains a poll! Options:',
        poll.options.map((opt) => opt.label)
      )
    }
  }
}

export const streamTweets = async () => {
  const rules = await twitterClient.v2.streamRules()
  if (rules.data?.length) {
    await twitterClient.v2.updateStreamRules({
      delete: { ids: rules.data.map((rule) => rule.id) },
    })
  }

  // Add our rules
  await twitterClient.v2.updateStreamRules({
    add: [{ value: 'JavaScript' }, { value: 'NodeJS' }],
  })

  const stream = await twitterClient.v2.searchStream({
    'tweet.fields': ['referenced_tweets', 'author_id'],
    expansions: ['referenced_tweets.id'],
  })
  // Enable auto reconnect
  stream.autoReconnect = true

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    // Ignore RTs or self-sent tweets
    const isARt =
      tweet.data.referenced_tweets?.some(
        (tweet) => tweet.type === 'retweeted'
      ) ?? false
    // if (isARt || tweet.data.author_id === meAsUser.id_str) {
    //   return
    // }

    // Reply to tweet
    // await twitterClient.v1.reply(
    //   'Did you talk about JavaScript? love it!',
    //   tweet.data.id
    // )
  })
}

export const searchRecentTweets = async (searchTerm = 'ufos') => {
  const jsTweets = await twitterClient.v2.search('searchTerm', {
    'media.fields': 'url',
  })

  // Consume every possible tweet of jsTweets (until rate limit is hit)
  for await (const tweet of jsTweets) {
    console.log(tweet)
  }
}
