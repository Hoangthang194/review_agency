# API Examples - Authentication

## Register (Đăng ký)

### cURL Command

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "reviewer"
  }'
```

### Postman Collection

**Request Type:** POST  
**URL:** `http://localhost:3000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "reviewer"
}
```

### Example Requests

#### 1. Đăng ký với role mặc định (reviewer)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "reviewer@example.com",
    "password": "password123",
    "name": "Reviewer User"
  }'
```

#### 2. Đăng ký với role admin
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin12345",
    "name": "Admin User",
    "role": "admin"
  }'
```

#### 3. Đăng ký với role editor
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "editor@example.com",
    "password": "editor123",
    "name": "Editor User",
    "role": "editor"
  }'
```

#### 4. Đăng ký với role writer
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "writer@example.com",
    "password": "writer123",
    "name": "Writer User",
    "role": "writer"
  }'
```

### Response Success (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reviewer",
    "status": "active"
  }
}
```

### Response Errors

#### 400 Bad Request - Missing fields
```json
{
  "error": "Email, password, and name are required"
}
```

#### 400 Bad Request - Password too short
```json
{
  "error": "Password must be at least 8 characters"
}
```

#### 400 Bad Request - Invalid role
```json
{
  "error": "Invalid role"
}
```

#### 409 Conflict - Email already exists
```json
{
  "error": "User with this email already exists"
}
```

---

## Login (Đăng nhập)

### cURL Command

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Postman Collection

**Request Type:** POST  
**URL:** `http://localhost:3000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Success (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reviewer",
    "status": "active"
  }
}
```

### Response Errors

#### 400 Bad Request
```json
{
  "error": "Email and password are required"
}
```

#### 401 Unauthorized - Invalid credentials
```json
{
  "error": "Invalid email or password"
}
```

#### 403 Forbidden - Account locked/suspended
```json
{
  "error": "Account is locked or suspended"
}
```

---

## Lưu ý

1. **Base URL**: Thay `http://localhost:3000` bằng URL thực tế của server nếu deploy
2. **Password**: Phải có ít nhất 8 ký tự
3. **Roles**: Chỉ chấp nhận: `admin`, `editor`, `writer`, `reviewer`
4. **JWT Token**: Token được trả về trong response, dùng để authenticate các request tiếp theo
5. **Authorization Header**: Khi gọi các API protected, thêm header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

