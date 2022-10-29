<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Messages</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line v-for="(item, index) in data" :key="index">
      <template>
        <nuxt-link
          tag="li"
          :to="{
            name: 'messages-id',
            params: { id: item._id },
          }"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="36px">
                <img
                  alt="Avatar"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                />
              </v-avatar>
            </v-list-item-avatar>
            {{ item.username }}
            <v-list-item-content v-if="item.members">
              <v-list-item-title
                v-for="name in item.members"
                :key="name._id + '123'"
              >
                <span class="font-weight-bold">
                  {{ name.username }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.createdAt | formatDate }}
              </v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    data: {},
  }),
  async mounted() {
    await this.getConversation();
    await this.getFriends();
  },
  methods: {
    getConversation: async function () {
      await this.$axios
        .$get(`/api/conversations/${this.$auth.user._id}`)
        .then((response) => {
          console.log("conversations response", response);

          for (let i = 0; i < response.length; i++) {
            const element = response[i];

            for (let t = 0; t < element?.members?.length; t++) {
              const item = response[t];
              item?.members.forEach((e) => {
                // console.log("e", e._id);

                this.$socket.emit("addUser", e._id);
              });
            }
          }

          this.data = response;
        });
    },
    getFriends: async function () {
      await this.$axios
        .$get(`/api/users/friends/${this.$auth.user._id}`)
        .then((response) => {
          console.log("friends response", response);

          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            console.log("element", element._id);
            this.$socket.emit("addUser", element._id);
          }
        });
    },
  },
};
</script>

<style></style>
