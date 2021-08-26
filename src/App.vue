<template>
  <div id="app">
    <!--<h2 class="header">Кол-во сигналов : {{startInfo.numOfStr}} <br> Кол-во временных делений : {{startInfo.numOfTime}}</h2>-->
    <ul class="gui__modes">

      <li class="form_radio_btn">
        <input type="radio" id="radio_inverse" name="mode" value="2" v-model="modeClick" checked>
        <label class="radio__label radio__label_inverse" for="radio_inverse">
        <span>¬</span></label>
      </li>

      <li class="form_radio_btn">
        <input type="radio" id="radio_toOne" name="mode" value="1" v-model="modeClick">
        <label class="radio__label radio__label_toOne" for="radio_toOne">
        <span>1</span></label>
      </li>
      
      <li class="form_radio_btn">
        <input type="radio" id="radio_toZero" name="mode" value="0" v-model="modeClick">
        <label class="radio__label radio__label_toZero" for="radio_toZero">
        <span>0</span></label>
      </li>

      <li class="form_radio_btn">
        <input type="radio" id="radio_editor" name="mode" value="3" v-model="modeClick">
        <label class="radio__label radio__label_editor" for="radio_editor">
        <span>✎</span></label>
      </li>
    </ul>

   <div class="toolbar" v-show="signalSelectedArr.length > 0">
      <span>Выбрано {{signalSelectedArr.length}} шт</span>
      <span class="clearSelected" @click="clearSelected">❎</span>
      <ul>
        <li><a href="" class="button15" @click.prevent="allInvert">Инвертировать</a></li>
        <li><a href="" class="button15" @click.prevent="allToOne">Задать в 1</a></li>
        <li><a href="" class="button15" @click.prevent="allToZero">Задать в 0</a></li>
      </ul> 
      <div class="generator">
          <span>Генератор:</span>
          <label for="generatorInputZero">Кол-во нулей</label>
          <input type="number" id="generatorInputZero" v-model="generatorCountZero">
          <label for="generatorInputOne">Кол-во единиц</label>
          <input type="number" id="generatorInputOne" v-model="generatorCountOne">
          <label for="generatorCheckbox">Начать с 1</label>
          <input type="checkbox" id="generatorCheckbox" v-model="generatorStartFromOne">
          <a href="#" class="button15" @click.prevent="generatorClick">Задать</a>
      </div>
    </div>

    <div>

    </div>
    <div class="table">
      <ul>
        <li :class="{signalName_selected: signalSelectedArr.includes(signal.id)}" class="signal__item" v-for="signal in mainData" :key="signal.name" @click.prevent="signalSelect(signal.id)">
            <p class="signalName">
              {{signal.name}}
            </p>
        </li>
        <li class="table__select_all"><a href="" class="button15 button15__signal_name" @click.prevent="selectAll">Выбрать все</a> </li>
      </ul>
      <div class="table__container">   
        <table class="graph">
          <tbody class="graph__body">
            <tr v-for="signal in mainData" :key="signal.name" class="graph__tr">
              <td :class="{ isOne: value===1, isZero: value===0, isSelected: signalSelectedArr.includes(signal.id) }" class="signalValue"
                v-for="(value,index) in signal.value" @click="interact(signal.id,index)">
              </td>
            </tr>
            <tr>
              <td class="signalTime" v-for="(timeCount,index) in startInfo.numOfTime">{{timeCount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a href="#" class="button15 button15_send" @click.prevent="editDone">Отправить</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      startInfo: {
        numOfStr: 0,
        numOfTime: 0
      },
      mainData: null,
      modeClick: 2,
      signalSelectedArr: [],
      generatorCountZero: 1,
      generatorCountOne: 1,
      generatorStartFromOne: false,
      pressedAltZ: false,
    }
  },
  created() {
    axios.get('../server/input.json').then(input=>{
      let incomeArr = {numOfStr: input.data.numOfStr, numOfTime: input.data.numOfTime};

      // this.startInfo = {
      //   numOfStr: incomeArr.numOfStr,
      //   numOfTime: incomeArr.numOfTime
      // }
      this.$set(this.startInfo,'numOfStr', incomeArr.numOfStr);
      this.$set(this.startInfo,'numOfTime', incomeArr.numOfTime);
      let logicValuesArr = [];
      for (let i = 0; i < incomeArr.numOfTime; i++) {
        logicValuesArr.push(0)
      };
      let mainArray = [];
      for (let i = incomeArr.numOfStr; i > 0; i--) {
       mainArray.push({ id: i, name: `Сигнал ${i}`, value: logicValuesArr })
      };
      this.mainData = JSON.parse(JSON.stringify(mainArray));
    });
   
  },
  mounted() {
  //alt+z
      window.addEventListener('keydown', (event) => {
        if (event.key == 'z' && event.altKey && (this.pressedAltZ != true)) {
          console.log("Alt + Z pressed!");
          this.pressedAltZ=!this.pressedAltZ
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.key == 'z' && event.altKey && (this.pressedAltZ != false)) {
          console.log("Alt + Z unpressed!");
          this.pressedAltZ=!this.pressedAltZ
        }
      });
    },
  methods: {
    interact: function (id, index) {
      let varArray = this.mainData.find(item => item.id === id).value;
      switch (parseInt(this.modeClick)) {
        case 0:
          varArray[index] = 0;
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
        case 1:
          varArray[index] = 1;
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
        case 2:
          varArray[index] === 0 ? varArray[index] = 1 : varArray[index] = 0;
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
      }
    },
    signalSelect: function(signal) {
      this.signalSelectedArr.includes(signal) ? this.signalSelectedArr.splice(this.signalSelectedArr.indexOf(signal),1) : this.signalSelectedArr.push(signal);
    },
    selectAll: function(){
      if (this.signalSelectedArr.length !== this.startInfo.numOfStr){
        this.signalSelectedArr = [];
        for (let i=1;i<=this.startInfo.numOfStr;i++) {
          this.signalSelectedArr.push(i)
        }
      }
    },
    clearSelected: function() {
      this.signalSelectedArr = [];
    },
    allInvert: function() {
      for (let i = 0; i < this.mainData.length; i++) {
        if (this.signalSelectedArr.includes(this.mainData[i].id)) {
          let varArrayForSignal = this.mainData[i].value;
          for (let value in varArrayForSignal) {
            varArrayForSignal[value] === 0 ? varArrayForSignal[value] = 1 : varArrayForSignal[value] = 0
          }
          this.mainData[i].value = JSON.parse(JSON.stringify(varArrayForSignal));
        }
      }
    },
    allToOne: function() {
      for (let i = 0; i < this.mainData.length; i++) {
        if (this.signalSelectedArr.includes(this.mainData[i].id)) {
          let varArrayForSignal = this.mainData[i].value;
          for (let value in varArrayForSignal) {
            varArrayForSignal[value] = 1;
          }
          this.mainData[i].value = JSON.parse(JSON.stringify(varArrayForSignal));
        }
      }
    },
    allToZero: function() {
       for (let i = 0; i < this.mainData.length; i++) {
        if (this.signalSelectedArr.includes(this.mainData[i].id)) {
          let varArrayForSignal = this.mainData[i].value;
          for (let value in varArrayForSignal) {
            varArrayForSignal[value] = 0;
          }
          this.mainData[i].value = JSON.parse(JSON.stringify(varArrayForSignal));
        }
      }
    },
    generatorClick: function(){
        if (this.generatorCountOne < 1 || this.generatorCountZero < 1) {
          alert('Пожалуйста, выставите положительные числа для генератора')
         return
        }
        let valueLength = this.startInfo.numOfTime;
        let varArrayForGenerator = [];
        while (varArrayForGenerator.length<=valueLength) {
          if (this.generatorStartFromOne) {
            for (let i=0;i<this.generatorCountOne;i++) {
              varArrayForGenerator.push(1);
            }
            for (let k=0;k<this.generatorCountZero;k++) {
              varArrayForGenerator.push(0);
            }
          } else {
            for (let i=0;i<this.generatorCountZero;i++) {
              varArrayForGenerator.push(0);
            }
            for (let k=0;k<this.generatorCountOne;k++) {
              varArrayForGenerator.push(1);
            }
          }
        }
        varArrayForGenerator.splice(valueLength,varArrayForGenerator.length-valueLength);
        for (let i = 0; i < this.mainData.length; i++) { 
          if (this.signalSelectedArr.includes(this.mainData[i].id)) { 
            this.mainData[i].value = JSON.parse(JSON.stringify(varArrayForGenerator));
          }
        }
    },
    editDone: async function () {

      ////////////////////////ОТПРАВИТЬ НА СЕРВЕР.......................
      // axios.put(`../server/output.json`,JSON.stringify(this.mainData))
      // axios({
      //   method: 'post',
      //   url: '../server/output.json',
      //   data: {title: JSON.stringify(this.mainData)} 
      // })
      console.log(JSON.stringify(this.mainData))
    }
  },
  watch: {
    mainData(newValue){
      console.log(newValue)
    }
  }
}
</script>

<style>
</style>
