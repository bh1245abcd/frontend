import React, { useEffect, useState } from "react";
import { getorders, cancelOrder } from "../api/auth";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // 📦 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await getorders();

      if (res?.data?.data?.items) {
        setOrders(res.data.data.items);
      }
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ❌ CANCEL ORDER
  const handleCancelOrder = async (order) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // 🔥 Dynamic Payload
      const payload = {
        customerId: order.customerId || "",
        shippingAddressId: order.shippingAddressId || 0,
        shippingAddress: order.shippingAddress || {},
        paymentMethod: order.paymentMethod || "CREDIT_CARD",
        customerNotes: order.customerNotes || "",
        currency: order.currency || "INR",
        discountAmount: order.discountAmount || 0,
        discountCode: order.discountCode || "",
        items: order.items || [],
        reason: "User cancelled order",
      };

      console.log("Cancel Payload:", payload);

      await cancelOrder(order.id, payload);

      Swal.fire("Cancelled!", "Order has been cancelled", "success");

      // ✅ Update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch (error) {
      console.error("Cancel failed", error);
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  };

  return (
    <div className="min-h-screen mt-24 px-6 md:px-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Your Orders
      </h2>

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-orange-700 text-white">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{order.id}</td>

                  <td className="p-4 font-semibold text-amber-700">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4">
                    {order.paymentDone ? "✅ Done" : "❌ Pending"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        order.status === "CANCELLED"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    {order.status !== "CANCELLED" ? (
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;