<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-avatar
            class="mt-3 ml-3"
            :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
            tile
            height="124"
            width="124"
            :class="inputStyle"
          >
            <v-img v-if="product.logo" :src="product.logo" />
            <span v-else>
              <v-icon>mdi-image</v-icon>
              <p class="mb-0">Picture</p>
            </span>
          </v-avatar>
          <v-col>
            <v-text-field
              v-model="product.title"
              :hide-details="true"
              outlined
              dense
              label="Product Title"
              :class="inputStyle"
              @blur="updateProduct"
            />
            <v-text-field
              v-model="product.handle"
              :hide-details="true"
              outlined
              dense
              label="Product Handle"
              :class="inputStyle"
              @blur="updateProduct"
            />
            <v-btn-toggle
              class="mb-3"
              color="primary"
              v-model="product.width"
              mandatory
            >
              <v-btn
                :value="btn.text"
                v-for="btn in widths"
                :key="btn.i"
                class="width-btn"
              >
                <div :class="`width-btn__${btn.class}`" />
                <div>{{ btn.text }}</div>
              </v-btn>
            </v-btn-toggle>
            <tiptap-vuetify
              v-model="product.description"
              class="rich"
              :card-props="{ height: '467', width: 'auto' }"
              :toolbar-attributes="{ color: 'gray' }"
              :extensions="extensions"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Size</th>
                <th class="text-left">UPC</th>
                <th class="text-left">SKU</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in product.sizes" :key="item.name">
                <td>{{ item.size }}</td>
                <td>{{ item.sku }}</td>
                <td>{{ item.upc }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { productsCollection } from "@/firebase/credentials";
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
export default {
  components: { TiptapVuetify },
  data() {
    return {
      product: {
        title: "",
        description: "",
        logo: "",
        width: "",
      },
      widths: [
        { text: "Halo" },
        { text: "Thin" },
        { text: "Standard" },
        { text: "Wide" },
      ],
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
  computed: {
    inputStyle() {
      let result = "mb-3";
      return result;
    },
  },
  methods: {
    async updateProduct() {
      try {
        await productsCollection
          .doc(this.$route.params.id)
          .update(this.product);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    let document = await productsCollection
      .doc(`${this.$route.params.id}`)
      .get();
    this.product = document.data();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ProseMirror {
  height: 400px;
}
</style>
