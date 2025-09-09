export interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  userVote?: "up" | "down" | null;
}

export const mockMemes: Meme[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
    title: "When you find a bug in production",
    author: "CodeMaster99",
    upvotes: 234,
    downvotes: 12,
    createdAt: "2024-01-15T10:30:00Z",
    userVote: null
  },
  {
    id: "2", 
    imageUrl: "https://images.unsplash.com/photo-1531956759645-c2ba2d663def?w=500&h=400&fit=crop",
    title: "Me explaining why I need another monitor",
    author: "PixelPirate",
    upvotes: 189,
    downvotes: 8,
    createdAt: "2024-01-15T09:15:00Z",
    userVote: "up"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=500&h=400&fit=crop",
    title: "When someone says AI will replace developers",
    author: "ByteBender", 
    upvotes: 342,
    downvotes: 23,
    createdAt: "2024-01-15T08:45:00Z",
    userVote: null
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=500&h=400&fit=crop",
    title: "Frontend vs Backend developers arguing",
    author: "StackOverflow_God",
    upvotes: 156,
    downvotes: 34,
    createdAt: "2024-01-15T07:20:00Z",
    userVote: "down"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
    title: "My code after 6 months without comments",
    author: "RefactorRanger",
    upvotes: 278,
    downvotes: 15,
    createdAt: "2024-01-15T06:10:00Z",
    userVote: null
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=400&fit=crop", 
    title: "When the client changes requirements again",
    author: "AgileAvenger",
    upvotes: 445,
    downvotes: 7,
    createdAt: "2024-01-15T05:30:00Z",
    userVote: "up"
  }
];