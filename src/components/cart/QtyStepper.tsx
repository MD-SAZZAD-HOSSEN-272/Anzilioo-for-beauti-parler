'use client'

import { Minus, Plus } from 'lucide-react'

export default function QtyStepper({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2 bg-zinc-100 px-2 py-1 rounded-full">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full hover:bg-white"
      >
        <Minus size={14} />
      </button>

      <span className="w-8 text-center text-sm font-medium">
        {value}
      </span>

      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full hover:bg-white"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}