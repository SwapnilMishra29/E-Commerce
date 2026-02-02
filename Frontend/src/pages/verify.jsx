import React, { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Verify = () => {
  const { navigate, token, setCartItems, backend_url } =
    useContext(ShopContext)

  const [searchParams] = useSearchParams()

  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const verifyPayment = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backend_url + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        navigate("/orders")
      } else {
        navigate("/cart")
      }
    } catch (error) {
      console.log(error)
      toast.error("Payment verification failed")
      navigate("/cart")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-12 w-full max-w-md text-center">
        
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verifying Payment
        </h2>

        <p className="text-gray-600 text-sm">
          Please wait while we securely confirm your payment.
        </p>

        <p className="text-xs text-gray-400 mt-3">
          Do not refresh or close this page.
        </p>

        {/* Progress bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="h-full w-1/2 bg-slate-800 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Verify
