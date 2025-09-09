import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Intro from "./pages/Intro";
import Arena from "./pages/Arena";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import MemeDetail from "./pages/MemeDetail";
import Battle from "./pages/Battle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WebSocketProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/meme/:id" element={<MemeDetail />} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </WebSocketProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
