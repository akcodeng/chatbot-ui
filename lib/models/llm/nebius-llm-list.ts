import { LLM } from "@/types"

const NEBIUS_PLATFORM_LINK = "https://studio.nebius.ai/"

const NEBIUS_LLAMA_3_1_70B: LLM = {
  modelId: "meta-llama/Meta-Llama-3.1-70B-Instruct",
  modelName: "Llama 3.1 70B Instruct",
  provider: "nebius",
  hostedId: "meta-llama/Meta-Llama-3.1-70B-Instruct",
  platformLink: NEBIUS_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.13,
    outputCost: 0.13
  }
}

const NEBIUS_LLAMA_3_1_8B: LLM = {
  modelId: "meta-llama/Meta-Llama-3.1-8B-Instruct",
  modelName: "Llama 3.1 8B Instruct",
  provider: "nebius",
  hostedId: "meta-llama/Meta-Llama-3.1-8B-Instruct",
  platformLink: NEBIUS_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.02,
    outputCost: 0.02
  }
}

const NEBIUS_QWEN_72B: LLM = {
  modelId: "Qwen/Qwen2.5-72B-Instruct",
  modelName: "Qwen 2.5 72B Instruct",
  provider: "nebius",
  hostedId: "Qwen/Qwen2.5-72B-Instruct",
  platformLink: NEBIUS_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.15,
    outputCost: 0.15
  }
}

const NEBIUS_MIXTRAL_8X7B: LLM = {
  modelId: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  modelName: "Mixtral 8x7B Instruct",
  provider: "nebius",
  hostedId: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  platformLink: NEBIUS_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.06,
    outputCost: 0.06
  }
}

export const NEBIUS_LLM_LIST: LLM[] = [
  NEBIUS_LLAMA_3_1_70B,
  NEBIUS_LLAMA_3_1_8B,
  NEBIUS_QWEN_72B,
  NEBIUS_MIXTRAL_8X7B
]
