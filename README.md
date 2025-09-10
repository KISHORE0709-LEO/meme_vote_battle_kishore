# ⚡ Meme Arena

The ultimate meme voting platform where warriors battle for digital glory!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server (in separate terminal)
cd backend
npm install
npm run dev
```

## 🎯 Features

- **Epic Meme Battles** - Vote on the best memes with real-time updates
- **Real-time Leaderboards** - Climb the ranks and earn digital glory
- **Upload & Share** - Submit your own memes with drag-and-drop
- **Cyber Arena** - Immersive 3D experience with Spline integration
- **Social Sharing** - Share memes on WhatsApp, Twitter, Instagram
- **Personalized Experience** - Dynamic user titles based on voting history
- **Battle Mode** - Head-to-head meme competitions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Build Tool**: Vite
- **3D Graphics**: Spline
- **Backend**: Node.js, Express
- **Authentication**: JWT (localStorage-based for demo)
- **Real-time**: WebSocket simulation
- **Storage**: localStorage (demo), SQLite (backend)

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── contexts/      # React contexts
├── services/      # API services
└── lib/          # Utilities
```

## 🎮 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies with `npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Start development servers (see Quick Start)
5. Visit `http://localhost:5173`

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- [Error Handling](./ERROR_HANDLING.md) - Error handling patterns and messages

## 🏆 Join the Battle

Ready to enter the arena? Start voting, uploading, and climbing the leaderboard!

## ⚠️ Important Notes

- This is a demo application with simplified authentication
- Data is stored in localStorage for frontend demo
- For production use, implement proper database and security measures