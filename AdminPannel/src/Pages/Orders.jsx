import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'


const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
     

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
  const newStatus = event.target.value

  // 1️⃣ UPDATE UI IMMEDIATELY
  setOrders(prevOrders =>
    prevOrders.map(order =>
      order._id === orderId
        ? { ...order, status: newStatus }
        : order
    )
  )

  try {
    // 2️⃣ UPDATE BACKEND
    const response = await axios.post(
      backendUrl + '/api/order/status',
      { orderId, status: newStatus },
      { headers: { token } }
    )

    if (!response.data.success) {
      toast.error(response.data.message)
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
  }
}


  useEffect(() => {
    if (token) fetchAllOrders()
  }, [token])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-6">My Orders</h3>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center">No orders found</p>
      )}

      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order._id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* HEADER */}
            <div className="flex items-start gap-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="w-12 h-12 object-contain"
              />

              <div className="flex-1">
                {/* ITEMS */}
                <div className="mb-3">
                  {order.items?.map((item, index) => (
                    <p key={index} className="text-sm text-gray-800">
                      {item.name} × {item.quantity}
                      {item.size && (
                        <span className="text-gray-500"> ({item.size})</span>
                      )}
                    </p>
                  ))}
                </div>

                {/* ADDRESS */}
                <div className="text-sm text-gray-600 leading-5">
                  <p className="font-medium text-gray-800">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city},{' '}
                    {order.address.state}
                  </p>
                  <p>
                    {order.address.zipCode}, {order.address.country}
                  </p>
                  <p>📞 {order.address.phone}</p>
                </div>

                {/* META INFO */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
                  <p>
                    <span className="font-medium">Items:</span>{' '}
                    {order.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Total:</span> ₹{order.amount}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{' '}
                    {order.payment ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-orange-500">Pending</span>
                    )}
                  </p>
                  <p>
                    <span className="font-medium">Method:</span>{' '}
                    {order.paymentMethod}
                  </p>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                  <p className="text-sm text-gray-500">
                    Ordered on:{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </p>

                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black">
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
