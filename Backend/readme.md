# /users/register

**Method:** `POST`  
**Endpoint:** `/users/register`  
**Description:** Registers a new user in the system.

## Request Body
```json
{
  "fullname": {
    "firstname": "required (min length: 3)",
    "lastname": "optional (min length: 3)"
  },
  "email": "required (valid email)",
  "password": "required (min length: 8)"
}
```

## /users/login

**Method:** `POST`  
**Endpoint:** `/users/login`  
**Description:** Logs a user in using email and password.

### Request Body
```json
{
  "email": "required (valid email)",
  "password": "required (min length: 5)"
}
```

## /users/profile
**Method:** `GET`  
**Endpoint:** `/users/profile`  
**Description:** Returns the current user's profile.  
**Response:**  
- **200 OK**: Returns the user profile.  
- **401 Unauthorized**

## /users/logout
**Method:** `GET`  
**Endpoint:** `/users/logout`  
**Description:** Logs the user out by clearing and blacklisting the token.  
**Response:**  
- **200 OK**: Returns a success message.  
- **401 Unauthorized**