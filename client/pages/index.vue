<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AddTweet />
        <Tweets :tweetData="allTweets" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    AddTweet: () => import("@/components/Tweet/AddTweet"),
    Tweets: () => import("@/components/Tweet/Tweets"),
  },
  data: () => ({
    allTweets: {},
  }),

  async mounted() {
    await this.getTweets();
    this.$socket.on("getNotification", (data) => {
      console.log("getNotification :>> ", data);

      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.senderName} ${data.type}`,
        showConfirmButton: false,
        timer: 3000,
      });
    });
  },
  methods: {
    getTweets: async function () {
      await this.$axios
        .$post("/api/tweets/timeline/all", { userId: this.$auth.user._id })
        .then((response) => {
          console.log("response :>> ", response);
          this.allTweets = response;
        });
    },
  },
};
</script>
