"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react" // Using AI SDK for chat functionality [^1][^2]
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Send, Trash2, AlertCircle, ChevronLeft, Loader2, MoreHorizontal, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import FirOutput from "@/components/fir-output"

export default function ChatPage() {
  const router = useRouter()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showMobileFir, setShowMobileFir] = useState(false)

  // Using AI SDK's useChat hook for chat functionality [^1][^2]
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop, setMessages } = useChat({
    api: "/api/chat", // Our custom API endpoint
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get a response. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle form submission with custom loading state
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === "") return
    handleSubmit(e)
  }

  // Clear chat with confirmation
  const clearChat = () => {
    if (showClearConfirm) {
      setMessages([])
      setShowClearConfirm(false)
      toast({
        title: "Chat cleared",
        description: "All messages have been removed.",
      })
    } else {
      setShowClearConfirm(true)
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowClearConfirm(false), 3000)
    }
  }

  // Check if any message contains FIR data
  const hasFirData = messages.some(
    (message) =>
      message.role === "assistant" &&
      message.content.includes("FIR") &&
      (message.content.includes("Crime Type") || message.content.includes("Section")),
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen bg-background overflow-auto" >
        {/* Header */}
        <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex items-center gap-2 mr-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Back to home</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Back to home</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                  FIR
                </div>
                <span className="font-semibold hidden sm:inline-block">AI FIR Assistant</span>
              </div>
            </div>

            <div className="flex-1 flex justify-end items-center gap-2">
              {hasFirData && (
                <Sheet open={showMobileFir} onOpenChange={setShowMobileFir}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>View FIR</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                    <div className="h-full flex flex-col">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-lg">Generated FIR Report</h3>
                      </div>
                      <ScrollArea className="flex-1 p-4">
                        <FirOutput messages={messages} />
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chat Options</DialogTitle>
                    <DialogDescription>Manage your chat session</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Button variant="outline" className="justify-start gap-2" onClick={clearChat}>
                      <Trash2 className="h-4 w-4" />
                      Clear conversation
                    </Button>
                    {error && (
                      <Button variant="outline" className="justify-start gap-2" onClick={reload}>
                        <AlertCircle className="h-4 w-4" />
                        Retry last message
                      </Button>
                    )}
                    {isLoading && (
                      <Button variant="outline" className="justify-start gap-2 text-destructive" onClick={stop}>
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
                          className="lucide lucide-square"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                        </svg>
                        Stop generating
                      </Button>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Chat Container */}
            <div className="lg:col-span-2 flex flex-col">
              <Card className="flex-1 overflow-hidden flex flex-col animate-fade-in-up shadow-sm">
                <ScrollArea className="flex-1 p-4 space-y-4">
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-4 max-w-md mx-auto p-6 rounded-lg bg-muted/40 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary">
                          <MessageSquare className="h-8 w-8" />
                        </div>
                        <h2 className="text-xl font-semibold">Welcome to AI FIR Assistant!</h2>
                        <p className="text-muted-foreground">
                          How can I help you today? Describe the incident, and I'll help generate an FIR report.
                        </p>
                        <div className="pt-4">
                          <Badge variant="outline" className="mr-2 mb-2">
                            Theft incident
                          </Badge>
                          <Badge variant="outline" className="mr-2 mb-2">
                            Vehicle accident
                          </Badge>
                          <Badge variant="outline" className="mr-2 mb-2">
                            Property damage
                          </Badge>
                          <Badge variant="outline" className="mr-2 mb-2">
                            Assault case
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat Messages */}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start",
                        "animate-message-fade-in mb-4",
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none",
                        )}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>

                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarFallback className="bg-secondary">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* AI Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start animate-message-fade-in mb-4">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3 rounded-tl-none">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="flex justify-center animate-message-fade-in">
                      <div className="bg-destructive/10 text-destructive rounded-lg p-3 flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5" />
                        <span>Failed to get a response. Please try again.</span>
                        <Button variant="outline" size="sm" onClick={reload}>
                          Retry
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Invisible element for auto-scrolling */}
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input Form */}
                <div className="p-3 border-t">
                  <form onSubmit={onSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Describe the incident..."
                      className="flex-1 px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      disabled={isLoading}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || input.trim() === ""}
                            className="rounded-full w-10 h-10 flex items-center justify-center transition-all"
                          >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </form>
                </div>
              </Card>
            </div>

            {/* FIR Output Panel */}
            <div className="hidden lg:block lg:col-span-1">
              <Card className="h-full overflow-hidden flex flex-col animate-fade-in-up shadow-sm">
                <Tabs defaultValue="fir" className="h-full flex flex-col">
                  <div className="px-4 pt-3 border-b">
                    <TabsList className="w-full">
                      <TabsTrigger value="fir" className="flex-1">
                        FIR Report
                      </TabsTrigger>
                      <TabsTrigger value="help" className="flex-1">
                        Help
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="fir" className="flex-1 overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      {hasFirData ? (
                        <FirOutput messages={messages} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-center text-muted-foreground p-4">
                          <div className="space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                              <FileText className="h-6 w-6 text-muted-foreground/60" />
                            </div>
                            <p className="mb-2">No FIR report generated yet</p>
                            <p className="text-sm">Describe an incident to the assistant to generate an FIR report.</p>
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="help" className="flex-1 overflow-auto">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-lg mb-2">How to use the FIR Assistant</h3>
                          <div className="space-y-2 text-muted-foreground">
                            <p className="text-sm">1. Describe the incident in detail in the chat</p>
                            <p className="text-sm">2. Include relevant information like:</p>
                            <ul className="list-disc pl-5 text-sm">
                              <li>Location and time of incident</li>
                              <li>People involved</li>
                              <li>Nature of the crime</li>
                              <li>Any evidence or witnesses</li>
                            </ul>
                            <p className="text-sm">3. The AI will generate an FIR report based on your description</p>
                            <p className="text-sm">4. Review the FIR in the panel and copy it if needed</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg mb-2">Example Prompts</h3>
                          <div className="space-y-2">
                            <div className="bg-muted p-2 rounded-md text-sm">
                              "My car was stolen from the parking lot of City Mall yesterday around 8 PM. It's a red
                              Honda Civic with license plate ABC-123. I had parked it at 6 PM and when I returned at 8
                              PM, it was gone. There are CCTV cameras in the area."
                            </div>
                            <div className="bg-muted p-2 rounded-md text-sm">
                              "I want to report a break-in at my shop on Main Street. It happened last night. The front
                              glass door was broken, and some cash and electronics were stolen. The total value is
                              approximately $2,000."
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg mb-2">Tips for Better Results</h3>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground">
                            <li>Be specific about dates, times, and locations</li>
                            <li>Describe the incident chronologically</li>
                            <li>Include names and contact details of involved parties</li>
                            <li>Mention any evidence or witnesses</li>
                            <li>Specify the type of crime or incident</li>
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

