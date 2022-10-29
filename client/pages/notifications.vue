<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Notification />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Notifications",
  components: {
    Notification: () => import("@/components/Notifications/Notifications"),
  },
  data: () => ({}),
};
</script>
