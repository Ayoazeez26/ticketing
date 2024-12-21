<script setup lang="ts">
import type { LoginInput } from '~/types';

const data = useDataStore();
const email = ref("");
const password = ref("");
const errorMsg = reactive({});
const togglePasswordVisibility = (e) => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const isPasswordVisible = ref(false);
const validateEmail = () => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errorMsg.email = "";
  } else {
    errorMsg.email = "Invalid Email Address";
  }
};

watch(email, (value) => {
  validateEmail(value);
});

const login = async (): Promise<void> => {
  const payload: LoginInput = {
    email: email.value,
    password: password.value,
  };
  data.login(payload);
};

</script>
<template>
  <div>
    <div class="flex flex-col w-full px-4 md:px-0 md:w-1/2 mt-10">
      <form class="w-full flex flex-col md:max-w-[506px] mx-auto">
        <div class="flex flex-col w-full gap-1">
          <!-- Email -->
          <div class="w-full">
            <label for="email" class="block text-sm/6 text-gray-900">
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                @blur="validateEmail"
                :class="{ 'ring-red-500': errorMsg.email }"
                required
                class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6" />
              <p v-if="errorMsg.email" class="text-red-500 text-sm mt-1">
                {{ errorMsg.email }}
              </p>
              <p v-else class="text-white text-sm mt-1">no errors here mate</p>
              
            </div>
          </div>
          <div class="userId flex flex-col items-start relative mb-3 w-full">
            <label for="email" class="block text-sm/6 text-gray-900">
              Password
            </label>
            <input
              id="userPassword"
              v-model="password"
              class="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-3 focus:ring-green-2 sm:text-sm/6"
              :type="isPasswordVisible ? 'text' : 'password'"
              name="username"
              placeholder="password" />
            <div class="absolute top-0 right-0">
              <button
                type="button"
                v-if="isPasswordVisible"
                @click.stop="togglePasswordVisibility"
                class="show-icon">
                <Icon name="mdi:eye-outline" size="20" color="#0A0A0A" />
              </button>
              <button
                type="button"
                v-if="!isPasswordVisible"
                @click.stop="togglePasswordVisibility">
                <Icon name="mdi:eye-off-outline" size="20" color="#0A0A0A" />
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="login"
          class="text-white bg-green-2 rounded-lg px-16 md:px-14 py-4 md:text-2xl font-bold max-w-fit md:self-end mt-8">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
