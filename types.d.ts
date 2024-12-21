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