"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, X, Lock } from "lucide-react"
import { CreditCardData, mockApi } from "@/lib/constants"
import { PaymentMethodConfirmation } from "./payment-method-confirmation"

interface CreditCardPaymentProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
}

export function CreditCardPayment({ onClose, onSuccess, amount }: CreditCardPaymentProps) {
  const [formData, setFormData] = useState<CreditCardData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<CreditCardData>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const validateForm = () => {
    const newErrors: Partial<CreditCardData> = {}
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid card number"
    }
    
    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = "Please enter a valid expiry date"
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter cardholder name"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const result = await mockApi.processCreditCardPayment(formData, amount)
      setShowConfirmation(true)
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePaymentMethod = async () => {
    setIsSaving(true)
    
    try {
      // Extract card type from card number (simplified)
      const cardType = formData.cardNumber.startsWith("4") ? "Visa" : 
                      formData.cardNumber.startsWith("5") ? "Mastercard" : "Credit Card"
      
      await mockApi.savePaymentMethod({
        type: "Credit Card",
        cardType,
        lastFour: formData.cardNumber.replace(/\s/g, "").slice(-4),
        expiryDate: formData.expiryDate,
        isDefault: false
      })
      
      // Process the payment
      const result = await mockApi.processCreditCardPayment(formData, amount)
      onSuccess(result)
    } catch (error) {
      console.error("Failed to save payment method:", error)
      // Still process payment even if saving fails
      const result = await mockApi.processCreditCardPayment(formData, amount)
      onSuccess(result)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSkipSaving = async () => {
    try {
      const result = await mockApi.processCreditCardPayment(formData, amount)
      onSuccess(result)
    } catch (error) {
      console.error("Payment failed:", error)
    }
  }

  const handleInputChange = (field: keyof CreditCardData, value: string) => {
    let formattedValue = value
    
    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (showConfirmation) {
    return (
      <PaymentMethodConfirmation
        onClose={() => setShowConfirmation(false)}
        onSave={handleSavePaymentMethod}
        onCancel={handleSkipSaving}
        paymentData={{
          type: "Credit Card",
          cardType: formData.cardNumber.startsWith("4") ? "Visa" : 
                   formData.cardNumber.startsWith("5") ? "Mastercard" : "Credit Card",
          lastFour: formData.cardNumber.replace(/\s/g, "").slice(-4),
          expiryDate: formData.expiryDate,
          amount
        }}
        isLoading={isSaving}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Credit/Debit Card</CardTitle>
              <p className="text-sm text-gray-500">Amount: ${amount.toFixed(2)}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Card Number
              </label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className={errors.cardNumber ? "border-red-500" : ""}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cardholder Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                className={errors.cardholderName ? "border-red-500" : ""}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Expiry Date
                </label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={errors.expiryDate ? "border-red-500" : ""}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  CVV
                </label>
                <Input
                  type="text"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={errors.cvv ? "border-red-500" : ""}
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
              <Lock className="w-3 h-3" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Payment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
