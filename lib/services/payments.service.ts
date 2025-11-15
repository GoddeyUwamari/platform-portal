import api, { handleApiResponse } from '../api';
import type {
  Payment,
  PaymentIntent,
  PaymentMethod,
  Refund,
  PaymentStats,
  RefundStats,
  PaymentFilters,
  CreatePaymentIntentPayload,
  CreateRefundPayload,
  AddPaymentMethodPayload,
  UpdatePaymentMethodPayload,
  ApiResponse,
} from '../types';

export const paymentsService = {
  // Get all payments with filters
  getAll: async (filters?: PaymentFilters): Promise<Payment[]> => {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.minAmount) params.append('minAmount', filters.minAmount.toString());
    if (filters?.maxAmount) params.append('maxAmount', filters.maxAmount.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = `/api/payments${queryString ? `?${queryString}` : ''}`;

    const response = await api.get<ApiResponse<Payment[]>>(url);
    return handleApiResponse(response);
  },

  // Get payment by ID
  getById: async (id: string): Promise<Payment> => {
    const response = await api.get<ApiResponse<Payment>>(`/api/payments/${id}`);
    return handleApiResponse(response);
  },

  // Get payment statistics
  getStats: async (): Promise<PaymentStats> => {
    const response = await api.get<ApiResponse<PaymentStats>>('/api/payments/stats');
    return handleApiResponse(response);
  },

  // Create payment intent
  createIntent: async (data: CreatePaymentIntentPayload): Promise<PaymentIntent> => {
    const response = await api.post<ApiResponse<PaymentIntent>>('/api/payments/intents', data);
    return handleApiResponse(response);
  },

  // Confirm payment intent
  confirmIntent: async (id: string): Promise<PaymentIntent> => {
    const response = await api.post<ApiResponse<PaymentIntent>>(`/api/payments/intents/${id}/confirm`);
    return handleApiResponse(response);
  },

  // Cancel payment intent
  cancelIntent: async (id: string): Promise<PaymentIntent> => {
    const response = await api.post<ApiResponse<PaymentIntent>>(`/api/payments/intents/${id}/cancel`);
    return handleApiResponse(response);
  },
};

export const paymentMethodsService = {
  // Get all payment methods
  getAll: async (): Promise<PaymentMethod[]> => {
    const response = await api.get<ApiResponse<PaymentMethod[]>>('/api/payment-methods');
    return handleApiResponse(response);
  },

  // Add payment method
  add: async (data: AddPaymentMethodPayload): Promise<PaymentMethod> => {
    const response = await api.post<ApiResponse<PaymentMethod>>('/api/payment-methods', data);
    return handleApiResponse(response);
  },

  // Update payment method
  update: async (id: string, data: UpdatePaymentMethodPayload): Promise<PaymentMethod> => {
    const response = await api.patch<ApiResponse<PaymentMethod>>(`/api/payment-methods/${id}`, data);
    return handleApiResponse(response);
  },

  // Delete payment method
  delete: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/payment-methods/${id}`);
    return handleApiResponse(response);
  },

  // Set as default payment method
  setDefault: async (id: string): Promise<PaymentMethod> => {
    const response = await api.post<ApiResponse<PaymentMethod>>(`/api/payment-methods/${id}/default`);
    return handleApiResponse(response);
  },
};

export const refundsService = {
  // Get all refunds
  getAll: async (): Promise<Refund[]> => {
    const response = await api.get<ApiResponse<Refund[]>>('/api/refunds');
    return handleApiResponse(response);
  },

  // Create refund
  create: async (data: CreateRefundPayload): Promise<Refund> => {
    const response = await api.post<ApiResponse<Refund>>('/api/refunds', data);
    return handleApiResponse(response);
  },

  // Get refund statistics
  getStats: async (): Promise<RefundStats> => {
    const response = await api.get<ApiResponse<RefundStats>>('/api/refunds/stats');
    return handleApiResponse(response);
  },
};
