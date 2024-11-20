import { NextResponse } from 'next/server';

export async function GET() {
  const endpoints = [
    {
      id: "auth-token",
      category: "Authentication",
      path: "/api/v1/auth/token",
      method: "POST",
      description: "Generate an access token",
      authentication: "API Key",
      parameters: [
        {
          name: "grant_type",
          type: "string",
          required: true,
          description: "Authentication grant type (client_credentials, authorization_code, refresh_token)"
        },
        {
          name: "scope",
          type: "string",
          required: false,
          description: "Requested access scope"
        }
      ],
      responses: {
        "200": {
          description: "Token generated successfully",
          example: {
            access_token: "eyJhbGciOiJIUzI1NiIs...",
            token_type: "Bearer",
            expires_in: 3600,
            scope: "read write"
          }
        },
        "401": {
          description: "Invalid credentials",
          example: {
            error: "invalid_client",
            error_description: "Invalid API key"
          }
        }
      }
    },
    {
      id: "auth-refresh",
      category: "Authentication",
      path: "/api/v1/auth/refresh",
      method: "POST",
      description: "Refresh an expired access token",
      authentication: "Refresh Token",
      parameters: [
        {
          name: "refresh_token",
          type: "string",
          required: true,
          description: "The refresh token obtained from the original authentication"
        }
      ],
      responses: {
        "200": {
          description: "Token refreshed successfully",
          example: {
            access_token: "eyJhbGciOiJIUzI1NiIs...",
            token_type: "Bearer",
            expires_in: 3600,
            refresh_token: "def456..."
          }
        },
        "400": {
          description: "Invalid refresh token",
          example: {
            error: "invalid_grant",
            error_description: "Refresh token expired or invalid"
          }
        }
      }
    },
    {
      id: "users-list",
      category: "Users",
      path: "/api/v1/users",
      method: "GET",
      description: "List all users with optional filtering",
      authentication: "Bearer Token",
      parameters: [
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination"
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of items per page"
        },
        {
          name: "status",
          type: "string",
          required: false,
          description: "Filter by user status (active, inactive)"
        },
        {
          name: "role",
          type: "string",
          required: false,
          description: "Filter by user role"
        }
      ],
      responses: {
        "200": {
          description: "List of users",
          example: {
            data: [
              {
                id: "user_123",
                name: "John Doe",
                email: "john@example.com",
                role: "developer",
                status: "active",
                createdAt: "2024-02-20T00:00:00Z"
              }
            ],
            pagination: {
              total: 100,
              page: 1,
              limit: 10,
              totalPages: 10
            }
          }
        },
        "401": {
          description: "Unauthorized",
          example: {
            error: "unauthorized",
            message: "Invalid or missing API key"
          }
        }
      }
    },
    {
      id: "users-create",
      category: "Users",
      path: "/api/v1/users",
      method: "POST",
      description: "Create a new user",
      authentication: "Bearer Token",
      parameters: [
        {
          name: "name",
          type: "string",
          required: true,
          description: "User's full name"
        },
        {
          name: "email",
          type: "string",
          required: true,
          description: "User's email address"
        },
        {
          name: "role",
          type: "string",
          required: true,
          description: "User's role (developer, admin, viewer)"
        }
      ],
      responses: {
        "201": {
          description: "User created successfully",
          example: {
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
            role: "developer",
            status: "active",
            createdAt: "2024-02-20T00:00:00Z"
          }
        },
        "400": {
          description: "Invalid request",
          example: {
            error: "validation_error",
            message: "Invalid email format"
          }
        }
      }
    },
    {
      id: "users-get",
      category: "Users",
      path: "/api/v1/users/:id",
      method: "GET",
      description: "Get a specific user by ID",
      authentication: "Bearer Token",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "User ID"
        }
      ],
      responses: {
        "200": {
          description: "User details",
          example: {
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
            role: "developer",
            status: "active",
            createdAt: "2024-02-20T00:00:00Z",
            lastLogin: "2024-02-20T12:00:00Z"
          }
        },
        "404": {
          description: "User not found",
          example: {
            error: "not_found",
            message: "User not found"
          }
        }
      }
    },
    {
      id: "users-update",
      category: "Users",
      path: "/api/v1/users/:id",
      method: "PUT",
      description: "Update a user's information",
      authentication: "Bearer Token",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "User ID"
        },
        {
          name: "name",
          type: "string",
          required: false,
          description: "User's full name"
        },
        {
          name: "role",
          type: "string",
          required: false,
          description: "User's role"
        },
        {
          name: "status",
          type: "string",
          required: false,
          description: "User's status"
        }
      ],
      responses: {
        "200": {
          description: "User updated successfully",
          example: {
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
            status: "active",
            updatedAt: "2024-02-20T12:00:00Z"
          }
        },
        "404": {
          description: "User not found",
          example: {
            error: "not_found",
            message: "User not found"
          }
        }
      }
    },
    {
      id: "users-delete",
      category: "Users",
      path: "/api/v1/users/:id",
      method: "DELETE",
      description: "Delete a user",
      authentication: "Bearer Token",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "User ID"
        }
      ],
      responses: {
        "204": {
          description: "User deleted successfully",
          example: null
        },
        "404": {
          description: "User not found",
          example: {
            error: "not_found",
            message: "User not found"
          }
        }
      }
    }
  ];

  return NextResponse.json(endpoints);
}