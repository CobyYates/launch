<template>
  <div>
    <v-switch v-model="admin" />
    <v-row v-if="$store.state.userProfile.role == 'admin' && admin">
      <v-col cols="12" md="6">
        <v-row>
          <!-- <v-avatar
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
          </v-avatar> -->
          <v-col>
            <v-form ref="form">
              <!-- <text-field
                name="title"
                :value="product.title"
                label="Display Name"
                @blur="test"
              /> -->
              <v-text-field
              v-model="product.title"
              @blur="updateProduct"
              :hide-details="true"
              label="Display Name"
              :class="inputStyle"
              outlined
              dense
            />
              <v-text-field
                v-model="product.handle"
                @blur="updateProduct"
                :hide-details="true"
                label="Product Handle"
                :class="inputStyle"
                outlined
                dense
                append-outer-icon="mdi-update"
              />
              <v-text-field
                v-model="product.price"
                @blur="updateProduct"
                :hide-details="true"
                :class="inputStyle"
                label="Price"
                prefix="$"
                outlined
                dense
              />
              <v-text-field
                v-model="product.color"
                @blur="updateProduct"
                :hide-details="true"
                :class="inputStyle"
                label="Color"
                outlined
                dense
              />
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                v-model="dateMenu"
                :nudge-right="40"
                min-width="auto"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="product.launchDate"
                    prepend-icon="mdi-calendar"
                    :class="inputStyle"
                    label="Launch Date"
                    v-bind="attrs"
                    hide-details
                    v-on="on"
                    readonly
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="product.launchDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
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
              <div>
                <label>Product Description</label>
                <tiptap-vuetify
                  v-model="product.description"
                  @blur="updateProduct"
                  class="rich"
                  :card-props="{ height: '300', width: 'auto' }"
                  :toolbar-attributes="{ color: 'gray' }"
                  :extensions="extensions"
                />
              </div>
            </v-form>
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
    <developer-product v-else :product="product" />
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
import DeveloperProduct from "../components/Product/DeveloperProduct.vue";
// import TextField from "../components/Page/TextField.vue";
export default {
  components: { TiptapVuetify, DeveloperProduct, /*TextField*/ },
  data() {
    return {
      admin: true,
      dateMenu: false,
      product: {
        title: "",
        description: "",
        logo: "",
        width: "",
        launchDate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
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
    test(val) {
      let value = document.querySelector('form')
      console.log(value)
      console.log("here", val, this.$refs.form.validate());
    },
  },
  async mounted() {
    let document = await productsCollection
      .doc(`${this.$route.params.id}`)
      .get();
    this.product = document.data();
  },
  beforeCreate() {
    this.$store.dispatch("loadNotifications", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ProseMirror {
  height: 200px;
}
</style>
