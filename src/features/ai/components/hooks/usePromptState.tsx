'use client'

import { useState, useRef } from 'react'
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'

export const usePromptState = () => {
  const [promptValue, setPromptValue] = useState('')
  const [question, setQuestion] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [sources, setSources] = useState<{ name: string; url: string }[]>([])
  const [isLoadingSources, setIsLoadingSources] = useState(false)
  const [answer, setAnswer] = useState('')
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleDisplayResult = async (newQuestion?: string) => {
    newQuestion = newQuestion || promptValue

    setShowResult(true)
    setLoading(true)
    setQuestion(newQuestion)
    setPromptValue('')

    await Promise.all([
      handleSourcesAndAnswer(newQuestion),
      handleSimilarQuestions(newQuestion),
    ])

    setLoading(false)
  }

  async function handleSourcesAndAnswer(question: string) {
    setIsLoadingSources(true)
    let sourcesResponse = await fetch('/api/getSources', {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
    if (sourcesResponse.ok) {
      let sources = await sourcesResponse.json()

      setSources(sources)
    } else {
      setSources([])
    }
    setIsLoadingSources(false)

    const response = await fetch('/api/getAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, sources }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    if (response.status === 202) {
      const fullAnswer = await response.text()
      setAnswer(fullAnswer)
      return
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const onParse = (event: any) => {
      if (event.type === 'event') {
        const data = event.data
        try {
          const text = JSON.parse(data).text ?? ''
          setAnswer((prev) => prev + text)
        } catch (e) {
          console.error(e)
        }
      }
    }

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader()
    const decoder = new TextDecoder()
    const parser = createParser(onParse)
    let done = false
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      parser.feed(chunkValue)
    }
  }

  async function handleSimilarQuestions(question: string) {
    let res = await fetch('/api/getSimilarQuestions', {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
    let questions = await res.json()
    setSimilarQuestions(questions)
  }

  const reset = () => {
    setShowResult(false)
    setPromptValue('')
    setQuestion('')
    setAnswer('')
    setSources([])
    setSimilarQuestions([])
  }
  return {
    promptValue,
    setPromptValue,
    question,
    showResult,
    handleDisplayResult,

    sources,
    isLoadingSources,
    answer,
    similarQuestions,
    loading,
    chatContainerRef,
    reset,
    handleSourcesAndAnswer,
    handleSimilarQuestions,
  }
}
