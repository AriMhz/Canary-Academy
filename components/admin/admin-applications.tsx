"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, X, Eye, Search, Trash2 } from "lucide-react"



import { useState, useEffect } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Delete confirmation state
  const [deleteId, setDeleteId] = useState<string | number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // We need to keep the raw data to show all details
  const [rawData, setRawData] = useState<any[]>([])

  const updateStatus = async (id: string | number, newStatus: string) => {
    try {
      const response = await fetch('/api/admissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      })

      if (response.ok) {
        setApplications(prev => prev.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        ))
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus })
        }
      }
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const confirmDelete = (id: string | number) => {
    setDeleteId(id)
    setShowDeleteDialog(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/admissions?id=${deleteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setApplications(prev => prev.filter(app => app.id !== deleteId))
        setRawData(prev => prev.filter(app => app.id !== deleteId))
        setShowDeleteDialog(false)
        setDeleteId(null)
        if (selectedApp && selectedApp.id === deleteId) {
          setShowDetails(false)
          setSelectedApp(null)
        }
      }
    } catch (error) {
      console.error("Failed to delete application", error)
    }
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admissions')
        if (response.ok) {
          const data = await response.json()
          setRawData(data)
          // Map data to match the UI expectation if needed, or just use it directly
          // The form sends: firstName, lastName, gradeApplying, parentName, email, phone...
          // The UI expects: studentName, grade, parentName, email, phone, date, status
          const mappedData = data.map((item: any) => ({
            id: item._id,
            studentName: `${item.firstName} ${item.lastName}`,
            grade: item.gradeApplying === 'k' ? 'Kindergarten' : `Grade ${item.gradeApplying}`,
            parentName: item.parentName,
            email: item.email,
            phone: item.phone,
            date: item.submittedAt,
            status: item.status
          }))
          setApplications(mappedData.reverse()) // Show newest first
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) {
    return <div>Loading applications...</div>
  }

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
                        : app.status === "rejected"
                          ? "bg-red-100 text-red-700 hover:bg-red-100"
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

                <div className="flex gap-2 items-center flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#2C4F5E] text-[#2C4F5E] bg-transparent"
                    onClick={() => {
                      const fullDetails = rawData.find(d => d.id === app.id);
                      setSelectedApp(fullDetails || app);
                      setShowDetails(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>

                  {app.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => updateStatus(app.id, 'approved')}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatus(app.id, 'rejected')}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 ml-auto sm:ml-0"
                    onClick={() => confirmDelete(app.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{selectedApp.firstName} {selectedApp.lastName}</h3>
                  <p className="text-muted-foreground">Ref ID: {selectedApp.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      selectedApp.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : selectedApp.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {selectedApp.status.toUpperCase()}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 h-8 w-8"
                    onClick={() => confirmDelete(selectedApp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold border-b pb-1">Student Info</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-muted-foreground col-span-1">Full Name:</span>
                    <span className="col-span-2 font-medium">{selectedApp.firstName} {selectedApp.middleName} {selectedApp.lastName}</span>

                    <span className="text-muted-foreground col-span-1">Gender:</span>
                    <span className="col-span-2 font-medium capitalize">{selectedApp.gender}</span>

                    <span className="text-muted-foreground col-span-1">Grade:</span>
                    <span className="col-span-2 font-medium">{selectedApp.gradeApplying === 'k' ? 'Kindergarten' : `Grade ${selectedApp.gradeApplying}`}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold border-b pb-1">Parent/Guardian</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-muted-foreground col-span-1">Name:</span>
                    <span className="col-span-2 font-medium">{selectedApp.parentName}</span>

                    <span className="text-muted-foreground col-span-1">Relation:</span>
                    <span className="col-span-2 font-medium capitalize">{selectedApp.relationship}</span>

                    <span className="text-muted-foreground col-span-1">Phone:</span>
                    <span className="col-span-2 font-medium">{selectedApp.phone}</span>

                    <span className="text-muted-foreground col-span-1">Email:</span>
                    <span className="col-span-2 font-medium break-all">{selectedApp.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold border-b pb-1">Address</h4>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedApp.address}</p>
              </div>

              {selectedApp.additionalInfo && (
                <div className="space-y-3">
                  <h4 className="font-semibold border-b pb-1">Additional Information</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedApp.additionalInfo}</p>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t">
                {selectedApp.status === "pending" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        updateStatus(selectedApp.id, 'approved');
                        setShowDetails(false);
                      }}
                    >
                      Approve Application
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        updateStatus(selectedApp.id, 'rejected');
                        setShowDetails(false);
                      }}
                    >
                      Reject Application
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setShowDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admission application from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
