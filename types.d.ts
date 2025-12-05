export interface RegisterInput {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  ticket_id: string;
  quantity: number;
  token: string | undefined;
}

export interface EventResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tickets: Tickets[];
}

export interface Tickets {
  id: string;
  name: string;
  amount: number;
  fee: number;
  quantity: number;
  limited: boolean;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentInfo {
  ref: string;
  amount: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CheckInInput {
  ticket_checkin_number: number;
  customer_ticket_id: string;
}

// Paystack Pop global type declaration
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

// For direct access (when script is loaded)
declare const PaystackPop: {
  setup: (options: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    callback: (response: { reference: string }) => void;
    onClose: () => void;
  }) => {
    openIframe: () => void;
  };
};
