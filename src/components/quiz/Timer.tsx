
import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  startTime: Date
  onTimeUpdate?: (timeSpent: number) => void
  className?: string
}

const Timer = ({ startTime, onTimeUpdate, className = "" }: TimerProps) => {
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date()
      const elapsed = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
      setTimeSpent(elapsed)
      
      if (onTimeUpdate) {
        onTimeUpdate(elapsed)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, onTimeUpdate])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="h-4 w-4" />
      <span className="font-mono text-sm">
        {formatTime(timeSpent)}
      </span>
    </div>
  )
}

export default Timer
