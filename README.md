
# Authentication API Endpoints

This document outlines the authentication endpoints available in the API.

## 1. Create Verify Token

**Endpoint:** `POST http://localhost:3000/auth/token`

**Request Body:**
```json
{
    "mail": "user-email"
}
```

## 2. Verify Token

**Endpoint:** `POST http://localhost:3000/auth/verify`

**Request Body:**
```json
{
    "mail": "user-email",
    "token": "code"
}
```

## 3. Login

**Endpoint:** `POST http://localhost:3000/auth/login`

**Request Body:**
```json
{
    "email": "user-mail",
    "password": "user-password"
}
```

## 4. Get User Info

**Endpoint:** `GET http://localhost:3000/auth/me`

**Headers:** 
- Add `Bearer token` to the header.

**Response:** Returns user information.
