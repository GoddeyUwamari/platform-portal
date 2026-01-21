/**
 * Centralized error types and handling for the application
 * Provides consistent, user-friendly error messages
 */

export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  PERMISSION_ERROR = 'PERMISSION_ERROR',
  OFFLINE_ERROR = 'OFFLINE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AppError {
  type: ErrorType;
  message: string;
  userMessage: string;
  retryable: boolean;
  retryAfter?: number; // seconds
  statusCode?: number;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

/**
 * Maps error types to user-friendly titles
 */
export function getErrorTitle(type: ErrorType): string {
  const titles: Record<ErrorType, string> = {
    [ErrorType.NETWORK_ERROR]: 'Connection Error',
    [ErrorType.TIMEOUT_ERROR]: 'Request Timeout',
    [ErrorType.AUTH_ERROR]: 'Authentication Required',
    [ErrorType.RATE_LIMIT_ERROR]: 'Rate Limit Exceeded',
    [ErrorType.VALIDATION_ERROR]: 'Validation Error',
    [ErrorType.SERVER_ERROR]: 'Server Error',
    [ErrorType.NOT_FOUND_ERROR]: 'Not Found',
    [ErrorType.PERMISSION_ERROR]: 'Permission Denied',
    [ErrorType.OFFLINE_ERROR]: 'You\'re Offline',
    [ErrorType.UNKNOWN_ERROR]: 'Something Went Wrong',
  };
  return titles[type] || 'Error';
}

/**
 * Determines if an error is retryable based on its type
 */
export function isRetryableError(error: AppError): boolean {
  const retryableTypes = [
    ErrorType.NETWORK_ERROR,
    ErrorType.TIMEOUT_ERROR,
    ErrorType.SERVER_ERROR,
    ErrorType.RATE_LIMIT_ERROR,
    ErrorType.UNKNOWN_ERROR,
  ];
  return retryableTypes.includes(error.type);
}

/**
 * Creates a standardized AppError from various error types
 */
export function createAppError(
  error: unknown,
  context: string = 'complete this operation'
): AppError {
  // Check if offline first
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      type: ErrorType.OFFLINE_ERROR,
      message: 'Device is offline',
      userMessage: 'You appear to be offline. Please check your internet connection and try again.',
      retryable: true,
    };
  }

  // Network/fetch errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: ErrorType.NETWORK_ERROR,
      message: 'Network request failed',
      userMessage: 'Unable to connect to our servers. Please check your internet connection and try again.',
      retryable: true,
    };
  }

  // Abort/timeout errors
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      type: ErrorType.TIMEOUT_ERROR,
      message: 'Request was aborted',
      userMessage: 'The request was cancelled. Please try again.',
      retryable: true,
    };
  }

  // Generic timeout errors
  if (error instanceof Error && (
    error.message.toLowerCase().includes('timeout') ||
    error.message.toLowerCase().includes('timed out')
  )) {
    return {
      type: ErrorType.TIMEOUT_ERROR,
      message: 'Request timed out',
      userMessage: 'The request took too long to complete. Please try again.',
      retryable: true,
    };
  }

  // API/HTTP errors (handle axios-style and fetch-style responses)
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;

    // Extract status code from various error formats
    let status: number | undefined;
    let responseData: Record<string, unknown> | undefined;
    let retryAfterHeader: string | undefined;

    // Axios-style error
    if ('response' in err && typeof err.response === 'object' && err.response !== null) {
      const response = err.response as Record<string, unknown>;
      status = response.status as number;
      responseData = response.data as Record<string, unknown>;
      if (typeof response.headers === 'object' && response.headers !== null) {
        retryAfterHeader = (response.headers as Record<string, string>)['retry-after'];
      }
    }

    // Direct status on error object
    if ('status' in err && typeof err.status === 'number') {
      status = err.status;
    }

    // Fetch Response error
    if ('statusCode' in err && typeof err.statusCode === 'number') {
      status = err.statusCode;
    }

    if (status) {
      // Rate limit (429)
      if (status === 429) {
        const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;
        return {
          type: ErrorType.RATE_LIMIT_ERROR,
          message: 'Rate limit exceeded',
          userMessage: `You've made too many requests. Please wait ${retryAfter} seconds before trying again.`,
          retryable: true,
          retryAfter,
          statusCode: status,
        };
      }

      // Authentication error (401)
      if (status === 401) {
        return {
          type: ErrorType.AUTH_ERROR,
          message: 'Authentication failed',
          userMessage: 'Your session has expired. Please log in again to continue.',
          retryable: false,
          statusCode: status,
          action: {
            label: 'Log In',
            href: '/login',
          },
        };
      }

      // Permission error (403)
      if (status === 403) {
        return {
          type: ErrorType.PERMISSION_ERROR,
          message: 'Permission denied',
          userMessage: 'You don\'t have permission to perform this action. Contact your administrator if you believe this is an error.',
          retryable: false,
          statusCode: status,
        };
      }

      // Not found (404)
      if (status === 404) {
        return {
          type: ErrorType.NOT_FOUND_ERROR,
          message: 'Resource not found',
          userMessage: 'The requested resource could not be found. It may have been moved or deleted.',
          retryable: false,
          statusCode: status,
        };
      }

      // Validation error (400)
      if (status === 400) {
        const message = responseData?.message as string || 'Invalid request';
        return {
          type: ErrorType.VALIDATION_ERROR,
          message,
          userMessage: message || 'Please check your input and try again.',
          retryable: false,
          statusCode: status,
        };
      }

      // Server errors (5xx)
      if (status >= 500) {
        return {
          type: ErrorType.SERVER_ERROR,
          message: `Server error (${status})`,
          userMessage: 'Our servers are experiencing issues. Our team has been notified and we\'re working on it. Please try again shortly.',
          retryable: true,
          statusCode: status,
        };
      }
    }
  }

  // Default unknown error
  const errorMessage = error instanceof Error ? error.message : String(error);
  return {
    type: ErrorType.UNKNOWN_ERROR,
    message: errorMessage,
    userMessage: `We couldn't ${context}. Please try again. If the problem persists, contact support.`,
    retryable: true,
  };
}

/**
 * Get a recovery suggestion based on error type
 */
export function getRecoverySuggestion(type: ErrorType): string {
  const suggestions: Record<ErrorType, string> = {
    [ErrorType.NETWORK_ERROR]: 'Check your internet connection and try again.',
    [ErrorType.TIMEOUT_ERROR]: 'The server might be busy. Wait a moment and retry.',
    [ErrorType.AUTH_ERROR]: 'Log in again to continue.',
    [ErrorType.RATE_LIMIT_ERROR]: 'Wait for the cooldown period to end.',
    [ErrorType.VALIDATION_ERROR]: 'Review your input and correct any errors.',
    [ErrorType.SERVER_ERROR]: 'Try again in a few minutes.',
    [ErrorType.NOT_FOUND_ERROR]: 'Check the URL or go back to the previous page.',
    [ErrorType.PERMISSION_ERROR]: 'Contact your administrator for access.',
    [ErrorType.OFFLINE_ERROR]: 'Connect to the internet to sync your data.',
    [ErrorType.UNKNOWN_ERROR]: 'Try again or contact support if the issue persists.',
  };
  return suggestions[type] || 'Please try again.';
}
