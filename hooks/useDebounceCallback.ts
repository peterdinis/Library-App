"use client"

import { useMemo, useRef } from 'react'
import debounce from 'lodash.debounce'
import { useUnmount } from 'usehooks-ts'
import { ControlFunctions, DebounceOptions } from '@/types/HookTypes'

export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & ControlFunctions

export function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(
  func: T,
  delay = 500,
  options?: DebounceOptions,
): DebouncedState<T> {
  const debouncedFunc = useRef<ReturnType<typeof debounce> | null>(null)
  const isPendingRef = useRef(false)  // Track the pending state

  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel()
    }
  })

  const debounced = useMemo(() => {
    const debouncedFuncInstance = debounce((...args: Parameters<T>) => {
      isPendingRef.current = false
      return func(...args)
    }, delay, {
      ...options,
      leading: false,  // Set `leading` to false to handle `isPending` more easily
      trailing: true,
    })

    // Add the custom `isPending` method
    const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
      isPendingRef.current = true
      return debouncedFuncInstance(...args)
    }

    wrappedFunc.cancel = () => {
      debouncedFuncInstance.cancel()
      isPendingRef.current = false
    }

    wrappedFunc.flush = () => {
      debouncedFuncInstance.flush()
      isPendingRef.current = false
    }

    wrappedFunc.isPending = () => {
      return isPendingRef.current
    }

    debouncedFunc.current = debouncedFuncInstance

    return wrappedFunc
  }, [func, delay, options])

  return debounced
}
