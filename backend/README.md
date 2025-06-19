
# ShopExplore Backend API

A Node.js Express API with MongoDB for the ShopExplore application, featuring geospatial queries for location-based shop discovery.

## Features

- ✅ CRUD operations for shops
- ✅ Geospatial queries for nearby shops (2km radius)
- ✅ Text search across shop details
- ✅ MongoDB with geospatial indexing
- ✅ Input validation and error handling
- ✅ CORS configuration for frontend integration

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/shopexplore
FRONTEND_URL=http://localhost:5173
PORT=3001
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the API
```bash
curl http://localhost:3001/api/health
```

## API Endpoints

### Shops
- `GET /api/shops` - Get all shops
- `GET /api/shops/nearby?lat=40.7128&lng=-74.0060&radius=2` - Get nearby shops
- `GET /api/shops/search?q=coffee` - Search shops
- `GET /api/shops/:id` - Get shop by ID
- `POST /api/shops` - Create new shop
- `PUT /api/shops/:id` - Update shop
- `DELETE /api/shops/:id` - Delete shop

### Health Check
- `GET /api/health` - Server status

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/shopexplore`

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create new cluster
3. Get connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>`

Example Atlas connection:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shopexplore
```

## Deployment Options

### Render
1. Push code to GitHub
2. Connect Render to your repository
3. Set environment variables in Render dashboard
4. Deploy

### Railway
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   └── Shop.js             # Shop schema
├── routes/
│   └── shops.js            # Shop routes
├── middleware/
│   └── cors.js             # CORS configuration
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env.example            # Environment template
└── README.md               # This file
```

## Testing

### Create a Shop
```bash
curl -X POST http://localhost:3001/api/shops \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Coffee Shop",
    "description": "Great coffee place",
    "address": "123 Main St, City",
    "location": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "items": [{"name": "Coffee", "quantity": 50}],
    "owner": "John Doe",
    "phone": "555-0123",
    "email": "john@example.com",
    "openingHours": "9 AM - 6 PM",
    "category": "Coffee Shop",
    "createdBy": "user123"
  }'
```

### Get Nearby Shops
```bash
curl "http://localhost:3001/api/shops/nearby?lat=40.7128&lng=-74.0060&radius=2"
```

## Connecting to Frontend

After deploying your backend, update your Lovable project:

1. Set environment variable in Lovable:
   ```
   REACT_APP_API_URL=https://your-deployed-backend-url.com/api
   ```

2. Your frontend will automatically connect to the backend!

## Troubleshooting

- **CORS errors**: Check `FRONTEND_URL` in `.env`
- **MongoDB connection**: Verify `MONGODB_URI` and network access
- **Port conflicts**: Change `PORT` in `.env`
- **API not responding**: Check server logs for errors
