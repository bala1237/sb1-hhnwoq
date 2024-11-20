"use client";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface TokenRequest {
  grant_type: 'authorization_code' | 'refresh_token' | 'client_credentials';
  code?: string;
  refresh_token?: string;
  client_id: string;
  client_secret: string;
  redirect_uri?: string;
}

export const oauthService = {
  // Exchange authorization code for tokens
  exchangeCodeForTokens: async (
    code: string,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): Promise<TokenResponse> => {
    const tokenRequest: TokenRequest = {
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri
    };

    // In a real implementation, this would be an API call
    // For sandbox, we'll simulate the response
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        sub: clientId,
        scope: ['accounts', 'payments'],
        exp: Math.floor(Date.now() / 1000) + 3600
      }))}`,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: `refresh.${btoa(JSON.stringify({
        sub: clientId,
        exp: Math.floor(Date.now() / 1000) + 86400
      }))}`,
      scope: 'accounts payments'
    };
  },

  // Refresh access token
  refreshToken: async (
    refreshToken: string,
    clientId: string,
    clientSecret: string
  ): Promise<TokenResponse> => {
    const tokenRequest: TokenRequest = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        sub: clientId,
        scope: ['accounts', 'payments'],
        exp: Math.floor(Date.now() / 1000) + 3600
      }))}`,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'accounts payments'
    };
  },

  // Client credentials flow
  getClientCredentialsToken: async (
    clientId: string,
    clientSecret: string,
    scope?: string
  ): Promise<TokenResponse> => {
    const tokenRequest: TokenRequest = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        sub: clientId,
        scope: scope?.split(' ') || [],
        exp: Math.floor(Date.now() / 1000) + 3600
      }))}`,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: scope || ''
    };
  }
};