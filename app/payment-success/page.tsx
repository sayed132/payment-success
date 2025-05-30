"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<"success" | "cancel" | "processing">("processing")

  useEffect(() => {
    // Check URL parameters that Stripe might send
    const status = searchParams.get("redirect_status")
    const canceled = searchParams.get("canceled")
    const sessionId = searchParams.get("session_id")

    if (status === "succeeded" || status === "success" || sessionId) {
      setPaymentStatus("success")
    } else if (canceled === "true" || status === "failed") {
      setPaymentStatus("cancel")
    } else {
      // Default to success if no clear parameters
      setPaymentStatus("success")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {paymentStatus === "success" ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-center text-gray-600 mb-6">
              Thank you for your payment. Your transaction has been completed successfully.
            </p>
            <p className="text-center text-sm text-gray-500 mb-8">
              We've sent a confirmation email with your receipt and order details. Your order is now being processed.
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Payment Canceled</h1>
            <p className="text-center text-gray-600 mb-6">
              Your payment process was canceled. No charges were made to your account.
            </p>
            <p className="text-center text-sm text-gray-500 mb-8">
              If you encountered any issues during the payment process or need assistance, please contact our support
              team.
            </p>
          </>
        )}

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
