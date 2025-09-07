"use client"

import { useState } from "react"
import { Button } from "@/components/shared/ui/button"
import { Input } from "@/components/shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { X, Lock, Mail, Eye, EyeOff, ArrowDownLeft } from "lucide-react"
import { PayPalData, mockApi } from "@/constants/constants"

interface PayPalWithdrawalProps {
  onClose: () => void
  onSuccess: (result: any) => void
  amount: number
}

export function PayPalWithdrawal({ onClose, onSuccess, amount }: PayPalWithdrawalProps) {
  const [formData, setFormData] = useState<PayPalData>({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<PayPalData>>({})

  const validateForm = () => {
    const newErrors: Partial<PayPalData> = {}
    
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const result = await mockApi.processPayPalWithdrawal(formData, amount)
      onSuccess(result)
    } catch (error) {
      console.error("PayPal withdrawal failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof PayPalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
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
              <CardTitle className="text-lg">Withdraw to PayPal</CardTitle>
              <p className="text-sm text-gray-500">Amount: ${amount.toFixed(2)}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-orange-800">
                <ArrowDownLeft className="w-4 h-4" />
                <span>Withdrawal will be processed in 1-2 business days</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <Lock className="w-4 h-4" />
                <span>PayPal protects your financial information with bank-level security</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
              <Lock className="w-3 h-3" />
              <span>Your withdrawal is processed securely by PayPal</span>
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
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Withdraw to PayPal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
