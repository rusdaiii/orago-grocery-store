export interface SuccessPaymentResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers: { bank: string; va_number: string }[];
  bca_va_number: string;
  pdf_url: string;
  finish_redirect_url: string;
}
