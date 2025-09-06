"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, CreditCard, Building2, Smartphone, ArrowDownLeft, DollarSign } from "lucide-react"
import { CreditCardWithdrawal } from "./withdrawal-credit-card"
import { PayPalWithdrawal } from "./withdrawal-paypal"
import { GooglePayWithdrawal } from "./withdrawal-google-pay"
import { ApplePayWithdrawal } from "./withdrawal-apple-pay"

interface WithdrawalSelectionModalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  initialAmount?: number
  currentBalance?: number
}

const withdrawalOptions = [
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Withdraw to your credit or debit card",
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Building2,
    description: "Withdraw to your PayPal account",
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: Smartphone,
    description: "Withdraw via Google Pay",
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Withdraw via Apple Pay",
    color: "bg-orange-100 text-orange-600"
  }
]

export function WithdrawalSelectionModal({ onClose, onSuccess, initialAmount = 50, currentBalance = 0 }: WithdrawalSelectionModalProps) {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<string | null>(null)
  const [amount, setAmount] = useState(initialAmount)
  const [amountError, setAmountError] = useState("")

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      setAmountError("Please enter a valid amount greater than $0")
    } else if (numValue > 10000) {
      setAmountError("Amount cannot exceed $10,000")
    } else if (numValue > currentBalance) {
      setAmountError(`Insufficient funds. Available balance: $${currentBalance.toFixed(2)}`)
    } else {
      setAmountError("")
    }
    setAmount(numValue)
  }

  const handleWithdrawalSelect = (withdrawalId: string) => {
    if (amountError || amount <= 0) {
      setAmountError("Please enter a valid amount first")
      return
    }
    setSelectedWithdrawal(withdrawalId)
  }

  const handleBack = () => {
    setSelectedWithdrawal(null)
  }

  const handleSuccess = (result: any) => {
    onSuccess(result)
  }

  if (selectedWithdrawal) {
    switch (selectedWithdrawal) {
      case "credit-card":
        return (
          <CreditCardWithdrawal
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "paypal":
        return (
          <PayPalWithdrawal
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "google-pay":
        return (
          <GooglePayWithdrawal
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "apple-pay":
        return (
          <ApplePayWithdrawal
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Withdraw Funds</CardTitle>
              <p className="text-sm text-gray-500">Choose your withdrawal method</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount to Withdraw</span>
                <span className="text-2xl font-bold text-orange-900">${amount.toFixed(2)}</span>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Enter Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="50.00"
                    value={amount || ""}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className={`pl-10 ${amountError ? "border-red-500" : ""}`}
                    min="0.01"
                    max="10000"
                    step="0.01"
                  />
                </div>
                {amountError && (
                  <p className="text-red-500 text-xs mt-1">{amountError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {withdrawalOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full justify-start h-16 p-4 hover:bg-orange-50 hover:border-orange-200"
                onClick={() => handleWithdrawalSelect(option.id)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{option.name}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <ArrowDownLeft className="w-4 h-4" />
              <span>Withdrawals typically take 1-3 business days to process</span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
