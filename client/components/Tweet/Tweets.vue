<template>
  <div>
    <ul>
      <li v-for="(item, index) in tweetData" :key="index" class="mt-5">
        <TweetsItem :tweet="item" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  // props: {
  //   tweetData: {
  //     type: Object,
  //     required: true,
  //     default: () => {},
  //   },
  // },
  props: ["tweetData"],
  components: {
    TweetsItem: () => import("@/components/Tweet/TweetsItem"),
  },
};
</script>

<style></style>
