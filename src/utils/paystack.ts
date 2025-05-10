
// Paystack utility functions for payment processing

// Paystack public key - this is okay to include in the frontend code as it's meant to be public
export const PAYSTACK_PUBLIC_KEY = "pk_live_14a6578f3c80b77a102fa28c1362ed5b445fd479";

// Interface for payment initialization payload
export interface PaystackPayload {
  email: string;
  amount: number; // Amount in kobo (multiply Ghana cedis by 100)
  metadata?: {
    order_id?: string;
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    [key: string]: any;
  };
  callback_url?: string;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
}

// Initialize Paystack payment
export const initializePayment = (payload: PaystackPayload): void => {
  try {
    const { onSuccess, onCancel, ...paystackPayload } = payload;
    
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: paystackPayload.email,
      amount: paystackPayload.amount,
      metadata: paystackPayload.metadata || {},
      callback_url: paystackPayload.callback_url || window.location.origin + '/order-success',
      onClose: () => {
        console.log('Payment window closed');
        if (onCancel) onCancel();
      },
      callback: (response: { reference: string }) => {
        console.log('Payment successful', response);
        if (onSuccess) onSuccess(response.reference);
      },
    });
    
    handler.openIframe();
  } catch (error) {
    console.error('Failed to initialize Paystack payment:', error);
    if (payload.onCancel) {
      payload.onCancel();
    }
  }
};

// Add TypeScript declaration for Paystack
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}
