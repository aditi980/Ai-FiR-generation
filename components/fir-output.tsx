"use client"

import { useState } from "react"
import { Copy, Check, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FirOutputProps {
  messages: {
    id: string
    role: "user" | "assistant" | "system"
    content: string
  }[]
}

export default function FirOutput({ messages }: FirOutputProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Find the last assistant message that contains FIR data
  const firMessage = [...messages]
    .reverse()
    .find(
      (message) =>
        message.role === "assistant" &&
        message.content.includes("FIR") &&
        (message.content.includes("Crime Type") || message.content.includes("Section")),
    )

  if (!firMessage) {
    return (
      <div className="flex items-center justify-center h-full text-center text-muted-foreground">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
          </div>
          <p className="mb-2">No FIR report generated yet</p>
          <p className="text-sm">Describe an incident to the assistant to generate an FIR report.</p>
        </div>
      </div>
    )
  }

  // Parse FIR data from the message
  // This is a simple implementation - in a real app, you'd want more structured data
  const firContent = firMessage.content

  // Extract key information for display
  const extractInfo = (content: string) => {
    const caseMatch = content.match(/Case Number:?\s*([^\n]+)/i)
    const dateMatch = content.match(/Date:?\s*([^\n]+)/i)
    const locationMatch = content.match(/Location:?\s*([^\n]+)/i)
    const crimeTypeMatch = content.match(/Crime Type:?\s*([^\n]+)/i)

    return {
      caseNumber: caseMatch ? caseMatch[1].trim() : "N/A",
      date: dateMatch ? dateMatch[1].trim() : "N/A",
      location: locationMatch ? locationMatch[1].trim() : "N/A",
      crimeType: crimeTypeMatch ? crimeTypeMatch[1].trim() : "N/A",
    }
  }

  const info = extractInfo(firContent)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(firContent)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "FIR report has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsTxt = () => {
    const element = document.createElement("a")
    const file = new Blob([firContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `FIR_Report_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Downloaded",
      description: "FIR report has been downloaded as a text file.",
    })
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Generated FIR Report</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <span>Actions</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" />
              <span>Copy to clipboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAsTxt} className="gap-2">
              <Download className="h-4 w-4" />
              <span>Download as text</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary Card */}
      <Card className="mb-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold">FIR Summary</h4>
            <Badge variant="outline">{info.crimeType}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Case Number</p>
              <p className="font-medium">{info.caseNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{info.date}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{info.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full FIR Content */}
      <div className="bg-muted/40 rounded-lg p-4 border relative group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8 rounded-full">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <pre className="whitespace-pre-wrap text-sm font-mono">{firContent}</pre>
      </div>
    </div>
  )
}

