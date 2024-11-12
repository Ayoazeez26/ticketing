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

    // const miniMockRequest = (payload: MiniMockRequestInput) => {
    //   dialog.isLoading = true;
    //   return new Promise((resolve, reject) => {
    //     $api.data.miniMockRequest(payload).then((res: any) => {
    //       console.log(res);
    //       dialog.isLoading = false;
    //       resolve(res);
    //     });
    //   });
    // };

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

    // const login = (payload: UserLoginInput) => {
    //   dialog.isLoading = true;
    //   return new Promise((resolve, reject) => {
    //     $api.data.login(payload).then((res: any) => {
    //       dialog.isLoading = false;
    //       console.log(res);
    //       token.value = res.accessToken;
    //       user.value = res;
    //       authenticated.value = true;
    //       // localStorage.setItem('user-token', res.accessToken);
    //       router.push("/consultancy/dashboard");
    //     });
    //   });
    // };

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
