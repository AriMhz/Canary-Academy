import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageIcon, X, Video, Upload, Plus, Trash2 } from "lucide-react"

export interface FormFieldProps {
    label: string
    children: React.ReactNode
    description?: string
}

export function FormField({ label, children, description }: FormFieldProps) {
    return (
        <div className="space-y-2 mb-4">
            <Label className="text-[#2C4F5E] font-medium text-sm">{label}</Label>
            {children}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
    )
}

export function TextInput({
    value,
    onChange,
    placeholder,
    className,
}: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}) {
    return (
        <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`bg-white ${className || ''}`}
        />
    )
}

export function TextAreaInput({
    value,
    onChange,
    rows = 3,
    placeholder,
    className,
}: {
    value: string
    onChange: (value: string) => void
    rows?: number
    placeholder?: string
    className?: string
}) {
    return (
        <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className={`bg-white resize-y ${className || ''}`}
        />
    )
}

export function NumberInput({
    value,
    onChange,
}: {
    value: number | string
    onChange: (value: number) => void
}) {
    return (
        <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-white"
        />
    )
}

export function ImageInput({
    value,
    onChange,
    onUpload,
    label = "Upload Image",
}: {
    value: string
    onChange: (value: string) => void
    onUpload: (file: File) => void
    label?: string
}) {
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onUpload(file)
        }
    }

    return (
        <div className="space-y-3">
            {value && (
                <div className="relative aspect-video max-w-xs rounded-md overflow-hidden bg-muted border">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => onChange("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 bg-white"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload Image"
                    className="bg-white"
                >
                    <Upload className="h-4 w-4" />
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export function VideoInput({
    value,
    onChange,
    onUpload,
}: {
    value: string
    onChange: (value: string) => void
    onUpload: (file: File) => void
}) {
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onUpload(file)
        }
    }

    return (
        <div className="space-y-3">
            {value && (
                <div className="relative aspect-video max-w-xs rounded-md overflow-hidden bg-black border">
                    <video src={value} controls className="w-full h-full object-contain" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => onChange("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Video URL"
                    className="flex-1 bg-white"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload Video"
                    className="bg-white"
                >
                    <Upload className="h-4 w-4" />
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export function FileInput({
    value,
    onChange,
    onUpload,
    label = "Upload File",
    accept = "image/*,.pdf",
}: {
    value: string
    onChange: (value: string) => void
    onUpload: (file: File) => void
    label?: string
    accept?: string
}) {
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onUpload(file)
        }
    }

    const isPDF = value.toLowerCase().endsWith('.pdf') || value.includes('data:application/pdf')
    const isImage = !isPDF && value

    return (
        <div className="space-y-3">
            {value && (
                <div className="relative w-full rounded-md bg-muted border p-4">
                    {isImage ? (
                        <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    ) : isPDF ? (
                        <div className="flex items-center gap-3 p-3 bg-white rounded">
                            <div className="p-2 bg-red-100 rounded">
                                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">PDF File</p>
                                <p className="text-xs text-gray-500">Click to view</p>
                            </div>
                        </div>
                    ) : null}
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => onChange("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <div className="flex flex-col gap-2">
                <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white"
                >
                    <Upload className="h-4 w-4 mr-2" />
                    {label}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={accept}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export function ArrayInput<T>({
    items,
    onAdd,
    onRemove,
    renderItem,
    itemLabel,
}: {
    items: T[]
    onAdd: () => void
    onRemove: (index: number) => void
    renderItem: (item: T, index: number) => React.ReactNode
    itemLabel: string
}) {
    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="relative p-4 border rounded-lg bg-slate-50">
                    <div className="absolute top-2 right-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(index)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="pr-6">
                        <Label className="uppercase text-xs font-bold text-muted-foreground mb-2 block">
                            {itemLabel} {index + 1}
                        </Label>
                        {renderItem(item, index)}
                    </div>
                </div>
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={onAdd}
                className="w-full border-dashed border-2"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add {itemLabel}
            </Button>
        </div>
    )
}
