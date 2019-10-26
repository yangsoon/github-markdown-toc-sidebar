<template>
  <Card class="box-card">
    hello
    <Button type="dashed">虚线按钮</Button>
    <Button :size="buttonSize" icon="ios-download-outline" type="primary" @click="test">Download</Button>
  </Card>
</template>

<script>
export default {
  name: 'app',
  methods: {
    test(){
      alert("hello");
    }
  }
}
</script>

<style>
.box-card {
  width: 300px;
}
</style>
