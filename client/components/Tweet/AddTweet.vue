<template>
  <v-card color="#26c6da" dark>
    <v-card-text class="d-flex">
      <div class="mr-5 mt-4">
        <v-avatar size="36px">
          <img
            alt="Avatar"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          />
        </v-avatar>
      </div>
      <v-textarea
        autocomplete="tweet"
        label="What's happening?"
        prepend-icon="mdi-comment"
        v-model="tweetData.description"
        rows="3"
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="d-flex">
      <v-btn icon>
        <v-file-input
          hide-input
          prepend-icon="mdi-upload"
          class="mb-3 ml-3"
          v-model="tweetData.img"
        ></v-file-input>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-file-gif-box</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-emoticon-outline</v-icon>
      </v-btn>

      <v-divider></v-divider>

      <v-chip
        class="ma-2"
        color="cyan"
        label
        text-color="white"
        @click="setTweet()"
      >
        <v-icon left> mdi-twitter </v-icon>
        New Tweets
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tweetData: {
      userId: "",
      description: "",
      img: "",
    },
  }),

  mounted() {
    this.tweetData.userId = this.$auth.user._id;
  },
  methods: {
    setTweet: async function () {
      let formData = new FormData();
      Object.keys(this.tweetData).forEach((element) => {
        formData.append(element, this.tweetData[element]);
      });
      await this.$axios
        .$post("/api/tweets", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("add tweet");
          window.location.reload(true);
        });
    },
  },
};
</script>

<style></style>
