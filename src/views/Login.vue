<template>
  <section class="purpleBG login-page d-flex align-center justify-center">
    <v-card
      light
      class="pa-10"
      elevation="12"
      :width="$vuetify.breakpoint.smAndDown ? 400 : 400"
    >
      <v-row>
        <v-col id="firebaseui-auth-container" />
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            v-if="buttons"
            dark
            @click="emailForm"
            width="70%"
            tile
            color="indigo  darken2"
            class="mb-2"
          >
            <v-icon left>mdi-email</v-icon>
            Login with Email
          </v-btn>
          <v-btn dark @click="gmail" width="70%" tile color="red">
            <v-icon left>mdi-google</v-icon>
            Login with Google
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
import { auth, provider } from "../firebase/credentials";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
export default {
  data() {
    return {
      passwordRules: [(v) => !!v || "password is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      email: "",
      password: "",
      valid: false,
      buttons: true,
    };
  },
  methods: {
    gmail() {
      auth.signInWithPopup(provider).then((result) => {
        let form = result.user.providerData[0];
        let user = {
          displayName: form.displayName,
          email: form.email,
          photoURL: form.photoURL,
          providerId: form.providerId,
          uid: result.user.uid,
        };
        let isNewUser = result.additionalUserInfo.isNewUser;
        if (isNewUser) {
          this.$store.dispatch("register", user);
        } else {
          //get the user account
          this.$store.dispatch("login", user);
        }
      });
    },
    emailForm() {
      this.buttons = false;
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: async (result) => {
            let form = result.user.providerData[0];
            let user = {
              displayName: form.displayName,
              email: form.email,
              photoURL: form.photoURL,
              providerId: form.providerId,
              uid: result.user.uid,
            };
            let isNewUser = result.additionalUserInfo.isNewUser;
            if (isNewUser) {
              this.$store.dispatch("register", user);
            } else {
              //get the user account
              this.$store.dispatch("login", user);
            }
          },
        },
        // signInSuccessUrl: "/dashboard",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
    validate() {
      let result = this.$refs.form.validate();
      if (result) this.submit();
    },
    submit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  mounted() {
    this.emailForm();
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
}

::v-deep .mdl-shadow--2dp {
  box-shadow: none;
}
</style>
