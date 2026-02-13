import { cn } from "@/lib/utils"
import mistral from "@/public/providers/mistral.png"
import groq from "@/public/providers/groq.png"
import perplexity from "@/public/providers/perplexity.png"
import { ModelProvider } from "@/types"
import {
  IconCloud,
  IconSearch,
  IconSparkles,
  IconServer
} from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "../icons/anthropic-svg"
import { GoogleSVG } from "../icons/google-svg"
import { OpenAISVG } from "../icons/openai-svg"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: ModelProvider
  height: number
  width: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as ModelProvider) {
    case "openai":
      return (
        <OpenAISVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "mistral":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={mistral.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    case "groq":
      return (
        <Image
          className={cn(
            "rounded-sm p-0",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={groq.src}
          alt="Groq"
          width={width}
          height={height}
        />
      )
    case "anthropic":
      return (
        <AnthropicSVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "google":
      return (
        <GoogleSVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "perplexity":
      return (
        <Image
          className={cn(
            "rounded-sm p-1",
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          src={perplexity.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    case "cloudflare":
      return (
        <IconCloud
          className={cn(
            "rounded-sm p-1",
            theme === "dark"
              ? "bg-[#F48120] text-white"
              : "border-DEFAULT border-[#F48120] text-[#F48120]"
          )}
          width={width}
          height={height}
        />
      )
    case "tavily":
      return (
        <IconSearch
          className={cn(
            "rounded-sm p-1",
            theme === "dark"
              ? "bg-[#0EA5E9] text-white"
              : "border-DEFAULT border-[#0EA5E9] text-[#0EA5E9]"
          )}
          width={width}
          height={height}
        />
      )
    case "nebius":
      return (
        <IconServer
          className={cn(
            "rounded-sm p-1",
            theme === "dark"
              ? "bg-[#5B21B6] text-white"
              : "border-DEFAULT border-[#5B21B6] text-[#5B21B6]"
          )}
          width={width}
          height={height}
        />
      )
    default:
      return <IconSparkles size={width} />
  }
}
