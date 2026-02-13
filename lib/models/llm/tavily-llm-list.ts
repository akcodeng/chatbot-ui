import { LLM } from "@/types"

const TAVILY_PLATFORM_LINK = "https://tavily.com/"

const TAVILY_SEARCH: LLM = {
  modelId: "tavily-search",
  modelName: "Tavily Search",
  provider: "tavily",
  hostedId: "tavily-search",
  platformLink: TAVILY_PLATFORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1K searches",
    inputCost: 0,
    outputCost: 0
  }
}

export const TAVILY_LLM_LIST: LLM[] = [TAVILY_SEARCH]
