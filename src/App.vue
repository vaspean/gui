<template>
  <div id="app">
	<Loader v-if="!$store.state.appLoaded"/>
    <Toolbar/>
    <ToolbarBottom/>
    <Table/>
    <a href="#" class="button15 button15_send" @click.prevent="editDone">Отправить</a>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue'
import Toolbar from '@/components/Toolbar.vue';
import ToolbarBottom from '@/components/ToolbarBottom.vue';
import Table from '@/components/Table.vue';
import draggable from 'vuedraggable'

export default {
  components: { Loader, Toolbar, ToolbarBottom, Table, draggable },
  data() {
		return {
			mainDataArray: this.$store.state.mainDataArray,
			pressedCtrlZ: false,
		}
  },
  methods: {
		editDone: async function () {
			// axios.put(`server`,JSON.stringify(this.mainDataArray))
			console.log(JSON.stringify(this.$store.state.mainDataArray))
		}
  },
}
</script>

<style>
</style>
