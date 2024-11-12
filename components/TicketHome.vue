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
  <div class="w-screen h-screen flex items-end justify-center bg-hero-bg bg-center bg-cover bg-no-repeat bg-black mix-blend-overlay relative">
    <div class="absolute w-full h-full bg-grey/50 z-0" />
    <nuxt-link to="/checkout" class="bg-white flex justify-center cursor-pointer text-brown font-extrabold text-3xl rounded py-6 mb-20 px-16 w-2/5 z-[1]">Buy a Ticket</nuxt-link>
  </div>
</template>

<style scoped></style>
