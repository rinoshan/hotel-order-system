 
// server/controllers/orderController.js
import { ref, push, get, update, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../models/orderModel.js';

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { item, quantity, customerName, tableNo } = req.body;
        
        // Determine station based on item
        let station = 'parotta';
        if (item === 'டீ') station = 'tea';
        else if (item === 'ஜூஸ்') station = 'juice';
        else if (item === 'ரைஸ்') station = 'rice';
        
        const orderRef = ref(db, 'orders');
        const newOrder = {
            item,
            quantity: parseInt(quantity),
            customerName: customerName || 'வாடிக்கையாளர்',
            tableNo: tableNo || '0',
            station,
            status: 'new', // new → received → preparing → ready → completed
            timestamp: Date.now(),
            receivedTime: null,
            readyTime: null,
            completedTime: null,
            estimatedTime: getEstimatedTime(item)
        };
        
        const result = await push(orderRef, newOrder);
        res.status(201).json({ 
            success: true, 
            orderId: result.key,
            order: newOrder 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const ordersRef = ref(db, 'orders');
        const snapshot = await get(ordersRef);
        
        if (snapshot.exists()) {
            const orders = [];
            snapshot.forEach(childSnapshot => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            res.json({ success: true, orders });
        } else {
            res.json({ success: true, orders: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get orders by station
export const getOrdersByStation = async (req, res) => {
    try {
        const { station } = req.params;
        const ordersRef = ref(db, 'orders');
        const stationQuery = query(ordersRef, orderByChild('station'), equalTo(station));
        const snapshot = await get(stationQuery);
        
        if (snapshot.exists()) {
            const orders = [];
            snapshot.forEach(childSnapshot => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            res.json({ success: true, orders });
        } else {
            res.json({ success: true, orders: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const orderRef = ref(db, `orders/${orderId}`);
        const updates = { status };
        
        // Add timestamps based on status
        if (status === 'received') {
            updates.receivedTime = Date.now();
        } else if (status === 'ready') {
            updates.readyTime = Date.now();
        } else if (status === 'completed') {
            updates.completedTime = Date.now();
        }
        
        await update(orderRef, updates);
        res.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Helper function
function getEstimatedTime(item) {
    const times = {
        'பராட்டா': 5,
        'டீ': 2,
        'ஜூஸ்': 3,
        'ரைஸ்': 8
    };
    return times[item] || 5;
}