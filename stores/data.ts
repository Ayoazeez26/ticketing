import { defineStore } from "pinia";
import { successToast } from "~/plugins/vue3-toastify";
import { useDialogStore } from "./dialog";
import type { RegisterInput, EventResponse } from "~/types";

export const useDataStore = defineStore(
  "data",
  () => {
    const { $api } = useNuxtApp();
    const dialog = useDialogStore();
    const config = useRuntimeConfig();
    const count = ref(1);
    const token = ref("");
    const events  = reactive<EventResponse | {}>({});

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
      getEvent,
      events
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
