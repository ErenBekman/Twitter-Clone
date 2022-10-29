<template>
  <v-card>
    <div class="ma-2">
      <v-btn color="primary" small outlined to="/messages" block>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <v-list v-if="message.length > 0">
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-for="(item, i) in message" :key="'A' + i">
              <v-alert
                dense
                shaped
                dark
                :color="item.sender == $auth.user._id ? 'info' : 'success'"
                class="float-right"
              >
                {{ item.text }}
              </v-alert>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <small v-if="typing">
          <b> {{ name.username }} </b> is typing
        </small>
      </v-list-item-group>
      <div class="d-flex">
        <v-textarea
          autocomplete="Text"
          label="Write Something.."
          class="mx-2"
          rows="2"
          prepend-icon="mdi-comment"
          v-model="sendMessage.text"
          @keyup.enter="setMessage()"
        ></v-textarea>
        <v-btn color="primary" class="mt-10 mr-2" @click="setMessage()">
          <v-icon left> mdi-pencil </v-icon>
          Send
        </v-btn>
      </div>
    </v-list>
    <div v-else>
      <v-alert border="bottom" colored-border type="warning" elevation="2">
        no messages yet
      </v-alert>
      <div class="d-flex">
        <v-textarea
          autocomplete="Text"
          label="Write Something.."
          class="mx-2"
          rows="2"
          prepend-icon="mdi-comment"
          v-model="sendMessage.text"
        ></v-textarea>
        <v-btn color="primary" class="mt-10 mr-2" @click="setMessage()">
          <v-icon left> mdi-pencil </v-icon>
          Send
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    message: {},
    sendMessage: {
      conversationId: "",
      sender: "",
      text: "",
    },
    typing: false,
    name: "",
    receiverId: "",
  }),
  watch: {
    "sendMessage.text"(value, oldvalue) {
      value
        ? this.$socket.emit("typing", this.$auth.user.username)
        : this.$socket.emit("stopTyping", this.$auth.user.username);
    },
  },
  async created() {
    this.sendMessage.conversationId = this.$route.params.id;
    this.sendMessage.sender = this.$auth.user._id;

    await this.$axios
      .$get(`/api/messages/${this.$route.params.id}`)
      .then((response) => {
        this.message = response;
        console.log("response :>> ", response);
        let x = response
          .map((item) => item.sender)
          .filter((i) => i !== this.$auth.user._id);
        console.log("x :>> ", x[0]);
        this.receiverId = this.$route.params.receiverId || x[0];

        this.$socket.on("getMessage", (data) => {
          console.log("getMessage :>> ", data);
          this.message.push(data);
        });
      });

    this.$socket.on("getUsers", (users) => {
      console.log("users :>> ", users);
    });

    this.$socket.on("typing", (username) => {
      this.typing = true;
      this.name = username;
    });

    this.$socket.on("stopTyping", (username) => {
      this.typing = false;
      this.name = username;
    });
  },
  methods: {
    setMessage: async function () {
      await this.$axios
        .$post(`/api/messages`, this.sendMessage)
        .then((response) => {
          console.log("send message response", response);
          this.$socket.emit("sendMessage", {
            sender: this.$auth.user._id,
            receiverId: this.receiverId,
            text: this.sendMessage.text,
          });
          this.$socket.emit("sendNotification", {
            senderName: this.$auth.user.username,
            receiverId: this.receiverId,
            type: "message",
          });
          this.sendMessage.text = "";
        });
    },
  },
};
</script>

<style></style>
