<template>
    <div class="table">
        <draggable :disabled="!$store.state.editMode" tag="ul" v-model="mainDataStore" @start="startDragSignal" draggable=".signalNoGroup" @end="endDragSignal" :move="moveSignal" ghost-class="ghost">
            <li v-if="openedGroupCheck(signal)" class="signal__item" :class="{signalName_selected: $store.state.signalsSelectedArr.includes(signal.id),signal_disabled: signal.readOnly==true, signalNoGroup: signal.groupId == undefined || signal.type=='group',signal_group_name:signal.type == 'signal' && signal.groupId!=undefined}" v-for="signal in $store.state.mainDataArray" :key="signal.name" @click.prevent="$store.commit('signalSelect', signal.id)">
                    <svg @click.prevent="$store.commit(`groupOpenClose`,signal.groupId); $store.commit('signalSelect', signal.id);" :style="openedGroupArrowStyle(signal.groupId)" class="group_arrow" :class="{disabled:$store.state.editMode}" v-if="signal.type == 'group'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 306 306" style="enable-background:new 0 0 306 306;" xml:space="preserve">
                        <g id="keyboard-arrow-right">
                            <polygon points="58.65,267.75 175.95,153 58.65,35.7 94.35,0 247.35,153 94.35,306"/></g>
                    </svg>
                <p class="signalName" :class="{}">
                    {{groupBranchSymbol(signal)}}{{signal.name | signalNameFormat}}
                </p>
            </li>
            <div class="table__select_all" slot="footer">
                <a href="" class="button15 button15__signal_name" @click.prevent="$store.commit('allSignalsSelect')">Выбрать&nbsp;все</a>
            </div>
        </draggable>
        <div class="table__container">
            <table class="graph">
                <tbody class="graph__body">
                    <tr v-show="openedGroupCheck(signal)" scope="row" v-for="(signal,indexOfSignalInMainData) in $store.state.mainDataArray" :key="signal.name" class="graph__tr">

                        <td style="font-size:12px" v-if="signal.type == 'group'" class="signalValue" v-for="(value,index) in groupArraySum(signal.groupId)" :key="index">{{value|binToDec}}</td>

                        <td v-if="signal.type == 'signal'" :class="{isSelected: $store.state.signalsSelectedArr.includes(signal.id)|| cellsSelectedCheck(+indexOfSignalInMainData, index), signal_disabled_cell:(signal.readOnly==true || signal.type != 'signal')}" class="signalValue" v-for="(value,index) in signal.value" :key="index" @click="interactWithCell(+indexOfSignalInMainData,index,signal.readOnly,signal.type)">
                            <div class="signal_level" :style="signalStyle(value,signal.color,signal.isClockSignal)">
                                <div v-if="signal.isClockSignal && value==1" class="signal__clock">
                                    <div class="signal__clock_part" :style="signalClockStyle(signal.color,1)"></div>
                                    <div class="signal__clock_part" :style="signalClockStyle(signal.color,2)"></div>
                                    <div class="signal__clock_part" :style="signalClockStyle(signal.color,3)"></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="signalTime" v-for="(timeCount,index) in $store.state.startInfoForTable.numOfTime" :key="timeCount">
                        {{timeCount}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import signalNameFormat from '@/helpers/signalNameFormat'
import binToDec from '@/helpers/binToDec'
import draggable from 'vuedraggable'
import axios from 'axios';

export default {
    filters: {
        signalNameFormat,
        binToDec,
    },
    components: {
        draggable
    },
    computed: {
        mainDataStore: {
            get() {
                return this.$store.state.mainDataArray
            },
            set(value) {
                this.$store.commit('updateMainDataArray', value);
            }
        },
        countGroups() {
           return this.$store.state.mainDataArray.filter((group)=> {
                return group.type == 'group'
            }).length;
        },
    },
    created() {
            axios.get('http://127.0.0.1:7999').then(input=>{
                if (input.data.ok == true) {
                    this.$store.commit('appLoad');
                    axios.get('http://127.0.0.1:7999/dataPage?page=1').then(input=>{
                        let numberOfTimeFromArray;
                        if (input.data[0].type != 'signal') {
                            numberOfTimeFromArray = input.data[0].data[0].value.length;
                        } else {
                            numberOfTimeFromArray = input.data[0].value.length;
                        }

                        let incomeArr = {numOfStr: input.data.length, numOfTime: numberOfTimeFromArray};
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
            });
    },
    methods: {
        groupBranchSymbol(signal) {
            if (signal.groupId != undefined && signal.type == 'signal') {
                 return '└╴'
            }
        },
        groupArraySum(groupId) {
            let arrayToReturn = [];
            for (let i = 0; i < this.$store.state.startInfoForTable.numOfTime; i++) {
                arrayToReturn.push(0)
            }
            this.$store.state.mainDataArray.forEach(signal => {
                if (signal.groupId!=undefined && signal.type == 'signal') {
                    if (signal.groupId === groupId) {
                        for (let i = 0; i < this.$store.state.startInfoForTable.numOfTime; i++) {
                            arrayToReturn[i]+=signal.value[i].toString(2);
                        }
                    }
                }
            });
            return arrayToReturn;
        },
        moveSignal(e){
        },
        startDragSignal(e) {
        },
        endDragSignal(e) {
        },
        getIndexOfCurrentGroup(currentNum) {
            return this.$store.state.mainDataArray.indexOf(this.$store.state.mainDataArray.find((item)=>{
            if (item.type == 'group' && item.groupId == currentNum) return item
            }));
        },
        signalStyle(value,color,isClockSignal) {
            if (value == 1) {
                return isClockSignal ? `` : `border-top: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}`
            } else {
                return `border-bottom: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}`
            }
        },
        signalClockStyle(color,partOfSignal) {
            switch (partOfSignal) {
                case 1:
                    return `border-bottom: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}; width: 50%; margin-top: -${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/16}px`
                case 2:
                    return `border-top: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}; border-left: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}; border-right: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}; width: 25%; margin-top: -${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/16}px`
                case 3:
                    return `border-bottom: ${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/8}px solid ${color}; width: 25%; margin-top: -${((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2)/16}px`
            }
        },
        cellsSelectedCheck: function(id,index) {
            for (let value of this.$store.state.cellsSelectedArr) {
                if ((value.id===id) && (value.index===index)) {
                    return true
                }
            }
        },
        interactWithCell: function (id, index, readOnly, type) {
            if (readOnly || type!='signal') {
                return
            }
            let varArray = JSON.parse(JSON.stringify(this.$store.state.mainDataArray[id].value));
            switch (parseInt(this.$store.state.modeClick)) {
                case 0:
                    varArray[index] = 0;
                    this.$set(this.$store.state.mainDataArray[id],`value`,varArray)
                break;
                case 1:
                    varArray[index] = 1;
                    this.$set(this.$store.state.mainDataArray[id],`value`,varArray)
                break;
                case 2:
                    varArray[index] == 0 ? varArray[index] = 1 : varArray[index] = 0;
                    this.$set(this.$store.state.mainDataArray[id],`value`,varArray)
                break;
                case 3:
                    this.$store.commit('signalsSelectedClear');
                    if (this.$store.state.cellsSelectedArr.length < 2) {
                        if (this.$store.state.cellsSelectedArr.length === 1) {
                            if ((this.$store.state.cellsSelectedArr[0].id != id) || (this.$store.state.cellsSelectedArr[0].index != index)) {
                                this.$store.commit('cellsSelectedArrPush',{id,index})
                            } else this.$store.commit('cellsSelectedArrDelete')
                        } else this.$store.commit('cellsSelectedArrPush',{id,index})
                    }
                    if (this.$store.state.cellsSelectedArr.length == 2) {
                        for (let i = Math.min(this.$store.state.cellsSelectedArr[0].id,this.$store.state.cellsSelectedArr[1].id); i <= Math.max(this.$store.state.cellsSelectedArr[0].id,this.$store.state.cellsSelectedArr[1].id); i++) {
                            for (let j = Math.min(this.$store.state.cellsSelectedArr[0].index,this.$store.state.cellsSelectedArr[1].index); j <= Math.max(this.$store.state.cellsSelectedArr[0].index,this.$store.state.cellsSelectedArr[1].index); j++) {
                                if (!this.$store.state.mainDataArray[i].readOnly && this.$store.state.mainDataArray[i].type == 'signal') {
                                    this.$store.commit('cellsSelectedArrPush',{id: i, index: j})
                                }
                            }
                        }
                        this.$store.commit('cellsSelectedArrDelete');
                        this.$store.commit('cellsSelectedArrDelete');
                    }
                break;
            }
        },
        openedGroupArrowStyle(signalId) {
            return this.$store.state.groupsOpenedArr.includes(signalId)? 'transform: rotate(90deg);' : false;
        },
        openedGroupCheck(signal){
            return (signal.groupId!=undefined&&signal.type!='group'&& this.$store.state.groupsOpenedArr.includes(signal.groupId)) || signal.groupId==undefined || signal.type=='group'
        },

    }
}
</script>
