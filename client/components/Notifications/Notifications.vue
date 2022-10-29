<template>
  <v-card>
    <v-alert
      dismissible
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      You've got <strong>{{ data.senderName }}</strong> new updates on your
      <strong>{{ data.type }}</strong>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    data: {},
  }),
  created() {
    this.$socket.on("getNotification", (data) => {
      console.log("getNotification :>> ", data);
      this.data = data;
    });
  },
};
</script>

<style></style>
