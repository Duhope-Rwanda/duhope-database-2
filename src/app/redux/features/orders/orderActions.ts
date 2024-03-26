import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, doc, collection, getDoc, setDoc } from "firebase/firestore"; // Import your Firebase configuration
import { db } from "../../../firebase";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const ordersCollection = collection(db, `orders`);
    const orders = await getDocs(ordersCollection);

    let ordersData: any = [];

    for (const order of orders.docs) {
      const userRef = doc(db, "users", order.data().userId);
      const userDoc = await getDoc(userRef);
      const userData = await getDoc(doc(db, "users", order.data().userId));
      order.data().user = userDoc.data();
      ordersData.user = userData.data();
      ordersData.push({
        id: order.id,
        ...order.data(),
        user: userData.data(),
      });
    }
    return await Promise.all(
      ordersData.map(async (order: any) => {
        return {
          ...order,
          name: `${order.user.firstName} ${order.user.lastName}`,
          quantity: order.products.reduce((acc, cur) => acc + cur.quantity, 0),
          amount: order.products.reduce(
            (acc, cur) => acc + cur.price * cur.quantity,
            0
          ),
        };
      })
    );
  } catch (error) {
    return error;
  }
});

export const fetchOrderById = createAsyncThunk(
  "orders/singleOrder",
  async (orderId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      // fetch user info
      const userRef = doc(db, "users", orderDoc.data()?.userId);
      const userDoc = await getDoc(userRef);
      const userData = await getDoc(doc(db, "users", orderDoc.data()?.userId));
      const user: any = userData.data();
      if (orderDoc.exists()) {
        return {
          id: orderDoc.id,
          ...orderDoc.data(),
          ...userDoc.data(),
          names: `${user.firstName} ${user.lastName}`,
          quantity: orderDoc
            .data()
            ?.products.reduce((acc: any, cur: any) => acc + cur.quantity, 0),
          price: orderDoc
            .data()
            ?.products.reduce(
              (acc: any, cur: any) => acc + cur.price * cur.quantity,
              0
            ),
        };
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
);

// change order status and dispatch fetchOrders
export const changeOrderStatus = createAsyncThunk(
  "orders/editOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { dispatch }
  ) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await setDoc(orderRef, { status }, { merge: true });

      dispatch(fetchOrders());
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      return error;
    }
  }
);

// add shipping document link
export const addShippingDocumentLink = createAsyncThunk(
  "orders/editOrderShippingDocumentLink",
  async (
    {
      orderId,
      shippingDocumentlink,
    }: { orderId: string; shippingDocumentlink: string },
    { dispatch }
  ) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await setDoc(orderRef, { shippingDocumentlink }, { merge: true });

      dispatch(fetchOrders());
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      return error;
    }
  }
);
