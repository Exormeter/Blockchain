<template ref="foo">
  <v-app class="grey lighten-3">
    <v-content>
      <v-container>
        <v-layout
          text-xs-center
          wrap
        >
          <v-flex xs12 sm6>
            <h1 class="display-2 font-weight-bold mb-3">
              EtherFund
            </h1>
            <p class="subheading font-weight-regular">
              Crowdfunding-Plattform auf Basis der Ethereum-Blockchain
            </p>
          </v-flex>
          <v-flex xs12 sm6>
			<v-btn slot="activator" color="primary" dark  @click.stop="startProjectDialog = true">Projekt starten</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-dialog v-model="startProjectDialog" max-width="600px" persistent>

            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">Projekt erstellen</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-container class="pt-0" grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Titel"
                        persistent-hint
                        v-model="newObject.title">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Beschreibung"
                        persistent-hint
                        v-model="newObject.description">
                      </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Projektziel (ETH)"
                        type="number"
                        step="0.0001"
                        min="0"
                        v-model="newObject.amountGoal">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-subheader>
                        Funding-Laufzeit Ende
                      </v-subheader>
                      <v-menu
                        ref="dateMenu1"
                        v-model="dateMenu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="fundingDateFormatted"
                            label="Date"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="fundingDateEnd = parseDate(fundingDateFormatted)"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="fundingDateEnd" no-title @input="dateMenu1 = false"></v-date-picker>
                      </v-menu>
                      <v-menu
                        ref="timeMenu1"
                        v-model="timeMenu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time1"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time1"
                            label="Picker in timeMenu1"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="timeMenu1"
                          v-model="time1"
                          full-width
                          format="24hr"
                          @click:minute="$refs.timeMenu1.save(time1)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-subheader>
                        Projekt-Laufzeit Ende
                      </v-subheader>
                      <v-menu
                        ref="dateMenu2"
                        v-model="dateMenu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="projectDateFormatted"
                            label="Date"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="projectDateEnd = parseDate(projectDateFormatted)"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="projectDateEnd" no-title @input="dateMenu2 = false"></v-date-picker>
                      </v-menu>
                      <v-menu
                        ref="timeMenu2"
                        v-model="timeMenu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time2"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time2"
                            label="Picker in timeMenu2"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="timeMenu2"
                          v-model="time2"
                          full-width
                          format="24hr"
                          @click:minute="$refs.timeMenu2.save(time2)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="startProjectDialog = false;
                  newObject.isLoading = false;">
                  Schließen
                </v-btn>
                <v-btn color="blue darken-1"
                  flat
                  @click="startProject"
                  :loading="newObject.isLoading">
                  Speichern
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <v-layout row justify-center>
          <v-dialog v-model="addBackingOptionDialog" max-width="600px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">Backing-Option hinzufügen</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-container class="pt-0" grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Titel"
                        persistent-hint
                        v-model="newObject.title">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Beschreibung"
                        persistent-hint
                        v-model="newObject.description">
                      </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Preis (in ETH)"
                        type="number"
                        step="0.0001"
                        min="0"
                        v-model="newObject.price">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Verfügbare Menge"
                        type="number"
                        v-model="newObject.amount">
                      </v-text-field>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="addBackingOptionDialog = false;
                  newObject.isLoading = false;">
                  Schließen
                </v-btn>
                <v-btn color="blue darken-1"
                  flat
                  @click="addBackingOption(activeIndex)"
                  :loading="newObject.isLoading">
                  Speichern
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <v-layout row justify-center>
          <v-dialog v-model="viewBackingOptionsDialog" max-width="600px" persistent>

            <v-card>
              <v-card-title class="headline" primary-title>
                <span>Verfügbare Backing-Optionen</span>
              </v-card-title>
              <v-card-text class="pt-0" v-for="(option, index) in currentOptions" :key="index">
                <v-divider></v-divider>
                <div>
                  <div class="headline">{{ option[0] }}</div>
                  <div>{{ option[1] }}</div>
                  <div><b>Kosten: </b> <span>{{ option[2] / 10**18 }} ETH (${{(exchangeRate * option[2] / 10**18).toFixed(2) }})</span></div>
                  <div><b>Verfügbare Anzahl: </b> <span>{{ option[3] }}</span></div>
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="addInvestor(activeIndex, index, option[2])"
                    :disabled="option[3] == 0 || isStarter() || getProjectState() == 0 || isInvestor()"
                    :loading="newObject.isLoading"
                  >
                  Wählen
                  </v-btn>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="viewBackingOptionsDialog = false;
                  newObject.isLoading = false;">
                  Schließen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <v-layout row justify-center>
          <v-dialog v-model="viewRequestDialog" max-width="600px" persistent>
            <v-card>
              <v-card-title primary-title>
                <span  class="headline">Aktuelle Anfrage -</span>
                <span class="remainingFunds">Noch verfügbare ETH: {{ remainingFunds / 10**18 }} ETH</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-divider></v-divider>
                <div>
                  <div class="headline">{{ currentRequest.requestTitle }}</div>
                  <div>{{ currentRequest.requestDescription }}</div>
                  <div><b>Kosten: </b><span>{{ currentRequest.amount / 10**18 }} ETH (${{(exchangeRate * currentRequest.amount / 10**18).toFixed(2)}})</span></div>
                  <div><b>Laufzeit bis: </b><span>{{ new Date(parseInt(currentRequest.valideUntil)*1000) }}</span></div>
                  <div><b>Anzahl Stimmen: </b><span class="blue--text"> {{currentRequest.numberAcceptedVotes}} </span> | <span class="red--text"> {{currentRequest.numberRejectedVotes}} </span></div>
                  <v-btn
                    v-if="!isStarter() && isInvestor()"
                    color="blue darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, true)"
                    :disabled="currentRequest.voteStatus != 2"
                  >
                  Akzeptieren
                  </v-btn>
                  <v-btn
                    v-if="!isStarter() && isInvestor()"
                    color="red darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, false)"
                    :disabled="currentRequest.voteStatus != 2"
                  >
                  Ablehnen
                  </v-btn>
                  <v-btn
                    v-if="isStarter() && isRequestFinished(parseInt(currentRequest.valideUntil)*1000)"
                    color="blue darken-1"
                    flat
                    @click="requestPayout(activeIndex)"
                  >
                  Auszahlen
                  </v-btn>
                  <v-btn
                    v-if="!isStarter() && isProjectFinished() && !checkRefundStatus()"
                    color="blue darken-1"
                    flat
                    @click="requestRefundRemainingFunds(activeIndex)"
                  >
                  Partiell
                  </v-btn>
                  <!--<v-btn
                    v-if="!isStarter() && getProjectState() == 4 && !checkRefundStatus(activeIndex)"
                    color="blue darken-1"
                    flat
                    @click="requestPayback(activeIndex)"
                  >
                  Refund
                  </v-btn>-->
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="viewRequestDialog = false;
                  newObject.isLoading = false;">
                  Schließen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>


        <v-layout row justify-center>
          <v-dialog v-model="addRequestDialog" max-width="600px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">Auszahlungs-Anfrage erstellen</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-container class="pt-0" grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Titel"
                        persistent-hint
                        v-model="newObject.title">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Beschreibung"
                        persistent-hint
                        v-model="newObject.description">
                      </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Benötigte Menge"
                        type="number"
                        v-model="newObject.amount">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-subheader>
                        Request-Laufzeit Ende
                      </v-subheader>
                      <v-menu
                        ref="dateMenu3"
                        v-model="dateMenu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="requestDateFormatted"
                            label="Date"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="requestDateEnd = parseDate(requestDateFormatted)"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="requestDateEnd" no-title @input="dateMenu3 = false"></v-date-picker>
                      </v-menu>
                      <v-menu
                        ref="timeMenu3"
                        v-model="timeMenu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time3"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time3"
                            label="Picker in timeMenu3"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="timeMenu3"
                          v-model="time3"
                          full-width
                          format="24hr"
                          @click:minute="$refs.timeMenu3.save(time3)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="addRequestDialog = false;
                  newObject.isLoading = false;">
                  Schließen
                </v-btn>
                <v-btn color="blue darken-1"
                  flat
                  @click="addRequest(activeIndex)"
                  :loading="newObject.isLoading">
                  Speichern
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

      </v-container>

      <v-container
        grid-list-lg
      >
        <h1 class="display-1 font-weight-bold mb-3">
          Projekte
        </h1>
        <div class="search-wrapper">
          <input type="text" v-model="search" placeholder="Search title.."/>
          <label>Search title:</label>
        </div>
        <v-radio-group v-model="filterValue" row>
          <v-radio
            :key="0"
            :label="`All`"
            :value="0"
            @change="getProjects()"
          ></v-radio>
          <v-radio
            :key="1"
            :label="`Backed`"
            :value="1"
            @change="getProjectCountForInvestor()"
          ></v-radio>
          <v-radio
            :key="2"
            :label="`Owned`"
            :value="2"
            @change="getProjectCountForFounder()"
          ></v-radio>
        </v-radio-group>
        <v-layout row wrap>
          <v-flex v-for="(project, index) in filteredProjects" :key="index" xs12 sm6 md4>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 2}`"
              >
                <v-card-title primary-title>
                  <div>
                    <div class="headline font-weight-bold">
                      <v-chip
                        label
                        :color="stateMap[project.currentState].color"
                        text-color="white" class="mt-0">
                      {{ stateMap[project.currentState].text }}
                      </v-chip>
                      {{ project.projectTitle }}
                    </div>
                    <span
                      v-if="project.projectStarter == account" class="green--text">
                        Projektgründer
                    </span>
                    <br/>
                    <span>{{ project.projectDesc }}</span>
                    <br/><br/>
                    <small>Funding-Laufzeit bis: <b>{{ new Date(project.fundingDeadline).toLocaleString() }}</b></small>
                    <br/>
                    <small>Projekt-Laufzeit bis: <b>{{ new Date(project.projectDeadline).toLocaleString() }}</b></small>
                    <br/><br/>
                    <small>Anzahl Investoren: <b>{{ project.investorCount }}</b></small>
                    </div>
                </v-card-title>

                <v-flex
                  v-if="project.currentState == 1 || project.currentState == 0 || project.currentState == 2"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="getBackingOptions(project.index); activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                  View
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 3 "
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="getCurrentRequest(project.index); activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                  Show Request
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 3 && account == project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="addRequestDialog = true; activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                    Add Request
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 && account == project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="addBackingOptionDialog = true; activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                    Add Option
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 && account == project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="closeAddingBackingOptionPeriode(project.index); activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                  Close
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 4 && !checkRefundStatus(project.index)"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="requestPayback(project.index); activeIndex = project.index;"
                    :loading="project.isLoading"
                  >
                  Refund
                  </v-btn>
                </v-flex>


                <v-card-actions class="text-xs-center">
                  <span class="font-weight-bold" style="width: 200px;">
                    {{ project.peekBalance / 10**18 }} ETH
                  </span>
                  <v-progress-linear
                    height="10"
                    :color="stateMap[project.currentState].color"
                    :value="(project.peekBalance / project.goalAmount) * 100"
                  ></v-progress-linear>
                  <span class="font-weight-bold" style="width: 200px;">
                    {{ project.goalAmount / 10**18 }} ETH
                  </span>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// We import our the scripts for the smart contract instantiation, and web3
import projectHub from '../contracts/projectHub';
import project from '../contracts/project';
import web3 from '../contracts/web3';
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      search: '',
      filterValue: 0,
      exchangeRate: 0,

      account: null,
      projectData: [],
      stateMap: [
        { color: 'blue-grey lighten-3', text: "Initialisierung"},
        { color: 'primary', text: 'Laufend' },
        { color: 'green', text: "Ziel erreicht"},
        { color: 'success  lighten-3', text: 'Abgeschlossen' },
        { color: 'warning  lighten-3', text: 'Abgelaufen' },
      ],

      /*Dialogs*/ 
      startProjectDialog: false,
      addBackingOptionDialog: false,
      addRequestDialog: false,
      viewBackingOptionsDialog: false,
      viewRequestDialog: false,

      
      /*Dialog-Helpers*/
      activeIndex: null,      
      remainingFunds: 0,     
      newObject: { isLoading: false },
      currentOptions: [],
      currentRequest: {},
      isProjectInvestor : false,
      
      /* Date-/TimePicker */
      fundingDateEnd: new Date().toISOString().substr(0, 10),
      projectDateEnd: new Date().toISOString().substr(0, 10),
      requestDateEnd: new Date().toISOString().substr(0, 10),
      fundingDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      projectDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      requestDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      dateMenu1: false,
      dateMenu2: false,
      dateMenu3: false,
      timeMenu1: false,
      timeMenu2: false,
      timeMenu3: false,
      time1 : null,
      time2 : null,
      time3 : null
    };
  },
  mounted() {
    // this code snippet takes the account (wallet) that is currently active
    web3.eth.getAccounts().then((accounts) => {
      [this.account] = accounts;
      this.currentConversionRate();
      this.getProjects();
    });
  },
  methods: {
    getProjects() {
      this.projectData = [];
      projectHub.methods.getProjectCount().call().then((projectCount) => {
        for (var i = 0; i < projectCount; i++){
          this.getProject(i);
        }
	    });
    },
    getProject(projectIndex) {
      projectHub.methods.getProjects(projectIndex).call().then(async (projectData) => {
        const projectInfo = {}
        projectInfo.projectTitle = projectData.projectName;
        projectInfo.projectDesc = projectData.projectDescription;
        projectInfo.projectStarter = projectData.owner;
        projectInfo.fundingDeadline = new Date(parseInt(projectData.fundigCloseDate)*1000);
        projectInfo.projectDeadline = new Date(parseInt(projectData.projectClosingDate)*1000);
        projectInfo.goalAmount = projectData.goal;
        projectInfo.currentAmount = 0;
        projectInfo.peekBalance = 0;
        projectInfo.isLoading = false;
        projectInfo.contract = projectData.projectAdress;
        projectInfo.index = projectIndex;
        this.getBalance(projectInfo, projectData.projectAdress);
      });
    },
    async getBalance(projectInfo, contract) {
      try {
        var balance = await web3.eth.getBalance(contract);
        projectInfo.currentAmount = balance;
        this.getPeekBalance(projectInfo, contract);
      } catch (err) {
        projectInfo.currentAmount = 0;
        this.getPeekBalance(projectInfo, contract);
      }
    },
    getPeekBalance(projectInfo, contract) {
      const projectInst = project(contract);
      projectInst.methods.getPeekBalance().call().then((peekBalance) => {
        projectInfo.peekBalance = peekBalance;
        this.getInvestorCount(projectInfo, contract);
      });
    },
    startProject() {
      this.newObject.isLoading = true;

      var fundingDate = new Date(this.fundingDateEnd);
      var fundingTime = this.time1.split(":");
      fundingDate.setHours(fundingTime[0], fundingTime[1]);

      var goalDate = new Date(this.projectDateEnd);
      var goalTime = this.time2.split(":");
      goalDate.setHours(goalTime[0], goalTime[1]);


      projectHub.methods.addNewProject(
        this.newObject.title,
        this.newObject.description,
        web3.utils.toWei(this.newObject.amountGoal, 'ether'),
        (fundingDate.getTime()/1000).toFixed(0),
        (goalDate.getTime()/1000).toFixed(0)
      ).send({
        from: this.account
        }).then((isCreated) => {
        this.startProjectDialog = false;
        this.newObject = { isLoading: false };
        this.getProjects();
      });

    },
    addBackingOption(index) {
      this.newObject.isLoading = true;
      const projectInst = project(this.projectData[index].contract);
      projectInst.methods.addBackingOption(
        this.newObject.title,
        this.newObject.description,
        web3.utils.toWei(this.newObject.price, 'ether'),
        this.newObject.amount
      ).send({
        from: this.account,
      }).then((data) => {
        this.newObject = { isLoading: false };
      });
    },
    getBackingOptions(projectIndex) {
      this.currentOptions = [];
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.getBackingOptionsCount().call().then((backingOptionCount) => {
        if(backingOptionCount == 0){
          alert("Noch keine Backing-Optionen verfügbar.")
        }
        for (var i = 0; i < backingOptionCount; i++){
          this.getBackingOption(projectIndex, i);
        }
        this.isUserInvestor();
      });
    },
    getBackingOption(projectIndex, optionIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.getBackingOption(optionIndex).call().then((backingOption) => {
        backingOption.index = optionIndex;
        this.currentOptions.push(backingOption);
        this.currentOptions.sort((a, b) => (a.index > b.index) ? 1 : -1 );
        this.viewBackingOptionsDialog = true;
      });
    },
    getInvestorCount(projectInfo, contract) {
      const projectInst = project(contract);
      projectInst.methods.getInvestorCount().call().then((investorCount) => {
        projectInfo.investorCount = investorCount;
        this.getContractState(projectInfo, contract);
      });
    },
    addRequest(projectIndex, title, description, date, amount) {
      this.newObject.isLoading = true;
      var goalDate = new Date(this.requestDateEnd);
      var goalTime = this.time3.split(":");
      goalDate.setHours(goalTime[0], goalTime[1]);
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.addRequest(
        this.newObject.title,
        this.newObject.description,
        (goalDate.getTime()/1000).toFixed(0),
        web3.utils.toWei(this.newObject.amount, 'ether'),
      ).send({
        from: this.account,
      }).then((status) => {
        this.addRequestDialog = false;
      });
    },
    getCurrentRequest(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.getCurrentRequest().call().then((request) => {
        this.isUserInvestor();
        this.currentRequest = request;
        this.remainingFunds = this.projectData[projectIndex].currentAmount;
        this.hasInvestorVotedForCurrentRequest(projectIndex);
      }).catch((err) => {
        alert("Keine Auszahlungs-Anfragen vorhanden.")
      });
    },
    voteForCurrentRequest(projectIndex, vote) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.voteForCurrentRequest(
        vote
      ).send({
        from: this.account,
      }).then(() => {
        console.log("Vote submitted");
      });
    },
    addInvestor(projectIndex, optionId, optionValue) {
      this.newObject.isLoading = true;
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.addInvestor(
        (optionId+1).toString(),
      ).send({
        from: this.account,
        value: optionValue,
      }).then((status) => {
        this.newObject.isLoading = false;
        this.getProjects();
      });
    },
    requestPayback(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.requestPayback(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    requestPayout(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.requestPayout(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    requestRefundRemainingFunds(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.requestRefundRemainingFunds(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    closeAddingBackingOptionPeriode(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.closeAddingBackingOptionPeriode(
      ).send({
        from: this.account,
      }).then((status) => {
        this.getProjects();
      });
    },
    currentConversionRate() {
      var self = this;
      axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(function(response){
        if(response.status == "200"){
            self.exchangeRate = response.data.USD;
          }
        });
    },
    getContractState(projectInfo, contract) {
      const projectInst = project(contract);
      projectInst.methods.getContractState().call().then((state) => {
        projectInfo.currentState = state;
        projectInfo.refundStatus = true;
        this.contractWasRefunded(projectInfo);
      });
    },
    getProjectCountForFounder() {
      this.projectData = [];
      projectHub.methods.getProjectCountForFounder().call({
        from: this.account
        }).then((projectCount) => {
          for (var i = 0; i < projectCount; i++){
            this.getProjectByFounderForIndex(i);
          }
	    });
    },
    getProjectByFounderForIndex(projectIndex) {
      projectHub.methods.getProjectByFounderForIndex(projectIndex).call({
        from: this.account
        }).then(
        async (projectData) => {
          const projectInfo = {}
          projectInfo.projectTitle = projectData[2]
          projectInfo.projectDesc = projectData[3];
          projectInfo.projectStarter = projectData[0];
          projectInfo.fundingDeadline = new Date(parseInt(projectData[5])*1000);
          projectInfo.projectDeadline = new Date(parseInt(projectData[6])*1000);
          projectInfo.goalAmount = projectData[4];
          projectInfo.currentAmount = 0;
          projectInfo.peekBalance = 0;
          projectInfo.isLoading = false;
          projectInfo.contract = projectData[1];
          projectInfo.index = projectIndex;
          this.getBalance(projectInfo, projectData[1]);
      });
    },
    getProjectCountForInvestor() {
      this.projectData = [];
      projectHub.methods.getProjectCountForInvestor().call({
        from: this.account
        }).then((projectCount) => {
          for (var i = 0; i < projectCount; i++){
            this.getProjectByInvestorForIndex(i);
          }
	    });
    },
    getProjectByInvestorForIndex(projectIndex) {
      projectHub.methods.getProjectByInvestorForIndex(projectIndex).call({
        from: this.account
        }).then(
        async (projectData) => {
          const projectInfo = {}
          projectInfo.projectTitle = projectData[2]
          projectInfo.projectDesc = projectData[3];
          projectInfo.projectStarter = projectData[0];
          projectInfo.fundingDeadline = new Date(parseInt(projectData[5])*1000);
          projectInfo.projectDeadline = new Date(parseInt(projectData[6])*1000);
          projectInfo.goalAmount = projectData[4];
          projectInfo.currentAmount = 0;
          projectInfo.peekBalance = 0;
          projectInfo.isLoading = false;
          projectInfo.contract = projectData[1];
          projectInfo.index = projectIndex;
          this.getBalance(projectInfo, projectData[1]);
      });
    },
    hasInvestorVotedForCurrentRequest(projectIndex) {
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.hasInvestorVotedForCurrentRequest().call({
        from: this.account
        }).then(
        async (voteStatus) => {
          this.currentRequest.voteStatus = voteStatus;
          this.viewRequestDialog = true;
      });
    },
    isStarter() {
      var projectIndex = this.activeIndex;
      if(this.projectData[projectIndex] != undefined){
        return (this.projectData[projectIndex].projectStarter == this.account);
      } else {
        return false;
      }
    },
    isRequestFinished(requestDeadline){
      return (new Date().getTime() > new Date(parseInt(requestDeadline)));
    },
    isProjectFinished(){
      var projectIndex = this.activeIndex;
      if(this.projectData[projectIndex] != undefined){
        return (new Date().getTime() > this.projectData[projectIndex].projectDeadline);
      } else {
        return false;
      }
    },
    isUserInvestor(){
      var projectIndex = this.activeIndex;
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.isUserInvestor().call({
        from: this.account
        }).then(
        async (isInvestor) => {
          this.isProjectInvestor = isInvestor;
      });
    },
    getProjectState(){
      var projectIndex = this.activeIndex;
      if(this.projectData[projectIndex] != undefined){
        return this.projectData[projectIndex].currentState
      } else {
        return -1;
      }
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    isInvestor() {
      return this.isProjectInvestor;
    },
    contractWasPartiallyRefunded() {
      var projectIndex = this.activeIndex;
      const projectInst = project(this.projectData[projectIndex].contract);
      projectInst.methods.contractWasPartiallyRefunded().call({
        from: this.account
        }).then(
        async (refundStatus) => {
          this.projectData[projectIndex].refundStatus = refundStatus;
      });
    },
    contractWasRefunded(projectInfo) {
      const projectInst = project(projectInfo.contract);
      projectInst.methods.contractWasRefunded().call({
        from: this.account
        }).then(
        async (refundStatus) => {
          projectInfo.refundStatus = refundStatus;
          this.projectData.push(projectInfo);
          this.projectData.sort((a, b) => (a.index > b.index) ? 1 : -1 );
      });
    },
    checkRefundStatus(projectIndex) {
      if(this.projectData[projectIndex] != undefined){
        return this.projectData[projectIndex].refundStatus;
      } else {
        return true;
      }
    }
  },
  computed: {
    filteredProjects() {
      return this.projectData.filter(project => {
        return project.projectTitle.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    computedfundingDateFormatted () {
        return this.formatDate(this.fundingDateEnd)
      },
    computedprojectDateFormatted () {
        return this.formatDate(this.projectDateEnd)
      },
    computedrequestDateFormatted () {
        return this.formatDate(this.requestDateEnd)
      }
  },
  watch: {
      fundingDateEnd (val) {
        this.fundingDateFormatted = this.formatDate(this.fundingDateEnd)
      },
      projectDateEnd (val) {
        this.projectDateFormatted = this.formatDate(this.projectDateEnd)
      },
      requestDateEnd (val) {
        this.requestDateFormatted = this.formatDate(this.requestDateEnd)
      }
    }
};
</script>


<style>
  @import '../Styles/etherfund.css';
</style>