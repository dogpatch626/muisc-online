#!/bin/bash

# Music Online Worker API Test Script
# Make sure the worker is running: npm run dev:worker

BASE_URL="http://localhost:8787"

echo "🎵 Music Online Worker API Tests"
echo "================================="
echo ""

# Test 1: Health check
echo "1️⃣  Testing health endpoint..."
curl -s "$BASE_URL/health" | jq '.'
echo ""

# Test 2: API info
echo "2️⃣  Testing API info..."
curl -s "$BASE_URL/" | jq '.'
echo ""

# Test 3: List videos (empty initially)
echo "3️⃣  Listing videos..."
curl -s "$BASE_URL/api/videos" | jq '.'
echo ""

# Test 4: Create a video (without auth - should fail)
echo "4️⃣  Creating video without auth (should fail)..."
curl -s -X POST "$BASE_URL/api/videos" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Parabol",
    "artist": "TOOL",
    "videoId": "-_nQhGR0K8M",
    "src": "https://www.youtube-nocookie.com/embed/-_nQhGR0K8M",
    "tags": ["progressive rock", "metal"]
  }' | jq '.'
echo ""

# Test 5: Create a video with auth token
echo "5️⃣  Creating video with auth..."
curl -s -X POST "$BASE_URL/api/videos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dev-token-123" \
  -d '{
    "title": "Parabol",
    "artist": "TOOL",
    "videoId": "-_nQhGR0K8M",
    "src": "https://www.youtube-nocookie.com/embed/-_nQhGR0K8M",
    "tags": ["progressive rock", "metal"]
  }' | jq '.'
echo ""

# Test 6: Invalid video data
echo "6️⃣  Creating video with invalid data (should fail)..."
curl -s -X POST "$BASE_URL/api/videos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dev-token-123" \
  -d '{
    "title": "",
    "artist": "TOOL"
  }' | jq '.'
echo ""

# Test 7: Test 404
echo "7️⃣  Testing 404..."
curl -s "$BASE_URL/api/nonexistent" | jq '.'
echo ""

# Test 8: Test CORS preflight
echo "8️⃣  Testing CORS preflight..."
curl -s -X OPTIONS "$BASE_URL/api/videos" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v 2>&1 | grep -i "access-control"
echo ""

echo "✅ Tests complete!"
