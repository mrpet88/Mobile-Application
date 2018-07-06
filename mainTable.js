var main = new Vue({
    el: '#VueMain',
    data: {
       months:[],
        days:[],
//       game2:[],


        isInvisible: false,
        //        days:[],
        teams: [],
        showNYSLWelcomeScreen: true,
        notShowTeams: false,
        notShowMaps: false,
        notShowSchedule: false,
        notShowInfo: false,
        notShowLogIn: false,
        message: "Welcome",
        arrowLeft: false,
        gameLocationClass: false,
        history: ["changeDisplayToHomeScreen"]
    },
    methods: {
        changeDisplayToTeams: function () {
            this.showNYSLWelcomeScreen = !this.showNYSLWelcomeScreen
            this.notShowTeams = !this.notShowTeams
            this.notShowInfo = false
            this.message = "Teams"
            this.arrowLeft = true
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = false;
            this.history.push("changeDisplayToTeams");
        },

        changeDisplayToMaps: function () {
            this.showNYSLWelcomeScreen = !this.showNYSLWelcomeScreen
            this.notShowMaps = !this.notShowMaps
            this.message = "Game Locations"
            this.arrowLeft = true
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = false;
            this.notShowInfo = false;
            this.history.push("changeDisplayToMaps");

        },
        changeDisplayToSchedule: function () {
            this.showNYSLWelcomeScreen = !this.showNYSLWelcomeScreen
            this.notShowSchedule = !this.notShowSchedule
            this.message = "Game Schedule"
            this.arrowLeft = true
            this.showNYSLWelcomeScreen = false;
            this.notShowInfo = false;
            this.notShowLogIn = false;
            this.history.push("changeDisplayToSchedule");
        },
        changeDisplayToInfo: function () {
            this.showNYSLWelcomeScreen = false
            this.notShowInfo = true
            this.notShowTeams = false
            this.notShowSchedule = false
            this.notShowLogIn = false
            this.notShowMaps = false
            this.message = "More Info"
            this.arrowLeft = true
            this.showNYSLWelcomeScreen = false;
            this.history.push("changeDisplayToInfo");



        },

        changeDisplayToLogIn: function () {
            this.showNYSLWelcomeScreen = !this.showNYSLWelcomeScreen
            this.notShowLogIn = true
            this.notShowInfo = false
            this.showNYSLWelcomeScreen = false
            this.notShowMaps = false
            this.notShowSchedule = false
            this.message = "Log In"
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = false;
            this.history.push("changeDisplayToLogIn");

        },
        changeDisplayToHomeScreen: function () {
            this.showNYSLWelcomeScreen = true
            this.notShowInfo = false
            this.notShowLogIn = false
            this.notShowMaps = false
            this.notShowSchedule = false
            this.notShowTeams = false
            this.message = "Welcome"
            this.arrowLeft = false
            this.history.push("changeDisplayToHomeScreen");

        },
        goToPreviousScreen: function () {
            switch (this.history[this.history.length - 2]) {
                case "changeDisplayToTeams":
                    this.changeDisplayToTeams()
                    break;
                case "changeDisplayToMaps":
                    this.changeDisplayToMaps()
                    break;
                case "changeDisplayToSchedule":
                    this.changeDisplayToSchedule()
                    break;
                case "changeDisplayToInfo":
                    this.changeDisplayToInfo()
                    break;
                case "changeDisplayToLogIn":
                    this.changeDisplayToLogIn()
                    break;
                case "changeDisplayToHomeScreen":
                    this.changeDisplayToHomeScreen();
                    break;
                default:
//                    console.log(this.history.length - 1);
                    this.changeDisplayToHomeScreen()
            }
            console.log("we are at: ", this.history[this.history.length - 1])
            console.log("we go to: ", this.history[this.history.length - 2])
            console.log(this.history)
            this.history.splice(-1, 1);
            console.log(this.history)
        }
    }
});
start()

function start() {

    var fetchConfig =
        fetch("https://api.myjson.com/bins/h7cu6", {
            method: "GET",
            headers: new Headers({

            })
        })
        .then(onDataFetched)
        .catch(onDataFetchFailed)

}

function onDataFetched(response) {
    response.json()
        .then(onConversionToJsonSuccessful)
        .catch(onConversionToJsonFailed);
    console.log(2);
}

function onDataFetchFailed(error) {
    console.log("I have failed in life.", error);
}

function onConversionToJsonSuccessful(json) {
    console.log("Success!");
    data = json;
    console.log(data);
    main.days=data.months["0"].days;
    main.months = data.months;
    
}

function onConversionToJsonFailed() {
    console.log("Not a json mate!");
}



//function bringDatesPLaying(dates){
//    var allDatesPlaying=[];
//    for (var i=0; i<dates.September.length; i++){
//        allDatesPlaying.push(dates.September[i])
//    }console.log(allDatesPlaying);
//}

function setPageLocation() {
    document.getElementById("moreInfo") == "pageLocationMoreInfo"
}

//WITHOUT TEAMS
//https://api.myjson.com/bins/125ata
//https://api.myjson.com/bins/r57jy
function displaySelectedMap() {
    var locationChoise = document.getElementById("locationChoise");
    document.getElementById("mapFrame").src = locationChoise.value;
}

function displayMonth(){
    document.getElementById("tables").value=data.months["1"].days;
}