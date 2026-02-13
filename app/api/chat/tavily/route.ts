import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.tavily_api_key, "Tavily")

    // Get the last user message as the search query
    const lastUserMessage = messages
      .filter((m: any) => m.role === "user")
      .pop()
    const query = lastUserMessage?.content || ""

    const tavilyResponse = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: profile.tavily_api_key,
        query,
        search_depth: "advanced",
        include_answer: true,
        max_results: 5
      })
    })

    if (!tavilyResponse.ok) {
      const errorText = await tavilyResponse.text()
      throw new Error(`Tavily API error: ${errorText}`)
    }

    const data = await tavilyResponse.json()

    // Format the response as markdown
    let formattedResponse = ""

    if (data.answer) {
      formattedResponse += `${data.answer}\n\n`
    }

    if (data.results && data.results.length > 0) {
      formattedResponse += "---\n\n**Sources:**\n\n"
      for (const result of data.results) {
        formattedResponse += `- [${result.title}](${result.url})\n`
        if (result.content) {
          formattedResponse += `  ${result.content.substring(0, 200)}...\n\n`
        }
      }
    }

    // Stream the formatted response character by character for a streaming effect
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const words = formattedResponse.split(" ")
        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "))
          await new Promise(resolve => setTimeout(resolve, 20))
        }
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    })
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Tavily API Key not found. Please set it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
