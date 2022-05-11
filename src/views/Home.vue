<template>
  <div class="white">
    <v-row>
      <v-col>
        <v-row class="home-container px-16">
          <v-col
            class="d-flex flex-column"
            :class="
              $vuetify.breakpoint.mdAndUp
                ? 'align-start justify-center'
                : 'justify-end align-center mt-12'
            "
            cols="12"
            md="8"
          >
            <h1
              :class="
                $vuetify.breakpoint.mdAndUp ? 'large' : 'small text-center'
              "
            >
              <span>
                ORGANIZE YOUR <br />
                BUSINESS
                <span id="definition">IDEAS</span>
              </span>
            </h1>
            <v-btn
              class="mt-5"
              tile
              outlined
              color="white"
              elevation="3"
              x-large
              to="/login"
            >
              START IDEATING
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <div
              :class="$vuetify.breakpoint.mdAndUp ? 'bulb' : 'bulb-sm'"
              v-html="$store.state.lightSVG"
            />
          </v-col>
        </v-row>
        <v-card light width="80%" class="mx-auto mt-n16 mb-10 py-16" height="auto">
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="item in benefits"
              :key="item.i"
              class="text-center py-6"
            >
              <v-icon size="80" color="purple darken-2" class="mb-2">
                {{ item.icon }}
              </v-icon>
              <h4 class="display-1 my-5">{{ item.heading }}</h4>
              <p class="title font-weight-light mb-2" v-for="p in item.details" :key="p.i">
                {{ p }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <CopyImage class="white" />
    <Tooling />
  </div>
</template>

<script>
import Tooling from "../components/Page/Tooling.vue";
import CopyImage from "../components/Page/CopyImage.vue";
export default {
    name: "Home",
    data() {
        return {
            benefits: [
                {
                    heading: "IDEATION",
                    icon: "mdi-lightbulb-on-outline",
                    details: ["Idea names", "Idea comments", "Much more"],
                },
                {
                    heading: "ORGANIZATION",
                    icon: "mdi-sitemap-outline",
                    details: ["Store thoughts easily", "Idea management", "Task list"],
                },
                {
                    heading: "IDEATION",
                    icon: "mdi-pencil-outline",
                    details: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
                },
            ],
        };
    },
    components: { Tooling, CopyImage }
};
</script>

<style lang="scss" scoped>
.home-container {
  background: linear-gradient(
    128deg,
    rgba(106, 7, 204, 1) 0%,
    rgba(160, 112, 255, 1) 100%
  );
  height: 100vh;
}

#social {
  position: absolute;
  bottom: 40px;
  left: 40px;
}

h1 {
  line-height: 0.9;
  z-index: 1;
  color: #fff;
  text-shadow: 2px 3px #3f3f3f50;

  &.large {
    font-size: 7vw;
  }

  &.small {
    font-size: 10vw;
  }

  #definition {
    color: #000;
  }
}

.bulb {
  width: 60%;
  &-sm {
    width: 40%;
  }
}

#brain {
  width: 40vw;
  position: absolute;
  right: 40px;
  top: 25vh;
  z-index: 0;
  path {
    fill: #c5a8a8;
  }
}
</style>
