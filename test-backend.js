// Simple backend test
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`✅ Test backend running on http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
});