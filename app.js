const express = require('express');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/features/auth/auth.routes');
const userRoutes = require('./src/features/user/user.routes');
const storeRoutes = require('./src/features/store/store.routes');
const ratingRoutes = require('./src/features/rating/rating.routes');
const adminRoutes = require('./src/features/admin/admin.routes');
const storeOwnerRoutes = require('./src/features/store-owner/store-owner.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

app.use(errorHandler);

module.exports = app;
