<template>
  <div class="timeline-container">
    <Head title="COMMENTS" />
    <v-icon class="add" @click="addDialog = true">mdi-plus</v-icon>
    <div class="cont" :key="cards">
      <v-slide-x-transition group>
        <v-card
          width="100%"
          v-for="comment in comments"
          :key="comment.id"
          height="auto"
          class="mb-2"
        >
          <v-card-text
            class="comment body-1"
            cols="9"
           
            v-html="comment.text"
          />
          <v-card-actions class="d-flex justify-end">
            <p class="mb-0 body-2 mr-2">{{ comment.time }}</p>
            <v-icon class="mx-2" @click="edit(comment)">
              mdi-pencil
            </v-icon>
            <v-icon
              @click="
                removeSelected = comment;
                dialog = true;
              "
              color="error"
            >
              mdi-delete
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-slide-x-transition>
    </div>

    <v-dialog v-model="addDialog" width="600">
      <v-card height="600">
        <v-card-title class="text-h5"> Comment </v-card-title>
        <v-card-text>
          <tiptap-vuetify
            class="rich"
            :card-props="{ height: '467', width: 'auto' }"
            :toolbar-attributes="{ color: 'gray' }"
            v-model="blank"
            :extensions="extensions"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="addDialog = false"> Cancel </v-btn>
          <v-btn
            color="primary"
            text
            @click="addComment"
            :disabled="blank == ''"
          >
            {{ selected != null ? "Update" : "Add" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title> Remove Comment </v-card-title>

        <v-card-text>
          Are you sure you want to remove this comment?
        </v-card-text>

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
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
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
import Head from "../Page/Heading.vue";
export default {
  components: { TiptapVuetify, Head },
  data() {
    return {
      comments: [],
      cards: 0,
      sortedComments: [],
      blank: null,
      selected: null,
      removeSelected: null,
      addDialog: false,
      dialog: false,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2],
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
    addComment() {
      const today = new Date();
      const yy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      let h = today.getHours();
      let min = today.getMinutes();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const val = `${mm}/${dd}/${yy.toString().slice(2)} ${h}:${min}`;
      let comment = {
        text: this.blank,
        time: val,
      };
      if (this.selected != null) {
        ideasCollection
          .doc(this.$route.params.id)
          .collection("comments")
          .doc(this.selected.id)
          .update(comment);
      } else {
        ideasCollection
          .doc(this.$route.params.id)
          .collection("comments")
          .add(comment);
      }
      this.blank = null;
      this.addDialog = false;
    },
    edit(comment) {
      this.addDialog = true;
      this.selected = comment;
      this.blank = comment.text;
    },
    clear() {
      this.selected = null;
    },
    remove() {
      let ideaID = this.$route.params.id;
      ideasCollection
        .doc(ideaID)
        .collection("comments")
        .doc(this.removeSelected.id)
        .delete();
    },
  },
  created() {
    let coms = ideasCollection
      .doc(this.$route.params.id)
      .collection("comments");
    coms.onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          this.comments.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        } else if (change.type === "modified") {
          let id = change.doc.id;
          let index = this.comments.map((obj) => obj.id).indexOf(id);
          this.comments[index].text = change.doc.data().text;
        } else if (change.type === "removed") {
          let id = change.doc.id;
          let index = this.comments.map((obj) => obj.id).indexOf(id);
          this.comments.splice(index, 1);
          this.dialog = false;
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.comment {
  cursor: pointer;
}

.rich {
  width: 100%;
}

.timeline-container {
  position: relative;
  .add {
    position: absolute;
    top: 0px;
    right: 5px;
  }
}
  ::v-deep .ProseMirror {
    height: 400px;
  }
</style>
