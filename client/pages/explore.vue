<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Explore />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Explores",
  components: {
    Explore: () => import("@/components/Explore/UserList"),
  },
  data: () => ({}),
};
</script>
