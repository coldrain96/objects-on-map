import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapObjects: [
      {
        id: 1,
        name: 'Москва',
        description: 'Описание объекта',
        lat: 55.755825,
        lon: 37.617298,
        actions: {
          edit: true,
          delete: true,
        },
        isEditable: false
      },
      {
        id: 2,
        name: 'Секретный военный объект в горах Ирана',
        description: 'Описание объекта',
        lat: 37.617298,
        lon: 55.755825,
        actions: {
          edit: true,
          delete: true,
        },
        isEditable: false
      },
      {
        id: 3,
        name: 'Одинцово',
        description: 'Описание объекта',
        lat: 55.680370,
        lon: 37.263691,
        actions: {
          edit: true,
          delete: true,
        },
        isEditable: false
      },
      {
        id: 4,
        name: 'Лондон',
        description: 'Описание объекта',
        lat: 51.507351,
        lon: -0.127758,
        actions: {
          edit: true,
          delete: true,
        },
        isEditable: false
      },
      {
        id: 5,
        name: 'Токио',
        description: 'Описание объекта',
        lat: 35.689487,
        lon: 139.691711,
        actions: {
          edit: true,
          delete: true,
        },
        isEditable: false
      },
    ]
  },
  getters: {
    GET_MAP_OBJECTS(state) {
      return state.mapObjects
    }
  },
  mutations: {
    DELETE_OBJECT(state, id) {
      for (let i = 0; state.mapObjects.length > 0; i++) {
        if (state.mapObjects[i].id === id) {
          state.mapObjects.splice(i, 1);
          break;
        }
      }
    },
    EDIT_OBJECT(state, { id, editedObject }) {
      for (let i = 0; state.mapObjects.length > 0; i++) {
        if (state.mapObjects[i].id === id) {
          state.mapObjects[i] = editedObject
          break;
        }
      }
    },
    ADD_NEW_OBJECT(state, newObject) {
      state.mapObjects.push(newObject)
    }
  },
  actions: {
    async INIT_DELETE_OBJECT_BY_ID({ commit }, { id }) {
      commit('DELETE_OBJECT', id)
    },
    async INIT_EDIT_OBJECT_BY_ID({ commit }, { id, editedObject }) {
      commit('EDIT_OBJECT', {
        id: id,
        editedObject: editedObject
      })
    },
    async INIT_ADD_NEW_OBJECT({ commit }, newObject) {
      newObject.actions = {
        edit: true,
        delete: true,
      };
      newObject.isEditable = false;
      commit('ADD_NEW_OBJECT', newObject)
    }
  }
})
