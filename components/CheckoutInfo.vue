<script setup lang="ts">
import { errorToast } from "~/plugins/vue3-toastify";
import type { PaymentInfo, RegisterInput } from "~/types";

const config = useRuntimeConfig();
const { executeRecaptcha } = useGoogleRecaptcha();
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

interface FormErrors {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  confirmEmail?: string;
}

const registerInfo: RegisterInput = reactive({
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  ticket_id: "",
  quantity: dataStore.count,
  token: "",
});

const errors = reactive<FormErrors>({});

const validateField = (field: keyof RegisterInput) => {
  switch (field) {
    case "firstname":
      errors.firstname = registerInfo.firstname
        ? ""
        : "First name is required.";
      break;
    case "lastname":
      errors.lastname = registerInfo.lastname ? "" : "Last name is required.";
      break;
    case "phone":
      errors.phone = registerInfo.phone.match(/^\d{11}$/)
        ? ""
        : "Phone number must be exactly 11 digits.";
      break;
    case "email":
      errors.email = registerInfo.email.match(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      )
        ? ""
        : "Invalid email format.";
      break;
  }
};

const validateConfirmEmail = () => {
  errors.confirmEmail =
    confirmEmail.value === registerInfo.email ? "" : "Emails do not match.";
};

const register = async () => {
  for (const field in registerInfo) {
    validateField(field as keyof RegisterInput);
  }
  validateConfirmEmail();
  if (Object.values(errors).some((error) => error)) {
    errorToast("Please fix the errors in the form");
  }

  const { token } = await executeRecaptcha("submit");

  registerInfo.token = token;
  const userRegistered = await dataStore.register(registerInfo);
  if (userRegistered) {
    console.log(userRegistered);
    Object.assign(paymentDetails, userRegistered);
    initializePayment();
  }
};

const initializePayment = () => {
  console.log(paymentDetails);
  console.log(config.public.pk_key);
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
    <div class="bg-lime w-full py-5 px-3 md:px-4">
      <div class="flex items-center gap-3 text-green max-w-[1280px] mx-auto">
        <Icon name="mdi:information-variant-circle-outline" size="24" />
        <p class="text-lg">
          We have reserved your ticket, please complete pay out within 10
          minutes to confirm
        </p>
      </div>
    </div>
    <div
      class="flex flex-col-reverse md:flex-row items-center justify-between w-full mx-auto lg:px-6 xl:px-0">
      <div class="flex flex-col w-full px-4 md:px-0 md:w-1/2 mt-10">
        <form class="w-full flex flex-col md:max-w-[506px] mx-auto">
          <div class="flex flex-col w-full gap-1">
            <div class="w-full">
              <label for="first-name" class="block text-sm/6 text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  v-model="registerInfo.firstname"
                  @blur="validateField('firstname')"
                  :class="{ 'ring-red-500': errors.firstname }"
                  required
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 px-3 focus:ring-green-2 sm:text-sm/6" />
                <p v-if="errors.firstname" class="text-red-500 text-sm mt-1">
                  {{ errors.firstname }}
                </p>
                <p v-else class="text-white text-sm mt-1">
                  no errors here mate
                </p>
              </div>
            </div>

            <!-- Last Name -->
            <div class="w-full">
              <label for="last-name" class="block text-sm/6 text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  v-model="registerInfo.lastname"
                  @blur="validateField('lastname')"
                  :class="{ 'ring-red-500': errors.lastname }"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
                <p v-if="errors.lastname" class="text-red-500 text-sm mt-1">
                  {{ errors.lastname }}
                </p>
                <p v-else class="text-white text-sm mt-1">
                  no errors here mate
                </p>
              </div>
            </div>

            <!-- Phone Number -->
            <div class="w-full">
              <label for="phone" class="block text-sm/6 text-gray-900"
                >Phone Number</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  v-model="registerInfo.phone"
                  @blur="validateField('phone')"
                  :class="{ 'ring-red-500': errors.phone }"
                  placeholder="Phone number here"
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                  {{ errors.phone }}
                </p>
                <p v-else class="text-white text-sm mt-1">
                  no errors here mate
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="w-full">
              <label for="email" class="block text-sm/6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="registerInfo.email"
                  @blur="validateField('email')"
                  :class="{ 'ring-red-500': errors.email }"
                  required
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                  {{ errors.email }}
                </p>
                <p v-else class="text-white text-sm mt-1">
                  no errors here mate
                </p>
                <p class="text-xs mt-1 text-[#757575]">
                  Tickets will only be sent to the email address you provide
                  here
                </p>
              </div>
            </div>

            <!-- Confirm Email -->
            <div class="w-full">
              <label for="confirm-email" class="block text-sm/6 text-gray-900"
                >Confirm email address</label
              >
              <div class="mt-2">
                <input
                  id="confirm-email"
                  name="confirm-email"
                  type="email"
                  v-model="confirmEmail"
                  @blur="validateConfirmEmail"
                  :class="{ 'ring-red-500': errors.confirmEmail }"
                  required
                  class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
                <p v-if="errors.confirmEmail" class="text-red-500 text-sm mt-1">
                  {{ errors.confirmEmail }}
                </p>
                <p v-else class="text-white text-sm mt-1">
                  no errors here mate
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            @click="register"
            class="text-white bg-green-2 rounded-lg px-16 md:px-14 py-4 md:text-2xl font-bold max-w-fit md:self-end mt-8">
            Continue
          </button>
        </form>
      </div>
      <div class="w-full md:w-1/2">
        <img
          src="/img/info-bg.webp"
          alt="info background"
          class="hidden md:block w-full h-[calc(100vh-68px)] object-cover" />
        <img
          src="/img/info-bg-mob.webp"
          alt="info background"
          class="md:hidden" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
