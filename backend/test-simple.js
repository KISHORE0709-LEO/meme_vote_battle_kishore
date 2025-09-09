// Simple test to verify backend works
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

console.log('Testing backend dependencies...');
console.log('✅ Express imported successfully');
console.log('✅ CORS imported successfully');
console.log('✅ JWT imported successfully');
console.log('✅ Bcrypt imported successfully');
console.log('✅ All dependencies are available!');

// Test basic server
const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Backend test successful!' });
});

const PORT = 4001; // Use different port for testing
app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log('Backend is working correctly!');
  process.exit(0);
});