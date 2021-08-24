<template>
  <div id="app">
    <!--<h2 class="header">Кол-во сигналов : {{startInfo.numOfStr}} <br> Кол-во временных делений : {{startInfo.numOfTime}}</h2>-->


    <ul class="gui__modes">

      <li class="form_radio_btn">
        <input type="radio" id="radio_inverse" name="mode" value="2" v-model="mode" checked>
        <label class="radio__label radio__label_inverse" for="radio_inverse">
        <span>¬</span></label>
      </li>

      <li class="form_radio_btn">
        <input type="radio" id="radio_toOne" name="mode" value="1" v-model="mode">
        <label class="radio__label radio__label_toOne" for="radio_toOne">
        <span>1</span></label>
      </li>
      
      <li class="form_radio_btn">
        <input type="radio" id="radio_toZero" name="mode" value="0" v-model="mode">
        <label class="radio__label radio__label_toZero" for="radio_toZero">
        <span>0</span></label>
      </li>

    </ul>

    <div>
      <p>Режимы для всего сигнала:</p>
      <input type="radio" id="radio_allToOne" name="mode" value="3" v-model="mode" checked>
      <label for="radio_inverse">Весь сигнал в единицу</label>
      <input type="radio" id="radio_allToZero" name="mode" value="4" v-model="mode">
      <label for="radio_toOne">Весь сигнал в ноль</label>
      <input type="radio" id="radio_allInvert" name="mode" value="5" v-model="mode">
      <label for="radio_toOne">Инвертировать сигнал</label>
    </div>

    <div>

    </div>
    <!-- <canvas class="testCanvas" id="testCanvas" width="150" height="150">Обновите браузер</canvas> -->
    <!-- <h3>{{mainData}}</h3> -->
    <div class="table">
      <ul>
        <li v-for="signal in mainData" :key="signal.name">
          <div>
            <p>
              {{signal.name}}
            </p>
          </div>
        </li>
      </ul>
      <div class="table__container">
        
        <table class="graph">
          <tbody class="graph__body">
            <tr v-for="signal in mainData" :key="signal.name" class="graph__tr">
              <!-- <td class="signalName">{{signal.name}}
                <button>⚙</button>
              </td> -->
              <td v-bind:class="{ isOne: value===1, isZero: value===0 }" class="signalValue"
                v-for="(value,index) in signal.value" @click="interact(signal.id,index)">
                <!-- {{value}} -->
              </td>
            </tr>
            <tr>
              <!-- <td>name/time</td> -->
              <td class="signalTime" v-for="(timeCount,index) in startInfo.numOfTime">{{timeCount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a href="#" class="button15" @click="editDone">Отправить</a>
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
      mode: 2,
    }
  },
  created() {
    axios.get('../server/input.json').then(input=>{
      let incomeArr = {numOfStr: input.data.numOfStr, numOfTime: input.data.numOfTime};
      this.startInfo = {
        numOfStr: incomeArr.numOfStr,
        numOfTime: incomeArr.numOfTime
      }
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



  methods: {
    interact: function (id, index) {
      let varArray = this.mainData.find(item => item.id === id).value;
      switch (parseInt(this.mode)) {
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
        case 3:
          for (let value in varArray) {
            varArray[value] = 1
          }
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
        case 4:
          for (let value in varArray) {
            varArray[value] = 0
          }
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
        case 5:
          for (let value in varArray) {
            varArray[value] === 0 ? varArray[value] = 1 : varArray[value] = 0
          }
          this.mainData.find(item => item.id === id).value = JSON.parse(JSON.stringify(varArray));
          break;
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
  }
}
</script>

<style>
</style>
