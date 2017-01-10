<style lang="less">
.index.__vuec__ {
  > p {
    line-height: 50px;
    text-align: center;
    background: rgb(240, 203, 210);
    border: 1px solid #ddd;
  }
}
</style>

<style lang="scss">
$blue : #1875e7;　
.style2 {
  width: auto;
  color: $blue;
}
</style>
<style lang="less">
</style>

<template>
  <div class="index __vuec__" >
    <p>fis3-parser-vue-component demo runing ~</p>
    <component-a></component-a>
    <component-b></component-b>
    <component-jade></component-jade>
  </div>
</template>

<script>
  import ComponentA from './a';
  import ComponentB from './b';
  import ComponentJade from './jade';

  export default {
    components: {
      ComponentA,
      ComponentB,
      ComponentJade
    },
    created() {
      console.log('Index page created!');
    },
    methods: {
      //
    }
  }
</script>
