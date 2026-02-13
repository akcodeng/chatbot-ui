import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    const profileAny = profile as any
    checkApiKey(profileAny.cloudflare_api_key, "Cloudflare")

    const accountId = profileAny.cloudflare_account_id
    if (!accountId) {
      throw new Error("Cloudflare Account ID not found")
    }

    const apiKey = profileAny.cloudflare_api_key || ""

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${chatSettings.model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: messages.map((m: any) => ({
            role: m.role,
            content: m.content
          })),
          max_tokens:
            CHAT_SETTING_LIMITS[chatSettings.model]?.MAX_TOKEN_OUTPUT_LENGTH ??
            4096,
          stream: true
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Cloudflare AI error: ${errorText}`)
    }

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk)
        const lines = text.split("\n").filter(line => line.trim() !== "")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") {
              return
            }
            try {
              const parsed = JSON.parse(data)
              const content = parsed.response
              if (content) {
                controller.enqueue(new TextEncoder().encode(content))
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      }
    })

    const readableStream = response.body?.pipeThrough(transformStream)

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    })
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Cloudflare API Key not found. Please set it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
