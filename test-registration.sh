#!/bin/bash

echo "🧪 Testing Registration Flow Fix"
echo "================================="
echo ""

# Test user data
EMAIL="testuser@example.com"
PASSWORD="SecurePassword123!"
FULLNAME="Test User"

echo "📝 Step 1: Register new user"
echo "Email: $EMAIL"
echo "Password: $PASSWORD"
echo "Full Name: $FULLNAME"
echo ""

REGISTER_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"fullName\": \"$FULLNAME\"
  }")

echo "Registration Response:"
echo "$REGISTER_RESPONSE" | jq '.'
echo ""

# Check if registration was successful
if echo "$REGISTER_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
  if [ "$(echo "$REGISTER_RESPONSE" | jq -r '.success')" = "true" ]; then
    echo "✅ Registration successful!"
    echo ""

    # Extract organization info
    ORG_NAME=$(echo "$REGISTER_RESPONSE" | jq -r '.data.organization.name')
    ORG_SLUG=$(echo "$REGISTER_RESPONSE" | jq -r '.data.organization.slug')
    ORG_ROLE=$(echo "$REGISTER_RESPONSE" | jq -r '.data.organization.role')

    echo "👤 User created:"
    echo "   - Email: $(echo "$REGISTER_RESPONSE" | jq -r '.data.user.email')"
    echo "   - Full Name: $(echo "$REGISTER_RESPONSE" | jq -r '.data.user.fullName')"
    echo ""

    echo "🏢 Organization created:"
    echo "   - Name: $ORG_NAME"
    echo "   - Slug: $ORG_SLUG"
    echo "   - Role: $ORG_ROLE"
    echo ""

    echo "📝 Step 2: Login with new user"
    LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
      -H "Content-Type: application/json" \
      -d "{
        \"email\": \"$EMAIL\",
        \"password\": \"$PASSWORD\"
      }")

    echo "Login Response:"
    echo "$LOGIN_RESPONSE" | jq '.'
    echo ""

    # Check if login was successful
    if [ "$(echo "$LOGIN_RESPONSE" | jq -r '.success')" = "true" ]; then
      echo "✅ Login successful!"
      echo ""

      ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken')

      echo "🔑 Access Token (first 50 chars): ${ACCESS_TOKEN:0:50}..."
      echo ""

      echo "📝 Step 3: Test authenticated request (Get organizations)"
      ORG_RESPONSE=$(curl -s -X GET http://localhost:8080/api/organizations \
        -H "Authorization: Bearer $ACCESS_TOKEN")

      echo "Organizations Response:"
      echo "$ORG_RESPONSE" | jq '.'
      echo ""

      if [ "$(echo "$ORG_RESPONSE" | jq -r '.success')" = "true" ]; then
        ORG_COUNT=$(echo "$ORG_RESPONSE" | jq -r '.data | length')
        echo "✅ User has access to $ORG_COUNT organization(s)"
        echo ""

        echo "🎉 SUCCESS! Registration flow is working correctly:"
        echo "   1. ✅ User registered"
        echo "   2. ✅ Organization auto-created"
        echo "   3. ✅ User can login immediately"
        echo "   4. ✅ User has access to their workspace"
      else
        echo "❌ Failed to get organizations"
      fi
    else
      echo "❌ Login failed!"
      echo "Error: $(echo "$LOGIN_RESPONSE" | jq -r '.error')"
    fi
  else
    echo "❌ Registration failed!"
    echo "Error: $(echo "$REGISTER_RESPONSE" | jq -r '.error')"
  fi
else
  echo "❌ Registration request failed!"
  echo "Response: $REGISTER_RESPONSE"
fi

echo ""
echo "================================="
echo "Test completed!"
