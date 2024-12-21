import { defineStore } from "pinia";
import { successToast } from "~/plugins/vue3-toastify";
import { useDialogStore } from "./dialog";
import type {
  RegisterInput,
  EventResponse,
  LoginInput,
  CheckInInput,
} from "~/types";

export const useDataStore = defineStore(
  "data",
  () => {
    const { $api } = useNuxtApp();
    const dialog = useDialogStore();
    const config = useRuntimeConfig();
    const count = ref(1);
    const token = ref("");
    const events = reactive<EventResponse | {}>({});
    const customerDetails = reactive({});

    const router = useRouter();

    const register = (payload: RegisterInput) => {
      dialog.isLoading = true;
      return new Promise((resolve, reject) => {
        $api.data.register(payload).then((res: any) => {
          console.log(res);
          dialog.isLoading = false;
          resolve(res.data);
        });
      });
    };
    const login = (payload: LoginInput) => {
      dialog.isLoading = true;
      return new Promise((resolve, reject) => {
        $api.data.login(payload).then((res: any) => {
          console.log(res);
          token.value = res.data.token;
          successToast(res.message);
          dialog.isLoading = false;
          resolve(res.data);
        });
      });
    };
    const checkIn = (payload: CheckInInput) => {
      dialog.isLoading = true;
      return new Promise((resolve, reject) => {
        $api.data.checkIn(payload).then((res: any) => {
          console.log(res);
          dialog.isLoading = false;
          successToast(res.message);
          resolve(res);
        });
      });
    };
    const getCustomerTicketDetails = (payload: string) => {
      dialog.isLoading = true;
      return new Promise((resolve, reject) => {
        $api.data.getCustomerTicketDetails(payload).then((res: any) => {
          console.log(res);
          dialog.isLoading = false;
          Object.assign(customerDetails, res.data);
          successToast(res.message);
          resolve(res.data);
        });
      });

    };

    const getEvent = () => {
      $api.data.getEvent(config.public.eventID).then((res: any) => {
        console.log(res);
        Object.assign(events, res.data);
      });
    };

    return {
      count,
      token,
      register,
      login,
      getEvent,
      events,
      checkIn,
      getCustomerTicketDetails,
      customerDetails,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
