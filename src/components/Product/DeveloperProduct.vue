<template>
  <div>
    <div id="tap-circle" />
    <v-row>
      <v-col cols="12" md="6">
        <product-value :value="product.title" label="Product Title" />
        <product-value :value="product.handle" label="Product Handle" />
        <product-value :value="product.price" label="Product Price" />
        <product-value
          :value="product.launchDate"
          label="Product Launch Date"
        />
        <product-value
          :value="product.description"
          label="Product Description"
        />
        <product-value :value="product.width" label="Product Width" />
        <product-value :value="product.color" label="Product Color" />
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
                <td>
                  <span class="sizeValues" @click="copy(item.sku)">{{
                    item.sku
                  }}</span>
                </td>
                <td>
                  <span class="sizeValues" @click="copy(item.upc)">{{
                    item.upc
                  }}</span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ProductValue from "./ProductValue.vue";
export default {
  components: { ProductValue },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      snackText: null,
      snackbar: false
    };
  },
  methods: {
    copy(value) {
      this.snackText = "Value copied to clipboard";
      this.snackbar = true;
      navigator.clipboard.writeText(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.sizeValues {
  cursor: pointer;
}

.click-animation {
  animation: animation 0.3s forwards ease-in-out;
}

@keyframes animation {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}

#tap-circle {
  border: 1px solid #0069ff;
  position: relative;
  border-radius: 30px;
  width: 20px;
  height: 20px;
  opacity: 0;
}
</style>
