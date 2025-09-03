import type { Dispatch, SetStateAction } from 'react'
import * as React from 'react'

export interface UseCounterOptions {
    min?: number
    max?: number
}

export interface UseCounterReturn {
    set: Dispatch<SetStateAction<number>>
    value: number
    dec: (value?: number) => void
    inc: (value?: number) => void
    reset: () => void
}
export interface UseCounter {
    (initialValue?: number, options?: UseCounterOptions): UseCounterReturn
    (
        options: UseCounterOptions & { initialValue: number },
        initialValue: never
    ): UseCounterReturn
}

export const useCounter: UseCounter = (...params) => {
    const initialValue =
        typeof params[0] === 'number' ? params[0] : params[0]?.initialValue
    const { max = Number.POSITIVE_INFINITY, min = Number.NEGATIVE_INFINITY } =
        typeof params[0] === 'number'
            ? ((params[1] ?? {}) as UseCounterOptions)
            : ((params[0] ?? {}) as UseCounterOptions & {
                  initialValue: number
              })

    const [value, setValue] = React.useState(initialValue ?? 0)

    const inc = (value: number = 1) => {
        setValue((prevValue) => {
            if (typeof max === 'number' && prevValue === max) return prevValue
            return Math.max(Math.min(max, prevValue + value), min)
        })
    }

    const dec = (value: number = 1) => {
        setValue((prevValue) => {
            if (typeof min === 'number' && prevValue === min) return prevValue
            return Math.min(Math.max(min, prevValue - value), max)
        })
    }

    const set = (value: SetStateAction<number>) => {
        setValue((prevValue) => {
            return Math.max(
                min,
                Math.min(
                    max,
                    typeof value === 'number' ? value : value(prevValue)
                )
            )
        })
    }

    const reset = () => {
        const value = initialValue ?? 0
        setValue(value)
    }

    return { set, reset, inc, dec, value }
}
