<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { PaymentInfo, RegisterInput } from "~/types";

const config = useRuntimeConfig();
const dataStore = useDataStore();
const router = useRouter();
const baseFee = ref(5000);
const fees = ref(500);
const count = ref(1);
const firstName = ref("");
const lastName = ref("");
const confirmEmail = ref("");
const phoneNumber = ref("");
const paymentDetails = reactive<PaymentInfo | {}>({});
const amount = computed(() => {
  return baseFee.value * count.value;
});
const totalAmount = computed(() => {
  return fees.value + amount.value;
});

const registerInfo: RegisterInput = reactive({
  firstname: "",
  lastname: "",
  phone: "",
  email: "hello@wearegada.com",
  ticket_id: "",
  quantity: dataStore.count
})

const register = async() => {
  const userRegistered = await dataStore.register(registerInfo);
  if (userRegistered) {
    Object.assign(paymentDetails, userRegistered);
    initializePayment();
  }
}

const initializePayment = () => {
  console.log(paymentDetails);
  console.log(config.public.pk_key)
  const handler = PaystackPop.setup({
    key: config.public.pk_key, //Replace with your public key
    email: registerInfo.email, //replace with user email
    amount: paymentDetails.amount, // the amount value is multiplied by 100 to convert to the lowest currency unit

    currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars

    ref: paymentDetails.ref, // Replace with a reference you generated
    callback: function (response: any) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      console.log("Payment complete! Reference: " + reference);

      //this happens after the payment is completed successfully
      router.push({
        path: "/success",
      });
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
};

onMounted(() => {
  registerInfo.ticket_id = dataStore.events?.tickets[0].id;
  const script = document.createElement("script");
  script.setAttribute("src", "https://js.paystack.co/v1/inline.js");
  document.body.appendChild(script);
});
</script>

<template>
  <div class="bg-white w-full min-h-screen">
    <div class="bg-lime w-full py-5">
      <div class="flex items-center gap-3 text-green max-w-[1280px] mx-auto">
        <Icon name="mdi:information-variant-circle-outline" size="24" />
        <p class="text-lg">
          We have reserved your ticket, please complete pay out within 10
          minutes to confirm
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between w-full mx-auto">
      <div class="flex flex-col w-1/2 mt-10">
        <form class="w-full flex flex-col max-w-[506px] mx-auto">
          <div class="flex flex-col w-full gap-5">
            <div class="w-full">
              <label
                for="first-name"
                class="block text-sm/6 text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  v-model="registerInfo.firstname"
                  autocomplete="given-name"
                  required
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 px-3 focus:ring-green-2 sm:text-sm/6" />
              </div>
            </div>

            <div class="w-full">
              <label
                for="last-name"
                class="block text-sm/6 text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  v-model="registerInfo.lastname"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
              </div>
            </div>
            <div class="w-full">
              <label
                for="phone"
                class="block text-sm/6 text-gray-900"
                >Phone Number</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  v-model="registerInfo.phone"
                  autocomplete="phone-number"
                  placeholder="+234"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
              </div>
            </div>

            <div class="w-full">
              <label
                for="email"
                class="block text-sm/6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  v-model="registerInfo.email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
                  <p class="text-xs mt-1 text-[#757575]">Tickets will only be sent to the email address you provide here</p>
              </div>
            </div>

            <div class="w-full">
              <label
                for="email"
                class="block text-sm/6 text-gray-900"
                >Confirm email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  v-model="confirmEmail"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
              </div>
            </div>
          </div>
          <button
            type="button"
            @click="register"
            class="text-white bg-green-2 rounded-lg px-14 py-4 text-2xl font-bold max-w-fit self-end mt-8">
            Continue
          </button>
        </form>
      </div>
      <div class="w-1/2">
        <img src="/img/info-bg.webp" alt="info background" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
