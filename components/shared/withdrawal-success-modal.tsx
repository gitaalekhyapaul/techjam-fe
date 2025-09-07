"use client"

import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { CheckCircle, Clock, ArrowDownLeft } from "lucide-react"

interface WithdrawalSuccessModalProps {
  onClose: () => void
  result: {
    message: string
    processingTime: string
    method: string
    amount: number
  }
}

export function WithdrawalSuccessModal({ onClose, result }: WithdrawalSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Withdrawal Successful!</CardTitle>
          <p className="text-sm text-gray-500 mt-2">{result.message}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-green-800">Withdrawal Details</div>
                <div className="text-sm text-green-600">${result.amount.toFixed(2)} via {result.method}</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-orange-800">Processing Time</div>
                <div className="text-sm text-orange-600">{result.processingTime}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 text-center">
              You will receive a confirmation email once the withdrawal is processed.
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
