<template>
  <v-card tile>
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    ></v-img>
    <v-col>
      <v-avatar size="100">
        <v-img
          src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        ></v-img>
      </v-avatar>
    </v-col>
    <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
        <v-list-item-title class="title d-flex">
          <span>
            {{ userInfo.username }}
          </span>
          <!-- <p class="text--disabled ml-3">@erenbekman</p> -->
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="d-flex">
            <div>
              <span class="font-weight-bold">{{
                userInfo?.followings?.length
              }}</span>
              Following
            </div>
            <div class="ml-3">
              <span class="font-weight-bold">{{
                userInfo?.followers?.length
              }}</span>
              Followers
            </div>
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
        rounded
        color="primary"
        elevation="2"
        outlined
        class="mr-3"
        v-if="
          !this.$auth.user ||
          this.$route.params.username != this.$auth.user.username
        "
        @click="createConversations()"
      >
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn
        rounded
        color="primary"
        elevation="2"
        v-if="
          this.$auth.user &&
          this.$route.params.username == this.$auth.user.username
        "
        outlined
        >Edit</v-btn
      >
      <!-- <v-btn rounded color="primary" elevation="2" @click="followUser(this.$route.params.id)" v-else
        >Following</v-btn
      > -->
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  pageTitle: "ProfilePage",
  props: {
    userInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {};
  },
  mounted() {
    console.log("this.$route.params :>> ", this.$route.params);
  },
  methods: {
    followUser: async function (id) {
      console.log("id :>> ", id);
      await this.$axios
        .$put(`/api/users/${id}/follow`, {
          userId: this.$auth.user._id,
        })
        .then((response) => {
          console.log("users follow", response);
          window.location.reload();
          this.$socket.emit("addUser", id);
        });
    },
    createConversations: async function () {
      await this.$axios
        .$post(`/api/conversations`, {
          senderId: this.$auth.user._id,
          receiverId: this.$route.params.id,
        })
        .then((response) => {
          console.log("createConversations response", response);
          this.$socket.emit("addUser", this.$route.params.id);
          this.$router.push({
            name: "messages-id",
            params: { id: response._id, receiverId: this.$route.params.id },
          });
          // this.$router.push(`/messages/${response._id}`);
        });
    },
  },
};
</script>
