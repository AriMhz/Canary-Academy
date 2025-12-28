"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"

export function AdmissionForm() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    gradeApplying: "",
    parentName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
    agreeTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json().catch(() => ({}))
        setSubmitError(data.error || "Failed to submit application. Please try again.")
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <Card className="shadow-premium">
        <CardContent className="p-12 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#2C4F5E]">{t("admissions.form.success.title")}</h3>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            {t("admissions.form.success.message")}
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-2 border-[#2C4F5E] text-[#2C4F5E]"
          >
            {t("admissions.form.buttons.submitAnother")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-premium">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#2C4F5E]">{t("admissions.form.labels.studentInfo")}</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t("admissions.form.labels.firstName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder={t("admissions.form.placeholders.firstName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">
                  {t("admissions.form.labels.middleName")}
                </Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleChange("middleName", e.target.value)}
                  placeholder={t("admissions.form.placeholders.middleName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t("admissions.form.labels.lastName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder={t("admissions.form.placeholders.lastName")}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">
                  {t("admissions.form.labels.gender")} <span className="text-red-500">*</span>
                </Label>
                <Select required value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("admissions.form.labels.selectGender")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("admissions.form.options.male")}</SelectItem>
                    <SelectItem value="female">{t("admissions.form.options.female")}</SelectItem>
                    <SelectItem value="other">{t("admissions.form.options.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradeApplying">
                  {t("admissions.form.labels.grade")} <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={formData.gradeApplying}
                  onValueChange={(value) => handleChange("gradeApplying", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("admissions.form.labels.selectGrade")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="k">{t("admissions.form.options.kindergarten")}</SelectItem>
                    <SelectItem value="1">{t("admissions.form.options.grade")} 1</SelectItem>
                    <SelectItem value="2">{t("admissions.form.options.grade")} 2</SelectItem>
                    <SelectItem value="3">{t("admissions.form.options.grade")} 3</SelectItem>
                    <SelectItem value="4">{t("admissions.form.options.grade")} 4</SelectItem>
                    <SelectItem value="5">{t("admissions.form.options.grade")} 5</SelectItem>
                    <SelectItem value="6">{t("admissions.form.options.grade")} 6</SelectItem>
                    <SelectItem value="7">{t("admissions.form.options.grade")} 7</SelectItem>
                    <SelectItem value="8">{t("admissions.form.options.grade")} 8</SelectItem>
                    <SelectItem value="9">{t("admissions.form.options.grade")} 9</SelectItem>
                    <SelectItem value="10">{t("admissions.form.options.grade")} 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#2C4F5E]">{t("admissions.form.labels.parentInfo")}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">
                  {t("admissions.form.labels.fullName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parentName"
                  required
                  value={formData.parentName}
                  onChange={(e) => handleChange("parentName", e.target.value)}
                  placeholder={t("admissions.form.placeholders.parentName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">
                  {t("admissions.form.labels.relationship")} <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={formData.relationship}
                  onValueChange={(value) => handleChange("relationship", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("admissions.form.labels.selectRelationship")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="father">{t("admissions.form.options.father")}</SelectItem>
                    <SelectItem value="mother">{t("admissions.form.options.mother")}</SelectItem>
                    <SelectItem value="guardian">{t("admissions.form.options.guardian")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {t("admissions.form.labels.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder={t("admissions.form.placeholders.email")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  {t("admissions.form.labels.phone")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={t("admissions.form.placeholders.phone")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                {t("admissions.form.labels.address")} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder={t("admissions.form.placeholders.address")}
                rows={3}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#2C4F5E]">{t("admissions.form.labels.additionalInfo")}</h3>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">{t("admissions.form.labels.specialReq")}</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                placeholder={t("admissions.form.placeholders.specialReq")}
                rows={4}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleChange("agreeTerms", checked as boolean)}
              required
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              {t("admissions.form.labels.terms")} <span className="text-red-500">*</span>
            </Label>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              <strong>Error:</strong> {submitError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white"
            disabled={!formData.agreeTerms || isSubmitting}
          >
            {isSubmitting ? t("admissions.form.buttons.submitting") : t("admissions.form.buttons.submit")}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t("admissions.form.helper")}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
