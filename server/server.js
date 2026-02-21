import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
// API Routes Import
import orderRoutes from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// --- PUBLIC ROUTES ---
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// --- PROTECTED ROUTES WITH REDIRECT LOGIC ---

// Root Route (/) -> Redirects to Login or Dashboard
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Redirecting...</title>
            <script>
                const user = localStorage.getItem('hotelUser');
                if (!user) {
                    window.location.href = '/login';
                } else {
                    window.location.href = '/dashboard';
                }
            </script>
        </head>
        <body><p>Redirecting...</p></body>
        </html>
    `);
});

// ✅ Dashboard Routes
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ✅ Main Kitchen Route - Redirect to Dashboard
app.get('/kitchen', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Redirecting...</title>
            <script>
                const user = localStorage.getItem('hotelUser');
                if (!user) {
                    window.location.href = '/login';
                } else {
                    window.location.href = '/kitchen-dashboard';
                }
            </script>
        </head>
        <body><p>Redirecting...</p></body>
        </html>
    `);
});

// ✅ Kitchen Dashboard Route
app.get('/kitchen-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/kitchen.html'));
});

// ✅ FIXED: SIMPLIFIED STATION ROUTES
const stations = ['parotta', 'tea', 'juice', 'rice'];

// Station Pages (direct access)
stations.forEach(station => {
    app.get(`/kitchen/${station}`, (req, res) => {
        res.sendFile(path.join(__dirname, `../public/kitchen-${station}.html`));
    });
});

// --- API ROUTES ---
app.use('/api/orders', orderRoutes);

// --- 404 Handler ---
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <a href="/">Go to Home</a>
    `);
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔐 Login page: http://localhost:3000/login`);
    console.log(`📱 Counter: http://localhost:3000/dashboard`);
    console.log(`👨‍🍳 Kitchen: http://localhost:3000/kitchen-dashboard`);
    console.log(`🫓 Parotta: http://localhost:3000/kitchen/parotta`);
    console.log(`☕ Tea: http://localhost:3000/kitchen/tea`);
    console.log(`🥤 Juice: http://localhost:3000/kitchen/juice`);
    console.log(`🍚 Rice: http://localhost:3000/kitchen/rice`);
});