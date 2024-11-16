<script setup lang="ts">
const data = useDataStore();

const getEvents = async () => {
  await data.getEvent();
};

const isDisabled = computed(() => {
  return Object.keys(data.events).length === 0;
})

onMounted(() => {
  getEvents();
})
</script>

<template>
  <div class="w-screen h-screen flex items-end justify-center bg-hero-bg-mob md:bg-hero-bg bg-center bg-cover bg-no-repeat bg-black mix-blend-overlay relative">
    <div class="absolute w-full h-full bg-grey/50 z-0" />
    <nuxt-link to="/checkout" :disabled="isDisabled" class="bg-white flex justify-center cursor-pointer text-brown font-extrabold md:text-3xl rounded mx-4 md:mx-0 py-3 md:py-6 mb-48 md:mb-20 px-16 w-full md:w-2/5 z-[1]">Buy a Ticket</nuxt-link>
  </div>
</template>

<style scoped></style>
