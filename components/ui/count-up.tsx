"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
    end: number
    duration?: number
    suffix?: string
}

export function CountUp({ end, duration = 2000, suffix = "" }: CountUpProps) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number | null = null
        let animationFrameId: number

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step)
            }
        }

        animationFrameId = requestAnimationFrame(step)

        return () => cancelAnimationFrame(animationFrameId)
    }, [end, duration])

    return (
        <span>
            {count}
            {suffix}
        </span>
    )
}
