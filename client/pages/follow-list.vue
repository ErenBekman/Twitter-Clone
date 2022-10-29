<template>
  <v-card>
    <v-alert
      dismissible
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="d-flex">
        <div>
          <nuxt-link
            :to="{
              name: 'profile-list-foreignname',
              params: { id: item._id, username: item.username },
            }"
          >
            <strong>{{ item.username }}</strong>
          </nuxt-link>
          new updates on your timeline!.
        </div>

        <div class="justify-end ml-auto">
          <v-btn color="blue-grey white--text" @click="followUser(item._id)">
            Follow
            <v-icon right dark> mdi-plus </v-icon>
          </v-btn>
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
    await this.getFollower();
  },
  methods: {
    getFollower: async function () {
      await this.$axios.$get(`/api/users`).then((response) => {
        let filterData = response.filter(
          (item) =>
            item._id !== this.$auth.user._id &&
            this.$auth.user.followings[0] !== item._id &&
            this.$auth.user.followers[0] !== item._id
        );
        //  this.$auth.user._id !== item.followings[0] &&
        //     this.$auth.user._id !== item.followers[0]
        console.log("filterData :>> ", filterData);
        this.data = filterData;
      });
    },
    followUser: async function (id) {
      await this.$axios
        .$put(`/api/users/${id}/follow`, { userId: this.$auth.user._id })
        .then((response) => {
          console.log("users follow", response);
          window.location.reload();
          this.$socket.emit("addUser", id);
        });
    },
  },
};
</script>

<style>
.btn-follow {
  margin-left: 300px;
  color: #fff !important;
  padding: 5px;
}

@media only screen and (max-width: 1200px) {
  .btn-follow {
    margin-left: 100px !important;
  }
}
@media only screen and (max-width: 750px) {
  .btn-follow {
    margin-left: 0px !important;
  }
}
</style>
