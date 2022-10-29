<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <LeftBar />
          </v-col>

          <v-col cols="12" sm="6"> <Nuxt /> </v-col>

          <v-col cols="12" sm="3">
            <RightBar />
          </v-col>
        </v-row>
        <NavigationDrawer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    LeftBar: () => import("@/components/Sidebar/LeftBar"),
    RightBar: () => import("@/components/Sidebar/RightBar"),
    NavigationDrawer: () => import("@/components/Sidebar/NavigationDrawer"),
  },
  name: "DefaultLayout",
  middleware: ["auth", "verify-email"],
  data: () => ({}),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Questrial");
* {
  font-family: "Questrial";
}
</style>
