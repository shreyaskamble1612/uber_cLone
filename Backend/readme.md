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