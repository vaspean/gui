import Vue from 'vue'
import Vuex from 'vuex'
import {arrayMoveMutable} from 'array-move';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appLoaded: false,
    modeClick: 2,
    page: 1,
    pages: 1,
    // cellsPerPage: 20,
    startInfoForTable: {},
    mainDataArray: [],
    varArrayForTransportGroupSignals: [],
    varArrayForOpenedGroups: [],
    signalsSelectedArr: [],
    cellsSelectedArr: [],
    groupsOpenedArr: [],
    editMode: false,
    currentCellWidth: 40,
    currentCellHeight: 40
  },
  mutations: {
    appLoad(state) {
      state.appLoaded = !state.appLoaded;
    },
    changeCellWidth(state, payload) {
      if (state.currentCellWidth + payload <20 || state.currentCellWidth + payload >60 ) return
      state.currentCellWidth += payload;
    },
    changeCellHeight(state, payload) {
      if (state.currentCellHeight + payload <20 || state.currentCellHeight + payload >60 ) return
      state.currentCellHeight += payload;
    },
    clearHeightAndWidth(state) {
      state.currentCellWidth = 40;
      state.currentCellHeight = 40;
    },
    pageSet(state, payload) {
      state.page = payload;
    },
    pagesSet(state, payload) {
      state.pages = payload;
    },
    modeClickSet(state, payload) {
      state.modeClick = payload;
    },
    updateMainDataArray(state, payload) {
      state.mainDataArray = JSON.parse(JSON.stringify(payload))
    },
    updateOneSignalInMainData(state, payload) {
      state.mainDataArray.splice(payload.index,1,payload.newValueOfsSignal)
    },
    deleteOneSignalInMainData(state, payload) {
      state.mainDataArray.splice(payload,1)
    },
    pasteOneSignalInMainData(state,payload) {
      state.mainDataArray.splice(payload.index, 0, payload.item)
    },
    startInfoForTableSet(state, payload) {
      state.startInfoForTable = payload;
    },
    signalSelect(state, payload) {
      state.cellsSelectedArr = [];
      state.signalsSelectedArr.includes(payload) ? state.signalsSelectedArr.splice(state.signalsSelectedArr.indexOf(payload),1) : state.signalsSelectedArr.push(payload);
    },
    allSignalsSelect(state) {
      state.cellsSelectedArr = [];
      let varLength = state.signalsSelectedArr.length;
      for (let i=0;i<varLength;i++) {
          state.signalsSelectedArr.splice(0,1)
        }
      state.mainDataArray.forEach(item => {
        state.signalsSelectedArr.push(item.id)
      });
    },
    signalsSelectedClear(state) {
      state.signalsSelectedArr = [];
    },
    cellsSelectedArrPush(state, payload) {
      state.cellsSelectedArr.push(payload);
    },
    cellsSelectedArrDelete(state) {
      state.cellsSelectedArr.splice(0,1)
    },
    allArrSelectedClear(state) {
      let varLength;
      if (state.signalsSelectedArr.length != 0) {
        varLength = state.signalsSelectedArr.length;
        for (let i = 0;i < varLength;i++) {
          state.signalsSelectedArr.splice(0,1)
        }
      } else {
        varLength = state.cellsSelectedArr.length;
        for (let i = 0;i < varLength;i++) {
          state.cellsSelectedArr.splice(0,1)
        }
      }  
    },
    groupOpenClose(state,payload) {
      if (!state.editMode) {
        state.groupsOpenedArr.includes(payload) ? state.groupsOpenedArr.splice(state.groupsOpenedArr.findIndex((id)=>id===payload),1) : state.groupsOpenedArr.push(payload);
      }
    },
    groupsOpenedArrClear(state) {
      state.groupsOpenedArr = [];
    },
    groupsOpenedArrFullSet(state,payload) {
      state.groupsOpenedArr = payload;
    },
    moveSignals(state,payload) {
      arrayMoveMutable(state.mainDataArray, payload.from, payload.to)
    },
    editModeClick(state) {
      state.signalsSelectedArr = [];
      let getIndexOfCurrentGroup = function(currentNum) {
        return state.mainDataArray.indexOf(state.mainDataArray.find((item)=>{
          if (item.type == 'group' && item.groupId == currentNum) return item
        }));
      }
      if (!state.editMode) {
        state.varArrayForOpenedGroups = state.groupsOpenedArr;
        state.groupsOpenedArr = [];
        let countGroups = state.mainDataArray.filter((group)=> {
          return group.type == 'group' 
        }).length;
        
        for (let currentNumOfGroup = 1; currentNumOfGroup<=countGroups; currentNumOfGroup++) {
          for (let i = 0; i < state.mainDataArray[getIndexOfCurrentGroup(currentNumOfGroup)].data;i++) {
            state.varArrayForTransportGroupSignals.push(state.mainDataArray[getIndexOfCurrentGroup(currentNumOfGroup)+1+i]);
          }              
        }
        state.mainDataArray = state.mainDataArray.filter((item)=> {
          return ((item.groupId == undefined)||item.type == 'group') 
        });
      } else if (state.editMode) {
        state.varArrayForTransportGroupSignals.forEach((signal)=>{
          state.mainDataArray.forEach((item)=> {
            if (signal.groupId == item.groupId && item.type == 'group') {
              state.mainDataArray.splice(getIndexOfCurrentGroup(item.groupId)+1+signal.partOfGroup, 0, signal);
            }
          })
        })
        state.varArrayForTransportGroupSignals = [];
        state.groupsOpenedArr = state.varArrayForOpenedGroups;
        state.varArrayForOpenedGroups = [];
      }
      state.editMode = !state.editMode;
    },
    selectedSignalsMove(state,direction) {
      if (direction == 'up') {
        let moveDisableUp = false;
        state.signalsSelectedArr.forEach((id)=>{
          state.mainDataArray.forEach((item)=>{
            if (state.mainDataArray.indexOf(item)==0 && item.id == id) {
              moveDisableUp = true;
            }
          })
        })
        if (!moveDisableUp) {
          state.mainDataArray.forEach((item)=> {
            if(state.signalsSelectedArr.includes(item.id)) {
              if (state.mainDataArray.indexOf(item) == 0) return
              arrayMoveMutable(state.mainDataArray, +state.mainDataArray.indexOf(item),+state.mainDataArray.indexOf(item)-1)
            }
          })
        }
      } else if (direction == 'down') {
        state.mainDataArray.reverse();
        let moveDisableDown = false;
        state.signalsSelectedArr.forEach((id)=>{
          state.mainDataArray.forEach((item)=>{
            if (state.mainDataArray.indexOf(item)==0 && item.id == id) {
              moveDisableDown = true;
            }
          })
        })
        if (!moveDisableDown) {
          state.mainDataArray.forEach((item)=> {
            if(state.signalsSelectedArr.includes(item.id)) {
              if (state.mainDataArray.indexOf(item) == 0) return
              arrayMoveMutable(state.mainDataArray, +state.mainDataArray.indexOf(item),+state.mainDataArray.indexOf(item)-1)
            }
          })
        }
        state.mainDataArray.reverse();
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
