# Architecture Documentation

## System Overview

Meme Arena is a full-stack web application built with React frontend and Node.js backend, designed for meme voting and social interaction.

## Frontend Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── MemeCard.tsx     # Core meme display and interaction
│   ├── Navigation.tsx   # App navigation and routing
│   └── ProtectedRoute.tsx # Authentication wrapper
├── pages/               # Route-level components
│   ├── Arena.tsx        # Main meme feed (homepage)
│   ├── Battle.tsx       # Head-to-head meme battles
│   ├── Upload.tsx       # Meme creation and upload
│   ├── Login.tsx        # Authentication forms
│   └── Leaderboard.tsx  # Top memes ranking
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # User authentication state
│   └── WebSocketContext.tsx # Real-time updates
├── services/            # API and business logic
│   ├── memeService.ts   # Meme CRUD operations
│   └── commentService.ts # Comment system
└── hooks/               # Custom React hooks
    ├── use-toast.ts     # Toast notification system
    └── use-mobile.tsx   # Mobile detection
```

### State Management
- **Authentication**: React Context with localStorage persistence
- **Memes**: Service layer with localStorage (demo) / API calls
- **UI State**: Local component state with React hooks
- **Real-time**: WebSocket context for live updates

### Data Flow
1. User interactions trigger service functions
2. Services update localStorage and call APIs
3. Context providers manage global state
4. Components subscribe to state changes
5. Real-time updates via WebSocket simulation

## Backend Architecture

### API Structure
```
backend/src/
├── routes/
│   ├── auth.js          # Authentication endpoints
│   └── memes.js         # Meme CRUD endpoints
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   └── User.js          # User data model
└── server.js            # Express server setup
```

### Database Design
```sql
-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Memes table
CREATE TABLE memes (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author_id INTEGER,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Votes table
CREATE TABLE votes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  meme_id INTEGER,
  vote_type TEXT CHECK(vote_type IN ('up', 'down')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, meme_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (meme_id) REFERENCES memes(id)
);
```

## Security Architecture

### Authentication Flow
1. User submits credentials to `/api/auth/login`
2. Server validates credentials and generates JWT
3. Client stores JWT in localStorage
4. Protected routes require JWT in Authorization header
5. Server validates JWT on each protected request

### Security Measures
- JWT tokens with expiration
- Password hashing (bcrypt in production)
- Input validation and sanitization
- CORS configuration for trusted origins
- Rate limiting on API endpoints
- File upload validation and size limits

## Performance Considerations

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Memoization of expensive calculations
- Debounced search and filtering
- Virtual scrolling for large lists

### Backend Optimization
- Database indexing on frequently queried fields
- Caching for static content
- Pagination for large datasets
- Connection pooling for database
- Compression middleware for responses

## Deployment Architecture

### Development Environment
```
Frontend (Vite Dev Server) :5173
Backend (Node.js) :4000
Database (SQLite file)
```

### Production Environment
```
Frontend (Static Files) → CDN/Nginx
Backend (Node.js) → Load Balancer → App Servers
Database (PostgreSQL/MySQL) → Primary/Replica Setup
File Storage → AWS S3/CloudFront
```

## Real-time Features

### WebSocket Implementation
- Connection management in WebSocketContext
- Event-based message system
- Automatic reconnection on disconnect
- Message queuing for offline scenarios

### Real-time Events
- Vote updates (live vote counts)
- New meme notifications
- Battle results
- Leaderboard changes

## Error Handling Strategy

### Frontend Error Boundaries
- Component-level error boundaries
- Global error boundary for unhandled errors
- User-friendly error messages
- Error reporting to monitoring service

### Backend Error Handling
- Centralized error middleware
- Structured error responses
- Logging with different severity levels
- Health check endpoints for monitoring

## Scalability Considerations

### Horizontal Scaling
- Stateless backend design
- Session storage in external store (Redis)
- Load balancing across multiple instances
- Database read replicas

### Vertical Scaling
- Resource monitoring and alerting
- Auto-scaling based on metrics
- Performance profiling and optimization
- Caching strategies (Redis, CDN)

## Technology Decisions

### Frontend Stack Rationale
- **React**: Component-based architecture, large ecosystem
- **TypeScript**: Type safety, better developer experience
- **Tailwind CSS**: Utility-first, consistent design system
- **Vite**: Fast development server, optimized builds

### Backend Stack Rationale
- **Node.js**: JavaScript everywhere, fast I/O operations
- **Express**: Minimal, flexible web framework
- **SQLite/PostgreSQL**: Relational data with ACID properties
- **JWT**: Stateless authentication, scalable