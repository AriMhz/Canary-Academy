"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { galleryImages } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"

const categories = ["All", "Campus", "Facilities", "Events"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/gallery-hero-bg.jpg"
          alt="Gallery Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Gallery</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our campus, facilities, and the vibrant life at Canary Academy through these moments captured in
              time.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#F5A623] hover:bg-[#FFB84D] text-white"
                    : "border-2 border-[#2C4F5E] text-[#2C4F5E] hover:bg-[#2C4F5E] hover:text-white bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer group hover:shadow-premium transition-all duration-300"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative h-64 bg-muted">
                  <Image
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white mb-2">{image.category}</Badge>
                    <h3 className="text-lg font-bold text-white">{image.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative max-w-5xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filteredImages[selectedImage].image || "/placeholder.svg"}
              alt={filteredImages[selectedImage].title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white mb-2">
                {filteredImages[selectedImage].category}
              </Badge>
              <h3 className="text-2xl font-bold text-white">{filteredImages[selectedImage].title}</h3>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)
              }}
            >
              Previous
            </Button>
            <span className="text-white">
              {selectedImage + 1} / {filteredImages.length}
            </span>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
