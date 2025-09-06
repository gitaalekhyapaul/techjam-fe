"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, CreditCard, ArrowUpRight } from "lucide-react"

interface PaymentSuccessModalProps {
  onClose: () => void
  result: {
    message: string
    method: string
    amount: number
  }
}

export function PaymentSuccessModal({ onClose, result }: PaymentSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <p className="text-sm text-gray-500 mt-2">{result.message}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-green-800">Payment Details</div>
                <div className="text-sm text-green-600">${result.amount.toFixed(2)} via {result.method}</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-blue-800">Funds Added</div>
                <div className="text-sm text-blue-600">Your wallet balance has been updated</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 text-center">
              You can now use your funds to support creators or make purchases.
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Done
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
