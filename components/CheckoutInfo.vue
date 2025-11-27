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
      const trimmedFirstname = registerInfo.firstname.trim();
      errors.firstname =
        trimmedFirstname.length > 0 ? "" : "First name is required.";
      break;
    case "lastname":
      const trimmedLastname = registerInfo.lastname.trim();
      errors.lastname =
        trimmedLastname.length > 0 ? "" : "Last name is required.";
      break;
    case "phone":
      // Allow formats: +234XXXXXXXXXX, 234XXXXXXXXXX, or 0XXXXXXXXXX (11 digits)
      const phone = registerInfo.phone.trim().replace(/\s+/g, "");
      const phoneRegex = /^(\+?234|0)?[0-9]{10}$/;
      if (phone.length === 0) {
        errors.phone = "Phone number is required.";
      } else if (phoneRegex.test(phone)) {
        errors.phone = "";
      } else {
        errors.phone = "Please enter a valid phone number.";
      }
      break;
    case "email":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const trimmedEmail = registerInfo.email.trim();
      if (trimmedEmail.length === 0) {
        errors.email = "Email address is required.";
      } else if (emailRegex.test(trimmedEmail)) {
        errors.email = "";
      } else {
        errors.email = "Invalid email format.";
      }
      break;
  }
};

const validateConfirmEmail = () => {
  const trimmedConfirmEmail = confirmEmail.value.trim();
  const trimmedEmail = registerInfo.email.trim();
  if (trimmedConfirmEmail.length === 0) {
    errors.confirmEmail = "Please confirm your email address.";
  } else if (trimmedConfirmEmail === trimmedEmail) {
    errors.confirmEmail = "";
  } else {
    errors.confirmEmail = "Emails do not match.";
  }
};

const validateAllFields = (): boolean => {
  // Validate all fields
  validateField("firstname");
  validateField("lastname");
  validateField("email");
  validateField("phone");
  validateConfirmEmail();

  // Check if there are any errors
  const hasErrors = Object.values(errors).some(
    (error) => error && error.length > 0
  );
  return !hasErrors;
};

const register = async () => {
  // Trim all input values
  registerInfo.firstname = registerInfo.firstname.trim();
  registerInfo.lastname = registerInfo.lastname.trim();
  registerInfo.email = registerInfo.email.trim();
  registerInfo.phone = registerInfo.phone.trim().replace(/\s+/g, "");
  confirmEmail.value = confirmEmail.value.trim();

  // Validate all fields
  if (!validateAllFields()) {
    errorToast("Please fix the errors in the form");
    return;
  }

  try {
    const { token } = await executeRecaptcha("submit");
    registerInfo.token = token;
    const userRegistered = await dataStore.register(registerInfo);
    if (userRegistered) {
      console.log(userRegistered);
      Object.assign(paymentDetails, userRegistered);
      initializePayment();
    }
  } catch (error) {
    console.error("Registration error:", error);
    errorToast("An error occurred. Please try again.");
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
  const ticketData = dataStore.events?.tickets?.[0];
  if (ticketData) {
    fees.value = ticketData.fee / 100;
    baseFee.value = ticketData.amount / 100;
    registerInfo.ticket_id = ticketData.id;
  }
  const script = document.createElement("script");
  script.setAttribute("src", "https://js.paystack.co/v1/inline.js");
  document.body.appendChild(script);
});
</script>

