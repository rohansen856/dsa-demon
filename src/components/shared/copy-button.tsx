"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export function CopyButton({ text, ...props }: CopyButtonProps) {
  const [isCopied, setCopied] = useState(false)
  function copyText() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      console.log()
    }, 3000) // 3000 milliseconds = 3 seconds
  }
  return (
    <Button
      variant="outline"
      className={cn("hover:bg-background", props.className)}
      size="icon"
      onClick={copyText}
    >
      {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  )
}
