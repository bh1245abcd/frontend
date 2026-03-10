// import React, { useEffect, useState } from "react";
// import { getorders } from "../api/auth";

// const Orders = () => {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await getorders();

//         if (res?.data?.data?.items) {
//           setOrders(res.data.data.items);
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="mt-20 px-10">

//       <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

//       <div className="flex gap-10">

//         {/* Orders Table */}
//         <div className="flex-1 bg-white shadow-lg rounded-xl overflow-hidden">

//           <table className="w-full text-left">

//             <thead className="bg-orange-700 text-white">
//               <tr>
//                 <th className="p-4">Order ID</th>
//                 <th className="p-4">Amount</th>
//                 <th className="p-4">Payment</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Order Date</th>
//               </tr>
//             </thead>

//             <tbody>

//               {orders.map((order) => (

//                 <tr key={order.id} className="border-b">

//                   <td className="p-4">{order.id}</td>

//                   <td className="p-4 font-semibold">
//                     ₹{order.totalAmount}
//                   </td>

//                   <td className="p-4">
//                     {order.paymentMethod}
//                   </td>

//                   <td className="p-4">
//                     <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded">
//                       {order.status}
//                     </span>
//                   </td>

//                   <td className="p-4">
//                     {new Date(order.orderDate).toLocaleDateString()}
//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>


//         {/* Order Summary */}
//         <div className="w-80 bg-white shadow-lg rounded-xl p-6 h-fit">

//           <h3 className="text-xl font-semibold mb-4">Orders Summary</h3>

//           <div className="flex justify-between mb-3">
//             <span>Total Orders</span>
//             <span>{orders.length}</span>
//           </div>

//           <div className="flex justify-between border-b pb-3">
//             <span>Total Amount</span>
//             <span>
//               ₹{orders.reduce((acc, item) => acc + item.totalAmount, 0)}
//             </span>
//           </div>

//           <div className="flex justify-between mt-4 font-bold text-orange-700 text-lg">
//             <span>Total Paid</span>
//             <span>
//               ₹{orders.reduce((acc, item) => acc + item.totalAmount, 0)}
//             </span>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import { getorders } from "../api/auth";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
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

    fetchOrders();
  }, []);

  return (
    <div className="mt-20 px-10">

      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-orange-700 text-white">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Payment Done</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order Date</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No Orders Found
                </td>
              </tr>
            ) : (

              orders.map((order) => (

                <tr key={order.id} className="border-b">

                  <td className="p-4">{order.id}</td>

                  <td className="p-4 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4">
                    {order.paymentDone ? "Yes" : "No"}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded">
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.orderDate).toLocaleDateString()}
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