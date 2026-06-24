const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');

// Feature routes
const authRoutes = require('./features/auth/auth.routes');
const adminRoutes = require('./features/admin/admin.routes');
const userRoutes = require('./features/user/user.routes');
const storeRoutes = require('./features/store/store.routes');
const ratingRoutes = require('./features/rating/rating.routes');
const storeOwnerRoutes = require('./features/store-owner/store-owner.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api', ratingRoutes); // ratings have own prefix pattern: /api/stores/:storeId/ratings and /api/ratings/:ratingId
app.use('/api/store-owner', storeOwnerRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;