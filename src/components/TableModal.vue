<template>
  <div>
    <b-button
      block
      variant="success"
      @click="show = true"
    >
      Добавить новый объект
    </b-button>

    <b-modal
      v-model="show"
      title="Добавление нового объекта"
      hide-footer
    >
      <b-form
        @submit.prevent="evt => addNewObject(evt)"
        @reset.prevent="evt => resetFields(evt)"
      >
        <b-form-group
        >
          <b-form-input
            v-model="newMapObject.id"
            required
            type="number"
            placeholder="Введите id"
          ></b-form-input>
        </b-form-group>

        <b-form-group
        >
          <b-form-input
            v-model="newMapObject.name"
            required
            placeholder="Введите имя"
          ></b-form-input>
        </b-form-group>

        <b-form-group
        >
          <b-form-input
            v-model="newMapObject.description"
            placeholder="Введите описание"
          ></b-form-input>
        </b-form-group>

        <b-form-group
        >
          <b-form-input
            v-model="newMapObject.lat"
            required
            placeholder="Введите lat"
          ></b-form-input>
        </b-form-group>

        <b-form-group
        >
          <b-form-input
            v-model="newMapObject.lon"
            required
            placeholder="Введите lon"
          ></b-form-input>
        </b-form-group>

        <div class="w-100">
          <b-button
            type="submit"
            variant="success"
            size="md"
            class="float-right m-1"
          >
            Добавить
          </b-button>
          <b-button
            type="reset"
            variant="danger"
            size="md"
            class="float-right m-1"
          >
            Отменить
          </b-button>
        </div>
      </b-form>
    </b-modal>

  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        show: false,
        newMapObject: {
          id: '',
          name: '',
          description: '',
          lat: '',
          lon: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'INIT_ADD_NEW_OBJECT'
      ]),
      addNewObject() {
        this.INIT_ADD_NEW_OBJECT({
          id: this.newMapObject.id,
          name: this.newMapObject.name,
          description: this.newMapObject.description = 'Описание объекта',
          lat: Number(this.newMapObject.lat),
          lon: Number(this.newMapObject.lon),
        });
        this.resetFields()
        this.show = false;
      },
      resetFields() {
        this.newMapObject.id = ''
        this.newMapObject.name = ''
        this.newMapObject.description = ''
        this.newMapObject.lat = ''
        this.newMapObject.lon = ''
        this.show = false;
      }
    }
  }
</script>
