import { openai } from "@ai-sdk/openai" // Using AI SDK for OpenAI integration [^1][^2]
import { streamText } from "ai" // Using AI SDK for streaming text [^1][^2]

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Using AI SDK's streamText function [^1][^2]
    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are an AI FIR (First Information Report) Assistant. 
      Your job is to help users generate FIR reports based on incident descriptions.
      
      When a user describes an incident:
      1. Ask clarifying questions if needed
      2. Once you have enough information, generate a formal FIR report
      3. Format the FIR with clear sections: Case Number, Date & Time, Location, Complainant Details, Incident Description, Sections of Law, etc.
      4. Be professional, accurate, and helpful
      
      If the user asks for help or guidance, provide information about FIRs and how to file them.
      
      For the FIR report, use the following format:
      
      ===== FIRST INFORMATION REPORT =====
      
      Case Number: [Generate a realistic case number with format: FIR/YYYY/MM/DISTRICT/XXXX]
      Date: [Current date]
      Time: [Current time]
      Police Station: [Based on location mentioned or "To be determined"]
      
      COMPLAINANT DETAILS:
      Name: [Name from conversation or "As provided by complainant"]
      Contact: [Contact from conversation or "As provided by complainant"]
      Address: [Address from conversation or "As provided by complainant"]
      
      INCIDENT DETAILS:
      Date of Incident: [Date mentioned in conversation]
      Time of Incident: [Time mentioned in conversation]
      Location: [Location mentioned in conversation]
      
      Crime Type: [Identify the type of crime based on the description]
      
      DESCRIPTION:
      [Detailed description of the incident based on user input]
      
      SECTIONS APPLICABLE:
      [List relevant sections of the Indian Penal Code or other applicable laws]
      
      ACTIONS TAKEN:
      - FIR registered on [current date]
      - Investigation initiated
      - [Other relevant actions]
      
      STATUS: Under Investigation
      
      ===== END OF REPORT =====`,
      messages,
    })

    // If the user wants to generate an FIR, we'll call our FastAPI endpoint
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()

    if (
      lastUserMessage &&
      (lastUserMessage.content.toLowerCase().includes("generate fir") ||
        lastUserMessage.content.toLowerCase().includes("create fir"))
    ) {
      try {
        // Call the FastAPI endpoint
        const response = await fetch("http://localhost:8000/generate-fir/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate FIR from API")
        }

        // If successful, we'll continue with the normal response
        // The API response could be used to enhance the model's response
      } catch (error) {
        // If the API call fails, we'll still use the model's response
        console.error("Error calling FIR API:", error)
      }
    }

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

