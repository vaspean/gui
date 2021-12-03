<template>
    <ul class="gui__modes">
      <li class="form_radio_btn" @click="$store.commit('signalsSelectedClear')">
        <input type="radio" id="radio_inverse" name="mode" value="2" v-model="modeClick" checked>
        <label class="radio__label radio__label_inverse" for="radio_inverse">
        <span>¬</span></label>
      </li>

      <li class="form_radio_btn" @click="$store.commit('signalsSelectedClear')">
        <input type="radio" id="radio_toOne" name="mode" value="1" v-model="modeClick">
        <label class="radio__label radio__label_toOne" for="radio_toOne">
        <span>1</span></label>
      </li>

      <li class="form_radio_btn" @click="$store.commit('signalsSelectedClear')">
        <input type="radio" id="radio_toZero" name="mode" value="0" v-model="modeClick">
        <label class="radio__label radio__label_toZero" for="radio_toZero">
        <span>0</span></label>
      </li>

      <li class="form_radio_btn" @click="$store.commit('signalsSelectedClear')">
        <input type="radio" id="radio_editor" name="mode" value="3" v-model="modeClick">
        <label class="radio__label radio__label_editor" for="radio_editor">
        <span>✎</span></label>
      </li>

      <li>
        <a href="" class="button15" @click.prevent="currentCellWidth = -3">&#5130;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="currentCellWidth = 3">&#5125;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="currentCellHeight = -3">&#5123;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="currentCellHeight = 3">&#5121;</a>
      </li>
      <li>
        <a href="" class="button15" @click.prevent="$store.commit(`clearHeightAndWidth`)">С</a>
      </li>

      <li class="pagination">
        <a id="previousPage" href="" class="button15" :class="{disabled: $store.state.editMode == true}" @click.prevent="previousPage()">←</a>
        <span>Страница: {{page}}/{{pages}}</span>
        <a id="nextPage" href="" class="button15" :class="{disabled: $store.state.editMode == true}" @click.prevent="nextPage()">→</a>
      </li>

      <li>
        <span style="margin-right:5px; font-size:15px">Перемещение:</span>
        <a id="previousPage" href="" class="button15" @click.prevent="$store.commit('editModeClick');">{{editModeMessage}}</a>
      </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
          checkPostOk: false
        }
    },
    methods: {
        nextPage() {
          if (this.$store.state.editMode == true) return
          axios.post(`http://127.0.0.1:7999/dataPage?page=${this.page}`,JSON.parse(JSON.stringify(this.currentDataToServer()))).then(input=> {
            this.page < this.pages ? this.page += 1 : false;
            let tableContainer = document.getElementsByClassName("table__container");
            tableContainer[0].scrollLeft = 0;
            this.getDataByPage(this.page);
          });
        },
        previousPage() {
          if (this.$store.state.editMode == true) return
          axios.post(`http://127.0.0.1:7999/dataPage?page=${this.page}`,JSON.parse(JSON.stringify(this.currentDataToServer()))).then(input=> {
            this.page > 1 ? this.page -= 1 : false;
            let tableContainer = document.getElementsByClassName("table__container");
            tableContainer[0].scrollLeft = 8188;
            this.getDataByPage(this.page);
          });
		    },
        currentDataToServer() {
          let currentDataToServer = [];
          this.$store.state.mainDataArray.forEach(itemMainData => {
            if(itemMainData.groupId == undefined || itemMainData.type=='group') currentDataToServer.push(itemMainData);
            if(itemMainData.groupId != undefined && itemMainData.type=='signal') {
              currentDataToServer.forEach((itemSendData)=>{
                if (itemSendData.type == 'group' && itemSendData.data!=[]) {
                  itemSendData.data = [];
                }
              });
            }
          });
           this.$store.state.mainDataArray.forEach(itemMainData => {
             if(itemMainData.groupId != undefined && itemMainData.type=='signal') {
                currentDataToServer.forEach((itemSendData)=>{
                  if (itemSendData.type == 'group' && itemSendData.groupId==itemMainData.groupId) {
                    let transformSignalToGroup = {};
                    transformSignalToGroup.id = itemMainData.id;
                    transformSignalToGroup.name = itemMainData.name;
                    transformSignalToGroup.value = itemMainData.value;
                    itemSendData.data.push(JSON.parse(JSON.stringify(transformSignalToGroup)));
                  }
                })
             }
           });
          return currentDataToServer;
        },
        getDataByPage(page) {
          axios.get(`http://127.0.0.1:7999/dataPage?page=${page}`).then(input=>{
            let numberOfTimeFromArray;
            if (input.data[0].type != 'signal') {
                numberOfTimeFromArray = input.data[0].data[0].value.length;
            } else {
                numberOfTimeFromArray = input.data[0].value.length;
            }

            let incomeArr = {numOfStr: input.data.length, numOfTime: numberOfTimeFromArray}
            let transformedData = [];
            input.data.forEach((item)=> {
                transformedData.push(item);
                if (item.type=='group') {
                    item.data.forEach(itemGroup=>{
                        itemGroup.readOnly = item.readOnly;
                        itemGroup.color = item.color;
                        itemGroup.type = 'signal';
                        itemGroup.groupId = item.groupId;
                        itemGroup.partOfGroup = item.data.indexOf(itemGroup);
                        transformedData.push(JSON.parse(JSON.stringify(itemGroup)))
                    })
                    this.$set(item,'data',item.data.length);
                }
            })
            axios.get('http://127.0.0.1:7999/pagination').then(pagination=>{
                this.$store.commit('pagesSet', pagination.data.pages);
            });
            this.$store.commit('updateMainDataArray',transformedData)
            this.$store.commit('startInfoForTableSet', incomeArr);

          });
        }
    },
    computed: {
        editModeMessage() {
          return this.$store.state.editMode ?  'Выключить' : 'Включить'
        },
        currentCellWidth: {
          get() {
            return this.$store.state.currentCellWidth
          },
          set(value) {
            this.$store.commit('changeCellWidth', value)
          }
        },
        currentCellHeight: {
          get() {
            return this.$store.state.currentCellHeight
          },
          set(value) {
            this.$store.commit('changeCellHeight', value)
          }
        },
        modeClick: {
            get() {
                return this.$store.state.modeClick;
            },
            set(value) {
                this.$store.commit('modeClickSet', value)
            }
        },
        pages: {
            get() {
                return this.$store.state.pages
            },
            set(value) {
                this.$store.commit('pagesSet', value)
            }
        },
        page: {
            get() {
                return this.$store.state.page
            },
            set(value) {
                this.$store.commit('pageSet', value)
            }
        },
    },
    watch: {
        currentCellHeight(val) {
		    	document.documentElement.style.setProperty("--size-cell-height", `${val}px`);
        },
        currentCellWidth(val) {
		    	document.documentElement.style.setProperty("--size-cell-width", `${val}px`);
        },
    }
}
</script>
