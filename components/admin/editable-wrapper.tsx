"use client"

import { useState } from "react"
import { Pencil, ImageIcon, Video } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface EditableTextWrapperProps {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  multiline?: boolean
  editMode?: boolean
}

export function EditableTextWrapper({
  value,
  onChange,
  children,
  multiline = false,
  editMode = false,
}: EditableTextWrapperProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  if (!editMode) {
    return <>{children}</>
  }

  const handleSave = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  return (
    <span className="relative group inline-block">
      {children}
      <Popover open={isEditing} onOpenChange={setIsEditing}>
        <PopoverTrigger asChild>
          <button
            className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F5A623] text-white rounded-full p-1 shadow-lg z-50"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsEditing(true)
            }}
          >
            <Pencil className="w-3 h-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <Label>Edit Text</Label>
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={4}
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  )
}

interface EditableImageWrapperProps {
  src: string
  alt: string
  onChange: (value: string) => void
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
  editMode?: boolean
  className?: string
  fill?: boolean
}

export function EditableImageWrapper({
  src,
  alt,
  onChange,
  onUpload,
  editMode = false,
  className = "",
  fill = false,
}: EditableImageWrapperProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(src)

  const handleSave = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  return (
    <div className="relative group inline-block">
      {fill ? (
        <Image src={src || "/placeholder.svg"} alt={alt} fill className={className} />
      ) : (
        <Image src={src || "/placeholder.svg"} alt={alt} width={500} height={300} className={className} />
      )}
      {editMode && (
        <>
          <Popover open={isEditing} onOpenChange={setIsEditing}>
            <PopoverTrigger asChild>
              <button
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F5A623] text-white rounded-full p-2 shadow-lg z-50"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsEditing(true)
                }}
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Label>Edit Image</Label>
                <Input
                  value={editValue.startsWith("data:") ? "" : editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="/images/image.jpg"
                />
                {onUpload && (
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (onUpload) onUpload(e)
                        setIsEditing(false)
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline" className="w-full">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                )}
                {editValue && editValue.startsWith("data:") && (
                  <div className="relative w-full h-32 rounded overflow-hidden border">
                    <Image src={editValue} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  )
}

interface EditableVideoWrapperProps {
  src: string
  onChange: (value: string) => void
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void
  editMode?: boolean
  className?: string
}

export function EditableVideoWrapper({
  src,
  onChange,
  onUpload,
  editMode = false,
  className = "",
}: EditableVideoWrapperProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(src)

  const handleSave = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  return (
    <div className="relative group inline-block">
      <video src={src} className={className} autoPlay loop muted playsInline />
      {editMode && (
        <>
          <Popover open={isEditing} onOpenChange={setIsEditing}>
            <PopoverTrigger asChild>
              <button
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F5A623] text-white rounded-full p-2 shadow-lg z-50"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsEditing(true)
                }}
              >
                <Video className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Label>Edit Video</Label>
                <Input
                  value={editValue.startsWith("data:") ? "" : editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="/videos/video.mp4"
                />
                {onUpload && (
                  <div className="relative">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (onUpload) onUpload(e)
                        setIsEditing(false)
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                )}
                {editValue && editValue.startsWith("data:") && (
                  <div className="relative w-full h-32 rounded overflow-hidden border">
                    <video src={editValue} controls className="w-full h-full" />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  )
}

