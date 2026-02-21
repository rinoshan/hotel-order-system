 
// server/routes/orderRoutes.js
import express from 'express';
import { 
    createOrder, 
    getOrders, 
    updateOrderStatus,
    getOrdersByStation 
} from '../controllers/orderController.js';

const router = express.Router();

// GET all orders
router.get('/', getOrders);

// GET orders by station
router.get('/station/:station', getOrdersByStation);

// POST new order
router.post('/', createOrder);

// PUT update order status
router.put('/:orderId', updateOrderStatus);

export default router;