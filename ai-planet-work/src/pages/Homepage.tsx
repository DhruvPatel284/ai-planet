'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle } from 'lucide-react'
import DocumentUpload from '../components/DocumentUpload'
import { BACKEND_URL } from "@/config"

interface Message {
  role: 'user' | 'ai' | 'system'
  content: string
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Welcome to AI Planet! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setError('')

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await axios.post(`${BACKEND_URL}/question/ask`, null, {
        params: {
          id:35,
          question: input
        }
      });
      const aiMessage: Message = { role: 'ai', content: response.data.answer.content }
      console.log(response)
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      setError('An error occurred while processing your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <DocumentUpload />
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 ml-2 rounded-full flex items-center justify-center text-white ${message.role === 'user' ? 'bg-blue-500' : message.role === 'ai' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {message.role === 'user' ? 'DP' : message.role === 'ai' ? 'AI' : 'S'}
                  </div>
                  <div className={`p-3  rounded-lg ${message.role === 'user' ? 'bg-blue-100 ' : message.role === 'ai' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex space-x-2">
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the uploaded document..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-2 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}