<template>
  <div class="component-a" __vuec__>
    Component A
  </div>
</template>

<script>
  let c = 333
  let d = 555
  let e = d
  module.exports = {
    created() {
      let a = 1
      console.log('component a created !');
    },
    methods: {
      //
    }
  }
</script>

<style lang="less">
body {
  a {
    color: inherit;
  }
}
.component-a[__vuec__] {
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: rgb(227, 99, 61);
}
</style>
