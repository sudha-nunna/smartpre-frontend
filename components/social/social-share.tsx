"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle, Share2, Copy, CheckCircle, Send } from "lucide-react"

interface SocialShareProps {
  url?: string
  title: string
  description?: string
  hashtags?: string[]
  image?: string
  variant?: "button" | "inline" | "floating"
  size?: "sm" | "md" | "lg"
  showLabels?: boolean
}

export function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title,
  description = "",
  hashtags = [],
  image,
  variant = "inline",
  size = "md",
  showLabels = false,
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState("")

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.map((tag) => `#${tag}`).join(" ")

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${hashtags.join(",")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
  }

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks]
    if (platform === "copy") {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else if (platform === "native" && navigator.share) {
      navigator.share({
        title,
        text: description,
        url,
      })
    } else {
      window.open(link, "_blank", "width=600,height=400")
    }
  }

  const handleCustomShare = () => {
    const customText = customMessage || title
    const customUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customText)}&url=${encodedUrl}`
    window.open(customUrl, "_blank", "width=600,height=400")
    setIsOpen(false)
    setCustomMessage("")
  }

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      key: "facebook",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      key: "twitter",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      key: "linkedin",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      key: "whatsapp",
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-blue-500 hover:bg-blue-600",
      key: "telegram",
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      key: "email",
    },
  ]

  const buttonSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"

  if (variant === "button") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size={size}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <Share2 className={iconSize} />
            {showLabels && <span className="ml-2">Share</span>}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this content</DialogTitle>
            <DialogDescription>Choose how you'd like to share this with others</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.key}
                  variant="outline"
                  className={`${platform.color} text-white border-0 flex-col h-16 gap-1`}
                  onClick={() => handleShare(platform.key)}
                >
                  <platform.icon className="h-5 w-5" />
                  <span className="text-xs">{platform.name}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Share URL</Label>
              <div className="flex gap-2">
                <Input id="url" value={url} readOnly className="flex-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("copy")}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-message">Custom Message (Twitter)</Label>
              <Textarea
                id="custom-message"
                placeholder="Add your own message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="resize-none"
                rows={3}
              />
              <Button onClick={handleCustomShare} className="w-full bg-sky-500 hover:bg-sky-600">
                <Twitter className="h-4 w-4 mr-2" />
                Share Custom Tweet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (variant === "floating") {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
        <Card className="border-blue-200 shadow-lg">
          <CardContent className="p-2">
            <div className="flex flex-col gap-2">
              {socialPlatforms.slice(0, 4).map((platform) => (
                <Button
                  key={platform.key}
                  size="sm"
                  className={`${platform.color} text-white ${buttonSize}`}
                  onClick={() => handleShare(platform.key)}
                >
                  <platform.icon className={iconSize} />
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                className={`border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent ${buttonSize}`}
                onClick={() => handleShare("copy")}
              >
                {copied ? <CheckCircle className={iconSize} /> : <Link2 className={iconSize} />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Inline variant
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socialPlatforms.map((platform) => (
        <Button
          key={platform.key}
          size={size}
          className={`${platform.color} text-white ${buttonSize}`}
          onClick={() => handleShare(platform.key)}
        >
          <platform.icon className={iconSize} />
          {showLabels && <span className="ml-2">{platform.name}</span>}
        </Button>
      ))}
      <Button
        size={size}
        variant="outline"
        className={`border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent ${buttonSize}`}
        onClick={() => handleShare("copy")}
      >
        {copied ? <CheckCircle className={iconSize} /> : <Link2 className={iconSize} />}
        {showLabels && <span className="ml-2">{copied ? "Copied!" : "Copy Link"}</span>}
      </Button>
    </div>
  )
}
