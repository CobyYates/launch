<template>
  <div>
    <Heading title="POSSIBLE NAMES" />
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="d-flex justify-end align-center px-0 mr-2">
              <v-btn icon @click="blank">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
      </template>
    </v-simple-table>
    <v-simple-table fixed-header class="cont">
      <template v-slot:default>
        <tbody class="cont">
          <tr v-for="item in names" :key="item.id">
            <td>{{ item.name }}</td>
            <td class="px-0">
              <v-rating
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                color="yellow darken-3"
                v-model="item.rating"
                half-increments
                hover
                @input="updateRating(item)"
              />
            </td>
            <td class="px-0">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="edit(item)">
                    <v-list-item-title> Edit Name </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="remove(item)">
                    <v-list-item-title> Delete Name </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> Add Name </v-card-title>

        <v-card-text>
          <v-text-field
            @keypress.enter="addNew()"
            v-model="name"
            label="Name"
            outlined
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="addNew()"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ideasCollection } from "@/firebase/credentials";
import Heading from "../Page/Heading.vue";
export default {
  data() {
    return {
      names: [],
      name: "",
      selected: null,
      dialog: false,
    };
  },
  methods: {
    async addNew() {
      let result = {};
      if (this.selected == null) {
        result = {
          name: this.name,
          rating: 0,
        };
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("possibleNames")
            .add(result);
          this.dialog = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        result = {
          name: this.name,
          rating: this.selected.rating,
          id: this.selected.id,
        };
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("possibleNames")
            .doc(result.id)
            .update(result);
          this.dialog = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    edit(item) {
      this.name = item.name;
      this.selected = item;
      this.dialog = true;
    },
    updateRating(item) {
      this.name = item.name;
      this.selected = item;
      this.addNew();
    },
    async remove(item) {
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("possibleNames")
          .doc(item.id)
          .delete();
      } catch (error) {
        console.log(error);
      }
    },
    blank() {
      this.name = null;
      this.selected = null;
      this.dialog = true;
    },
  },
  async mounted() {
    let subCollectionDocs = await ideasCollection
      .doc(this.$route.params.id)
      .collection("possibleNames");

    subCollectionDocs.onSnapshot((doc) => {
      doc.docChanges().forEach(async (p) => {
        if (p.type === "added") {
          let obj = p.doc.data();
          obj.id = p.doc.id;
          this.names.push(obj);
        } else if (p.type === "modified") {
          let id = p.doc.id;
          let index = this.names.map((obj) => obj.id).indexOf(id);
          this.names[index].name = p.doc.data().name;
        } else if (p.type === "removed") {
          let id = p.doc.id;
          let index = this.names.map((obj) => obj.id).indexOf(id);
          this.names.splice(index, 1);
        }
      });
    });
  },
  components: { Heading },
};
</script>

<style lang="scss" scoped>
.cont {
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    scrollbar-width: thin;
    scrollbar-color: #fff #ccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
