<template>
  <v-container>
    <Message />
  </v-container>
</template>

<script>
export default {
  components: {
    Message: () => import("@/components/Message/getMessages"),
  },
};
</script>

<style></style>
