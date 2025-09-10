# Meme Arena API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "role": "user"
  }
}
```

#### POST /auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "role": "user"
  }
}
```

#### GET /auth/profile
Get current user profile (Protected).

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "role": "user"
  }
}
```

### Memes

#### GET /memes
Get all memes with voting information.

**Response:**
```json
{
  "memes": [
    {
      "id": "meme_id",
      "title": "Meme Title",
      "imageUrl": "image_url",
      "author": "author_name",
      "authorId": "author_id",
      "upvotes": 10,
      "downvotes": 2,
      "createdAt": "2024-01-15T10:30:00Z",
      "userVote": "up|down|null"
    }
  ]
}
```

#### POST /memes
Create a new meme (Protected).

**Request Body:**
```json
{
  "title": "Meme Title",
  "imageUrl": "base64_or_url",
  "tags": ["funny", "coding"]
}
```

**Response:**
```json
{
  "success": true,
  "meme": {
    "id": "new_meme_id",
    "title": "Meme Title",
    "imageUrl": "image_url",
    "author": "author_name",
    "authorId": "author_id",
    "upvotes": 0,
    "downvotes": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### POST /memes/:id/vote
Vote on a meme (Protected).

**Request Body:**
```json
{
  "voteType": "up|down"
}
```

**Response:**
```json
{
  "success": true,
  "meme": {
    "id": "meme_id",
    "upvotes": 11,
    "downvotes": 2,
    "userVote": "up"
  }
}
```

#### DELETE /memes/:id
Delete a meme (Protected - Admin only).

**Response:**
```json
{
  "success": true,
  "message": "Meme deleted successfully"
}
```

#### GET /memes/leaderboard
Get top 5 memes by score.

**Response:**
```json
{
  "leaderboard": [
    {
      "id": "meme_id",
      "title": "Top Meme",
      "author": "author_name",
      "upvotes": 50,
      "downvotes": 5,
      "score": 45
    }
  ]
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error