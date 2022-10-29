<template>
  <v-card color="#26c6da" dark class="mt-5">
    <v-card-title>
      <v-avatar size="36px">
        <img
          alt="Avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        />
      </v-avatar>

      <span class="text-h6 ml-2">
        <span class="text-lg-h6 font-weight-bold">
          {{ tweet.userId.username }}
        </span>
        <!-- <span class="ml-1">@{{ tweet.userId.username }}</span> -->
        <span class="ml-1"> • {{ tweet.createdAt | formatDate }}</span>
      </span>
    </v-card-title>

    <img
      v-if="tweet.img"
      :alt="`${tweet.img}`"
      :src="`${tweet.img}`"
      class="tweetImg"
    />

    <v-card-text class="text-h5 font-weight-bold">
      {{ tweet.description }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="end">
          <div class="mr-5">
            <v-icon class="mr-1"> mdi-comment-outline </v-icon>
            <span class="subheading">45</span>
          </div>
          <div class="mr-5">
            <v-icon class="mr-1"> mdi-repeat-variant </v-icon>

            <span class="subheading">5</span>
          </div>
          <div class="mr-5">
            <v-btn icon fab @click.prevent="like(tweet._id)">
              <v-icon class="mr-1" v-if="tweet?.likes?.length == 0">
                mdi-cards-heart-outline
              </v-icon>
              <v-icon class="mr-1" v-else> mdi-cards-heart </v-icon>
              <span class="subheading">{{ tweet?.likes?.length }}</span>
            </v-btn>
          </div>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["tweet"],
  // props: {
  //   tweet: {
  //     required: true,
  //     type: Array,
  //   },
  // },
  watch: {
    type(newValue, oldValue) {
      console.log("Prop changed: ", newValue, " | was: ", oldValue);
    },
    "tweet.likes": {
      deep: true,
      handler(newValue, oldValue) {
        console.log("tweet.likes: ", newValue, " | was: ", oldValue);
      },
    },
    "tweet.likes.length": {
      deep: true,
      handler(newValue, oldValue) {
        console.log("tweet.likes.length: ", newValue, " | was: ", oldValue);
      },
    },
  },
  data: () => ({
    type: "",
  }),

  methods: {
    like: async function (id) {
      await this.$axios
        .$put(`/api/tweets/${id}/like`, { userId: this.$auth.user._id })
        .then((response) => {
          console.log("post like :>> ", response);
          this.type = response;
          this.$forceUpdate();

          // window.location.reload(true);
          let vm = this;
          this.$socket.emit("sendNotification", {
            senderName: this.$auth.user.username,
            receiverId: vm.tweet.userId._id,
            type: "like",
          });
        });

      console.log("like :>> ", id);
    },
  },
};
</script>

<style lang="css">
.tweetImg {
  width: 521px;
  height: 600px;
}
@media only screen and (max-width: 1200px) {
  .tweetImg {
    width: 380px;
    height: 400px;
  }
}
@media only screen and (max-width: 750px) {
  .tweetImg {
    width: 300px;
    height: 300px;
  }
}
</style>
