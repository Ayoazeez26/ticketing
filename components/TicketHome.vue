<script setup lang="ts">
const data = useDataStore();

const getEvents = async () => {
  await data.getEvent();
};

const isDisabled = computed(() => {
  return Object.keys(data.events).length === 0;
});

onMounted(() => {
  getEvents();
});
</script>

<template>
  <div
    class="w-screen min-h-screen md:h-screen flex flex-col items-center font-biorhyme bg-hero-bg-mob md:bg-hero-bg bg-center bg-cover bg-no-repeat bg-black mix-blend-overlay relative px-4 md:px-0">
    <!-- <div class="absolute w-full h-full bg-grey/50 z-0" /> -->
    <p
      class="absolute top-4 left-4 md:top-6 md:left-12 text-[#fdc813] text-lg md:text-2xl">
      Aniket
    </p>
    <div class="flex-1 flex items-center justify-center py-8 md:py-0 mt-20 md:mt-0">
      <div
        class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
        <img
          src="/img/ani-con.png"
          alt="ani-con"
          class="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[470px]" />
        <img
          src="/img/line.png"
          alt="line"
          class="w-2 md:w-3 h-auto hidden md:block" />
          <img
          src="/img/line-mob.png"
          alt="line"
          class="w-full h-auto block md:hidden" />
        <h1
          class="text-white uppercase text-[32px] md:text-4xl lg:text-[48px] text-center font-bold leading-tight w-full max-w-[280px] sm:max-w-[320px] md:max-w-[356px]">
          official ticketing platform
        </h1>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mt-auto mb-6 md:mb-8 lg:mb-12 w-full px-4 md:px-0">
      <img
        src="/img/ani-tickk.webp"
        alt="ani-con"
        class="hidden md:block w-full max-w-[606px] order-2 md:order-1" />
        <img
        src="/img/ani-tick-mob.webp"
        alt="ani-con"
        class="block md:hidden w-full max-w-[300px] sm:max-w-[400px] md:max-w-[606px] order-2 md:order-1" />
      <div
        class="flex flex-col max-w-full md:max-w-[404px] order-1 md:order-2 w-full md:w-auto">
        <h1
          class="text-white capitalize text-xl md:text-2xl font-semibold w-full text-center md:text-left">
          grab your tickets now
        </h1>
        <p
          class="text-white text-xs md:text-sm font-normal w-full mt-1 mb-4 md:mb-5 text-center md:text-left">
          Purchase tickets for a maximum of 3 individuals
        </p>
        <nuxt-link
          to="/checkout"
          :disabled="isDisabled"
          class="bg-[#DCCF80] flex justify-center cursor-pointer text-[#1E2128] font-roboto font-medium text-base md:text-xl lg:text-2xl rounded mx-0 py-2 md:py-4 px-8 md:px-16 w-full md:max-w-[404px] z-[1]"
          >Buy a Ticket</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
