import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection (since we don't have a real WebSocket server)
    const mockSocket = {
      send: (data: string) => {
        // Simulate broadcasting to other clients
        setTimeout(() => {
          const event = new CustomEvent('mockWebSocketMessage', { detail: JSON.parse(data) });
          window.dispatchEvent(event);
        }, 100);
      },
      close: () => {},
      readyState: 1
    } as any;

    setSocket(mockSocket);
    setIsConnected(true);

    return () => {
      setIsConnected(false);
      setSocket(null);
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};