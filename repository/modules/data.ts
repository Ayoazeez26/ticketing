import FetchFactory from "../factory";

import type {
  RegisterInput
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
  async getEvent(eventId: string): Promise {
    return await this.call(
      "GET",
      `${this.RESOURCE}/api/event/${eventId}`
    );
  }
}

export default DataModule;
