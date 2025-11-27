<script setup lang="ts">
const dataStore = useDataStore();
const baseFee = ref(5000);
// const fees = ref(500);
// const count = ref(1);
const amount = computed(() => {
  return baseFee.value * dataStore.count;
});
const totalAmount = computed(() => {
  return fees.value + amount.value;
});

const fees = computed(() => {
  return amount.value * 0.075;
});

onMounted(() => {
  const ticketData = dataStore.events?.tickets?.[0];
  console.log(dataStore.events?.tickets?.[0]);
  fees.value = ticketData?.fee / 100;
  baseFee.value = ticketData?.amount / 100;
});
</script>

<template>
  <div class="bg-white w-full">
    <div
      class="bg-[#082b15] w-full py-5 h-[92px] flex items-center justify-center px-4 md:px-6">
      <p
        class="font-biorhyme text-[#fdc813] text-3xl w-full max-w-[1280px] mx-auto">
        Aniket
      </p>
    </div>
    <div
      class="flex flex-col lg:flex-row justify-between w-full max-w-[1280px] mx-auto lg:mt-11 lg:px-6 pb-10">
      <div class="flex flex-col w-full max-w-[656px]">
        <img
          src="/img/ani-card.webp"
          alt="checkout image"
          class="w-full hidden md:block" />
      </div>
      <div class="flex flex-col w-full md:max-w-[505px] md:border-l md:pl-6">
        <div
          class="bg-[#DCCF80] hidden lg:flex items-center justify-center text-[#1E2128] h-[86px] rounded-lg">
          <h2 class="text-3xl font-semibold font-biorhyme">
            Secure Your Order
          </h2>
        </div>
        <div class="mt-4 px-4 lg:px-6 py-6 lg:py-11">
          <h4
            class="text-grey-3 text-2xl font-semibold pb-6">
            Event Details
          </h4>
          <div
            class="mt-6 flex flex-col md:flex-row md:items-center gap-4 border-b border-dashed pb-6">
            <img
              src="/img/ani-mob.png"
              alt="ani-logo"
              class="w-full max-w-[160px] hidden md:block" />
            <img
              src="/img/ani.png"
              alt="ani-logo"
              class="w-full block md:hidden" />
            <div class="flex flex-col gap-2">
              <h5 class="text-lg font-semibold">AnimeCon Year of Light</h5>
              <p class="text-grey-3 flex items-center gap-2">
                <Icon name="mdi:map-marker" size="18" />
                <span class="text-base">Colab Innovation Campus</span>
              </p>
              <p class="text-grey-3 flex items-center gap-2">
                <Icon name="mdi:calendar" size="18" />
                <span class="text-base">20th December 2025</span>
              </p>
            </div>
          </div>
          <!-- <div class="mt-6">
            <div class="flex justify-between items-center mb-8">
              <p>{{ dataStore.count }} x Earlybird</p>
              <p class="text-grey-3">N{{ amount.toLocaleString() }}</p>
            </div>
            <div class="flex justify-between items-center mb-8">
              <p>Fees</p>
              <p class="text-grey-3">N {{fees}}</p>
            </div>
            <div
              class="flex justify-between items-center pb-6 border-b border-dashed">
              <p>Subtotal</p>
              <p class="text-grey-3">N {{ totalAmount.toLocaleString() }}</p>
            </div>
          </div> -->
          <div
            class="mt-4 lg:mt-8 mx-4 lg:mx-0 flex justify-between items-center md:items-start">
            <div class="flex flex-col">
              <h4 class="text-2xl">Tickets</h4>
              <!-- <h5 class="text-lg font-bold mt-3 mb-2">
              N{{ baseFee.toLocaleString() }}
            </h5> -->
              <p class="text-grey-3 text-sm mt-1">
                Select the number of tickets you<br /> want to purchase
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
                  <option v-for="item in 3" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
              </label>
            </div>
          </div>
          <!-- <div class="mt-6 flex justify-between items-center">
            <p>Total</p>
            <p class="text-grey-3">N {{ totalAmount.toLocaleString() }}</p>
          </div> -->
        </div>
        <nuxt-link
          to="/info"
          class="text-white bg-[#1f9949] rounded px-16 md:px-14 py-4 md:text-lg text-center max-w-full mt-6 mx-4 md:mx-0"
          >Proceed to Pay</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
