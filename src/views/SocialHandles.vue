<template>
  <div class="pa-3">
    <v-row v-if="$store.state.socialHandles.length > 0">
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
    <v-row v-if="$store.state.socialHandles.length > 0">
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="3"
        v-for="soc in this.$store.state.socialHandles"
        :key="soc.i"
      >
        <v-card class="fill-height">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn absolute right top icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list class="py-0">
              <v-list-item @click="edit(soc)">
                <v-list-item-title> Edit Handle</v-list-item-title>
              </v-list-item>
              <v-list-item @click="remove(soc)">
                <v-list-item-title> Delete Handle</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-card-text class="d-flex pb-0">
            <v-avatar
              size="60"
              tile
              class="pa-2"
              v-if="soc.platform == 'TikTok'"
            >
              <svg viewBox="0 0 31.276 36">
                <path
                  d="M18.8.03C20.76,0,22.71.015,24.66,0a9.343,9.343,0,0,0,2.625,6.255,10.578,10.578,0,0,0,6.36,2.685v6.045a16.055,16.055,0,0,1-6.3-1.455,18.533,18.533,0,0,1-2.43-1.4c-.015,4.38.015,8.76-.03,13.125a11.457,11.457,0,0,1-2.025,5.91A11.175,11.175,0,0,1,14,35.985a10.937,10.937,0,0,1-6.12-1.545A11.311,11.311,0,0,1,2.4,25.875c-.03-.75-.045-1.5-.015-2.235a11.292,11.292,0,0,1,13.1-10.02c.03,2.22-.06,4.44-.06,6.66a5.147,5.147,0,0,0-6.57,3.18,5.95,5.95,0,0,0-.21,2.415,5.105,5.105,0,0,0,5.25,4.305,5.039,5.039,0,0,0,4.155-2.415,3.461,3.461,0,0,0,.615-1.59c.15-2.685.09-5.355.1-8.04C18.78,12.09,18.75,6.06,18.8.03Z"
                  transform="translate(-2.369)"
                  :fill="$vuetify.theme.dark ? '#fff' : '#000'"
                />
              </svg>
            </v-avatar>

            <v-icon
              :style="`color: ${iconColor(soc.platform)};`"
              v-else
              size="60"
            >
              {{ `mdi-${soc.platform ? soc.platform.toLowerCase() : ""}` }}
            </v-icon>
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    Handle: {{ soc.handle }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ soc.platform }}
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
                    <a :href="soc.link" target="_blank">
                      {{ soc.link }}
                    </a>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Account: {{ soc.account }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <p>{{ soc.comment }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="noData text-center">
      <Loading />
      <h2>You have no social handles</h2>
      <p>{{ description }}</p>
      <v-btn @click="dialog = true" outlined color="primary" tile class="mt-3">
        Add One
      </v-btn>
    </div>

    <v-dialog @click:outside="resetForm" v-model="dialog" width="500">
      <v-card>
        <v-card-title> Social Handle </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addNew" ref="form">
            <v-select
              :menu-props="{ bottom: true, offsetY: true }"
              v-model="newHandle.platform"
              :items="socials"
              hide-details
              label="Social Platform"
              class="mb-4"
              outlined
            >
              <template v-slot:item="{ item }">
                <span class="text-no-wrap d-flex align-center">
                  <v-avatar size="30" tile class="pa-2" v-if="item == 'TikTok'">
                    <svg viewBox="0 0 31.276 36">
                      <path
                        d="M18.8.03C20.76,0,22.71.015,24.66,0a9.343,9.343,0,0,0,2.625,6.255,10.578,10.578,0,0,0,6.36,2.685v6.045a16.055,16.055,0,0,1-6.3-1.455,18.533,18.533,0,0,1-2.43-1.4c-.015,4.38.015,8.76-.03,13.125a11.457,11.457,0,0,1-2.025,5.91A11.175,11.175,0,0,1,14,35.985a10.937,10.937,0,0,1-6.12-1.545A11.311,11.311,0,0,1,2.4,25.875c-.03-.75-.045-1.5-.015-2.235a11.292,11.292,0,0,1,13.1-10.02c.03,2.22-.06,4.44-.06,6.66a5.147,5.147,0,0,0-6.57,3.18,5.95,5.95,0,0,0-.21,2.415,5.105,5.105,0,0,0,5.25,4.305,5.039,5.039,0,0,0,4.155-2.415,3.461,3.461,0,0,0,.615-1.59c.15-2.685.09-5.355.1-8.04C18.78,12.09,18.75,6.06,18.8.03Z"
                        transform="translate(-2.369)"
                        :fill="$vuetify.theme.dark ? '#fff' : '#000'"
                      />
                    </svg>
                  </v-avatar>

                  <v-icon
                    :style="`color: ${iconColor(item)};`"
                    v-else
                    size="30"
                  >
                    {{ `mdi-${item ? item.toLowerCase() : ""}` }}
                  </v-icon>
                  <span class="ml-4">{{ item }}</span>
                </span>
              </template>
            </v-select>
            <v-text-field
              v-model="newHandle.handle"
              placeholder="e.g. @idea"
              hide-details
              label="Handle"
              class="mb-4"
              outlined
            />
            <v-text-field
              v-model="newHandle.link"
              placeholder="e.g. https://facebook.com/idea"
              type="url"
              hide-details
              label="Link"
              class="mb-4"
              outlined
            />
            <v-text-field
              v-model="newHandle.account"
              placeholder="e.g. admin@gmail.com"
              hide-details
              label="Account"
              class="mb-4"
              outlined
            />
            <v-textarea
              v-model="newHandle.comment"
              label="Comments"
              hide-details
              class="mb-4"
              outlined
              rows="4"
            />
            <div class="d-flex justify-end">
              <v-btn
                v-if="selected"
                @click="resetForm()"
                color="red"
                text
                class="mr-3"
              >
                Cancel
              </v-btn>
              <v-btn type="submit">
                {{ selected ? "Update" : "Add" }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
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
      primary: "#fff",
      description: `Keep track of the handles ( ie. @businessIdeas ) for all of 
      your social media handles. You can also keep track of your username for that account.`,
      dialog: false,
      newHandle: {
        comment: null,
        handle: null,
        platform: null,
        link: null,
      },
      blank: {
        comment: null,
        handle: null,
        platform: null,
        link: null,
      },
      selected: null,
      socials: [],
      types: [],
      socialHandles: [],
    };
  },
  methods: {
    edit(item) {
      this.newHandle = item;
      this.selected = item;
      this.dialog = true;
    },
    iconColor(c) {
      let result;
      switch (c) {
        case "Facebook":
          result = "#016DE9";
          break;
        case "Instagram":
          result = "#8134AF";
          break;
        case "Twitter":
          result = "#1AA2F8";
          break;
        case "YouTube":
          result = "#FE0000";
          break;
        case "LinkedIn":
          result = "#0B66C3";
          break;
        case "Pinterest":
          result = "#BD081C";
          break;
        case "Snapchat":
          result = "#FFFF00";
          break;
        case "Reddit":
          result = "#FF4500";
          break;
        default:
          result = "white";
          break;
      }
      return result;
    },
    resetForm() {
      this.newHandle = this.blank;
      this.selected = null;
      this.dialog = false;
    },
    async addNew() {
      let data = {};
      if (this.selected == null) {
        data = this.newHandle;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("socialHandles")
            .add(data);
          this.resetForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        data = this.newHandle;
        data.id = this.selected.id;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("socialHandles")
            .doc(data.id)
            .update(data);
          this.resetForm();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async remove(item) {
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("socialHandles")
          .doc(item.id)
          .delete();
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    if (this.$store.state.socialHandles.length < 1) {
      let subCollectionDocs = await ideasCollection
        .doc(this.$route.params.id)
        .collection("socialHandles");
      subCollectionDocs.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            this.$store.state.socialHandles.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = this.$store.state.socialHandles
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.socialHandles[index] = p.doc.data();
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = this.$store.state.socialHandles
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.socialHandles.splice(index, 1);
          }
        });
      });
    }
    let social = await dropDownsCollection.doc("socials").get();
    this.socials = social.data().values.sort();
  },
  components: { Loading },
};
</script>

<style lang="scss" scoped></style>
