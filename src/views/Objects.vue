<template>
  <div class="objects">
    <b-container>
      <b-table
        small
        striped
        hover
        outlined
        :items="GET_MAP_OBJECTS"
        :fields="fields"
      >
        <template #cell(name)="row">
          <b-form-input :disabled="!row.item.isEditable" v-model="row.item.name"/>
        </template>
        <template #cell(description)="row">
          <b-form-input :disabled="!row.item.isEditable" v-model="row.item.description"/>
        </template>
        <template #cell(lat)="row">
          <b-form-input :disabled="!row.item.isEditable" type="number" v-model="row.item.lat"/>
        </template>
        <template #cell(lon)="row">
          <b-form-input :disabled="!row.item.isEditable" type="number" v-model="row.item.lon"/>
        </template>
        <template #cell(actions)="row">
          <b-dropdown variant="primary" text="Действия">
            <b-dropdown-item
              v-if="row.item.actions.edit === true"
              @click="editObject({
              id: row.item.id,
              editedObject: row.item,
              isEditable: row.item.isEditable
              })"
              :variant="`${!row.item.isEditable ? 'warning' : 'success'}`"
            >
              {{ !row.item.isEditable? 'Изменить' : 'Сохранить' }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="row.item.actions.delete === true"
              @click="deleteObject(row)"
              variant="danger"
            >
              Удалить
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <TableModal
      />
    </b-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import TableModal from "@/components/TableModal.vue";

  export default {
    components: {
      TableModal
    },
    data() {
      return {
        fields: [
          {
            key: 'id',
            sortable: true,
          },
          {
            key: 'name',
            sortable: true,
          },
          {
            key: 'description',
            sortable: true,
          },
          {
            key: 'lat',
            sortable: true,
          },
          {
            key: 'lon',
            sortable: true,
          },
          {
            key: 'actions',
            sortable: false,
          },
        ]
      }
    },
    computed: mapGetters([
      'GET_MAP_OBJECTS',
      'GET_TABLE_DATA'
    ]),
    methods: {
      ...mapActions([
        'INIT_DELETE_OBJECT_BY_ID',
        'INIT_EDIT_OBJECT_BY_ID',
      ]),

      deleteObject(row) {
        confirm(`Удалить объект ${row.item.name}?`)
        ? this.INIT_DELETE_OBJECT_BY_ID({ id: Number(row.item.id) })
        : null
      },

      editObject({ id, editedObject, isEditable }) {
        editedObject.id = Number(editedObject.id);
        editedObject.lon = Number(editedObject.lon);
        editedObject.lat = Number(editedObject.lat);
        if (isEditable) {
          editedObject.isEditable = false
          this.INIT_EDIT_OBJECT_BY_ID({ id, editedObject })
        } else {
          editedObject.isEditable = true
          this.INIT_EDIT_OBJECT_BY_ID({ id, editedObject })
        }
      },
    }
  }
</script>
