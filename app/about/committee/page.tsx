"use client"

import { Container } from "@/components/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { User, Users, Phone, Mail } from "lucide-react"
import { getAssetPath } from "@/lib/get-base-path"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCMS } from "@/lib/cms-context"

// Helper function to get image source
function getImageSrc(imagePath: string | undefined, fallback: string = ""): string {
    if (!imagePath) return fallback
    if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    }
    return getAssetPath(imagePath)
}

export default function CommitteePage() {
    const { content } = useCMS()
    const committee = content.about.committee

    // Get members from CMS with auto-incremented serial numbers
    const getMembersWithSN = (members: Array<{ name: string; designation: string; image: string; phone?: string; email?: string }>) => {
        return members.map((member, index) => ({
            sn: index + 1,
            name: member.name,
            designation: member.designation,
            photo: member.image || null,
            phone: member.phone,
            email: member.email
        }))
    }

    const smcMembers = getMembersWithSN(committee.smc?.members || [])
    const socMembers = getMembersWithSN(committee.soc?.members || [])
    const tpaMembers = getMembersWithSN(committee.tpa?.members || [])

    const MemberCard = ({ member }: { member: ReturnType<typeof getMembersWithSN>[0] }) => (
        <Card className="overflow-hidden border-none shadow-premium hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center">
                <div className="w-40 h-40 mb-4 relative rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                    {member.photo ? (
                        <Image
                            src={getImageSrc(member.photo)}
                            alt={member.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <User className="w-20 h-20 text-gray-300" />
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-[#2C4F5E] text-center mb-1 group-hover:text-[#F5A623] transition-colors">
                    {member.name}
                </h3>
                <p className="text-muted-foreground font-medium text-center mb-6 px-4">
                    {member.designation}
                </p>

                <div className="w-full space-y-3 border-t border-gray-100 pt-4">
                    {member.phone && (
                        <a href={`tel:${member.phone} `} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#2C4F5E] transition-colors p-2 rounded-md hover:bg-gray-50">
                            <Phone className="w-4 h-4 text-[#F5A623]" />
                            <span className="font-medium">{member.phone}</span>
                        </a>
                    )}
                    {member.email && (
                        <a href={`mailto:${member.email} `} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#2C4F5E] transition-colors p-2 rounded-md hover:bg-gray-50">
                            <Mail className="w-4 h-4 text-[#F5A623]" />
                            <span className="truncate max-w-[200px]" title={member.email}>{member.email}</span>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    )

    const CommitteeSection = ({ title, description, members }: { title: string, description: string, members: typeof smcMembers }) => (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-2xl font-bold text-[#2C4F5E] mb-2">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <MemberCard key={member.sn} member={member} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="text-muted-foreground">No committee members found.</p>
                </div>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10">
            {/* Header Section */}
            <header className="bg-[#2C4F5E] text-white py-16 mb-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Committees</h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">Meet our dedicated committee members working for the school's progress.</p>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-6xl">
                <Tabs defaultValue="smc" className="w-full space-y-8">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent p-0">
                        <TabsTrigger
                            value="smc"
                            className="bg-white border hover:bg-gray-50 data-[state=active]:bg-[#F5A623] data-[state=active]:text-white data-[state=active]:border-[#F5A623] h-14 text-base font-semibold shadow-sm transition-all rounded-lg"
                        >
                            {committee.smc?.title || "SMC"}
                        </TabsTrigger>
                        <TabsTrigger
                            value="soc"
                            className="bg-white border hover:bg-gray-50 data-[state=active]:bg-[#F5A623] data-[state=active]:text-white data-[state=active]:border-[#F5A623] h-14 text-base font-semibold shadow-sm transition-all rounded-lg"
                        >
                            {committee.soc?.title || "SOC"}
                        </TabsTrigger>
                        <TabsTrigger
                            value="tpa"
                            className="bg-white border hover:bg-gray-50 data-[state=active]:bg-[#F5A623] data-[state=active]:text-white data-[state=active]:border-[#F5A623] h-14 text-base font-semibold shadow-sm transition-all rounded-lg"
                        >
                            {committee.tpa?.title || "TPA"}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="smc" className="mt-0 focus-visible:ring-0">
                        <CommitteeSection
                            title={committee.smc?.title || "School Management Committee"}
                            description={committee.smc?.description || "Leaders guiding our strategic vision."}
                            members={smcMembers}
                        />
                    </TabsContent>

                    <TabsContent value="soc" className="mt-0 focus-visible:ring-0">
                        <CommitteeSection
                            title={committee.soc?.title || "School Operation Committee"}
                            description={committee.soc?.description || "Ensuring smooth daily operations."}
                            members={socMembers}
                        />
                    </TabsContent>

                    <TabsContent value="tpa" className="mt-0 focus-visible:ring-0">
                        <CommitteeSection
                            title={committee.tpa?.title || "Parent Teacher Association"}
                            description={committee.tpa?.description || "Building bridges between home and school."}
                            members={tpaMembers}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
