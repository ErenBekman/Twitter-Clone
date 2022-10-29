<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ProfilePage :userInfo="userInfo" />
      </v-col>
      <v-col cols="12">
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab>Posts</v-tab>
          <v-tab>Retweets</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <Tweets :tweetData="userTweet" />
          </v-tab-item>
          <v-tab-item>
            <Tweets :tweetData="userTweet" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  pageTitle: "Profile",
  components: {
    ProfilePage: () => import("@/components/Profile/ProfilePage"),
    Tweets: () => import("@/components/Tweet/Tweets"),
  },
  data() {
    return {
      tab: 0,
      userTweet: {},
      userInfo: {},
    };
  },
  async mounted() {
    await this.getUserTweet();
    await this.getUserInfo();
  },
  methods: {
    async getUserTweet() {
      await this.$axios
        .$get(`/api/tweets/profile/${this.$auth.user.username}`)
        .then((response) => {
          console.log("user tweet response :>> ", response);
          this.userTweet = response;
        });
    },
    async getUserInfo() {
      await this.$axios
        .$get(`/api/users/${this.$auth.user._id}`)
        .then((response) => {
          console.log("getUserInfo :>> ", response);
          this.userInfo = response[0];
        });
    },
  },
};
</script>
