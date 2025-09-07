"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, Smartphone, Check, ArrowLeft, CreditCard, Fingerprint } from "lucide-react"

interface CreatorApplePayWithdrawalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
  currentBalance: number
}

export function CreatorApplePayWithdrawal({ 
  onClose, 
  onSuccess, 
  amount,
  currentBalance 
}: CreatorApplePayWithdrawalProps) {
  const [selectedCard, setSelectedCard] = useState("")
  const [useBiometric, setUseBiometric] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const mockCards = [
    { id: "1", lastFour: "4242", type: "Visa", bank: "Chase Bank" },
    { id: "2", lastFour: "1234", type: "Mastercard", bank: "Bank of America" },
    { id: "3", lastFour: "5678", type: "Visa", bank: "Wells Fargo" }
  ]

  const handleWithdraw = async () => {
    if (!selectedCard) {
      alert("Please select a payment method")
      return
    }

    if (amount > currentBalance) {
      alert("Insufficient funds for withdrawal")
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate API call (like user UI)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const withdrawalResult = {
        success: true,
        message: "Creator Apple Pay withdrawal successful!",
        transactionId: `creator_wth_${Date.now()}`,
        amount,
        method: "Apple Pay",
        processingTime: "1-2 business days",
        walletType: "creator",
        newBalance: currentBalance - amount
      }
      
      onSuccess(withdrawalResult)
    } catch (error) {
      console.error("Creator Apple Pay withdrawal error:", error)
      alert(`Withdrawal failed: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-lg font-semibold">Creator Apple Pay Withdrawal</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Withdrawal Amount:</span>
              <span className="text-xl font-bold text-red-600">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-600">Available Balance:</span>
              <span className="font-semibold">${currentBalance.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Payment Method
              </label>
              <div className="space-y-2">
                {mockCards.map((card) => (
                  <Button
                    key={card.id}
                    variant={selectedCard === card.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{card.type} •••• {card.lastFour}</div>
                        <div className="text-xs text-gray-500">{card.bank}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="biometric"
                checked={useBiometric}
                onChange={(e) => setUseBiometric(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="biometric" className="text-sm text-gray-700 flex items-center space-x-1">
                <Fingerprint className="w-4 h-4" />
                <span>Use Face ID / Touch ID for authentication</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Creator Withdrawal:</strong> This withdrawal will be processed from your Creator wallet balance only.
            </p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleWithdraw}
              disabled={isProcessing || !selectedCard}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {useBiometric ? "Authenticating..." : "Processing..."}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Withdraw ${amount.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
