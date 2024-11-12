<script setup lang="ts">
const dialogStore = useDialogStore();
</script>

<template>
  <div>
    <NuxtLayout>
      <Loading v-if="dialogStore.isLoading" class="loader" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}

.body {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
}

main {
  flex: 1 0;
}

footer {
  flex: 0 0;
}
</style>
