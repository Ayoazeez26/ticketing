<script setup lang="ts">
const baseFee = ref(5000);
const fees = ref(500);
const count = ref(1);
const amount = computed(() => {
  return baseFee.value * count.value;
});
const totalAmount = computed(() => {
  return fees.value + amount.value;
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
    <div class="flex justify-between w-full mx-auto">
      <div class="flex flex-col w-1/2 mt-10">
        <div class="w-full max-w-[506px] mx-auto">
          <div class="mt-4 border px-6 py-11 rounded-lg">
            <h4
              class="text-grey-3 text-2xl font-semibold pb-6 border-b border-dashed">
              Add discount
            </h4>
            <div class="mt-6">
              <div class="flex justify-between items-center mb-8">
                <p>{{ count }} x Earlybird</p>
                <p>N{{ amount.toLocaleString() }}</p>
              </div>
              <div class="flex justify-between items-center mb-8">
                <p>Fees</p>
                <p>N 500</p>
              </div>
              <div
                class="flex justify-between items-center pb-6 border-b border-dashed">
                <p>Subtotal</p>
                <p>N {{ totalAmount.toLocaleString() }}</p>
              </div>
            </div>
            <div class="mt-6 flex justify-between items-center">
              <p>Total</p>
              <p>N {{ totalAmount.toLocaleString() }}</p>
            </div>
          </div>
          <button
            class="text-white bg-green-2 rounded-lg px-14 py-4 text-2xl font-bold max-w-fit self-end mt-6">
            Continue
          </button>
        </div>
      </div>
      <div class="w-1/2">
        <img src="/img/info-bg.webp" alt="info background" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
