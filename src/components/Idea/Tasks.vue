<template>
  <div>
    <Heading title="TASKS" />
    <v-simple-table fixed-header class="cont">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left checked"></th>
            <th class="text-left pr-0">Task</th>
            <th class="text-left pr-0">Due Date</th>
            <th class="px-0">
              <v-icon @click="dialog = true">mdi-plus</v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tasks" :key="item.i">
            <td class="pr-0 checked">
              <v-icon
                @click="updateComplete(item, false)"
                color="green"
                v-if="item.complete"
              >
                mdi-check-circle-outline
              </v-icon>
              <v-icon @click="updateComplete(item, true)" v-else>
                mdi-checkbox-blank-circle-outline
              </v-icon>
            </td>
            <td>
              <v-text-field
                background-color="transparent"
                v-model="item.task"
                @blur="updateTask(item)"
                hide-details
                solo
                flat
              />
            </td>
            <td>{{ item.dueDate }}</td>
            <td class="px-0">
              <v-icon @click="startRemove(item)" color="error">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Task </v-card-title>

        <v-card-text>
          <v-text-field
            hide-details
            v-model="task.task"
            label="Task"
            outlined
          />
        </v-card-text>
        <v-card-text>
          <v-btn @click="deadline = !deadline"> Add Deadline </v-btn>
          <v-menu
            v-if="deadline"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker dense v-model="date" :show-current="today">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="addNew()"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="removeDialog" width="500">
      <v-card>
        <v-card-title> Remove Comment </v-card-title>

        <v-card-text> Are you sure you want to remove this task? </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="remove"> Remove </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ideasCollection } from "@/firebase/credentials";
import Heading from "../Page/Heading.vue";
// import moment from "moment";
export default {
  data() {
    return {
      tasks: [],
      menu: false,
      deadline: false,
      dialog: false,
      removeDialog: false,
      task: {
        task: ''
      },
      blank: {
        task: ''
      },
      date: null,
      // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
      today: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    updateComplete(item, value) {
      let task = item;
      task.complete = value;
      this.updateTask(task);
    },
    startRemove(item) {
      this.selected = item.id;
      this.removeDialog = true;
    },
    resetForm() {
      this.task = this.blank;
    },
    async remove() {
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("tasks")
          .doc(this.selected)
          .delete();
        this.removeDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    async updateTask(task) {
      let t = task;
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("tasks")
          .doc(task.id)
          .update(t);
      } catch (error) {
        console.log(error);
      }
    },
    async addNew() {
      try {
        this.task.complete = false;
        this.task.dueDate = this.date;
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("tasks")
          .add(this.task);
        this.resetForm();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    let subCollectionDocs = await ideasCollection
      .doc(this.$route.params.id)
      .collection("tasks");

    subCollectionDocs.onSnapshot((doc) => {
      doc.docChanges().forEach(async (p) => {
        if (p.type === "added") {
          let obj = p.doc.data();
          obj.id = p.doc.id;
          this.tasks.push(obj);
        } else if (p.type === "modified") {
          let id = p.doc.id;
          let index = this.tasks.map((obj) => obj.id).indexOf(id);
          this.tasks[index].task = p.doc.data().task;
        } else if (p.type === "removed") {
          let id = p.doc.id;
          let index = this.tasks.map((obj) => obj.id).indexOf(id);
          this.tasks.splice(index, 1);
          this.dialog = false;
        }
      });
    });
  },
  components: { Heading },
};
</script>

<style lang="scss" scoped>
.checked {
  width: 20px;
}
</style>
