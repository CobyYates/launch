<template>
  <div :key="$store.state.current">
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
            <v-text-field
              v-model="product.marketing_name"
              @blur="updateProduct"
              @focus="preValue(product.marketing_name, 'marketing_name')"
              :hide-details="true"
              label="Display Name"
              :class="inputStyle"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('marketing_name')">
                <pending-icon />
              </template>
            </v-text-field>
            <v-text-field
              v-model="product._id"
              label="Product Handle"
              @blur="updateProduct"
              @focus="preValue(product._id, '_id')"
              :hide-details="true"
              :class="inputStyle"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('_id')">
                <pending-icon />
              </template>
            </v-text-field>
            <div class="d-flex">
              <v-text-field
                class="mr-1"
                v-model="product.price"
                @blur="updateProduct"
                @focus="preValue(product.price, 'price')"
                :hide-details="true"
                :class="inputStyle"
                label="Price"
                prefix="$"
                outlined
                dense
              >
                <template #append-outer v-if="checkStatus('price')">
                  <pending-icon />
                </template>
              </v-text-field>
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                v-model="dateMenu"
                :nudge-right="40"
                min-width="auto"
                offset-y
                class="ml-1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="product.launchDate"
                    append-icon="mdi-calendar"
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
            </div>
            <v-text-field
              v-model="product.color"
              @blur="updateProduct"
              @focus="preValue(product.color, 'color')"
              :hide-details="true"
              :class="inputStyle"
              label="Color"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('color')">
                <pending-icon />
              </template>
            </v-text-field>
            <div class="d-flex flex-wrap">
              <div class="d-flex flex-column mr-4">
                <label>Width</label>
                <v-btn-toggle
                  class="mb-3"
                  color="primary"
                  background-color="transparent"
                  v-model="product.width"
                  mandatory
                >
                  <v-btn
                    :value="btn.text"
                    v-for="btn in widths"
                    @click="
                      product.width = btn.text;
                      updateProduct();
                    "
                    :key="btn.i"
                    class="width-btn"
                  >
                    <div :class="`width-btn__${btn.class}`" />
                    <div>{{ btn.text }}</div>
                  </v-btn>
                </v-btn-toggle>
              </div>
              <div class="d-flex flex-column">
                <label>Gender</label>
                <v-btn-toggle
                  class="mb-3"
                  color="primary"
                  background-color="transparent"
                  v-model="product.gender"
                  mandatory
                >
                  <v-btn
                    :value="btn.text"
                    v-for="btn in genders"
                    @click="
                      product.gender = btn.text;
                      updateProduct();
                    "
                    :key="btn.i"
                    class="width-btn"
                  >
                    <div :class="`width-btn__${btn.class}`" />
                    <div>{{ btn.text }}</div>
                  </v-btn>
                </v-btn-toggle>
              </div>
            </div>
            <div>
              <div class="d-flex">
                <label>Product Description</label>
                <pending-icon class="ml-3" v-if="checkStatus('description')" />
              </div>
              <tiptap-vuetify
                v-model="product.description"
                @blur="updateProduct"
                @focus="preValue(product.description, 'description')"
                class="rich mb-3"
                :card-props="{ height: '300', width: 'auto' }"
                :toolbar-attributes="{ color: 'gray' }"
                :extensions="extensions"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical />
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

        <p class="title">Meta Information</p>
        <v-row>
          <v-col>
            <v-combobox
              v-model="product.guided_quiz"
              @focus="preValue(product.guided_quiz, 'guided_quiz')"
              :items="guidedQuiz"
              label="Guide Quiz"
              multiple
              small-chips
              outlined
              :hide-details="true"
              :class="inputStyle"
              @blur="updateProduct"
            >
              <template #append-outer v-if="checkStatus('guided_quiz')">
                <pending-icon />
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].name"
              @blur="updateProduct"
              @focus="preValue(product.color[0].name)"
              :hide-details="true"
              :class="inputStyle"
              label="Name"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].finish"
              @blur="updateProduct"
              @focus="preValue(product.color[0].finish)"
              :hide-details="true"
              :class="inputStyle"
              label="Finish"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].description"
              @blur="updateProduct"
              @focus="preValue(product.color[0].description)"
              :hide-details="true"
              :class="inputStyle"
              label="Description"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].hue"
              @blur="updateProduct"
              @focus="preValue(product.color[0].hue)"
              :hide-details="true"
              :class="inputStyle"
              label="hue"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].swatchColor"
              @blur="updateProduct"
              @focus="preValue(product.color[0].swatchColor)"
              :hide-details="true"
              :class="inputStyle"
              label="Swatch Color"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="product.color[0].swatchImage"
              @blur="updateProduct"
              @focus="preValue(product.color[0].swatchImage)"
              :hide-details="true"
              :class="inputStyle"
              label="Swatch Image"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="pt-0">
            <v-text-field
              v-model="product.color[0].infused"
              @blur="updateProduct"
              @focus="preValue(product.color[0].infused)"
              :hide-details="true"
              :class="inputStyle"
              label="Infused"
              outlined
              dense
            >
              <template #append-outer v-if="checkStatus('Color')">
                <pending-icon />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <developer-product v-else :product="product" />
  </div>
</template>

<script>
import {
  productsCollection,
  notificationsCollection,
} from "@/firebase/credentials";
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
import { mapState } from "vuex";
import PendingIcon from "../components/Product/PendingIcon.vue";
export default {
  components: { TiptapVuetify, DeveloperProduct, PendingIcon },
  data() {
    return {
      admin: true,
      dateMenu: false,
      pre: null,
      product: {
        title: "",
        description: "",
        logo: "",
        width: "",
        color: [{}],
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
        { text: "Stackable" },
      ],
      genders: [{ text: "Male" }, { text: "Female" }, { text: "Both" }],
      guidedQuiz: [
        "just-for-fun",
        "for-working-out",
        "for-a-gift",
        "women",
        "men",
        "both",
        "fashionable",
        "warmer-tones",
        "cooler-tones",
        "neutral-tones",
        "jewel-tones",
        "pastels",
        "halo",
        "thin",
        "standard",
        "wide",
        "wedding-bands",
        "practical",
        "metallic",
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
    ...mapState(["notifications"]),
  },
  methods: {
    preValue(val, prodVal) {
      this.pre = {
        val,
        prodVal,
      };
    },
    checkStatus(label) {
      let notifications = this.notifications
        .filter((e) => e.productID == this.$route.params.id)
        .filter((e) => e.field == label);
      let icon = notifications.length > 0 ? "mdi-update" : "";
      return icon;
    },
    async updateProduct() {
      if (
        this.product[this.pre.prodVal] != this.pre.val &&
        this.notifications.label != this.pre.prodVal
      ) {
        let data = {
          launchID: this.product.launchID,
          productID: this.$route.params.id,
          field: this.pre.prodVal,
        };
        try {
          await notificationsCollection.add(data);
        } catch (error) {
          console.log(error);
        }
      }
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
