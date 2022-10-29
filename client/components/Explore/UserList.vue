<template>
  <v-card>
    <v-alert
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="d-flex">
        <v-avatar size="36px" class="mr-5">
          <img
            alt="Avatar"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          />
        </v-avatar>
        <div>
          <nuxt-link
            :to="{
              name: 'profile-list-foreignname',
              params: { id: item._id, username: item.username },
            }"
          >
            <strong>{{ item.username }}</strong>
          </nuxt-link>
          profile
        </div>
      </div>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    data: {},
  }),
  async mounted() {
    await this.getUser();
  },
  methods: {
    getUser: async function () {
      await this.$axios.$get(`/api/users`).then((response) => {
        let filterData = response.filter(
          (item) => item._id !== this.$auth.user._id
        );
        console.log("filterData :>> ", filterData);
        this.data = filterData;
      });
    },
  },
};
</script>
