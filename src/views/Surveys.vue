<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="11" md="8" v-for="(q, i) in questions" :key="q.i">
        <!-- <v-card height="auto">
        <h2>{{ q.question }}</h2>
      </v-card> -->
        <v-card class="pa-10">
          <v-row>
            <v-col cols="8">
              <v-text-field outlined hide-details v-model="q.question" />
            </v-col>
            <v-col cols="4">
              <v-select
                outlined
                :menu-props="{ bottom: true, offsetY: true }"
                item-text="type"
                item-value="value"
                v-model="q.type"
                hide-details
                :items="questionType"
              >
                <template v-slot:item="{ item }">
                  <span class="text-no-wrap d-flex align-center">
                    <v-icon size="30">
                      {{ item.icon }}
                    </v-icon>
                    <span class="ml-4">{{ item.type }}</span>
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-if="q.type === 'shortAnswer'"
                label="Short answer"
                hide-details
                disabled
                outlined
                rows="5"
              />

              <v-radio-group
                class="pt-0"
                v-else-if="q.type === 'multipleChoice' || q.type == 'dropdown'"
                v-model="q.answer"
              >
                <div class="d-flex" v-for="n in q.answerValues" :key="n.i">
                  <v-radio :value="n.value" />
                  <v-text-field
                    background-color="transparent"
                    v-model="n.value"
                    placeholder="option"
                    class="mt-n2"
                    hide-details
                    dense
                    solo
                    flat
                  />
                </div>
              </v-radio-group>
              <div
                v-if="q.type === 'multipleChoice' || q.type == 'dropdown'"
                class="d-flex"
              >
                <v-btn text @click="addRadio(i)">
                  <v-icon left>mdi-plus</v-icon>
                  Add Option
                </v-btn>
              </div>

              <template v-else-if="q.type === 'check'">
                <div class="d-flex" v-for="n in q.answerValues" :key="n.i">
                  <v-checkbox hide-details class="my-0" :value="n.value" />
                  <v-text-field
                    background-color="transparent"
                    v-model="n.value"
                    placeholder="option"
                    class="mt-n1"
                    hide-details
                    dense
                    solo
                    flat
                  />
                </div>
              </template>
              <div v-if="q.type === 'check'" class="d-flex">
                <v-btn text @click="addRadio(i)">
                  <v-icon left>mdi-plus</v-icon>
                  Add Option
                </v-btn>
              </div>

              <div v-else-if="q.type === 'scale'">
                <v-row class="d-flex align-baseline">
                  <v-col cols="3">
                    <v-select
                      :menu-props="{ bottom: true, offsetY: true }"
                      v-model="q.scale.start.value"
                      :items="[0, 1]"
                      hide-details
                      outlined
                      dense
                    />
                  </v-col>
                  <p class="mx-10">To</p>
                  <v-col cols="3">
                    <v-select
                      :menu-props="{ bottom: true, offsetY: true }"
                      :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                      v-model="q.scale.end.value"
                      hide-details
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div class="d-flex align-baseline">
                      <p class="mr-3">{{ q.scale.start.value }}</p>
                      <v-text-field
                        v-model="q.scale.start.label"
                        placeholder="label"
                        hide-details
                        class="mb-5"
                        outlined
                        dense
                      />
                    </div>
                    <div class="d-flex align-baseline">
                      <p class="mr-3">{{ q.scale.end.value }}</p>
                      <v-text-field
                        v-model="q.scale.end.label"
                        placeholder="label"
                        hide-details
                        outlined
                        dense
                      />
                    </div>
                  </v-col>
                </v-row>
              </div>

              <v-row v-else-if="q.type === 'date'">
                <v-col cols="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        disabled
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row v-else-if="q.type === 'time'">
                <v-col cols="6">
                  <v-menu
                    ref="menu"
                    v-model="q.timeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="q.time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        disabled
                        label="Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="q.timeMenu"
                      v-model="q.time"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer />
            <v-btn icon>
              <v-icon right color="red" size="30">mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-icon @click="addQuestion">mdi-plus</v-icon>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="11" md="8" class="pb-0">
        <v-btn outlined color="primary" class="mb-10">Save Form</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { ideasCollection } from "@/firebase/credentials";
export default {
  data() {
    return {
      questions: [
        {
          question: "What is your favorite hobby?",
          type: "shortAnswer",
          answer: null,
          answerValues: [
            { label: "option 1", value: "1" },
            { label: "option 2", value: "2" },
          ],
          scale: {
            start: { value: 0, label: "" },
            end: { value: 5, label: "" },
          },
        },
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      questionType: [
        {
          type: "Short answer",
          value: "shortAnswer",
          icon: "mdi-playlist-edit",
        },
        {
          type: "Multiple choice",
          value: "multipleChoice",
          icon: "mdi-radiobox-marked",
        },
        { type: "Checkboxes", value: "check", icon: "mdi-checkbox-marked" },
        {
          type: "Dropdown",
          value: "dropdown",
          icon: "mdi-arrow-down-drop-circle",
        },
        { type: "Linear scale", value: "scale", icon: "mdi-dots-horizontal" },
        // {
        //   type: "Multiple choice grid",
        //   value: "multipleChoiceGrid",
        //   icon: "mdi-dots-grid",
        // },
        // { type: "Checkbox grid", value: "checkboxGrid", icon: "mdi-apps" },
        { type: "Date", value: "date", icon: "mdi-calendar" },
        { type: "Time", value: "time", icon: "mdi-clock" },
      ],
    };
  },
  methods: {
    addRadio(i) {
      let val = { label: "option 1", value: null };
      this.questions[i].answerValues.push(val);
    },
    addQuestion() {
      this.questions.push({
        question: "",
        type: "shortAnswer",
      });
    },
  },
  // async created () {
  //   try {

  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
};
</script>

<style lang="scss" scoped></style>
