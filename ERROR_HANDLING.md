# Error Handling Guide

## User-Friendly Error Messages

### Authentication Errors
- **Login Failed**: "Invalid email or password. Please check your credentials and try again."
- **Registration Failed**: "This email or username is already taken. Please choose different credentials."
- **Session Expired**: "Your session has expired. Please log in again to continue."
- **Access Denied**: "You need to be logged in to perform this action."

### Meme Upload Errors
- **File Too Large**: "File size exceeds 10MB limit. Please choose a smaller image or video."
- **Invalid Format**: "Only images (JPG, PNG, GIF) and videos (MP4, WebM) are supported."
- **Upload Failed**: "Failed to upload meme. Please check your internet connection and try again."
- **Storage Full**: "Storage limit reached. Please contact support or try again later."

### Voting Errors
- **Vote Failed**: "Unable to process your vote. Please try again."
- **Network Error**: "Connection lost. Your vote will be saved when connection is restored."

### General Errors
- **Page Not Found**: "The page you're looking for doesn't exist. Return to the arena?"
- **Server Error**: "Something went wrong on our end. Please try again in a few moments."
- **Loading Failed**: "Failed to load content. Please refresh the page."

## Error Boundaries

### React Error Boundary Implementation
```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong</h2>
          <p>The meme arena encountered an unexpected error.</p>
          <button onClick={() => window.location.reload()}>
            Reload Arena
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

## API Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-friendly error message",
    "details": "Technical details for debugging"
  }
}
```

### Error Codes
- `AUTH_REQUIRED` - Authentication needed
- `INVALID_CREDENTIALS` - Login failed
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `PERMISSION_DENIED` - Insufficient permissions
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Client-Side Error Handling

### Network Errors
```typescript
const handleApiError = (error: any) => {
  if (error.code === 'NETWORK_ERROR') {
    toast({
      title: "Connection Lost",
      description: "Please check your internet connection",
      variant: "destructive"
    });
  } else if (error.status === 401) {
    // Redirect to login
    logout();
    navigate('/login');
  } else {
    toast({
      title: "Error",
      description: error.message || "Something went wrong",
      variant: "destructive"
    });
  }
};
```

### Form Validation
```typescript
const validateMemeUpload = (file: File, title: string) => {
  const errors: string[] = [];
  
  if (!title.trim()) {
    errors.push("Title is required");
  }
  
  if (title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }
  
  if (!file) {
    errors.push("Please select an image or video");
  }
  
  if (file && file.size > 10 * 1024 * 1024) {
    errors.push("File size must be less than 10MB");
  }
  
  return errors;
};
```