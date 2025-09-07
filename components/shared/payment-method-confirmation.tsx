"use client"

import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, CreditCard, Building2, Smartphone, CheckCircle } from "lucide-react"

interface PaymentMethodConfirmationProps {
  onClose: () => void
  onSave: () => void
  onCancel: () => void
  paymentData: {
    type: "Credit Card" | "PayPal" | "Google Pay" | "Apple Pay"
    cardType?: string
    lastFour?: string
    expiryDate?: string
    email?: string
    amount: number
  }
  isLoading?: boolean
}

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "Credit Card":
      return CreditCard
    case "PayPal":
      return Building2
    case "Google Pay":
    case "Apple Pay":
      return Smartphone
    default:
      return CreditCard
  }
}

const getPaymentColor = (type: string) => {
  switch (type) {
    case "Credit Card":
      return "bg-blue-100 text-blue-600"
    case "PayPal":
      return "bg-blue-100 text-blue-600"
    case "Google Pay":
      return "bg-green-100 text-green-600"
    case "Apple Pay":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-blue-100 text-blue-600"
  }
}

export function PaymentMethodConfirmation({ 
  onClose, 
  onSave, 
  onCancel, 
  paymentData, 
  isLoading = false 
}: PaymentMethodConfirmationProps) {
  const PaymentIcon = getPaymentIcon(paymentData.type)
  const iconColor = getPaymentColor(paymentData.type)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
              <PaymentIcon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Confirm Payment Method</CardTitle>
              <p className="text-sm text-gray-500">Review details before saving</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Payment Amount</span>
              <span className="text-lg font-bold text-gray-900">${paymentData.amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Payment Method</span>
              <span>{paymentData.type}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Payment Details</h3>
            
            {paymentData.type === "Credit Card" && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {paymentData.cardType} •••• {paymentData.lastFour}
                    </div>
                    <div className="text-xs text-gray-500">
                      Expires {paymentData.expiryDate}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentData.type === "PayPal" && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">PayPal Account</div>
                    <div className="text-xs text-gray-500">
                      {paymentData.email}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(paymentData.type === "Google Pay" || paymentData.type === "Apple Pay") && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{paymentData.type}</div>
                    <div className="text-xs text-gray-500">
                      {paymentData.cardType} •••• {paymentData.lastFour}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>This payment method will be saved for future use</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save to Payment Methods"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
