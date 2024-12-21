<script setup lang="ts">
import type { CheckInInput } from '~/types';

const route = useRoute();
const data = useDataStore();
const ticketDetails = reactive({});

const getDetails = async () => {
  const ticketData = await data.getCustomerTicketDetails(route.params.id as string);
  if (ticketData) {
    console.log('ticket data ',ticketData);
    Object.assign(ticketDetails, ticketData);
  }
};
getDetails();

const payload: CheckInInput = reactive({
  ticket_checkin_number: 1,
  customer_ticket_id: route.params.id as string
});

const checkIn = async () => {
  const checkedIn = await data.checkIn(payload);
  if (checkedIn) {
    getDetails();
  }
}
</script>
<template>
  <div v-if="Object.keys(ticketDetails).length !== 0" class="p-6">
    <h1 class="text-green-2 font-bold text-2xl">Customer Details</h1>
    <div class="mt-6 text-grey-3">
      <p class="mb-2">
        First Name:
        <span class="font-medium text-black">{{ ticketDetails.firstname }}</span>
      </p>
      <p class="mb-2">
        Last Name:
        <span class="font-medium text-black">{{ ticketDetails.lastname }}</span>
      </p>
      <p class="mb-2">
        Phone Number:
        <span class="font-medium text-black">{{ ticketDetails.phone }}</span>
      </p>
      <p class="mb-2">
        Email Address:
        <span class="font-medium text-black">{{ ticketDetails.email }}</span>
      </p>
      <p class="mb-2">
        Ticket Quantity:
        <span class="font-medium text-black">{{
          ticketDetails.ticketQuantity
        }}</span>
      </p>
      <p class="mb-2">
        Checked In Tickets:
        <span class="font-medium text-black">{{
          ticketDetails.checkedinTicket
        }}</span>
      </p>
      <div class="flex items-end">
      <p class="mb-1">No. of tickets to be checked in:</p>
      <div class="relative max-w-24 lg:max-w-16 flex-1 text-green ml-2">
        <Icon
          name="material-symbols:keyboard-arrow-down"
          class="absolute right-[0.5rem] top-1/2 text-green -translate-y-1/2 pointer-events-none"
          size="18" />
        <label htmlFor="amount" className="inline-block w-full">
          <select
            id="amount"
            name="amount"
            v-model="payload.ticket_checkin_number"
            class="w-full cursor-pointer appearance-none rounded-[8px] p-2 px-3 focus:outline-none border-[1.24px] border-green">
            <option v-for="item in ticketDetails.ticketQuantity" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </label>
      </div>
    </div>
      <button
          type="button"
          @click="checkIn"
          class="text-white bg-green-2 rounded-lg px-16 md:px-14 py-4 md:text-2xl font-bold max-w-fit md:self-end mt-8">
          Check In
        </button>
    </div>
  </div>
</template>

<style scoped></style>
