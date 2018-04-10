<template>
  <q-page padding>
    <!-- content -->
    <q-list>
      <q-collapsible group="somegroup" icon="explore" label="Server Informations" opened>
      </q-collapsible>
      <q-collapsible group="somegroup" icon="perm_identity" label="User Define">
        <div>
          Content
        </div>
      </q-collapsible>
      <q-collapsible group="somegroup" icon="shopping_cart" label="기타">
         <q-card>
          <q-card-main class="row gutter-xs">
            <div class="col">
              <q-table title="Table Title" :data="model_list" :columns="columns" row-key="name" selection="single" :selected.sync="selected_model">
      <template slot="top" slot-scope="props">
         <q-btn color="positive" flat round delete icon="refresh" @click="refreshModel" />
        <q-btn color="positive" flat round delete icon="save" @click="saveModel" />
        <div class="col" />
        <q-btn color="positive" flat round delete icon="add" @click="addModelEntry" />
        <q-btn color="negative" flat round delete icon="delete" @click="deleteModelEntry" />
      </template>
              </q-table>
            </div>
            <div class="col" v-if="model" >
              <form>
                <vue-form-generator :schema="schema" :model="model" :options="formOptions">
                </vue-form-generator>
              </form>
            </div>
          </q-card-main>
        </q-card>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
import cardTemplate from '../components/cardTemplate.vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
export default {
  // name: 'PageName',
  components: {
    cardTemplate,
    'vue-form-generator': VueFormGenerator.component
  },
  computed: {
    model: function () {
      return this.selected_model[this.table_select_idx]
    }
  },
  data () {
    return {
      table_select_idx: 0,
      selected_model: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'no',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'desc',
          required: true,
          label: 'email',
          align: 'left',
          field: 'email',
          sortable: true
        }
      ],
      model_list: [{
        id: 1,
        name: 'John Doe',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true
      },
      {
        id: 2,
        name: 'terry',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'gogoterry@gmail.com',
        status: true
      },
      {
        id: 3,
        name: 'terrry',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'gogoterry@gmail.com',
        status: true
      },
      {
        id: 4,
        name: 'ter11ry',
        password: 'J0hnD03!x4',
        skills: ['Javascript', 'VueJS'],
        email: 'gogoterry@gmail.com',
        status: true
      }
      ],
      schema: {
        groups: [
          {
            legend: 'User Details',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'ID (disabled text field)',
                model: 'id',
                readonly: true,
                disabled: true
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name',
                model: 'name',
                id: 'user_name',
                placeholder: 'Your name',
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string
              },
              {
                type: 'input',
                inputType: 'email',
                label: 'E-mail',
                model: 'email',
                placeholder: "User's e-mail address",
                validator: VueFormGenerator.validators.email
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Password',
                model: 'password',
                min: 9,
                required: true,
                hint: 'Minimum 6 characters',
                validator: VueFormGenerator.validators.string
              }
            ]
          },
          {
            legend: 'Skills & Status',
            fields: [
              {
                type: 'select',
                label: 'skills',
                model: 'type',
                values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
              },
              {
                type: 'checkbox',
                label: 'Status',
                model: 'status',
                default: true
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'user-'
      }
    }
  },
  methods: {
    refreshModel () {
      this.$q.notify({
        color: 'secondary',
        icon: 'refresh',
        message: `Will refresh the selected row${this.selected_model.length > 1 ? 's' : ''} later, ok?`
      })
    },
    saveModel () {
      this.$q.notify({
        color: 'secondary',
        icon: 'save',
        message: `Will save the selected row${this.selected_model.length > 1 ? 's' : ''} later, ok?`
      })
    },
    addModelEntry () {
      this.model_list.push({
        id: 4,
        name: '',
        password: '',
        skills: ['None'],
        email: 'plasee add this',
        status: true
      })
      this.$q.notify({
        color: 'secondary',
        icon: 'add',
        message: `Will add the selected row${this.selected_model.length > 1 ? 's' : ''} later, ok?`
      })
    },
    deleteModelEntry () {
      const index = this.model_list.indexOf(this.selected_model[0])
      if (index !== -1) {
        this.model_list.splice(index, 1)
        this.selected_model = []
      }
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selected_model.length > 1 ? 's' : ''} later, ok?`
      })
    },
    rowClick (row) {
      this.$q.notify({
        color: 'primary',
        icon: 'local_dining',
        message: `Hmm, are you sure? It has ${row.calories} calories.`,
        actions: [{
          label: 'Yes, eat!',
          handler: () => {
            this.$q.notify({ color: 'positive', icon: 'done', message: 'Yummy. Thanks! Now one more.' })
          }
        }]
      })
    }
  }
}
</script>

<style>

pre {
  overflow: auto;
}

pre .string {
  color: #885800;
}

pre .number {
  color: blue;
}

pre .boolean {
  color: magenta;
}

pre .null {
  color: red;
}

pre .key {
  color: green;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.field-checklist .wrapper {
  width: 100%;
}

</style>
