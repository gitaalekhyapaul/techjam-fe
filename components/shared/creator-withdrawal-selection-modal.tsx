"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, CreditCard, Building2, Smartphone, DollarSign } from "lucide-react"
import { CreatorCreditCardWithdrawal } from "./creator-withdrawal-credit-card"
import { CreatorPayPalWithdrawal } from "./creator-withdrawal-paypal"
import { CreatorGooglePayWithdrawal } from "./creator-withdrawal-google-pay"
import { CreatorApplePayWithdrawal } from "./creator-withdrawal-apple-pay"

interface CreatorWithdrawalSelectionModalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  initialAmount?: number
  currentBalance: number
}

const withdrawalOptions = [
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Withdraw to your bank account",
    processingTime: "1-3 business days"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Building2,
    description: "Withdraw to your PayPal account",
    processingTime: "1-2 business days"
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: Smartphone,
    description: "Withdraw to your Google Pay account",
    processingTime: "1-2 business days"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Withdraw to your Apple Pay account",
    processingTime: "1-2 business days"
  }
]

export function CreatorWithdrawalSelectionModal({ 
  onClose, 
  onSuccess, 
  initialAmount = 0,
  currentBalance 
}: CreatorWithdrawalSelectionModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [amount, setAmount] = useState(initialAmount.toString())
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    setAmount(numericValue)
  }

  const handleWithdraw = async () => {
    if (!selectedMethod || !amount || parseFloat(amount) <= 0) {
      return
    }

    const withdrawalAmount = parseFloat(amount)
    
    if (withdrawalAmount > currentBalance) {
      alert(`Insufficient funds for withdrawal. Available balance: $${currentBalance.toFixed(2)}`)
      return
    }

    if (withdrawalAmount <= 0) {
      alert("Withdrawal amount must be greater than $0")
      return
    }

    setIsProcessing(true)
    
    // Simulate API call based on selected method
    try {
      let result
      switch (selectedMethod) {
        case "credit-card":
          result = await processCreatorCreditCardWithdrawal(withdrawalAmount)
          break
        case "paypal":
          result = await processCreatorPayPalWithdrawal(withdrawalAmount)
          break
        case "google-pay":
          result = await processCreatorGooglePayWithdrawal(withdrawalAmount)
          break
        case "apple-pay":
          result = await processCreatorApplePayWithdrawal(withdrawalAmount)
          break
        default:
          throw new Error("Invalid withdrawal method")
      }
      
      onSuccess(result)
    } catch (error) {
      console.error("Creator withdrawal error:", error)
      alert("Withdrawal failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Simulate API functions for creator withdrawals (like user UI)
  const processCreatorCreditCardWithdrawal = async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
      success: true,
      message: "Creator withdrawal processed successfully!",
      transactionId: `creator_wth_${Date.now()}`,
      amount,
      method: "Credit Card",
      processingTime: "1-3 business days",
      walletType: "creator",
      newBalance: currentBalance - amount
    }
  }

  const processCreatorPayPalWithdrawal = async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      success: true,
      message: "Creator PayPal withdrawal successful!",
      transactionId: `creator_wth_${Date.now()}`,
      amount,
      method: "PayPal",
      processingTime: "1-2 business days",
      walletType: "creator",
      newBalance: currentBalance - amount
    }
  }

  const processCreatorGooglePayWithdrawal = async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      message: "Creator Google Pay withdrawal successful!",
      transactionId: `creator_wth_${Date.now()}`,
      amount,
      method: "Google Pay",
      processingTime: "1-2 business days",
      walletType: "creator",
      newBalance: currentBalance - amount
    }
  }

  const processCreatorApplePayWithdrawal = async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      message: "Creator Apple Pay withdrawal successful!",
      transactionId: `creator_wth_${Date.now()}`,
      amount,
      method: "Apple Pay",
      processingTime: "1-2 business days",
      walletType: "creator",
      newBalance: currentBalance - amount
    }
  }

  if (selectedMethod) {
    const method = withdrawalOptions.find(m => m.id === selectedMethod)
    if (!method) return null

    switch (selectedMethod) {
      case "credit-card":
        return (
          <CreatorCreditCardWithdrawal
            onClose={() => setSelectedMethod(null)}
            onSuccess={onSuccess}
            amount={parseFloat(amount)}
            currentBalance={currentBalance}
          />
        )
      case "paypal":
        return (
          <CreatorPayPalWithdrawal
            onClose={() => setSelectedMethod(null)}
            onSuccess={onSuccess}
            amount={parseFloat(amount)}
            currentBalance={currentBalance}
          />
        )
      case "google-pay":
        return (
          <CreatorGooglePayWithdrawal
            onClose={() => setSelectedMethod(null)}
            onSuccess={onSuccess}
            amount={parseFloat(amount)}
            currentBalance={currentBalance}
          />
        )
      case "apple-pay":
        return (
          <CreatorApplePayWithdrawal
            onClose={() => setSelectedMethod(null)}
            onSuccess={onSuccess}
            amount={parseFloat(amount)}
            currentBalance={currentBalance}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Creator Withdrawal</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Withdrawal Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Available balance: ${currentBalance.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Withdrawal Method
            </label>
            <div className="space-y-2">
              {withdrawalOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedMethod === option.id ? "default" : "outline"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setSelectedMethod(option.id)}
                >
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                      <div className="text-xs text-gray-400">{option.processingTime}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
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
              disabled={!selectedMethod || !amount || parseFloat(amount) <= 0 || isProcessing}
            >
              {isProcessing ? "Processing..." : "Withdraw"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
