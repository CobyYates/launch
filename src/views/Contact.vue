<template>
  <v-row
    justify="center"
    align="center"
    class="purpleBG white--text"
    :class="$vuetify.breakpoint.mdAndUp ? 'contact' : ' py-16'"
  >
    <v-col cols="11">
      <v-row
        :class="
          $vuetify.breakpoint.mdAndUp ? 'justify-center' : 'flex-column-reverse'
        "
      >
        <v-col cols="12" md="6">
          <v-form
            @submit.prevent="valid ? submit : validate"
            v-model="valid"
            ref="form"
          >
            <div
              class="d-flex"
              :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : ''"
            >
              <v-text-field
                :class="$vuetify.breakpoint.smAndDown ? '' : 'mr-2'"
                label="First Name *"
                :rules="firstRules"
                v-model="first"
                name="first"
                outlined
                dark
              />
              <v-text-field
                :class="$vuetify.breakpoint.smAndDown ? '' : 'ml-2'"
                label="Last Name *"
                :rules="lastRules"
                v-model="last"
                name="last"
                outlined
                rows="3"
                dark
              />
            </div>
            <v-text-field
              :rules="emailRules"
              v-model="email"
              label="Email *"
              name="email"
              outlined
              dark
            />
            <v-textarea
              :rules="messageRules"
              v-model="message"
              label="Message *"
              name="message"
              outlined
              dark
            />
            <v-btn
              @click="validate"
              type="submit"
              color="white"
              width="100%"
              outlined
              tile
            >
              Submit
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center">
          <div
            class="copy mx-auto"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center mb-10'"
          >
            <h1>{{ title }}</h1>
            <p class="title font-weight-light">{{ description }}</p>
            <div class="d-flex align-center justify-md-start justify-center">
              <v-icon size="40" @click="openDiscord" color="white"
                >mdi-discord</v-icon
              >
              <p class="mb-0 ml-3">Join our community!</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      first: "",
      last: "",
      email: "",
      message: "",
      firstRules: [(v) => !!v || "First name is required"],
      lastRules: [(v) => !!v || "Last name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      messageRules: [(v) => !!v || "Message is required"],
      title: "HELP US GROW",
      description: `Feel free to also join our Discord community
      if you have a great idea to improve our application.`,
    };
  },
  methods: {
    openDiscord() {
      window.open("https://www.google.com");
    },
    validate() {
      let result = this.$refs.form.validate();
      if (result) this.submit();
    },
    submit() {
      // let data = document.querySelector("form");
      // emailjs
      //   .sendForm(
      //     "service_beao3vp",
      //     "template_eifxvdf",
      //     data,
      //     "user_Wo4Fk37DCYaeDNB0sONDt"
      //   )
      //   .then(
      //     (result) => {
      //       if (result.status == 200)
      //         this.snackbarText = "Message Sent Successfully";
      //       this.snackbar = true;
      //     },
      //     (error) => {
      //       if (error) this.snackbarText = "Message Failed to Send";
      //       this.snackbar = true;
      //     }
      //   );
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  height: 100vh;
}

.copy {
  width: 50%;
  min-width: 300px;
}
</style>
