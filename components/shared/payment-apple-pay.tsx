"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, CreditCard, Check, Smartphone, Fingerprint } from "lucide-react"
import { ApplePayData, mockApi } from "@/constants/constants"
import { PaymentMethodConfirmation } from "./payment-method-confirmation"

interface ApplePayPaymentProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
}

const mockApplePayCards = [
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

export function ApplePayPayment({ onClose, onSuccess, amount }: ApplePayPaymentProps) {
  const [selectedCard, setSelectedCard] = useState(mockApplePayCards[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"select" | "authenticate" | "confirm">("select")
  const [useBiometric, setUseBiometric] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handlePay = async () => {
    setIsLoading(true)
    
    try {
      const result = await mockApi.processApplePayPayment({
        selectedCard,
        amount,
        useBiometric
      })
      setShowConfirmation(true)
    } catch (error) {
      console.error("Apple Pay payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePaymentMethod = async () => {
    setIsSaving(true)
    
    try {
      const selectedCardData = mockApplePayCards.find(card => card.id === selectedCard)
      await mockApi.savePaymentMethod({
        type: "Apple Pay",
        cardType: selectedCardData?.brand || "Credit Card",
        lastFour: selectedCardData?.lastFour || "0000",
        expiryDate: selectedCardData?.expiry || "12/25",
        isDefault: false
      })
      
      const result = await mockApi.processApplePayPayment({
        selectedCard,
        amount,
        useBiometric
      })
      onSuccess(result)
    } catch (error) {
      console.error("Failed to save payment method:", error)
      const result = await mockApi.processApplePayPayment({
        selectedCard,
        amount,
        useBiometric
      })
      onSuccess(result)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSkipSaving = async () => {
    try {
      const result = await mockApi.processApplePayPayment({
        selectedCard,
        amount,
        useBiometric
      })
      onSuccess(result)
    } catch (error) {
      console.error("Apple Pay payment failed:", error)
    }
  }

  const selectedCardData = mockApplePayCards.find(card => card.id === selectedCard)

  if (showConfirmation) {
    return (
      <PaymentMethodConfirmation
        onClose={() => setShowConfirmation(false)}
        onSave={handleSavePaymentMethod}
        onCancel={handleSkipSaving}
        paymentData={{
          type: "Apple Pay",
          cardType: selectedCardData?.brand || "Credit Card",
          lastFour: selectedCardData?.lastFour || "0000",
          expiryDate: selectedCardData?.expiry || "12/25",
          amount
        }}
        isLoading={isSaving}
      />
    )
  }

  if (step === "authenticate") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded text-gray-900 flex items-center justify-center text-lg font-bold">
                🍎
              </div>
            </div>
            <CardTitle className="text-xl">Authenticate Payment</CardTitle>
            <p className="text-sm text-gray-500">Use Face ID or Touch ID to confirm</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fingerprint className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Place your finger on the Touch ID sensor or look at your device for Face ID
              </p>
            </div>

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
                Cancel
              </Button>
              <Button
                onClick={handlePay}
                className="flex-1 bg-gray-900 hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Authenticate"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "confirm") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded text-gray-900 flex items-center justify-center text-lg font-bold">
                🍎
              </div>
            </div>
            <CardTitle className="text-xl">Confirm Payment</CardTitle>
            <p className="text-sm text-gray-500">Apple Pay</p>
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
                onClick={() => setStep("authenticate")}
                className="flex-1 bg-gray-900 hover:bg-gray-800"
                disabled={isLoading}
              >
                Continue
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
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-900 rounded text-white flex items-center justify-center text-xs font-bold">
                🍎
              </div>
            </div>
            <div>
              <CardTitle className="text-lg">Apple Pay</CardTitle>
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
            {mockApplePayCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCard === card.id
                    ? "border-gray-900 bg-gray-50"
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
                    <Check className="w-5 h-5 text-gray-900" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <Smartphone className="w-4 h-4" />
              <span>Apple Pay is secure and private</span>
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
              className="flex-1 bg-gray-900 hover:bg-gray-800"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
