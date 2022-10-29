<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-row>
          <v-col cols="6">
            <v-img
              height="380"
              src="https://i.ytimg.com/vi/EUv7oYreNec/maxresdefault.jpg"
            ></v-img>
          </v-col>

          <v-col cols="6">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>
                  <v-icon>mdi-twitter</v-icon>
                  Twitter
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="form.username"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-email"
                    name="email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    v-model="form.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="password"
                    hint="At least 3 characters"
                    counter
                    @click:append="show1 = !show1"
                    name="password"
                    label="Password"
                    v-model="form.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="register()"
                  >Register</v-btn
                >
              </v-card-actions>
              <v-span class="ml-2">
                <nuxt-link to="/auth/login" tag="a">
                  Do you have account?
                </nuxt-link>
              </v-span>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "auth",
  data: () => ({
    form: {
      username: "",
      email: "",
      password: "",
    },
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "Password is Required.",
      min: (v) => v.length >= 3 || "Min 3 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    register() {
      this.$axios.$post("/api/auth/register", this.form).then((response) => {
        console.log("response :>> ", response);
        this.$router.push("/auth/login");
      });
    },
  },
};
</script>

<style></style>
