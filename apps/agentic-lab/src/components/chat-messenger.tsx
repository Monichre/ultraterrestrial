'use client'

import * as React from "react"
import { Loader2, MoreVertical, Send, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
}

export function ChatMessenger() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, content: "Hello! How can I help you today?", sender: "bot" },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
    }

    setMessages([...messages, newMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: "Thank you for your message. How else can I assist you?",
        sender: "bot",
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="Bot Avatar" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Chat Support</p>
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <MoreVertical className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-muted p-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  )
}