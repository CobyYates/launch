<template>
  <div class="pa-3">
    <v-row v-if="$store.state.posts.length > 0">
      <v-col>
        <v-row justify="center">
          <v-col cols="12">
            <div class="d-flex align-end justify-space-between mb-3">
              <Title title="Social Posts" />
              <v-btn color="primary" outlined @click="dialog = true">
                Add Post
              </v-btn>
            </div>
            <v-data-table
              :class="`elevation-${$store.state.elevation}`"
              no-data-text="No Post Ideas"
              :expanded.sync="expanded"
              :single-expand="true"
              :headers="postHeaders"
              :items="$store.state.posts"
              sort-by="posted"
              item-key="id"
              :key="temp"
              show-expand
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <h2 class="mt-3">Post Content</h2>
                  <div v-html="item.content" class="mb-5 mt-2" />
                </td>
              </template>

              <template v-slot:item.platform="{ item }">
                <div class="d-flex align-center">
                  <v-avatar
                    size="30"
                    tile
                    class="pa-"
                    v-if="item.platform == 'TikTok'"
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
                    v-else
                    :style="`color: ${iconColor(item.platform)};`"
                    size="30"
                  >
                    {{
                      `mdi-${item.platform ? item.platform.toLowerCase() : ""}`
                    }}
                  </v-icon>
                  <p class="mb-0 ml-3">{{ item.platform }}</p>
                </div>
              </template>

              <template v-slot:item.posted="{ item }">
                <v-checkbox v-model="item.posted" @change="postStatus(item)" />
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex">
                  <v-btn
                    @click="
                      removeDialog = true;
                      selected = item.id;
                    "
                    text
                  >
                    Delete
                  </v-btn>
                  <v-btn @click="edit(item)" text> Edit </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-else class="noData text-center">
      <Loading />
      <h2>You have no post ideas</h2>
      <p>{{ description }}</p>
      <v-btn @click="dialog = true" outlined color="primary" tile class="mt-3">
        Add One
      </v-btn>
    </div>
    <v-dialog v-model="removeDialog" width="500">
      <v-card>
        <v-card-title> Remove Post Idea </v-card-title>

        <v-card-text>
          Are you sure you want to remove this post idea?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="resetForm"> Cancel </v-btn>
          <v-btn color="primary" text @click="remove()"> Remove </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog @click:outside="resetForm" v-model="dialog">
      <v-card class="pa-8" height="auto" width="auto" light>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="post.title"
                label="Post Title"
                hide-details
                autofocus
                outlined
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :menu-props="{ bottom: true, offsetY: true }"
                v-model="post.platform"
                :items="socials"
                hide-details
                label="Social Platform"
                class="mb-4"
                outlined
              >
                <template v-slot:item="{ item }">
                  <span class="text-no-wrap d-flex align-center">
                    <v-avatar
                      size="30"
                      tile
                      class="pa-2"
                      v-if="item == 'TikTok'"
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
                      :style="`color: ${iconColor(item)};`"
                      v-else
                      size="30"
                    >
                      {{ `mdi-${item ? getIcon(item) : "post"}` }}
                    </v-icon>
                    <span class="ml-4">{{ item }}</span>
                  </span>
                </template>
              </v-select>
              <!-- <v-combobox
                v-model="post.tags"
                :items="post.items"
                small-chips
                clearable
                label="Post Tags"
                multiple
                outlined
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
                  >
                    <strong>{{ item }}</strong>
                  </v-chip>
                </template>
              </v-combobox> -->
            </v-col>
          </v-row>
          <tiptap-vuetify
            :card-props="{ height: '60vh' }"
            v-model="post.content"
            :extensions="extensions"
          />
          <div class="d-flex align-center justify-end mt-4">
            <v-btn text color="error" class="mr-3" @click="resetForm">
              Cancel
            </v-btn>
            <v-btn color="primary" @click="addPost" tile>
              {{ selected ? "Update Post Idea" : "Add Post Idea" }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ideasCollection, dropDownsCollection } from "@/firebase/credentials";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
