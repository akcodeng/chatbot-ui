import { LLM } from "@/types"

const CLOUDFLARE_PLATFORM_LINK = "https://developers.cloudflare.com/workers-ai/"

const CF_LLAMA_3_1_8B: LLM = {
  modelId: "@cf/meta/llama-3.1-8b-instruct",
  modelName: "Llama 3.1 8B Instruct",
  provider: "cloudflare",
  hostedId: "@cf/meta/llama-3.1-8b-instruct",
  platformLink: CLOUDFLARE_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0,
    outputCost: 0
  }
}

const CF_LLAMA_3_1_70B: LLM = {
  modelId: "@cf/meta/llama-3.1-70b-instruct",
  modelName: "Llama 3.1 70B Instruct",
  provider: "cloudflare",
  hostedId: "@cf/meta/llama-3.1-70b-instruct",
  platformLink: CLOUDFLARE_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0,
    outputCost: 0
  }
}

const CF_MISTRAL_7B: LLM = {
  modelId: "@cf/mistral/mistral-7b-instruct-v0.1",
  modelName: "Mistral 7B Instruct v0.1",
  provider: "cloudflare",
  hostedId: "@cf/mistral/mistral-7b-instruct-v0.1",
  platformLink: CLOUDFLARE_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0,
    outputCost: 0
  }
}

const CF_QWEN_14B: LLM = {
  modelId: "@cf/qwen/qwen1.5-14b-chat-awq",
  modelName: "Qwen 1.5 14B Chat",
  provider: "cloudflare",
  hostedId: "@cf/qwen/qwen1.5-14b-chat-awq",
  platformLink: CLOUDFLARE_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0,
    outputCost: 0
  }
}

export const CLOUDFLARE_LLM_LIST: LLM[] = [
  CF_LLAMA_3_1_8B,
  CF_LLAMA_3_1_70B,
  CF_MISTRAL_7B,
  CF_QWEN_14B
]
