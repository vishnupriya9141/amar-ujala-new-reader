import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from './api';

/**
 * API Response interface with enhanced typing
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
  timestamp: string;
}

/**
 * API Error interface with detailed error information
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
  timestamp: string;
}

/**
 * Pagination interface for paginated responses
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated API Response interface
 */
export interface PaginatedApiResponse<T = any> extends ApiResponse<T> {
  pagination: PaginationMeta;
}

/**
 * Axios instance configuration
 */
const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create axios instance with interceptors
 */
const apiClient: AxiosInstance = axios.create(axiosConfig);

/**
 * Request interceptor for adding auth tokens, logging, etc.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add any request preprocessing here
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common responses/errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);

    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized access');
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 500:
          // Handle server error
          console.error('Internal server error');
          break;
        default:
          console.error(`API Error ${status}:`, data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      // Other error
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Generic GET request with enhanced response typing
 */
export const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.get<T>(url, config);
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Generic POST request with enhanced response typing
 */
export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.post<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Generic PUT request with enhanced response typing
 */
export const put = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.put<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Generic DELETE request with enhanced response typing
 */
export const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await apiClient.delete<T>(url, config);
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    timestamp: new Date().toISOString(),
  };
};

/**
 * News-specific API functions
 */
export const newsApi = {
  /**
   * Fetch all news articles
   */
  getAll: () => get<NewsArticle[]>('/news'),

  /**
   * Fetch single article by ID
   */
  getById: (id: number) => get<NewsArticle>(`/news/${id}`),

  /**
   * Fetch articles by category
   */
  getByCategory: (category: string) => get<NewsArticle[]>(`/news/category/${encodeURIComponent(category)}`),

  /**
   * Fetch weather data
   */
  getWeather: (city: string) => get<WeatherData>(`/weather/${encodeURIComponent(city)}`),
};

/**
 * Enhanced type definitions for API responses with strict typing
 */
export interface NewsArticle {
  readonly id: number;
  readonly title: string;
  readonly excerpt: string;
  readonly fullContent: string;
  readonly category: string;
  readonly image: string | null;
  readonly date: string;
  readonly readTime: string;
  readonly featured?: boolean;
  readonly views?: number;
  readonly isRead?: boolean;
}

export interface WeatherData {
  readonly city: string;
  readonly temperature: number;
  readonly description: string;
  readonly humidity: number;
  readonly windSpeed: number;
  readonly icon: string;
}

/**
 * API request configuration interfaces
 */
export interface NewsFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

export interface WeatherRequest {
  city?: string;
  lat?: number;
  lon?: number;
}

/**
 * API endpoints enum for type safety
 */
export enum ApiEndpoints {
  NEWS = '/news',
  NEWS_BY_ID = '/news/:id',
  NEWS_BY_CATEGORY = '/news/category/:category',
  WEATHER = '/weather/:city',
}

/**
 * HTTP status codes enum
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export default apiClient;