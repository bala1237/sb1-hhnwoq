import { OpenAPIV3 } from 'openapi-types';

export const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Enterprise Developer Portal API',
    version: '1.0.0',
    description: 'API documentation for the Enterprise Developer Portal',
    contact: {
      name: 'API Support',
      email: 'api-support@company.com',
      url: 'https://developer.company.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          message: { type: 'string' }
        },
        required: ['code', 'message']
      }
    }
  },
  tags: [
    {
      name: 'Enterprise Analytics',
      description: 'Enterprise-wide analytics and reporting endpoints'
    }
  ],
  paths: {
    '/enterprise/analytics/usage': {
      get: {
        tags: ['Enterprise Analytics'],
        summary: 'Get enterprise-wide API usage metrics',
        description: 'Retrieve aggregated API usage metrics across all organizations',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'startDate',
            in: 'query',
            schema: { type: 'string', format: 'date' },
            description: 'Start date for the analytics period'
          },
          {
            name: 'endDate',
            in: 'query',
            schema: { type: 'string', format: 'date' },
            description: 'End date for the analytics period'
          },
          {
            name: 'interval',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['hour', 'day', 'week', 'month']
            },
            description: 'Time interval for data aggregation'
          }
        ],
        responses: {
          '200': {
            description: 'Enterprise usage metrics',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    totalCalls: { type: 'integer' },
                    successRate: { type: 'number', format: 'float' },
                    errorRate: { type: 'number', format: 'float' },
                    avgLatency: { type: 'number', format: 'float' },
                    timeline: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          timestamp: { type: 'string', format: 'date-time' },
                          calls: { type: 'integer' },
                          errors: { type: 'integer' },
                          latency: { type: 'number' }
                        }
                      }
                    },
                    organizations: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          usage: { type: 'integer' },
                          limit: { type: 'integer' }
                        }
                      }
                    }
                  }
                },
                example: {
                  totalCalls: 2500000,
                  successRate: 99.9,
                  errorRate: 0.1,
                  avgLatency: 45,
                  timeline: [
                    {
                      timestamp: "2024-02-20T00:00:00Z",
                      calls: 180000,
                      errors: 180,
                      latency: 42
                    }
                  ],
                  organizations: [
                    {
                      id: "org_1",
                      name: "Acme Corp",
                      usage: 850000,
                      limit: 1000000
                    }
                  ]
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '403': {
            description: 'Forbidden - Insufficient permissions',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },

    '/enterprise/analytics/errors': {
      get: {
        tags: ['Enterprise Analytics'],
        summary: 'Get enterprise-wide error analytics',
        description: 'Retrieve aggregated error metrics and patterns across all organizations',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'startDate',
            in: 'query',
            schema: { type: 'string', format: 'date' }
          },
          {
            name: 'endDate',
            in: 'query',
            schema: { type: 'string', format: 'date' }
          },
          {
            name: 'organizationId',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by organization ID'
          }
        ],
        responses: {
          '200': {
            description: 'Error analytics data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    summary: {
                      type: 'object',
                      properties: {
                        totalErrors: { type: 'integer' },
                        errorRate: { type: 'number' },
                        mostCommonError: { type: 'string' }
                      }
                    },
                    byStatusCode: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          statusCode: { type: 'integer' },
                          count: { type: 'integer' },
                          percentage: { type: 'number' }
                        }
                      }
                    },
                    byEndpoint: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          endpoint: { type: 'string' },
                          method: { type: 'string' },
                          errorCount: { type: 'integer' },
                          errorRate: { type: 'number' }
                        }
                      }
                    }
                  }
                },
                example: {
                  summary: {
                    totalErrors: 1250,
                    errorRate: 0.1,
                    mostCommonError: "401 Unauthorized"
                  },
                  byStatusCode: [
                    {
                      statusCode: 401,
                      count: 450,
                      percentage: 36
                    }
                  ],
                  byEndpoint: [
                    {
                      endpoint: "/api/v1/users",
                      method: "GET",
                      errorCount: 250,
                      errorRate: 0.02
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },

    '/enterprise/analytics/performance': {
      get: {
        tags: ['Enterprise Analytics'],
        summary: 'Get enterprise-wide performance metrics',
        description: 'Retrieve detailed performance metrics across all organizations',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'startDate',
            in: 'query',
            schema: { type: 'string', format: 'date' }
          },
          {
            name: 'endDate',
            in: 'query',
            schema: { type: 'string', format: 'date' }
          }
        ],
        responses: {
          '200': {
            description: 'Performance metrics',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    overall: {
                      type: 'object',
                      properties: {
                        avgResponseTime: { type: 'number' },
                        p95ResponseTime: { type: 'number' },
                        p99ResponseTime: { type: 'number' }
                      }
                    },
                    byEndpoint: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          endpoint: { type: 'string' },
                          method: { type: 'string' },
                          avgResponseTime: { type: 'number' },
                          p95ResponseTime: { type: 'number' },
                          callVolume: { type: 'integer' }
                        }
                      }
                    },
                    byOrganization: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          avgResponseTime: { type: 'number' },
                          callVolume: { type: 'integer' }
                        }
                      }
                    }
                  }
                },
                example: {
                  overall: {
                    avgResponseTime: 45.5,
                    p95ResponseTime: 125.0,
                    p99ResponseTime: 250.0
                  },
                  byEndpoint: [
                    {
                      endpoint: "/api/v1/users",
                      method: "GET",
                      avgResponseTime: 35.2,
                      p95ResponseTime: 95.0,
                      callVolume: 450000
                    }
                  ],
                  byOrganization: [
                    {
                      id: "org_1",
                      name: "Acme Corp",
                      avgResponseTime: 42.3,
                      callVolume: 850000
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
};