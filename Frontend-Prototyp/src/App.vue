<template>
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
                    <v-flex xs12>
                      <span class="headline grey--text">Backing Optionen</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Backing-Option Name"
                        >
                      </v-text-field>
                      <v-textarea
                        label="Backing-Option Beschreibung"
                        type="text"
                        >
                      </v-textarea>
                      <v-text-field
                        label="Backing-Option Preis"
                        type="number"
                        >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn color="primary" dark>
                          Option hinzufügen
                      </v-btn>
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
                <span class="headline font-weight-bold mt-2 ml-4">Backing Option hinzufügen</span>
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
                    <small>Up Until: <b>{{ new Date(project.deadline * 1000) }}</b></small>
                    <br/><br/>
                    <small>Goal of <b>{{ project.goalAmount / 10**18 }} ETH </b></small>
                    <small v-if="project.currentState == 1">wasn't achieved before deadline</small>
                    <small v-if="project.currentState == 2">has been achieved</small>
                  </div>
                </v-card-title>
                <v-flex
                  v-if="project.currentState == 0 && account != project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-text-field
                    label="Betrag (in ETH)"
                    type="number"
                    step="0.0001"
                    min="0"
                    v-model="project.fundAmount"
                  ></v-text-field>
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="watchProjectDetails(index)"
                    :loading="project.isLoading"
                  >
                    Details
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
                <v-flex class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="amber darken-1 white--text"
                    v-if="project.currentState == 1"
                    @click="getRefund(index)"
                    :loading="project.isLoading"
                  >
                    Get refund
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
      activeIndex: null,
      account: null,
      stateMap: [
        { color: 'primary', text: 'Laufend' },
        { color: 'warning', text: 'Abgelaufen' },
        { color: 'success', text: 'Abgeschlossen' },
      ],
      projectData: [],
      newObject: { isLoading: false },
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
          crowdfundInstance.methods.getProject(i).call().then((projectData) => {
            console.log(projectData);
            const projectInfo = {}
            projectInfo.projectTitle = projectData[2];
            projectInfo.projectDesc = projectData[3];
            projectInfo.projectStarter = projectData[0];
            projectInfo.deadline = "1560773997";
            projectInfo.goalAmount = "2000000000000000000";
            projectInfo.currentAmount = 0;
            projectInfo.currentState = "0";
            projectInfo.isLoading = false;
            projectInfo.contract = projectData[1];
            this.projectData.push(projectInfo);
          });
        }
	    });

	  /*crowdfundInstance.methods.returnAllProjects().call().then((projects) => {
        projects.forEach((projectAddress) => {
          const projectInst = crowdfundProject(projectAddress);
          projectInst.methods.getDetails().call().then((projectData) => {
            const projectInfo = projectData;
            projectInfo.isLoading = false;
            projectInfo.contract = projectInst;
            this.projectData.push(projectInfo);
          });
        });
      });*/
    },
    startProject() {
      this.newObject.isLoading = true;
      crowdfundInstance.methods.addnewProject(
        this.newObject.title,
        this.newObject.description/*,
        this.newObject.duration,
        web3.utils.toWei(this.newObject.amountGoal, 'ether')
        */
      ).send({
        from: this.account
        }).then((isCreated) => {
        console.log(isCreated)
        this.startProjectDialog = false;
        this.newObject = { isLoading: false };
      });

      /*this.newObject.isLoading = true;
      crowdfundInstance.methods.startProject(
        this.newObject.title,
        this.newObject.description,
        this.newObject.duration,
        web3.utils.toWei(this.newObject.amountGoal, 'ether'),
      ).send({
        from: this.account,
      }).then((res) => {
        const projectInfo = res.events.ProjectStarted.returnValues;
        projectInfo.isLoading = false;
        projectInfo.currentAmount = 0;
        projectInfo.currentState = 0;
        projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
        this.startProjectDialog = false;
        this.newObject = { isLoading: false };
      });*/
    },
    addBackingOption(index) {
      this.newObject.isLoading = true;
      crowdfundInstance.methods.getProject(index).call().then((projectData) => {
          const projectInst = crowdfundProject(projectData[1]);
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
      });
    },
    watchProjectDetails(index) {
      crowdfundInstance.methods.getProject(index).call().then((projectData) => {
         const projectInst = crowdfundProject(projectData[1]);
         projectInst.methods.getBackingOptionsCount().call().then((backingOptionCount) => {
            for (var i = 0; i < backingOptionCount; i++){
              projectInst.methods.getBackingOption(i).call().then((backingOptionData) => {
                console.log(backingOptionData);
              });
            }
         });
      });
    },
    getBackingOptions(projectIndex) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.getBackingOptionsCount().call().then((optionsCount) => {
          for (var i = 0; i < optionsCount; i++){
            projectInst.methods.getBackingOption(i).call().then((backingOption) => {
              console.log(backingOption);
            });
          }
        });
      });
    },
    getInvestorCount(projectIndex) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.getInvestorCount().call().then((investorCount) => {
          console.log(investorCount);
        });
      });
    },
    addRequest(projectIndex, title, description, date, amount) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.addRequest(
          title,
          description,
          date,
          amount
        ).send({
          from: this.account,
        }).then((status) => {
          console.log(status);
        });
      });
    },
    requestPayout(projectIndex) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.requestPayout().call().then((status) => {
          console.log(status);
        });
      });
    },
    getCurrentRequest(projectIndex) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.getCurrentRequest().call().then((request) => {
          console.log(request);
        });
      });
    },
    voteForCurrentRequest(projectIndex, vote) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.voteForCurrentRequest(
          vote
        ).send({
          from: this.account,
        }).then(() => {
          console.log("Vote submitted");
        });
      });
    },
    addInvestor(projectIndex, optionId) {
      crowdfundInstance.methods.getProject(projectIndex).call().then((projectData) => {
        const projectInst = crowdfundProject(projectData[1]);
        projectInst.methods.addInvestor(
          optionId
        ).send({
          from: this.account,
        }).then((status) => {
          console.log(status);
        });
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
  },
};
</script>
