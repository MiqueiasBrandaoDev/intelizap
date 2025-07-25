#!/usr/bin/env node

/**
 * Script to get a JWT token for testing Evolution API endpoints
 * 
 * This script will:
 * 1. Login with the test credentials
 * 2. Extract and display the JWT token
 * 3. Provide example curl commands for testing
 */

const API_BASE_URL = 'http://localhost:3001';

async function getTestToken() {
  console.log('🔐 Getting JWT token for testing...\n');
  
  try {
    // Login with test credentials
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'teste@intelizap.com',
        senha: '123456'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.data && data.data.token) {
      const token = data.data.token;
      const user = data.data.user;
      
      console.log('✅ Login successful!\n');
      console.log('📋 User Information:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.nome}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Instance: ${user.instancia || user.nome}\n`);
      
      console.log('🎫 JWT Token:');
      console.log(`${token}\n`);
      
      // Example curl commands for testing Evolution API
      console.log('🧪 Example curl commands for testing Evolution API:\n');
      
      console.log('1. Check Evolution API status:');
      console.log(`curl -H "Authorization: Bearer ${token}" \\`);
      console.log(`     "${API_BASE_URL}/api/evolution/status/${user.instancia || user.nome}"\n`);
      
      console.log('2. Get Evolution groups:');
      console.log(`curl -H "Authorization: Bearer ${token}" \\`);
      console.log(`     "${API_BASE_URL}/api/evolution/groups/${user.instancia || user.nome}?userId=${user.id}"\n`);
      
      console.log('3. Connect to Evolution API:');
      console.log(`curl -X POST \\`);
      console.log(`     -H "Content-Type: application/json" \\`);
      console.log(`     -H "Authorization: Bearer ${token}" \\`);
      console.log(`     -d '{"instanceName":"${user.instancia || user.nome}","userId":${user.id}}' \\`);
      console.log(`     "${API_BASE_URL}/api/evolution/connect"\n`);
      
      // LocalStorage simulation for browser testing
      console.log('🌐 For browser testing, run this in the console:');
      console.log(`localStorage.setItem('intellizap_token', '${token}');`);
      console.log(`localStorage.setItem('intellizap_user', '${JSON.stringify(user)}');\n`);
      
      // Raw token for easy copying
      console.log('📄 Raw token (for easy copying):');
      console.log('─'.repeat(50));
      console.log(token);
      console.log('─'.repeat(50));
      
    } else {
      console.error('❌ Login failed:', data.message || 'Unknown error');
    }
    
  } catch (error) {
    console.error('❌ Error getting token:', error.message);
    console.log('\n💡 Make sure your backend server is running on http://localhost:3001');
    console.log('💡 Check if the test user exists in the database');
  }
}

// Run the script
getTestToken();