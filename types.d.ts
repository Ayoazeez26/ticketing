export interface RegisterInput {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  ticket_id: string;
  quantity: number;
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