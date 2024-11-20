export const endpoints = [
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
    id: "auth-revoke",
    category: "Authentication",
    path: "/api/v1/auth/revoke",
    method: "POST",
    description: "Revoke an active token",
    authentication: "Bearer Token",
    parameters: [
      {
        name: "token",
        type: "string",
        required: true,
        description: "The access token or refresh token to revoke"
      },
      {
        name: "token_type_hint",
        type: "string",
        required: false,
        description: "Type of token to revoke (access_token or refresh_token)"
      }
    ],
    responses: {
      "200": {
        description: "Token revoked successfully",
        example: {
          message: "Token has been revoked"
        }
      },
      "400": {
        description: "Invalid token",
        example: {
          error: "invalid_token",
          error_description: "Token is invalid or has already been revoked"
        }
      }
    }
  },
  {
    id: "users-list",
    category: "Users",
    path: "/api/v1/users",
    method: "GET",
    description: "List all users",
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
      }
    ],
    responses: {
      "200": {
        description: "Successful response",
        example: {
          users: [
            {
              id: "user_123",
              name: "John Doe",
              email: "john@example.com"
            }
          ],
          pagination: {
            total: 100,
            page: 1,
            limit: 10
          }
        }
      },
      "401": {
        description: "Unauthorized",
        example: {
          error: "Invalid or missing API key"
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
      }
    ],
    responses: {
      "201": {
        description: "User created successfully",
        example: {
          id: "user_123",
          name: "John Doe",
          email: "john@example.com"
        }
      },
      "400": {
        description: "Invalid request",
        example: {
          error: "Invalid email format"
        }
      }
    }
  }
];

export const categories = [
  {
    id: "authentication",
    name: "Authentication",
    description: "API authentication and authorization endpoints",
    endpoints: ["auth-token", "auth-refresh", "auth-revoke"]
  },
  {
    id: "users",
    name: "Users",
    description: "User management endpoints",
    endpoints: ["users-list", "users-create"]
  }
];