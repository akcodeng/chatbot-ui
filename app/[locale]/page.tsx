"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import {
  IconArrowRight,
  IconBrain,
  IconMessage,
  IconShield,
  IconDevices
} from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const providers = [
  { name: "Gemini", description: "Google AI", color: "text-blue-400" },
  { name: "Groq", description: "Fast Inference", color: "text-orange-400" },
  { name: "OpenRouter", description: "Multi-model", color: "text-green-400" },
  {
    name: "Cloudflare AI",
    description: "Workers AI",
    color: "text-amber-400"
  },
  { name: "Tavily", description: "AI Search", color: "text-sky-400" },
  { name: "Nebius", description: "AI Studio", color: "text-violet-400" },
  { name: "OpenAI", description: "GPT Models", color: "text-emerald-400" },
  { name: "Anthropic", description: "Claude", color: "text-rose-400" }
]

const features = [
  {
    icon: IconBrain,
    title: "Multi-Provider AI",
    description:
      "Access models from 10+ providers in one unified interface. Switch between models seamlessly."
  },
  {
    icon: IconMessage,
    title: "Rich Chat Experience",
    description:
      "Full markdown support, code highlighting, file uploads, and image generation built in."
  },
  {
    icon: IconShield,
    title: "Private & Secure",
    description:
      "Your API keys stay in your profile. Self-hostable with Supabase for complete data control."
  },
  {
    icon: IconDevices,
    title: "Responsive Design",
    description:
      "Works beautifully on desktop, tablet, and mobile. Progressive Web App support included."
  }
]

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex size-full flex-col items-center overflow-y-auto">
      {/* Hero Section */}
      <section className="flex w-full max-w-5xl flex-col items-center px-4 pb-16 pt-12 text-center md:pb-24 md:pt-20">
        <div className="mb-6">
          <ChatbotUISVG
            theme={theme === "dark" ? "dark" : "light"}
            scale={0.3}
          />
        </div>

        <h1 className="text-foreground text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          One Interface.
          <br />
          <span className="text-blue-500">Every AI Model.</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-pretty text-base leading-relaxed md:text-lg">
          Access Gemini, Groq, OpenRouter, Cloudflare AI, Tavily, Nebius, and
          more through a single, beautiful chat interface. Bring your own API
          keys and start chatting.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
            href="/login"
          >
            Start Chatting
            <IconArrowRight size={18} />
          </Link>
          <Link
            className="border-border text-foreground inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-colors hover:bg-accent"
            href="https://github.com/akcodeng/chatbot-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Link>
        </div>
      </section>

      {/* Provider Grid */}
      <section className="w-full max-w-5xl px-4 pb-16">
        <h2 className="text-foreground mb-8 text-center text-2xl font-semibold md:text-3xl">
          Supported AI Providers
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {providers.map(provider => (
            <div
              key={provider.name}
              className="bg-card border-border flex flex-col items-center rounded-xl border p-4 text-center transition-colors hover:border-blue-500/30 hover:bg-blue-500/5"
            >
              <div className={`text-lg font-semibold ${provider.color}`}>
                {provider.name}
              </div>
              <div className="text-muted-foreground mt-1 text-xs">
                {provider.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map(feature => (
            <div
              key={feature.title}
              className="bg-card border-border rounded-xl border p-6"
            >
              <feature.icon
                size={24}
                className="text-blue-500"
                stroke={1.5}
              />
              <h3 className="text-foreground mt-3 text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-muted-foreground w-full border-t px-4 py-6 text-center text-xs">
        Built with Next.js, Supabase, and Tailwind CSS.
      </footer>
    </div>
  )
}
