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
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Projektziel (ETH)"
                        type="number"
                        step="0.0001"
                        min="0"
                        v-model="newObject.amountGoal">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Laufzeit (in Tagen)"
                        type="number"
                        v-model="newObject.duration">
                      </v-text-field>
                    </v-flex>
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
                <div>
                  <div class="headline">{{ option[0] }}</div>
                  <div>{{ option[1] }}</div>
                  <div>Kosten: <span>{{ option[2] }}</span></div>
                  <div>Verfügbare Anzahl: <span>{{ option[3] }}</span></div>
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="addInvestor(activeIndex, index, option[2])"
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
              <v-card-title class="headline" primary-title>
                <span>Aktuelle Anfrage</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <div>
                  <div class="headline">{{ currentRequest[0] }}</div>
                  <div>{{ currentRequest[1] }}</div>
                  <div>Kosten: <span>{{ currentRequest[3] }}</span></div>
                  <div>Laufzeit bis: <span>{{ new Date(currentRequest[2]) }}</span></div>
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, true)"
                  >
                  Akzeptieren
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, false)"
                  >
                  Ablehnen
                  </v-btn>
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
                        label="Laufzeit (in Tagen)"
                        type="number"
                        v-model="newObject.validUntil">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Benötigte Menge"
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
        <v-layout row wrap>
          <v-flex v-for="(project, index) in projectData" :key="index" xs12 sm6 md4>
            <v-dialog
              v-model="project.dialog"
              width="800"
            >
              <v-card>
                <v-card-title class="headline font-weight-bold">
                  {{ project.projectTitle }}
                </v-card-title>
                <v-card-text>
                  {{ project.projectDesc }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    flat="flat"
                    @click="projectData[index].dialog = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                    <br/>
                    <span>{{ project.projectDesc.substring(0, 100) }}</span>
                    <span v-if="project.projectDesc.length > 100">
                      ... <a @click="projectData[index].dialog = true">[Show full]</a>
                    </span>
                    <br/><br/>
                    <small>Up Until: <b>{{ new Date(project.deadline) }}</b></small>
                    <br/><br/>
                    <small>Goal of <b>{{ project.goalAmount / 10**18 }} ETH </b></small>
                    <small v-if="project.currentState == 2">wasn't achieved before deadline</small>
                    <small v-if="project.currentState == 3">has been achieved</small>
                  </div>
                </v-card-title>
                <!--  v-if="project.currentState == 0 " #&& account != project.projectStarter-->

                <v-flex
                  v-if="project.currentState == 0 "
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="getBackingOptions(index); activeIndex = index;"
                    :loading="project.isLoading"
                  >
                  View
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 "
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="getCurrentRequest(index); activeIndex = index;"
                    :loading="project.isLoading"
                  >
                  Show Request
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 && account == project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="addBackingOptionDialog = true; activeIndex = index;"
                    :loading="project.isLoading"
                  >
                    Add Option
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 "
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="closeAddingBackingOptionPeriode(); activeIndex = index;"
                    :loading="project.isLoading"
                  >
                  Close
                  </v-btn>
                </v-flex>

                <v-flex
                  v-if="project.currentState == 0 && account == project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="addRequestDialog = true; activeIndex = index;"
                    :loading="project.isLoading"
                  >
                    Add Request
                  </v-btn>
                </v-flex>
                <v-card-actions v-if="project.currentState == 0" class="text-xs-center">
                  <span class="font-weight-bold" style="width: 200px;">
                    {{ project.currentAmount / 10**18 }} ETH
                  </span>
                  <v-progress-linear
                    height="10"
                    :color="stateMap[project.currentState].color"
                    :value="(project.currentAmount / project.goalAmount) * 100"
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
import crowdfundInstance from '../contracts/crowdfundInstanceNew';
import crowdfundProject from '../contracts/crowdfundProjectInstanceNew';
import web3 from '../contracts/web3';

export default {
  name: 'App',
  data() {
    return {
      startProjectDialog: false,
      addBackingOptionDialog: false,
      addRequestDialog: false,
      viewBackingOptionsDialog: false,
      viewRequestDialog: false,
      activeIndex: null,
      account: null,
      stateMap: [
        { color: 'blue-grey lighten-3', text: "Initialisierung"},
        { color: 'primary', text: 'Laufend' },
        { color: 'warning', text: 'Abgelaufen' },
        { color: 'success', text: 'Abgeschlossen' },
      ],
      projectData: [],
      newObject: { isLoading: false },
      currentOptions: [],
      currentRequest: {},
    };
  },
  mounted() {
    // this code snippet takes the account (wallet) that is currently active
    web3.eth.getAccounts().then((accounts) => {
      [this.account] = accounts;
      this.getProjects();
    });
  },
  methods: {
    getProjects() {
      crowdfundInstance.methods.getProjectCount().call().then((projectCount) => {
        for (var i = 0; i < projectCount; i++){
          crowdfundInstance.methods.getProjects(i).call().then((projectData) => {
            console.log(projectData);
            const projectInfo = {}
            projectInfo.projectTitle = projectData[2];
            projectInfo.projectDesc = projectData[3];
            projectInfo.projectStarter = projectData[0];
            projectInfo.deadline = new Date(parseInt(projectData[5]));
            projectInfo.goalAmount = projectData[4];
            projectInfo.currentAmount = 0;
            projectInfo.currentState = "0";
            projectInfo.isLoading = false;
            projectInfo.contract = projectData[1];
            this.projectData.push(projectInfo);
          });
        }
	    });
    },
    startProject() {
      this.newObject.isLoading = true;
      var today = new Date();
      var goalDate = new Date();
      goalDate.setDate(today.getDate()+parseInt(this.newObject.duration));
      crowdfundInstance.methods.addNewProject(
        this.newObject.title,
        this.newObject.description,
        web3.utils.toWei(this.newObject.amountGoal, 'ether'),
        goalDate.getTime()
      ).send({
        from: this.account
        }).then((isCreated) => {
        console.log(isCreated)
        this.startProjectDialog = false;
        this.newObject = { isLoading: false };
      });

    },
    addBackingOption(index) {
      this.newObject.isLoading = true;
      const projectInst = crowdfundProject(this.projectData[index].contract);
      projectInst.methods.addBackingOption(
        this.newObject.title,
        this.newObject.description,
        this.newObject.price,
        this.newObject.amount
      ).send({
        from: this.account,
      }).then((data) => {
        console.log(data);
        this.newObject = { isLoading: false };
      });
    },
    getBackingOptions(projectIndex) {
      this.currentOptions = [];
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.getBackingOptionsCount().call().then((backingOptionCount) => {
        for (var i = 0; i < backingOptionCount; i++){
          projectInst.methods.getBackingOption(i).call().then((backingOption) => {
            this.currentOptions.push(backingOption);
            this.viewBackingOptionsDialog = true;
          });
        }
      });
    },
    getInvestorCount(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.getInvestorCount().call().then((investorCount) => {
        console.log(investorCount);
      });
    },
    addRequest(projectIndex, title, description, date, amount) {
      this.newObject.isLoading = true;
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.addRequest(
        this.newObject.title,
        this.newObject.description,
        new Date().getTime() + (this.newObject.validUntil*86400),
        this.newObject.amount
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
        this.addRequestDialog = false;
      });
    },
    requestPayout(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.requestPayout().call().then((status) => {
        console.log(status);
      });
    },
    getCurrentRequest(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.getCurrentRequest().call().then((request) => {
        this.currentRequest = request;
        this.viewRequestDialog = true;
        console.log(request);
      });
    },
    voteForCurrentRequest(projectIndex, vote) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.voteForCurrentRequest(
        vote
      ).send({
        from: this.account,
      }).then(() => {
        console.log("Vote submitted");
      });
    },
    addInvestor(projectIndex, optionId, optionValue) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.addInvestor(
        optionId,
      ).send({
        from: this.account,
        value: optionValue,
      }).then((status) => {
        console.log(status);
      });
    },
    getRefund(index) {
      /*this.projectData[index].isLoading = true;
      this.projectData[index].contract.methods.getRefund().send({
        from: this.account,
      }).then(() => {
        this.projectData[index].isLoading = false;
      });*/
    },
    closeAddingBackingOptionPeriode(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.closeAddingBackingOptionPeriode(
      ).send({
        from: this.account,
      }).then((status) => {
        
      });
    }
  },
};
</script>
