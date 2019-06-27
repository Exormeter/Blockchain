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
                      <v-text-field
                        label="Funding-Laufzeit (in Tagen)"
                        type="number"
                        v-model="newObject.fundingDuration">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Projekt-Laufzeit (in Tagen)"
                        type="number"
                        v-model="newObject.duration">
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
                  <div><b>Kosten: </b> <span>{{ option[2] / 10**18 }} ETH</span></div>
                  <div><b>Verfügbare Anzahl: </b> <span>{{ option[3] }}</span></div>
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="addInvestor(activeIndex, index, option[2])"
                    :disabled="option[3] == 0 || account == projectData[activeIndex].projectStarter || projectData[activeIndex].currentState == 0"
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
              <v-card-title class="headline" primary-title>
                <span>Aktuelle Anfrage</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <div>
                  <div class="headline">{{ currentRequest[0] }}</div>
                  <div>{{ currentRequest[1] }}</div>
                  <div><b>Kosten: </b><span>{{ currentRequest[3] / 10**18 }} ETH</span></div>
                  <div><b>Laufzeit bis: </b><span>{{ new Date(parseInt(currentRequest[2])) }}</span></div>
                  <div><b>Anzahl Stimmen: </b><span class="blue--text"> {{currentRequest['numberAcceptedVotes']}} </span> | <span class="red--text"> {{currentRequest['numberRejectedVotes']}} </span></div>
                  <v-btn
                    v-if="this.projectData[activeIndex] != account"
                    color="blue darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, true)"
                  >
                  Akzeptieren
                  </v-btn>
                  <v-btn
                    v-if="this.projectData[activeIndex] != account"
                    color="red darken-1"
                    flat
                    @click="voteForCurrentRequest(activeIndex, false)"
                  >
                  Ablehnen
                  </v-btn>
                  <v-btn
                    v-if="this.projectData[activeIndex] != account"
                    color="blue darken-1"
                    flat
                    @click="requestPayout(activeIndex)"
                  >
                  Auszahlen
                  </v-btn>
                  <v-btn
                    v-if="this.projectData[activeIndex] != account"
                    color="blue darken-1"
                    flat
                    @click="requestRefundRemainingFunds(activeIndex)"
                  >
                  Partiell 
                  </v-btn>
                  <v-btn
                    v-if="this.projectData[activeIndex] != account"
                    color="blue darken-1"
                    flat
                    @click="requestPayback(activeIndex)"
                  >
                  Refund 
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
        <div class="search-wrapper">
          <input type="text" v-model="search" placeholder="Search title.."/>
          <label>Search title:</label>
        </div>
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
                  v-if="project.currentState == 4 "
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
import crowdfundInstance from '../contracts/crowdFundInstanceNew';
import crowdfundProject from '../contracts/crowdFundProjectInstanceNew';
import web3 from '../contracts/web3';

