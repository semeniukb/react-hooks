import * as React from 'react'

export interface UseDocumentTitleOptions {
    restoreOnUnmount?: boolean
}

export type UseDocumentTitleReturn = [
    value: string,
    set: (title: string) => void,
]

export function useDocumentTitle(
    initialValue?: string,
    options?: UseDocumentTitleOptions
): UseDocumentTitleReturn {
    const prevTitleRef = React.useRef(document.title)
    const [title, setValue] = React.useState(initialValue ?? document.title)

    const set = (value: string) => {
        const updatedValue = value.trim()
        if (updatedValue.length > 0) document.title = updatedValue
    }

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            setValue((prevValue) => {
                if (document && document.title !== prevValue) {
                    return document.title
                }
                return prevValue
            })
        })

        observer.observe(document.head.querySelector('title')!, {
            childList: true,
        })

        return () => {
            observer.disconnect()
        }
    })

    React.useEffect(() => {
        if (options?.restoreOnUnmount) {
            return () => {
                document.title = prevTitleRef.current
            }
        }
    }, [])

    React.useEffect(() => {
        if (typeof title !== 'string') return
        set(title)
    }, [title])

    return [title, set]
}
