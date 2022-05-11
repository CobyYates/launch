<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="auto">
        <h2>COLOR PALETTE</h2>
      </v-col>
      <v-col>
        <v-row>
          <colors
            @update="update"
            title="PRIMARY COLORS"
            :colors="design.colors.primary"
          />
          <colors title="SECONDARY COLORS" :colors="design.colors.secondary" />
          <colors
            title="TEXT ( LABELS AND VALUES )"
            :colors="design.colors.text"
          />
          <colors
            title="INDICATION COLORS"
            :colors="design.colors.indication"
          />
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="auto">
        <h2>TYPOGRAPHY</h2>
      </v-col>
      <v-col>
        <v-row> </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <h2>BUTTONS</h2>
      </v-col>
      <v-col>
        <v-row> </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <h2>ICONOGRAPHY</h2>
      </v-col>
      <v-col>
        <v-row> </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <h2>MISC. ELEMENTS</h2>
      </v-col>
      <v-col>
        <v-row> </v-row>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import Colors from "../components/Idea/DesignGuide/Colors.vue";
import { ideasCollection } from "@/firebase/credentials";
export default {
  components: { Colors },
  data() {
    return {
      primary: "#fff",
      design: {
        colors: {
          primary: [
            { color: "#0D47A1", label: "Favorite", menu: false },
            { color: "#1565C0", label: "Secondary", menu: false },
          ],
          secondary: [
            { color: "#424242", label: "Favorite", menu: false },
            { color: "#616161", label: "Secondary", menu: false },
          ],
          text: [
            { color: "#212121", label: "Favorite", menu: false },
            { color: "#424242", label: "Secondary", menu: false },
            { color: "#616161", label: "Secondary", menu: false },
            { color: "#ffffff", label: "Secondary", menu: false },
          ],
          indication: [
            { color: "#1867c0", label: "Primary", menu: false },
            { color: "#4caf50", label: "Success", menu: false },
            { color: "#ff5252", label: "Error", menu: false },
          ],
        },
        fonts: [],
        buttons: [],
        iconography: [],
        elements: [],
      },
    };
  },
  methods: {
    async update() {
      console.log("update", this.design.id);
      try {
        if (this.design.id) {
          console.log(this.design)
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("design")
            .doc(this.design.id)
            .update(this.design);
        } else {
          await ideasCollection
            .doc(this.$route.params.id)
            .collection("design")
            .add(this.design);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    let subCollectionDocs = await ideasCollection
      .doc(this.$route.params.id)
      .collection("design");

    subCollectionDocs.onSnapshot((doc) => {
      doc.docChanges().forEach(async (p) => {
        if (p.type === "added") {
          let obj = p.doc.data();
          obj.id = p.doc.id;
          this.design = obj;
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped></style>
