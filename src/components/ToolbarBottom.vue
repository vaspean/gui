<template>
	<div class="toolbar" v-show="($store.state.signalsSelectedArr.length > 0) || ($store.state.cellsSelectedArr.length>1)">
		<span>Выбрано {{countOfCurrentArray}} шт</span>
		<span class="clearSelected" @click="$store.commit('allArrSelectedClear')">❎</span>
		<ul>
			<li><a href="" class="button15" @click.prevent="allInvert">Инвертировать</a></li>
			<li><a href="" class="button15" @click.prevent="allToOne">Задать в 1</a></li>
			<li><a href="" class="button15" @click.prevent="allToZero">Задать в 0</a></li>
			<li class="selectColorChose" v-if="$store.state.signalsSelectedArr.length!=0">
				<span>Цвет:</span>
				<select v-model="chosenColor" :style="`background-color:${chosenColor}`" name="colorpicker">
					<option style="background-color:navy" value="navy"></option>
					<option style="background-color:blue" value="blue"></option>
					<option style="background-color:teal" value="teal"></option>
					<option style="background-color:aqua" value="aqua"></option>
					<option style="background-color:green" value="green"></option>
					<option style="background-color:lime" value="lime"></option>
					<option style="background-color:olive" value="olive"></option>
					<option style="background-color:yellow" value="yellow"></option>
					<option style="background-color:maroon" value="maroon"></option>
					<option style="background-color:red" value="red"></option>
					<option style="background-color:purple" value="purple"></option>
					<option style="background-color:fuchsia" value="fuchsia"></option>
					<option style="background-color:gray" value="gray"></option>
					<option style="background-color:black" value="black"></option>
				</select>
				<a href="#" class="button15" @click.prevent="setSignalColor">Задать</a>
			</li>
		</ul> 
		<div class="generator">
				<span>Генератор:</span>
				<label for="generatorInputZero">Кол-во нулей</label>
				<input type="number" id="generatorInputZero" v-model="generatorProperty.countZero">
				<label for="generatorInputOne">Кол-во единиц</label>
				<input type="number" id="generatorInputOne" v-model="generatorProperty.countOne">
				<label for="generatorCheckbox">Начать с 1</label>
				<input type="checkbox" id="generatorCheckbox" v-model="generatorProperty.startFromOne">
				<a href="#" class="button15" @click.prevent="generatorClick">Задать</a>
		</div>
		<div class="moveSignal" v-if="$store.state.signalsSelectedArr.length!=0">
			<a href="" class="button15" :class="{disabled:!$store.state.editMode}" @click.prevent="moveSignalsTop">&#5123;</a>
			<a href="" class="button15" :class="{disabled:!$store.state.editMode}" @click.prevent="moveSignalsBottom">&#5121;</a>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// mainDataArray: this.$store.state.mainDataArray,
			generatorProperty: {countZero: 1,countOne: 1, startFromOne: false},
			chosenColor: `Black`
		}
	},
	// props:[`mainDataArray`],
	computed: {
		countOfCurrentArray() {
			let count;
			this.$store.state.cellsSelectedArr.length === 0 ? count = this.$store.state.signalsSelectedArr.length : count = this.$store.state.cellsSelectedArr.length;
			return count
		}
	},
	methods: {
		moveSignalsTop: function() {
			this.$store.state.editMode ? this.$store.commit('selectedSignalsMove',`up`) : false;
		},
		moveSignalsBottom: function() {
			this.$store.state.editMode ? this.$store.commit('selectedSignalsMove',`down`) : false;
		},
		interactWithSelectedSignals: function(interactMode) {
			this.$store.state.mainDataArray.forEach((item)=>{
				if (this.$store.state.signalsSelectedArr.includes(item.id) && item.readOnly!=true && item.type=='signal') {
					let varArrayForSignal = item.value;
					let signalArrayToSet = varArrayForSignal.map((value)=>{
						switch (interactMode) {
							case 'invert': return value === 0 ? value = 1 : value = 0;
							case 'toOne': return value = 1;
							case 'toZero': return value = 0;
						};
					});
					this.$set(item, `value`, JSON.parse(JSON.stringify(signalArrayToSet)));
				};
			});
		},
		interactWithSelectedCellsArea: function(interactMode) {
			this.$store.state.cellsSelectedArr.forEach((item)=>{
				let varArrayForSignal = this.$store.state.mainDataArray[item.id].value;
				switch (interactMode) {
					case 'invert':
						varArrayForSignal[item.index] === 0 ? varArrayForSignal[item.index] = 1 : varArrayForSignal[item.index] = 0;							
					break;
					case 'toOne':
						varArrayForSignal[item.index] = 1;
					break;
					case 'toZero':
						varArrayForSignal[item.index] = 0;
					break;
				};
				this.$set(this.$store.state.mainDataArray[item.id], `value`, JSON.parse(JSON.stringify(varArrayForSignal)));
			});
		},
		allInvert: function() {
			if (this.$store.state.signalsSelectedArr.length != 0) {
				this.interactWithSelectedSignals(`invert`);
			} else if (this.$store.state.cellsSelectedArr.length != 0) {
				this.interactWithSelectedCellsArea(`invert`)
			}
		},
		allToOne: function() {
			if (this.$store.state.signalsSelectedArr.length != 0) {
				this.interactWithSelectedSignals(`toOne`);
			} else if (this.$store.state.cellsSelectedArr.length != 0) {
				this.interactWithSelectedCellsArea(`toOne`)
			}
		},
		allToZero: function() {
			if (this.$store.state.signalsSelectedArr.length != 0) {
				this.interactWithSelectedSignals(`toZero`);
			} else if (this.$store.state.cellsSelectedArr.length != 0) {
				this.interactWithSelectedCellsArea(`toZero`)
			}
		},
		generatorClick: function(){
			if (this.generatorProperty.countOne < 1 || this.generatorProperty.countZero < 1) {
				alert('Пожалуйста, выставите положительные числа для генератора')
				return
			}
			if (this.$store.state.signalsSelectedArr.length != 0) { 
				let valueLength = this.$store.state.startInfoForTable.numOfTime;
				let varArrayForGenerator = this.generatorCreateSignal(valueLength);
				this.$store.state.mainDataArray.forEach((item)=>{
					if (!item.readOnly && item.type == 'signal') {
						if (this.$store.state.signalsSelectedArr.includes(item.id)) {
							this.$set(item, `value`, JSON.parse(JSON.stringify(varArrayForGenerator)))
						}
					}
				})
			} else if (this.$store.state.cellsSelectedArr.length != 0) {
				let currentSignalIdsArr = [];
				let currentSignalIndexesArr = [];
				this.$store.state.cellsSelectedArr.forEach((item)=>{
					if (!currentSignalIdsArr.includes(item.id)) {
						currentSignalIdsArr.push(item.id)
					}
					if (!currentSignalIndexesArr.includes(item.index)) {
						currentSignalIndexesArr.push(item.index)
					}
				})
				let idRange = {min:Math.min(...currentSignalIdsArr),max:Math.max(...currentSignalIdsArr)};
				let indexRange = {min:Math.min(...currentSignalIndexesArr),max:Math.max(...currentSignalIndexesArr)};
				for (let index = idRange.min; index <= idRange.max; index++) {
					if (!this.$store.state.mainDataArray[index].readOnly && this.$store.state.mainDataArray[index].type=='signal') {
						let varArrayForGenerator = this.$store.state.mainDataArray[index].value;
						let countOfIteration = (indexRange.max - indexRange.min)+1;
							let subarrayToInject = this.generatorCreateSignal(countOfIteration);
							for (let i = 0; i < countOfIteration;i++) {
								varArrayForGenerator.splice(indexRange.min + i, 1, subarrayToInject[i]);
							}
						this.$set(this.$store.state.mainDataArray[index], `value`, JSON.parse(JSON.stringify(varArrayForGenerator)))
					}
				}
			}
		},
		generatorCreateSignal: function(length) {
			let varArrayForGenerator = [];
			while (varArrayForGenerator.length<=length) {
				if (this.generatorProperty.startFromOne) {
					for (let i=0;i<this.generatorProperty.countOne;i++) {
						varArrayForGenerator.push(1);
					}
					for (let k=0;k<this.generatorProperty.countZero;k++) {
						varArrayForGenerator.push(0);
					}
				} else {
					for (let i=0;i<this.generatorProperty.countZero;i++) {
						varArrayForGenerator.push(0);
					}
					for (let k=0;k<this.generatorProperty.countOne;k++) {
						varArrayForGenerator.push(1);
					}
				}
			}
			varArrayForGenerator.splice(length,varArrayForGenerator.length-length)
			return varArrayForGenerator;
		},
		setSignalColor: function() {
			this.$store.state.mainDataArray.forEach((item)=>{
				if (this.$store.state.signalsSelectedArr.includes(item.id)) {
					this.$set(item, `color`, this.chosenColor);
				};
			});
		}
	},
}
</script>