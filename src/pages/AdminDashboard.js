import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import { API_URL } from "../config";

export default function AdminDashboard({ user }) {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === "kaissrozali79@gmail.com";

  useEffect(() => {
    if (!isAdmin) return;

    async function loadAdminData() {
      try {
        setLoading(true);

        // ✅ use the working routes
        const [ordersRes, messagesRes] = await Promise.all([
          fetch(`${API_URL}/api/orders`),
          fetch(`${API_URL}/api/contact`), // GET should return messages list
        ]);

        const ordersData = await ordersRes.json();
        const messagesData = await messagesRes.json();

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setMessages(Array.isArray(messagesData) ? messagesData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, [isAdmin]);

  // ✅ Block if not admin
  if (!isAdmin) {
    return (
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-denied">Access denied. (Admin only)</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-sub">Welcome, {user?.name} 👋</p>

      {loading ? (
        <p>Loading admin data…</p>
      ) : (
        <>
          {/* ✅ Top stats cards */}
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">{orders.length}</p>
            </div>

            <div className="stat-card">
              <h3>Total Messages</h3>
              <p className="stat-number">{messages.length}</p>
            </div>
          </div>

          {/* ✅ Lists */}
          <div className="admin-grid">
            <div className="admin-card">
              <h2>Orders</h2>

              {orders.length === 0 ? (
                <p className="admin-empty">No orders yet.</p>
              ) : (
                <div className="admin-table">
                  {orders.slice(0, 6).map((o) => (
                    <div className="admin-row" key={o.id}>
                      <div>
                        <strong>{o.customer_name}</strong>
                        <div className="small">{o.customer_email}</div>
                      </div>
                      <div className="right">
                        ${Number(o.total_price || 0).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-card">
              <h2>Messages</h2>

              {messages.length === 0 ? (
                <p className="admin-empty">No messages yet.</p>
              ) : (
                <div className="admin-table">
                  {messages.slice(0, 6).map((m) => (
                    <div className="admin-row" key={m.id}>
                      <div>
                        <strong>{m.name}</strong>
                        <div className="small">{m.email}</div>
                        <div className="msg">{m.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}