import Title from "../components/Page/Heading.vue";
import Loading from "../components/Page/Loading.vue";
export default {
  components: { TiptapVuetify, Title, Loading },
  data() {
    return {
      dialog: false,
      description: `This page is for all the different posts you plan on making for you
       business idea. You can choose which social platform you plan on posting it on as 
       well as write the post beforehand and mark when you have posted it.`,
      removeDialog: false,
      expanded: [],
      socials: [],
      temp: 0,
      posts: [],
      blank: {
        title: "",
        platform: null,
        content: ``,
        posted: false,
        // tags: [],
        // items: [],
      },
      post: {
        title: "",
        platform: null,
        content: ``,
        posted: false,
        // tags: [],
        // items: [],
      },
      selected: null,
      postHeaders: [
        { text: "Posted", value: "posted", width: "88" },
        {
          text: "Post Title",
          align: "start",
          value: "title",
        },
        { text: "Platform", value: "platform" },
        { text: "", value: "actions", width: "88" },
        { text: "", value: "data-table-expand" },
      ],
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  methods: {
    removeTag(item) {
      this.post.tags.splice(this.post.tags.indexOf(item), 1);
      this.post.tags = [...this.post.tags];
    },
    resetForm() {
      // this.$refs.form.reset();
      // this.post = this.blank;
      this.post = this.blank;
      this.selected = null;
      this.dialog = false;
    },
    edit(item) {
      this.selected = item;
      this.post = item;
      this.dialog = true;
    },
    async postStatus(item) {
      try {
        let val = item;
        val.posted = item.posted;
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("posts")
          .doc(item.id)
          .update(val);
      } catch (error) {
        console.log(error);
      }
    },
    async remove() {
      try {
        await ideasCollection
          .doc(this.$route.params.id)
          .collection("posts")
          .doc(this.selected)
          .delete();
        this.selected = null;
        this.removeDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    getIcon(icon) {
      let result = `${icon.toLowerCase()}`;
      if (icon === "Blog") {
        result = "post-outline";
      }
      if (icon === "All") {
        result = "checkbox-multiple-blank-outline";
      }
      return result;
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
        case "Blog":
          result = "#60A8FA";
          break;
        default:
          result = "white";
          break;
      }
      return result;
    },
    async addPost() {
      let data = {};
      if (this.selected == null) {
        data = this.post;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("posts")
            .add(data);
          this.$refs.form.reset();
          this.selected = null;
          this.post = this.blank;
          this.dialog = false;
          this.temp++;
        } catch (error) {
          console.log(error);
        }
      } else {
        data = this.post;
        data.id = this.selected.id;
        try {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("posts")
            .doc(data.id)
            .update(data);
          this.$refs.form.reset();
          this.selected = null;
          this.post = this.blank;
          this.dialog = false;
          this.temp++;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  async created() {
    if (this.$store.state.posts.length < 1) {
      let subCollectionDocs = await ideasCollection
        .doc(this.$route.params.id)
        .collection("posts");

      subCollectionDocs.onSnapshot((doc) => {
        doc.docChanges().forEach(async (p) => {
          if (p.type === "added") {
            let obj = p.doc.data();
            obj.id = p.doc.id;
            this.$store.state.posts.push(obj);
          } else if (p.type === "modified") {
            let id = p.doc.id;
            let index = this.$store.state.posts
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.posts[index] = p.doc.data();
          } else if (p.type === "removed") {
            let id = p.doc.id;
            let index = this.$store.state.posts
              .map((obj) => obj.id)
              .indexOf(id);
            this.$store.state.posts.splice(index, 1);
          }
        });
      });
    }



    let social = await dropDownsCollection.doc("socials").get();
    this.socials = social.data().values.sort();
    this.socials.unshift("Blog");
    this.socials.unshift("All");
  },
  beforeCreate(){
    this.$store.state.idea = {
      title: 'test',
      to: `/dashboard/${this.$route.params.id}`
    }
    console.log(this.$store.state.idea)
  }
};
</script>

<style lang="scss" scoped></style>
