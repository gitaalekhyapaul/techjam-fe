"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, CreditCard, Check } from "lucide-react"
import { GooglePayData, mockApi } from "@/constants/constants"
import { PaymentMethodConfirmation } from "./payment-method-confirmation"

interface GooglePayPaymentProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
}

const mockGooglePayCards = [
  {
    id: "1",
    lastFour: "4242",
    brand: "Visa",
    expiry: "12/25",
    isDefault: true
  },
  {
    id: "2", 
    lastFour: "5555",
    brand: "Mastercard",
    expiry: "08/26",
    isDefault: false
  },
  {
    id: "3",
    lastFour: "1234",
    brand: "American Express",
    expiry: "03/27",
    isDefault: false
  }
]

export function GooglePayPayment({ onClose, onSuccess, amount }: GooglePayPaymentProps) {
  const [selectedCard, setSelectedCard] = useState(mockGooglePayCards[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"select" | "confirm">("select")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handlePay = async () => {
    setIsLoading(true)
    
    try {
      const result = await mockApi.processGooglePayPayment({
        selectedCard,
        amount
      })
      setShowConfirmation(true)
    } catch (error) {
      console.error("Google Pay payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePaymentMethod = async () => {
    setIsSaving(true)
    
    try {
      const selectedCardData = mockGooglePayCards.find(card => card.id === selectedCard)
      await mockApi.savePaymentMethod({
        type: "Google Pay",
        cardType: selectedCardData?.brand || "Credit Card",
        lastFour: selectedCardData?.lastFour || "0000",
        expiryDate: selectedCardData?.expiry || "12/25",
        isDefault: false
      })
      
      const result = await mockApi.processGooglePayPayment({
        selectedCard,
        amount
      })
      onSuccess(result)
    } catch (error) {
      console.error("Failed to save payment method:", error)
      const result = await mockApi.processGooglePayPayment({
        selectedCard,
        amount
      })
      onSuccess(result)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSkipSaving = async () => {
    try {
      const result = await mockApi.processGooglePayPayment({
        selectedCard,
        amount
      })
      onSuccess(result)
    } catch (error) {
      console.error("Google Pay payment failed:", error)
    }
  }

  const selectedCardData = mockGooglePayCards.find(card => card.id === selectedCard)

  if (showConfirmation) {
    return (
      <PaymentMethodConfirmation
        onClose={() => setShowConfirmation(false)}
        onSave={handleSavePaymentMethod}
        onCancel={handleSkipSaving}
        paymentData={{
          type: "Google Pay",
          cardType: selectedCardData?.brand || "Credit Card",
          lastFour: selectedCardData?.lastFour || "0000",
          expiryDate: selectedCardData?.expiry || "12/25",
          amount
        }}
        isLoading={isSaving}
      />
    )
  }

  if (step === "confirm") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
                  G
                </div>
              </div>
              <div>
                <CardTitle className="text-lg">Confirm Payment</CardTitle>
                <p className="text-sm text-gray-500">Google Pay</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Amount</span>
                <span className="text-lg font-bold">${amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Payment Method</span>
                <span>{selectedCardData?.brand} •••• {selectedCardData?.lastFour}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("select")}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handlePay}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
                G
              </div>
            </div>
            <div>
              <CardTitle className="text-lg">Google Pay</CardTitle>
              <p className="text-sm text-gray-500">Amount: ${amount.toFixed(2)}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Select Payment Method</h3>
            {mockGooglePayCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCard === card.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCard(card.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-sm">
                        {card.brand} •••• {card.lastFour}
                      </div>
                      <div className="text-xs text-gray-500">
                        Expires {card.expiry}
                      </div>
                    </div>
                  </div>
                  {selectedCard === card.id && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Google Pay is secure and encrypted</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setStep("confirm")}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
