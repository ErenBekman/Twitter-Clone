<template>
  <v-container>
    <div class="d-flex flex-column justify-center align-center">
      <v-img
        height="600"
        src="https://thumbs.dreamstime.com/b/email-document-round-green-check-mark-icon-successful-verification-concepts-vector-153439714.jpg"
      ></v-img>
      <p>Your email address has been verified.</p>
      <v-btn to="/"> <v-icon small>mdi-home</v-icon> Home </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "auth",
  async mounted() {
    console.log("token", this.$route.params.token);
    await this.verify_email();
  },
  methods: {
    verify_email() {
      this.$axios
        .$get("/api/auth/verify-email", {
          params: { token: this.$route.params.token },
        })
        .then((response) => {
          console.log("response :>> ", response);
        });
    },
  },
};
</script>

<style></style>
