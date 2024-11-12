<script setup lang="ts">
const data = useDataStore();

const getEvents = async () => {
  await data.getEvent();
};

onMounted(() => {
  getEvents();
})
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-white relative">
    <div class="bg-lime w-full py-5 absolute top-0 left-0">
      <div class="flex items-center gap-3 text-green max-w-[1280px] mx-auto">
        <Icon name="mdi:information-variant-circle-outline" size="24" />
        <p class="text-lg">
          We have reserved your ticket, please check your email for you to confirm
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center text-center w-full max-w-[506px] px-4 md:px-0">
      <img src="/img/success.webp" alt="success image" class="w-full max-w-[312px]">
      <h1 class="text-6xl font-bold text-black">Great Job!</h1>
      <p class="mt-2 text-[#4D4D4D]">Your ticket has been sent to your email,<br class="hidden md:block" /> you can confirm it now.</p>
      <nuxt-link to="/" class="bg-[#1B7339] flex justify-center cursor-pointer text-white font-bold rounded-lg py-3 mt-6 px-10 w-[210px]">Finish</nuxt-link>
    </div>
  </div>
</template>

<style scoped></style>
