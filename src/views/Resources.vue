<template>
  <div class="pa-3">
    <v-row v-if="$store.state.resources.length > 0">
      <v-col>
        <v-btn
          class="mb-3"
          @click="dialog = true"
          outlined
          color="primary"
          tile
        >
          Add Another
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="$store.state.resources.length > 0">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        v-for="item in $store.state.resources"
        :key="item.i"
      >
        <v-card class="fill-height">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="dots"
                absolute
                right
                top
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="edit(item)">
                <v-list-item-title> Edit Resource </v-list-item-title>
              </v-list-item>
              <v-list-item @click="remove(item)">
                <v-list-item-title> Delete Resource </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-card-text class="pb-0">
            <v-list>
              <v-list-item two-line class="pl-0">
                <v-list-item-content>
                  <v-list-item-title> Name: {{ item.name }} </v-list-item-title>
                  <v-list-item-subtitle class="mt-1">
                    <v-chip v-if="item.type" label color="primary">
                      {{ item.type }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-text class="py-0">
            <v-list class="pt-0">
              <v-list-item two-line class="pl-0">
                <v-list-item-content>
                  <v-list-item-title>
                    Link:
                    <a :href="item.link" target="_blank">
                      {{ item.link }}
                    </a>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Account: {{ item.account }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <p>{{ item.comment }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="noData text-center">
      <Loading />
      <h2>You have no links or resources</h2>
      <p>{{ description }}</p>
      <v-btn @click="dialog = true" outlined color="primary" tile class="mt-3">
        Add One
      </v-btn>
    </div>
    <v-dialog @click:outside="resetForm" v-model="dialog" width="500">
      <v-card>
        <v-card-title> Resource or Idea </v-card-title>

        <v-form @submit.prevent="addNew" ref="form">
          <v-card-text>
            <v-text-field
              v-model="newItem.name"
              placeholder="e.g. A competitor"
              hide-details
              label="Name"
              class="mb-4"
              outlined
            />
            <v-select
              :menu-props="{ bottom: true, offsetY: true }"
              v-model="newItem.type"
              :items="types"
              hide-details
              label="Type"
              class="mb-4"
              outlined
            />
            <v-text-field
              v-model="newItem.link"
              placeholder="https://resource.com"
              hide-details
              label="Link"
              class="mb-4"
              outlined
            />
            <v-text-field
              v-model="newItem.account"
              placeholder="e.g. admin@gmail.com"
              hide-details
              label="Account"
              class="mb-4"
              outlined
            />
            <v-textarea
              v-model="newItem.comment"
              label="Comments"
              hide-details
              class="mb-4"
              outlined
              rows="4"
            />
            <v-btn @click="addNew" outlined color="primary" tile> Add </v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ideasCollection, dropDownsCollection } from "@/firebase/credentials";
import Loading from "../components/Page/Loading.vue";
export default {
  data() {
    return {
      dialog: false,
      description: `Resources are helpful links, websites, competitors or any
       other link that helps you build your business idea. Whenever you come 
       accross something that helps you develop your idea, this is where to 
       put it.`,
      newItem: {
        account: null,
        comment: null,
        name: null,
        type: null,
        link: null,
      },
      blank: {
        account: null,
        comment: null,
        name: null,
        type: null,
        link: null,
      },
      selected: null,
      types: [],
      resources: [],
    };
  },
  methods: {
    edit(item) {
      this.newItem = item;
      this.selected = item;
      this.dialog = true;
    },
    resetForm() {
      this.newItem = this.blank;
      this.selected = null;
    },
    async addNew() {
      let data = {};
      if (this.selected == null) {
        data = this.newItem;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("resources")
            .add(data);
          this.newItem = this.blank;
          this.dialog = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        data = this.newItem;
        data.id = this.selected.id;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("resources")
            .doc(data.id)
            .update(data);
          this.newItem = this.blank;
          this.dialog = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async remove(item) {
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("resources")
          .doc(item.id)
          .delete();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    if (this.$store.state.resources.length < 1) {
      let subCollectionDocs = await ideasCollection
        .doc(this.$route.params.id)
        .collection("resources");
      subCollectionDocs.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            this.$store.state.resources.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = this.$store.state.resources
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.resources[index] = p.doc.data();
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = this.$store.state.resources
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.resources.splice(index, 1);
          }
        });
      });
    }
    let types = await dropDownsCollection.doc("resourceTypes").get();
    this.types = types.data().values;
  },
  components: { Loading },
};
</script>

<style lang="scss" scoped></style>
