<template>
  <div id="app">
    <!--<h2 class="header">Кол-во сигналов : {{startInfo.numOfStr}} <br> Кол-во временных делений : {{startInfo.numOfTime}}</h2>-->
    <ul class="gui__modes">

      <li class="form_radio_btn" @click="clearSelected">
        <input type="radio" id="radio_inverse" name="mode" value="2" v-model="modeClick" checked>
        <label class="radio__label radio__label_inverse" for="radio_inverse">
        <span>¬</span></label>
      </li>

      <li class="form_radio_btn" @click="clearSelected">
        <input type="radio" id="radio_toOne" name="mode" value="1" v-model="modeClick">
        <label class="radio__label radio__label_toOne" for="radio_toOne">
        <span>1</span></label>
      </li>
      
      <li class="form_radio_btn" @click="clearSelected">
        <input type="radio" id="radio_toZero" name="mode" value="0" v-model="modeClick">
        <label class="radio__label radio__label_toZero" for="radio_toZero">
        <span>0</span></label>
      </li>

      <li class="form_radio_btn" @click="clearSelected">
        <input type="radio" id="radio_editor" name="mode" value="3" v-model="modeClick">
        <label class="radio__label radio__label_editor" for="radio_editor">
        <span>✎</span></label>
      </li>

      <li>
        <a href="" class="button15" @click.prevent="zoomOutHorizontal">&#5130;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="zoomInHorizontal">&#5125;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="zoomOutVertical">&#5123;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="zoomInVertical">&#5121;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="currentCellHeight = 80; currentCellWidth = 80">С</a>
      </li>
    </ul>

   <div class="toolbar" v-show="(signalSelectedArr.length > 0) || (cellSelectedArr.length>1)">
      <span>Выбрано {{countOfCurrentArray}} шт</span>
      <span class="clearSelected" @click="clearSelected">❎</span>
      <ul>
        <li><a href="" class="button15" @click.prevent="allInvert">Инвертировать</a></li>
        <li><a href="" class="button15" @click.prevent="allToOne">Задать в 1</a></li>
        <li><a href="" class="button15" @click.prevent="allToZero">Задать в 0</a></li>
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
              <td :class="{isSelected: signalSelectedArr.includes(signal.id)|| selectCheckEditor(signal.id, index)}" class="signalValue"
                v-for="(value,index) in signal.value" @click="interact(signal.id,index)">
                <div class="signal_level" :class="{ isOne: value==1, isZero: value==0 }"></div>
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
      mainData: {},
      modeClick: 2,
      signalSelectedArr: [],
      cellSelectedArr: [],
      localStorageOfData: [],
      generatorProperty: {countZero: 1,countOne: 1, startFromOne: false},
      pressedAltZ: false,
      currentCellWidth: 80,
      currentCellHeight: 80,
    }
  },
  computed: {
    logicValuesArr() {
      let varArray = [];
      for (let i = 0; i < this.startInfo.numOfTime; i++) {
        // this.logicValuesArr.push(0)
        varArray.push(0)
      };
      return varArray;
    },
    countOfCurrentArray() {
      let count;
      this.cellSelectedArr.length === 0 ? count = this.signalSelectedArr.length : count = this.cellSelectedArr.length;
      return count
    }
  },
  created() {
    axios.get('../server/input.json').then(input=>{
      let incomeArr = {numOfStr: input.data.numOfStr, numOfTime: input.data.numOfTime};
      this.$set(this.startInfo,'numOfStr', incomeArr.numOfStr);
      this.$set(this.startInfo,'numOfTime', incomeArr.numOfTime);
      for (let i = 0; i<incomeArr.numOfStr;i++) {
        this.$set(this.mainData, i, { id: incomeArr.numOfStr-i, name: `Сигнал ${incomeArr.numOfStr-i}`, value: JSON.parse(JSON.stringify(this.logicValuesArr ))});
      }
    });
   
  },
  mounted() {
  //alt+z
      window.addEventListener('keydown', (event) => {
        if (event.key == 'z' && event.altKey && (this.pressedAltZ != true)) {
          console.log("Alt + Z pressed!");
          // this.mainData = {}
          this.pressedAltZ=!this.pressedAltZ;
          // this.$set(this.mainData, )
          
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.key == 'z' && event.altKey && (this.pressedAltZ != false)) {
          // console.log("Alt + Z unpressed!");
          this.pressedAltZ=!this.pressedAltZ
        }
      });
    },
  methods: {
    interact: function (id, index) {
      let varArray;
      // let leftCorner;
      // let rightCorner;
      for (let key in this.mainData) {
        if (this.mainData[key].id===id) {
          varArray = JSON.parse(JSON.stringify(this.mainData[key].value));
        }
      }
      switch (parseInt(this.modeClick)) {
        case 0:
          varArray[index] = 0;
          for (let key in this.mainData) {
            if (this.mainData[key].id===id) {
              this.$set(this.mainData[key], `value`, varArray)
            }
          }
          break;
        case 1:
          varArray[index] = 1;
          for (let key in this.mainData) {
            if (this.mainData[key].id===id) {
              this.$set(this.mainData[key], `value`, varArray)
            }
          }
          break;
        case 2:
          varArray[index] == 0 ? varArray[index] = 1 : varArray[index] = 0;
          for (let key in this.mainData) {
            if (this.mainData[key].id===id) {
              this.$set(this.mainData[key], `value`, varArray)
            }
          }
          break;
        case 3:
          this.signalSelectedArr = [];
          if (this.cellSelectedArr.length < 2) {
            if (this.cellSelectedArr.length === 1) {
              // console.log((this.cellSelectedArr[0].id != id) || (this.cellSelectedArr[0].index != index))
              if ((this.cellSelectedArr[0].id != id) || (this.cellSelectedArr[0].index != index)) {
                this.cellSelectedArr.push({id,index})
              } else this.$delete(this.cellSelectedArr, 0)
            } else this.cellSelectedArr.push({id,index})
          }
          if (this.cellSelectedArr.length == 2) {
            for (let i = Math.min(this.cellSelectedArr[0].id,this.cellSelectedArr[1].id); i <= Math.max(this.cellSelectedArr[0].id,this.cellSelectedArr[1].id); i++) {
              for (let j = Math.min(this.cellSelectedArr[0].index,this.cellSelectedArr[1].index); j <= Math.max(this.cellSelectedArr[0].index,this.cellSelectedArr[1].index); j++) {
                this.cellSelectedArr.push({id: i, index: j})
              }  
            }
              this.$delete(this.cellSelectedArr,0);
              this.$delete(this.cellSelectedArr,0);
          }
          //console.log(this.cellSelectedArr)
        break;
      }
    },
    zoomOutHorizontal: function() {
      if (this.currentCellWidth>=40) {
        this.currentCellWidth-=5;
      }
    },
    zoomInHorizontal: function() {
      if (this.currentCellWidth<80) {
        this.currentCellWidth+=5;
      }
    },
    zoomOutVertical: function() {
      if (this.currentCellHeight>=40) {
        this.currentCellHeight-=5;   
      }
    },
    zoomInVertical: function() {
      if (this.currentCellHeight<80) {
        this.currentCellHeight+=5;
      }
    },
    signalSelect: function(signal) {
      this.cellSelectedArr = [];
      this.signalSelectedArr.includes(signal) ? this.signalSelectedArr.splice(this.signalSelectedArr.indexOf(signal),1) : this.signalSelectedArr.push(signal);
    },
    selectAll: function(){
      this.cellSelectedArr = [];
      let varLength = this.signalSelectedArr.length;
      if (this.signalSelectedArr.length !== this.startInfo.numOfStr){
        for (let i = 0;i < varLength;i++) {
          this.$delete(this.signalSelectedArr, 0);
        }
        for (let i=1;i<=this.startInfo.numOfStr;i++) {
          this.signalSelectedArr.push(i)
        }
      }
    },
    selectCheckEditor: function(id,index) {
      for (let value of this.cellSelectedArr) {
        if ((value.id===id) && (value.index===index)) { 
          return true
        }
      }
    },
    clearSelected: function() {
      let varLength;
      if (this.signalSelectedArr.length != 0) {
        varLength = this.signalSelectedArr.length;
        for (let i = 0;i < varLength;i++) {
          this.$delete(this.signalSelectedArr, 0);
        }
      } else {
        varLength = this.cellSelectedArr.length;
        for (let i = 0;i < varLength;i++) {
          this.$delete(this.cellSelectedArr, 0);
        }
      }
      // let varLength = this.signalSelectedArr.length;
      
    },
    allInvert: function() {
      if (this.signalSelectedArr.length != 0) {
        for (let key in this.mainData) {
          if (this.signalSelectedArr.includes(this.mainData[key].id)) {
            let varArrayForSignal = this.mainData[key].value;
            for (let value in varArrayForSignal) {
              varArrayForSignal[value] === 0 ? varArrayForSignal[value] = 1 : varArrayForSignal[value] = 0
            }
            this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)))
          }
        }
      } else if (this.cellSelectedArr.length != 0) {
        for (let key in this.mainData) {
          let varArrayForSignal = this.mainData[key].value;
          let infoObject = this.cellSelectedArr.filter(item => item.id == this.mainData[key].id);
          if (infoObject.length != 0) {
            let currentSignalIndexes = infoObject.map(item => item.index);
            for (let i = Math.min(...currentSignalIndexes); i <= Math.max(...currentSignalIndexes); i++) {
              varArrayForSignal[i] === 0 ? varArrayForSignal[i] = 1 : varArrayForSignal[i] = 0
            }
            this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)));
          }
        }
      }
    },
    allToOne: function() {
      if (this.signalSelectedArr.length != 0) {
        for (let key in this.mainData) {
          if (this.signalSelectedArr.includes(this.mainData[key].id)) {
            let varArrayForSignal = this.mainData[key].value;
            for (let value in varArrayForSignal) {
              varArrayForSignal[value] = 1;
            }
            this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)))
          }
        }
      } else if (this.cellSelectedArr.length != 0) {
        for (let key in this.mainData) {
          let varArrayForSignal = this.mainData[key].value;
          let infoObject = this.cellSelectedArr.filter(item => item.id == this.mainData[key].id);
          if (infoObject.length != 0) {
            let currentSignalIndexes = infoObject.map(item => item.index);
            for (let i = Math.min(...currentSignalIndexes); i <= Math.max(...currentSignalIndexes); i++) {
              varArrayForSignal[i] = 1;
            }
            this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)));
          }
        }
      }
    },
    allToZero: function() {
      if (this.signalSelectedArr.length != 0) {
       for (let key in this.mainData) {
          if (this.signalSelectedArr.includes(this.mainData[key].id)) {
            let varArrayForSignal = this.mainData[key].value;
            for (let value in varArrayForSignal) {
              varArrayForSignal[value] = 0;
            }
            this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)))
          }
        }
      } else if (this.cellSelectedArr.length != 0) {
          for (let key in this.mainData) {
            let varArrayForSignal = this.mainData[key].value;
            let infoObject = this.cellSelectedArr.filter(item => item.id == this.mainData[key].id);
            if (infoObject.length != 0) {
              let currentSignalIndexes = infoObject.map(item => item.index);
              for (let i = Math.min(...currentSignalIndexes); i <= Math.max(...currentSignalIndexes); i++) {
                varArrayForSignal[i] = 0;
              }
              this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForSignal)));
            }
          }
      }
    },
    generatorClick: function(){
        if (this.generatorProperty.countOne < 1 || this.generatorProperty.countZero < 1) {
          alert('Пожалуйста, выставите положительные числа для генератора')
         return
        }
        if (this.signalSelectedArr.length != 0) { 
          let valueLength = this.startInfo.numOfTime;
          let varArrayForGenerator = this.generatorCreateSignal(valueLength);
          for (let key in this.mainData) {
            if (this.signalSelectedArr.includes(this.mainData[key].id)) {
              this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForGenerator)))
            }
          }
        } else if (this.cellSelectedArr.length != 0) {
          for (let key in this.mainData) {
            let varArrayForGenerator = this.mainData[key].value;
            let infoObject = this.cellSelectedArr.filter(item => item.id == this.mainData[key].id);
            if (infoObject.length != 0) {
              let currentSignalIndexes = infoObject.map(item => item.index)
              let minIndex = Math.min(...currentSignalIndexes);
              let maxIndex = Math.max(...currentSignalIndexes);
              let countOfIteration = (maxIndex - minIndex)+1;
              let subarrayToInject = this.generatorCreateSignal(countOfIteration);
              for (let i = 0; i < countOfIteration;i++) {
                varArrayForGenerator.splice(minIndex + i, 1, subarrayToInject[i]);
              }
              this.$set(this.mainData[key], `value`, JSON.parse(JSON.stringify(varArrayForGenerator)))
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
    addDataInStorage: function(data) {
      this.localStorageOfData.push(JSON.parse(JSON.stringify(data)))
      this.localStorageOfData.length>10? this.localStorageOfData.shift() : true;
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
    mainData: {
      handler: function(val, oldVal) {
          // this.addDataInStorage(val);
          console.log('объект изменен, стало:', val)
          // localStorage.name = this.mainData;
          // console.log(localStorage)
          // if (val === oldVal) {
          //   console.log(`Объект не изменен`, val[0].value, oldVal[0].value)
          // } else {
          //   console.log('объект изменен, стало:', val)
          // }
      },
      deep: true
    },
    currentCellHeight: {
      handler: function(val, oldVal) {
        document.documentElement.style.setProperty("--size-cell-height", `${this.currentCellHeight}px`);
      }
    },
    currentCellWidth: {
      handler: function(val, oldVal) {
        document.documentElement.style.setProperty("--size-cell-width", `${this.currentCellWidth}px`);
      }
    },
    signalSelectedArr(newValue) {
      // this.cellSelectedArr = [];
      // console.log('массив изменен, стало:', newValue)
    },
    cellSelectedArr() {
      // this.signalSelectedArr = [];
    }
  }
}
</script>

<style>
</style>
