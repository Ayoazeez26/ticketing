<script setup lang="ts">
const dataStore = useDataStore();
const baseFee = ref(5000);
const fees = ref(500);
// const count = ref(1);
const amount = computed(() => {
  return baseFee.value * dataStore.count;
});
const totalAmount = computed(() => {
  return fees.value + amount.value;
});
</script>

<template>
  <div class="bg-white w-full">
    <div class="bg-lime w-full py-5 px-3 md:px-4">
      <div class="flex items-center gap-3 text-green max-w-[1280px] mx-auto">
        <Icon name="mdi:information-variant-circle-outline" size="24" />
        <p class="text-lg">Complete your purchase to get a ticket!</p>
      </div>
    </div>
    <div
      class="flex flex-col lg:flex-row justify-between w-full max-w-[1280px] mx-auto lg:mt-11 lg:px-6 pb-10">
      <div class="flex flex-col w-full max-w-[610px]">
        <img
          src="/img/checkout-img.webp"
          alt="checkout image"
          class="w-full hidden md:block max-w-[610px]" />
        <img
          src="/img/checkout-img-mob.webp"
          alt="checkout image"
          class="w-full md:hidden max-w-[610px]" />
        <p class="hidden lg:block mt-4">
          Join thousands of anime fans and for an unforgettable experience of
          creativity, community, and culture. From workshops on drawing your
          favourite characters to meet and greets with voice actors, Anime Naija
          has something for everyone. It’s more than just a convention, it's a
          place to connect, express, and celebrate everything that makes anime
          special. <br /><br />
          Get ready to immerse yourself in the ultimate anime experience, right
          here in Kaduna.
        </p>
        <div
          class="bg-lime lg:hidden mt-6 mx-4 flex items-center justify-center text-green h-[86px] rounded-lg">
          <h2 class="text-3xl font-semibold">AnimeCon</h2>
        </div>
        <div class="mt-4 mx-4 lg:mx-0 flex justify-between items-end lg:items-start">
          <div class="flex flex-col">
            <h4 class="text-green-2 font-bold text-2xl">EarlyBird</h4>
            <h5 class="text-lg font-bold mt-3 mb-2">
              N{{ baseFee.toLocaleString() }}
            </h5>
            <p class="text-grey-2">
              Thank you for purchasing and have a lot of fun
            </p>
          </div>
          <div class="relative max-w-24 lg:max-w-16 flex-1 text-green">
            <Icon
              name="material-symbols:keyboard-arrow-down"
              class="absolute right-[0.5rem] top-1/2 text-green -translate-y-1/2 pointer-events-none"
              size="18" />
            <label htmlFor="amount" className="inline-block w-full">
              <select
                id="amount"
                name="amount"
                v-model="dataStore.count"
                class="w-full cursor-pointer appearance-none rounded-[8px] p-2 px-3 focus:outline-none border-[1.24px] border-green">
                <option v-for="item in 10" :key="item" :value="item">
                  {{ item }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full md:max-w-[505px]">
        <div
          class="bg-lime hidden lg:flex items-center justify-center text-green h-[86px] rounded-lg">
          <h2 class="text-3xl font-semibold">AnimeCon</h2>
        </div>
        <div class="mt-4 mx-4 lg:mx-0 border pl-4 pr-7 lg:px-6 py-6 lg:py-11 rounded-lg">
          <h4
            class="text-grey-3 text-2xl font-semibold pb-6 border-b border-dashed">
            Add discount
          </h4>
          <div class="mt-6">
            <div class="flex justify-between items-center mb-8">
              <p>{{ dataStore.count }} x Earlybird</p>
              <p class="text-grey-3">N{{ amount.toLocaleString() }}</p>
            </div>
            <div class="flex justify-between items-center mb-8">
              <p>Fees</p>
              <p class="text-grey-3">N 500</p>
            </div>
            <div
              class="flex justify-between items-center pb-6 border-b border-dashed">
              <p>Subtotal</p>
              <p class="text-grey-3">N {{ totalAmount.toLocaleString() }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-between items-center">
            <p>Total</p>
            <p class="text-grey-3">N {{ totalAmount.toLocaleString() }}</p>
          </div>
        </div>
        <nuxt-link
          to="/info"
          class="text-white bg-green-2 rounded-lg px-16 md:px-14 py-4 md:text-2xl font-bold max-w-fit ml-4 lg:ml-0 lg:self-end mt-6"
          >Continue</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
