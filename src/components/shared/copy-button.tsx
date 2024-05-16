"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  return (
    <Button
      variant="outline"
      className="hover:bg-background"
      size="icon"
      onClick={() => {
        navigator.clipboard.writeText(text)
      }}
    >
      <Copy className="size-4" />
    </Button>
  )
}
