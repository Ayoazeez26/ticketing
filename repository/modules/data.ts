import FetchFactory from "../factory";

import type {
  RegisterInput,
  LoginInput,
  CheckInInput
} from "~/types";

class DataModule extends FetchFactory {
  private RESOURCE = "";

  async register(registerDetails: RegisterInput): Promise {
    return await this.call(
      "POST",
      `${this.RESOURCE}/api/event/register`,
      registerDetails
    );
  }
  async login(loginDetails: LoginInput): Promise {
    return await this.call(
      "POST",
      `${this.RESOURCE}/api/auth/signin`,
      loginDetails
    );
  }
  async checkIn(customerDetails: CheckInInput): Promise {
    return await this.call(
      "POST",
      `${this.RESOURCE}/api/event/check-in`,
      customerDetails
    );
  }
  async getEvent(eventId: string): Promise {
    return await this.call("GET", `${this.RESOURCE}/api/event/${eventId}`);
  }
  async getCustomerTicketDetails(ticketId: string): Promise {
    return await this.call("GET", `${this.RESOURCE}/api/event/customer_ticket_details/${ticketId}`);
  }
}

export default DataModule;
