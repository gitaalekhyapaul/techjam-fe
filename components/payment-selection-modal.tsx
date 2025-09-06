"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, CreditCard, Building2, Smartphone, DollarSign } from "lucide-react"
import { CreditCardPayment } from "./payment-credit-card"
import { PayPalPayment } from "./payment-paypal"
import { GooglePayPayment } from "./payment-google-pay"
import { ApplePayPayment } from "./payment-apple-pay"

interface PaymentSelectionModalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  initialAmount?: number
}

const paymentOptions = [
  {
    id: "credit-card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay with your credit or debit card",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Building2,
    description: "Pay with your PayPal account",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: Smartphone,
    description: "Pay with Google Pay",
    color: "bg-green-100 text-green-600"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Pay with Apple Pay",
    color: "bg-gray-100 text-gray-600"
  }
]

export function PaymentSelectionModal({ onClose, onSuccess, initialAmount = 100 }: PaymentSelectionModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [amount, setAmount] = useState(initialAmount)
  const [amountError, setAmountError] = useState("")

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      setAmountError("Please enter a valid amount greater than $0")
    } else if (numValue > 10000) {
      setAmountError("Amount cannot exceed $10,000")
    } else {
      setAmountError("")
    }
    setAmount(numValue)
  }

  const handlePaymentSelect = (paymentId: string) => {
    if (amountError || amount <= 0) {
      setAmountError("Please enter a valid amount first")
      return
    }
    setSelectedPayment(paymentId)
  }

  const handleBack = () => {
    setSelectedPayment(null)
  }

  const handleSuccess = (result: any) => {
    onSuccess(result)
  }

  if (selectedPayment) {
    switch (selectedPayment) {
      case "credit-card":
        return (
          <CreditCardPayment
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "paypal":
        return (
          <PayPalPayment
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "google-pay":
        return (
          <GooglePayPayment
            onClose={handleBack}
            onSuccess={handleSuccess}
            amount={amount}
          />
        )
      case "apple-pay":
        return (
          <ApplePayPayment
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
          <div>
            <CardTitle className="text-xl">Add Funds</CardTitle>
            <p className="text-sm text-gray-500">Choose your payment method</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount to Add</span>
                <span className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</span>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Enter Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="100.00"
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
            {paymentOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full justify-start h-16 p-4 hover:bg-gray-50"
                onClick={() => handlePaymentSelect(option.id)}
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
