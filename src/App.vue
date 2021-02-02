<template>
  <div id="app">
    <remote-js src="https://y.qq.com/component/m/qmfe-security-sign/index.umd.js?max_age=2592000"></remote-js>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player.vue'

export default {
  components: {
    MHeader,
    Tab,
    Player,
    'remote-js': {
      render(createElement) {
        return createElement('script', {attrs: { type: 'text/javascript', src: this.src }})
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>