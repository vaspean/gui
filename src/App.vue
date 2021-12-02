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
			list: [
                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 }
            ],
		}
  },
  mounted() {
  //ctrl+z
		window.addEventListener('keydown', (event) => {
			if (event.key == 'z' && event.ctrlKey && (this.pressedCtrlZ != true)) {
				console.log("Alt + Z pressed!");
				console.log(this.$store.state.modeClick)
				this.pressedCtrlZ=!this.pressedCtrlZ;
			}
		});
		window.addEventListener('keyup', (event) => {
			if (event.key == 'z' && event.ctrlKey && (this.pressedCtrlZ != false)) {
			console.log("Alt + Z unpressed!");
			this.pressedCtrlZ=!this.pressedCtrlZ
			}
		});
    },
  methods: {
		editDone: async function () {
			////////////////////////ОТПРАВИТЬ НА СЕРВЕР.......................
			// axios.put(`../server/output.json`,JSON.stringify(this.mainData))
			// axios({
			//   method: 'post',
			//   url: '../server/output.json',
			//   data: {title: JSON.stringify(this.mainData)} 
			// })
			console.log(JSON.stringify(this.$store.state.mainDataArray))
		}
  },
}
</script>

<style>
</style>
