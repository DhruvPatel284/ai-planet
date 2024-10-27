"use client"

import React, { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, Upload, AlertCircle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BACKEND_URL } from "@/config"

const DocumentUpload = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!documentFile) {
      setError("Please select a file to upload.")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("file", documentFile)

    try {
      const response = await axios.post(`${BACKEND_URL}/pdf/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response)
      if (response.status === 200) {
        setSuccess("Document uploaded successfully!")
        setUploadedFiles([...uploadedFiles, documentFile.name])
        setDocumentFile(null)
      } else {
        setError("Failed to upload document. Please try again.")
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      setError("An error occurred during upload. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-background shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Planet</h1>
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex items-center space-x-2">
              {uploadedFiles.map((file, index) => (
                <Badge key={index} variant="secondary">
                  {file}
                </Badge>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-64 file:mr-4 file: px-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-2 border-green-500 bg-green-50 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default DocumentUpload