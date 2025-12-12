"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, X, Eye, Search } from "lucide-react"

const applications = [
  {
    id: 1,
    studentName: "Aditya Sharma",
    grade: "Grade 5",
    parentName: "Rajesh Sharma",
    email: "rajesh@example.com",
    phone: "+977-XXX-XXXXXXX",
    date: "2024-03-15",
    status: "pending",
  },
  {
    id: 2,
    studentName: "Priya Thapa",
    grade: "Grade 8",
    parentName: "Anita Thapa",
    email: "anita@example.com",
    phone: "+977-XXX-XXXXXXX",
    date: "2024-03-14",
    status: "pending",
  },
  {
    id: 3,
    studentName: "Bikash Gurung",
    grade: "Kindergarten",
    parentName: "Suman Gurung",
    email: "suman@example.com",
    phone: "+977-XXX-XXXXXXX",
    date: "2024-03-12",
    status: "approved",
  },
]

export function AdminApplications() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admission Applications</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-4 border-2 border-border rounded-lg hover:border-[#F5A623]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#2C4F5E] text-lg">{app.studentName}</h3>
                    <p className="text-sm text-muted-foreground">Applying for {app.grade}</p>
                  </div>
                  <Badge
                    className={
                      app.status === "approved"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Parent: </span>
                    <span className="font-medium">{app.parentName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    <span className="font-medium">{app.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-medium">{app.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submitted: </span>
                    <span className="font-medium">{new Date(app.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#2C4F5E] text-[#2C4F5E] bg-transparent">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  {app.status === "pending" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
