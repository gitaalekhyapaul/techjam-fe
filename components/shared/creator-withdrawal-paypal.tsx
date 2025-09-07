"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, Building2, Check, ArrowLeft } from "lucide-react"

interface CreatorPayPalWithdrawalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
  currentBalance: number
}

export function CreatorPayPalWithdrawal({ 
  onClose, 
  onSuccess, 
  amount,
  currentBalance 
}: CreatorPayPalWithdrawalProps) {
  const [paypalData, setPaypalData] = useState({
    email: "",
    password: ""
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setPaypalData(prev => ({ ...prev, [field]: value }))
  }

  const handleWithdraw = async () => {
    if (!paypalData.email || !paypalData.password) {
      alert("Please fill in all PayPal details")
      return
    }

    if (amount > currentBalance) {
      alert("Insufficient funds for withdrawal")
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate API call (like user UI)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const withdrawalResult = {
        success: true,
        message: "Creator PayPal withdrawal successful!",
        transactionId: `creator_wth_${Date.now()}`,
        amount,
        method: "PayPal",
        processingTime: "1-2 business days",
        walletType: "creator",
        newBalance: currentBalance - amount
      }
      
      onSuccess(withdrawalResult)
    } catch (error) {
      console.error("Creator PayPal withdrawal error:", error)
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
            <CardTitle className="text-lg font-semibold">Creator PayPal Withdrawal</CardTitle>
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
                PayPal Email
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  value={paypalData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your-email@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                PayPal Password
              </label>
              <Input
                type="password"
                value={paypalData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your PayPal password"
              />
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
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
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
