# TikTok TechJam - MongoDB Integration Setup Guide

## Overview
This guide will help you set up the MongoDB integration for the TikTok TechJam frontend application.

## Prerequisites
- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git (for cloning the repository)

## Step 1: Install Dependencies
The required dependencies are already installed:
```bash
npm install mongodb mongoose bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB locally:
   - **Windows**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string

## Step 3: Environment Configuration

Create a `.env.local` file in the project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/tiktok-techjam
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiktok-techjam

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# API Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# App Configuration
NODE_ENV=development
```

## Step 4: Database Initialization

The application will automatically create the necessary collections when you first use the API endpoints. No manual database setup is required.

## Step 5: Start the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

## Step 6: Test the Integration

### Test User Registration
1. Go to the login page
2. Click "Register" or "Sign Up"
3. Create a new user account
4. The system will automatically create a wallet for the user

### Test Wallet Operations
1. Log in with your account
2. Navigate to the wallet page
3. Try adding funds (this will create a transaction record)
4. Check the transaction history

## API Endpoints Available

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Wallet
- `GET /api/wallet/balance` - Get wallet balance
- `POST /api/wallet/add-funds` - Add funds to wallet

### More endpoints will be added as development progresses...

## Database Collections

The following collections will be created automatically:
- `users` - User accounts and profiles
- `wallets` - Wallet balances and transactions
- `transactions` - All financial transactions
- `paymentMethods` - User payment methods
- `subscriptions` - Creator subscriptions

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in .env.local
   - Verify network connectivity (for Atlas)

2. **JWT Token Errors**
   - Check JWT_SECRET is set in .env.local
   - Ensure token is being sent in Authorization header

3. **API Route Not Found**
   - Ensure you're using the correct endpoint
   - Check that the API route file exists in `app/api/`

### Debug Mode

To enable debug logging, add to your `.env.local`:
```env
DEBUG=true
```

## Development Notes

- All monetary amounts are stored in cents (integer) to avoid floating-point precision issues
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt with salt rounds of 12
- All API responses follow a consistent format with success/error indicators

## Next Steps

1. Test all API endpoints
2. Update frontend components to use new API service
3. Add more API routes as needed
4. Implement real-time updates
5. Add comprehensive error handling

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal for server-side errors
3. Verify MongoDB is running and accessible
4. Ensure all environment variables are set correctly