<template>
  <div class="bg-white w-full min-h-screen">
    <div
      class="bg-[#082b15] w-full py-5 h-[92px] flex items-center justify-center px-4 md:px-6">
      <p
        class="font-biorhyme text-[#fdc813] text-3xl w-full max-w-[1280px] mx-auto">
        Aniket
      </p>
    </div>
    <div
      class="flex flex-col-reverse md:flex-row items-start justify-between w-full max-w-[1280px] mx-auto lg:px-6 xl:px-0 pt-6 md:pt-16 pb-8 md:pb-0">
      <div class="flex flex-col w-full px-4 md:px-0 md:w-1/2 mt-6 md:mt-10">
        <form
          class="w-full flex flex-col md:max-w-[506px] mx-auto"
          @submit.prevent="register">
          <h2
            class="text-xl md:text-2xl font-semibold font-biorhyme text-gray-900 mb-4 md:mb-6">
            Buyer Contact Information
          </h2>

          <div class="flex flex-col w-full gap-6">
            <!-- First Name and Last Name - Two Columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="w-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-900"
                  >First Name</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    v-model="registerInfo.firstname"
                    @blur="validateField('firstname')"
                    :class="{ 'ring-red-500 border-red-500': errors.firstname }"
                    required
                    class="block w-full rounded-md border border-gray-300 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 focus:border-green-2 sm:text-sm" />
                  <p v-if="errors.firstname" class="text-red-500 text-sm mt-1">
                    {{ errors.firstname }}
                  </p>
                </div>
              </div>

              <!-- Last Name -->
              <div class="w-full">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-900"
                  >Last Name</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    v-model="registerInfo.lastname"
                    @blur="validateField('lastname')"
                    :class="{ 'ring-red-500 border-red-500': errors.lastname }"
                    required
                    class="block w-full rounded-md border border-gray-300 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 focus:border-green-2 sm:text-sm" />
                  <p v-if="errors.lastname" class="text-red-500 text-sm mt-1">
                    {{ errors.lastname }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Email and Confirm Email - Two Columns -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Email -->
              <div class="w-full">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-900"
                  >Email Address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model="registerInfo.email"
                    @blur="
                      validateField('email');
                      validateConfirmEmail();
                    "
                    @input="validateField('email')"
                    :class="{ 'ring-red-500 border-red-500': errors.email }"
                    required
                    class="block w-full rounded-md border border-gray-300 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 focus:border-green-2 sm:text-sm" />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <!-- Confirm Email -->
              <div class="w-full">
                <label
                  for="confirm-email"
                  class="block text-sm font-medium text-gray-900"
                  >Confirm Email Address</label
                >
                <div class="mt-2">
                  <input
                    id="confirm-email"
                    name="confirm-email"
                    type="email"
                    v-model="confirmEmail"
                    @blur="validateConfirmEmail"
                    @input="validateConfirmEmail"
                    :class="{
                      'ring-red-500 border-red-500': errors.confirmEmail,
                    }"
                    required
                    class="block w-full rounded-md border border-gray-300 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 focus:border-green-2 sm:text-sm" />
                  <p
                    v-if="errors.confirmEmail"
                    class="text-red-500 text-sm mt-1">
                    {{ errors.confirmEmail }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Phone Number - Full Width -->
            <div class="w-full">
              <label for="phone" class="block text-sm font-medium text-gray-900"
                >Phone Number</label
              >
              <div class="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  v-model="registerInfo.phone"
                  @blur="validateField('phone')"
                  @input="validateField('phone')"
                  :class="{ 'ring-red-500 border-red-500': errors.phone }"
                  placeholder="+234123456789 or 08123456789"
                  class="block w-full rounded-md border border-gray-300 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 focus:border-green-2 sm:text-sm" />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- Info Message -->
            <div class="flex items-start gap-2">
              <div class="flex-shrink-0 mt-0.5">
                <svg
                  class="w-5 h-5 text-green-2"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-sm text-gray-600">
                Tickets will be sent to the email address provided
              </p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 sm:justify-end mt-8">
            <button
              type="button"
              @click="$router.back()"
              class="flex-1 sm:flex-initial border-2 border-[#1f9949] text-[#1f9949] bg-white rounded px-8 py-3 font-medium hover:bg-gray-50 transition-colors">
              Go back
            </button>
            <button
              type="submit"
              class="flex-1 sm:flex-initial bg-[#1f9949] text-white rounded px-8 py-3 font-medium hover:bg-[#1f9949]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Pay now
            </button>
          </div>
        </form>
      </div>
      <div
        class="flex flex-col w-full md:w-1/2 md:max-w-[505px] md:border-l md:pl-6 md:sticky md:top-6">
        <div
          class="mt-4 md:mt-0 px-4 md:px-0 lg:px-6 lg:py-11 bg-white md:bg-transparent">
          <h4
            class="text-grey-3 text-xl md:text-2xl font-semibold pb-4 md:pb-6 hidden md:block">
            Event Details
          </h4>
          <h4
            class="text-grey-3 text-xl md:text-2xl font-semibold pb-4 md:pb-6 block md:hidden">
            Order Summary
          </h4>
          <div
            class="mt-4 md:mt-6 flex md:items-center gap-4 border-b border-dashed pb-4 md:pb-6">
            <img
              src="/img/ani-mob.png"
              alt="ani-logo"
              class="w-full max-w-[160px]" />
            <div class="flex flex-col gap-2 text-left">
              <h5 class="text-base md:text-lg font-semibold">
                AnimeCon Year of Light
              </h5>
              <p
                class="text-grey-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="mdi:map-marker" size="18" />
                <span class="text-sm md:text-base"
                  >Colab Innovation Campus</span
                >
              </p>
              <p
                class="text-grey-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="mdi:calendar" size="18" />
                <span class="text-sm md:text-base">20th December 2025</span>
              </p>
            </div>
          </div>
          <div class="mt-4 md:mt-6">
            <h4
            class="text-grey-3 text-xl font-medium pb-4 md:pb-6 md:block hidden">
            Order Summary
          </h4>
            <div class="flex justify-between items-center mb-4 border-b border-dashed pb-4">
              <p class="text-grey-3 text-sm md:text-base">
                Ticket Type
              </p>
              <p class="text-sm md:text-base">
                {{ dataStore.count }} x Earlybird
              </p>
            </div>
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm md:text-base">
                Ticket Price
              </p>
              <p class="text-grey-3 text-sm md:text-base">
                {{ dataStore.count }} x N{{ amount.toLocaleString() }}
              </p>
            </div>
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm md:text-base">Service & Handling</p>
              <p class="text-grey-3 text-sm md:text-base">
                -
              </p>
            </div>
            <div class="flex justify-between items-center pb-4 md:pb-6 border-b border-dashed">
              <p class="text-sm md:text-base">Admin Fee</p>
              <p class="text-grey-3 text-sm md:text-base">
                N{{ fees.toLocaleString() }}
              </p>
            </div>
          </div>

          <div class="mt-4 md:mt-6 flex justify-between items-center">
            <p class="text-base md:text-lg">Total</p>
            <p class="text-black text-base md:text-lg font-medium">
              N{{ totalAmount.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
