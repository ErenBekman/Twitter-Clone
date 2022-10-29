<template>
  <v-card class="mx-auto" max-width="400">
    <v-list>
      <v-icon x-large>mdi-twitter</v-icon>
      <v-list-item-group mandatory color="indigo">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/explore">
          <v-list-item-icon>
            <v-icon>mdi-pound</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Explore</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/notifications">
          <v-list-item-icon>
            <v-icon>mdi-bell-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/messages">
          <v-list-item-icon>
            <v-icon>mdi-message-processing-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Bookmarks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/follow-list">
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="`/profile/${this.$auth.user.username}`">
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>More</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    block
                    rounded
                    color="primary"
                    class="mt-5 font-weight-bold"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Tweet
                  </v-btn>
                </template>
                <v-card>
                  <AddTweet />
                  <v-btn block color="primary" @click="dialog = false">
                    Close
                  </v-btn>
                </v-card>
              </v-dialog>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  components: {
    AddTweet: () => import("@/components/Tweet/AddTweet"),
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style></style>