export default {
  name: 'App',
  data() {
    return {
      search: '',
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
        { color: 'green', text: "Ziel erreicht"},
        { color: 'success  lighten-3', text: 'Abgeschlossen' },
        { color: 'warning  lighten-3', text: 'Abgelaufen' },
      ],
      projectData: [],
      newObject: { isLoading: false },
      currentOptions: [],
      currentRequest: {}
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
      this.projectData = [];
      crowdfundInstance.methods.getProjectCount().call().then((projectCount) => {
        for (var i = 0; i < projectCount; i++){
          this.getProject(i);
        }
	    });
    },
    getProject(projectIndex) {
      crowdfundInstance.methods.getProjects(projectIndex).call().then(async (projectData) => {
        const projectInfo = {}
        projectInfo.projectTitle = projectData.projectName;
        projectInfo.projectDesc = projectData.projectDescription;
        projectInfo.projectStarter = projectData.owner;
        projectInfo.fundingDeadline = new Date(parseInt(projectData.fundigCloseDate)*1000);
        projectInfo.projectDeadline = new Date(parseInt(projectData.projectClosingDate)*1000);
        projectInfo.goalAmount = projectData.goal;
        projectInfo.currentAmount = 0;
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
        this.getInvestorCount(projectInfo, contract);
      } catch (err) {
        projectInfo.currentAmount = 0;
        this.getInvestorCount(projectInfo, contract);
      }
    },
    startProject() {
      this.newObject.isLoading = true;
      var fundingDate = new Date();
      fundingDate.setMinutes(fundingDate.getMinutes()+parseFloat(this.newObject.fundingDuration)*24*60);
      var goalDate = new Date();
      goalDate.setMinutes(goalDate.getMinutes()+parseFloat(this.newObject.duration)*24*60);
      crowdfundInstance.methods.addNewProject(
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
      const projectInst = crowdfundProject(this.projectData[index].contract);
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
      console.log(this.projectData[projectIndex]);
      this.currentOptions = [];
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.getBackingOptionsCount().call().then((backingOptionCount) => {
        if(backingOptionCount == 0){
          alert("Noch keine Backing-Optionen verfügbar.")
        }
        for (var i = 0; i < backingOptionCount; i++){
          projectInst.methods.getBackingOption(i).call().then((backingOption) => {
            this.currentOptions.push(backingOption);
            this.viewBackingOptionsDialog = true;
          });
        }
      });
    },
    getInvestorCount(projectInfo, contract) {
      const projectInst = crowdfundProject(contract);
      projectInst.methods.getInvestorCount().call().then((investorCount) => {
        projectInfo.investorCount = investorCount;
        this.getContractState(projectInfo, contract);
      });
    },
    addRequest(projectIndex, title, description, date, amount) {
      this.newObject.isLoading = true;
      var goalDate = new Date();
      goalDate.setMinutes(goalDate.getMinutes()+parseFloat(this.newObject.validUntil)*24*60);
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.addRequest(
        this.newObject.title,
        this.newObject.description,
        goalDate.getTime(),
        web3.utils.toWei(this.newObject.amount, 'ether'),
      ).send({
        from: this.account,
      }).then((status) => {
        this.addRequestDialog = false;
      });
    },
    getCurrentRequest(projectIndex) {
      console.log(this.projectData[projectIndex].contract);
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.getCurrentRequest().call().then((request) => {
        this.currentRequest = request;
        this.viewRequestDialog = true;
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
      this.newObject.isLoading = true;
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.addInvestor(
        optionId,
      ).send({
        from: this.account,
        value: optionValue,
      }).then((status) => {
        this.newObject.isLoading = false;
      });
    },
    requestPayback(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.requestPayback(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    requestPayout(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.requestPayout(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    requestRefundRemainingFunds(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.requestRefundRemainingFunds(
      ).send({
        from: this.account,
      }).then((status) => {
        console.log(status);
      });
    },
    closeAddingBackingOptionPeriode(projectIndex) {
      const projectInst = crowdfundProject(this.projectData[projectIndex].contract);
      projectInst.methods.closeAddingBackingOptionPeriode(
      ).send({
        from: this.account,
      }).then((status) => {
        this.getProjects();
      });
    },
    currentConversionRate() {
    var self=this;
    this.$http.get('https://api.coinmarketcap.com/v1/ticker/ethereum/').then(function(response){
      if(response.status == "200"){
          console.log(response);
        }
      });
    },
    getContractState(projectInfo, contract) {
      const projectInst = crowdfundProject(contract);
      projectInst.methods.getContractState().call().then((state) => {
        projectInfo.currentState = state;
        this.projectData.push(projectInfo);        
        this.projectData.sort((a, b) => (a.index > b.index) ? 1 : -1 );
        console.log(projectInfo);
      });
    }
  },
  computed: {  
    filteredProjects() {
      return this.projectData.filter(project => {
        return project.projectTitle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>


<style>
div#app .search-wrapper {
  position: relative;
}
div#app .search-wrapper label {
  position: absolute;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: .15s all ease-in-out;
}
div#app .search-wrapper input {
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: .15s all ease-in-out;
  background: white;
}
div#app .search-wrapper input:focus {
  outline: none;
  transform: scale(1.05);
}
div#app .search-wrapper input:focus + label {
  font-size: 10px;
  transform: translateY(-24px) translateX(-12px);
}
div#app .search-wrapper input::-webkit-input-placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
}

.v-chip {
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 0px;
}
</style>