export type CopiedValue = string | null

export type CopyFn = (text: string) => Promise<boolean>

export type DebounceOptions = {
    leading?: boolean
    trailing?: boolean
    maxWait?: number
  }
  
export type ControlFunctions = {
    cancel: () => void
    flush: () => void
    isPending: () => boolean
  }

 export type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
  }
  