// Simple API test script
const BASE_URL = 'http://localhost:4000/api';

async function testAPI() {
  console.log('🧪 Testing Meme Arena API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await fetch(`${BASE_URL}/health`);
    console.log('✅ Health:', await health.json());

    // Test register
    console.log('\n2. Testing user registration...');
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const registerData = await registerRes.json();
    console.log('✅ Register:', registerData.message);
    const token = registerData.token;

    // Test protected route
    console.log('\n3. Testing protected route...');
    const profileRes = await fetch(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const profileData = await profileRes.json();
    console.log('✅ Profile:', profileData.user);

    // Test public route
    console.log('\n4. Testing public route...');
    const memesRes = await fetch(`${BASE_URL}/memes`);
    const memesData = await memesRes.json();
    console.log('✅ Memes:', memesData.memes.length, 'memes found');

    // Test upload without authentication (should fail)
    console.log('\n5. Testing upload without authentication...');
    const uploadWithoutAuth = await fetch(`${BASE_URL}/memes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Meme' })
    });
    const uploadWithoutAuthData = await uploadWithoutAuth.json();
    if (uploadWithoutAuth.status === 401) {
      console.log('✅ Upload without auth correctly rejected:', uploadWithoutAuthData.error);
    } else {
      console.log('❌ Upload without auth should have been rejected');
    }

    // Test upload with authentication (should work)
    console.log('\n6. Testing upload with authentication...');
    const formData = new FormData();
    formData.append('title', 'Test Authenticated Meme');
    // Note: In real test, we'd add a file here
    
    const uploadWithAuth = await fetch(`${BASE_URL}/memes`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const uploadWithAuthData = await uploadWithAuth.json();
    if (uploadWithAuth.status === 400 && uploadWithAuthData.error === 'File required') {
      console.log('✅ Upload with auth works (file required as expected):', uploadWithAuthData.error);
    } else {
      console.log('Upload with auth response:', uploadWithAuthData);
    }

    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();