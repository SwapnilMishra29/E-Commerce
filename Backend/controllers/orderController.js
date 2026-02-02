import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// ---------------- CONFIG ----------------
const currency = "inr"
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// ---------------- COD ORDER ----------------
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    // Clear cart immediately for COD
    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: "Order placed successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ---------------- STRIPE ORDER ----------------
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body
    const origin = req.headers.origin || "http://localhost:5173"

    // Calculate amount securely (DON'T trust frontend)
    let amount = 0
    items.forEach((item) => {
      amount += item.price * item.quantity
    })
    amount += deliveryCharge

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      status: "Pending Payment",
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId,
      },
    })

    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ---------------- STRIPE VERIFY ----------------
const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.body

    if (!orderId) {
      return res.json({ success: false, message: "OrderId missing" })
    }

    const order = await orderModel.findById(orderId)

    if (!order) {
      return res.json({ success: false, message: "Order not found" })
    }

    if (success && success.toString().toLowerCase() === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Placed",
      })

      // ✅ Use userId from order
      await userModel.findByIdAndUpdate(order.userId, {
        cartData: {},
      })

      return res.json({ success: true })
    } else {
      await orderModel.findByIdAndDelete(orderId)
      return res.json({ success: false })
    }
  } catch (error) {
    console.log("VERIFY ERROR:", error)
    res.json({ success: false, message: error.message })
  }
}






// ---------------- RAZORPAY (PLACEHOLDER) ----------------
const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay not implemented yet" })
}

// ---------------- ADMIN: ALL ORDERS ----------------
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ---------------- USER ORDERS ----------------
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ---------------- ADMIN: UPDATE STATUS ----------------
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status updated successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
}
