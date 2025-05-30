"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function PaymentRefreshContent() {
  const searchParams = useSearchParams()
  const [refreshStatus, setRefreshStatus] = useState<"processing" | "success" | "error">("processing")

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    const refreshToken = searchParams.get("refresh_token")

    // Here you would typically make an API call to your backend
    // to refresh the payment session using the sessionId and refreshToken
    const refreshPaymentSession = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch('/api/refresh-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            refreshToken,
          }),
        })

        if (response.ok) {
          setRefreshStatus("success")
        } else {
          setRefreshStatus("error")
        }
      } catch (error) {
        console.error('Error refreshing payment:', error)
        setRefreshStatus("error")
      }
    }

    if (sessionId && refreshToken) {
      refreshPaymentSession()
    } else {
      setRefreshStatus("error")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {refreshStatus === "processing" ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Refreshing Payment Session</h1>
            <p className="text-center text-gray-600 mb-6">
              Please wait while we refresh your payment session...
            </p>
          </>
        ) : refreshStatus === "success" ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Payment Session Refreshed</h1>
            <p className="text-center text-gray-600 mb-6">
              Your payment session has been successfully refreshed. You can now continue with your payment.
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
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Refresh Failed</h1>
            <p className="text-center text-gray-600 mb-6">
              We couldn't refresh your payment session. Please try again or contact support if the problem persists.
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

export default function PaymentRefresh() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <PaymentRefreshContent />
    </Suspense>
  )
} 