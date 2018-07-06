var main = new Vue({
    el: '#VueMain',
    data: {
        months: [],
        isInvisible: false,
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
        notShowChatRoom: false,
        history: ["changeDisplayToHomeScreen"],
        notShowEachTeamSchedule: false,
        notShowChatTeams:false,
        logOutIcon:false,
        selectedTeam: 0,
        posts: [],
        myUserName:"",
},
    methods: {
//        changeClassWelcomeScreen:function(){
//        if (this.showNYSLWelcomeScreen=true){
//        var el=document.getElementById("one")
//        el.className += "my-class";
//        }
//    },
        
//        beforeCreate:function(){
//    this.changeClassWelcomeScreen()
// },
        
        
        newDate:function(){
        var d = new Date();
        var n = d.toString();
        return n.substr(3,18);
    },
        
        
        
        logOut: function () {
            firebase.auth().signOut().then(function () {
                alert("You have succesfylly Log Out");
            }, function (error) {
                console.error('Sign Out Error', error);
            });
        },
        login: function () {
            var user = firebase.auth().currentUser;
            if(user){
            }
            else{
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)

                .then(function () {
                    {
                        var userName = firebase.auth().currentUser.displayName;
            this.myUserName = userName;
                        alert("Welcome" +" "+ this.myUserName);
                    }
                })
            }},
        writeNewPost: function () {
            main.getPosts();
            if (!$("#textInput").val()) {
            return
  }
        // https://firebase.google.com/docs/database/web/read-and-write

            // Values
            var text = document.getElementById("textInput").value;
            var userName = firebase.auth().currentUser.displayName;
            this.myUserName=userName;
            var userPic = firebase.auth().currentUser.photoURL;

            // A post entry

            var post = {
                name: userName,
                body: text,
                profileImage: userPic,
                timestamp: this.newDate(),
            };

            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('ubiqum/U'+this.selectedTeam).push().key;

            //empty the text input
            $("#textInput").val('');

            //Write data
            var updates = {};
            updates[newPostKey] = post;
            return firebase.database().ref('ubiqum/U'+this.selectedTeam).update(updates);
        },
        getPosts: function () {
            
            
           var userName = firebase.auth().currentUser.displayName;
            this.myUserName = userName; firebase.database().ref('ubiqum/U'+this.selectedTeam).on('value', function (data) {
                
                var posts = data.val();
                var array = [];
                for (var key in posts) {
                array.push(posts[key]);
                
                    //scroll every time a new message is pushed
            }
                main.posts = array;
  
                setTimeout(function(){
                $(".box").animate({
                    scrollTop: $(".box").prop("scrollHeight")
                }, 500);});
     
                
            });
        },
        changeDisplayToChatRoom: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowEachTeamSchedule = false;
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = false;
            this.notShowInfo = false;
            this.message = "Chat Room";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.logOutIcon = true;
            this.notShowChatRoom = true;
            this.notShowChatTeams=false;
            console.log(this.selectedTeam);
            main.getPosts();
            this.history.push("changeDisplayToChatRoom");
        },

        findTeamInEachDay: function (theString) {
            return theString.includes("U" + this.selectedTeam);
        },

        changeDisplayToU: function (index) {
            this.selectedTeam = index;
            this.changeDisplayToEachTeamSchedule();
        },
        
        changeDisplayToUChat: function (index) {
            this.selectedTeam = index;
            this.changeDisplayToChatRoom();
                
               
        
       
        },
        changeDisplayToEachTeamSchedule: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowEachTeamSchedule = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = false;
            this.notShowInfo = false;
            this.message = "Team Info";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = false;
            this.notShowChatRoom = false;
            this.notShowChatTeams=false,
            this.logOutIcon=false,

            this.history.push("changeDisplayToEachTeamSchedule");
        },

        changeDisplayToTeams: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = true;
            this.notShowInfo = false;
            this.message = "Teams";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = false;
            this.notShowEachTeamSchedule = false;
            this.notShowChatRoom = false;
            this.notShowChatTeams=false,
                            this.logOutIcon=false,

            this.history.push("changeDisplayToTeams");
        },
        changeDisplayToChatTeams: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = false;
            this.notShowInfo = false;
            this.message = "Chat Teams";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.logOutIcon = true;
            this.notShowEachTeamSchedule = false;
            this.notShowChatTeams=true,
            this.notShowChatRoom = false; 
            this.notShowSchedule=false;
            this.notShowMaps=false;

            this.history.push("changeDisplayToChatTeams");
        },
        changeDisplayToMaps: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowMaps = true;
            this.message = "Game Locations";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = false;
            this.notShowInfo = false;
            this.notShowEachTeamSchedule = false;
            this.notShowChatRoom = false;
            this.notShowChatTeams=false,
                            this.logOutIcon=false,

            this.history.push("changeDisplayToMaps");
        },
        changeDisplayToSchedule: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowSchedule = true;
            this.message = "Game Schedule";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowInfo = false;
            this.notShowLogIn = false;
            this.notShowEachTeamSchedule = false;
            this.notShowChatRoom = false;
                        this.logOutIcon=false,

                        this.notShowChatTeams=false,


            this.history.push("changeDisplayToSchedule");
        },
        changeDisplayToInfo: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowInfo = true;
            this.notShowTeams = false;
            this.notShowSchedule = false;
            this.notShowLogIn = false;
            this.notShowMaps = false;
            this.message = "More Info";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowEachTeamSchedule = false;
                        this.logOutIcon=false,

                        this.notShowChatTeams=false,

            this.notShowChatRoom = false;

            this.history.push("changeDisplayToInfo");
        },
        changeDisplayToLogIn: function () {
            this.showNYSLWelcomeScreen = false;
            this.notShowLogIn = true;
            this.notShowInfo = false;
            this.showNYSLWelcomeScreen = false;
            this.notShowMaps = false;
            this.notShowSchedule = false;
            this.message = "Log In";
            this.arrowLeft = true;
            this.showNYSLWelcomeScreen = false;
            this.notShowTeams = false;
                        this.logOutIcon=false,

            this.notShowEachTeamSchedule = false;
                        this.notShowChatTeams=false,

            this.notShowChatRoom = false;

            this.history.push("changeDisplayToLogIn");
        },
        changeDisplayToHomeScreen: function () {
            this.showNYSLWelcomeScreen = true;
            this.notShowInfo = false;
            this.notShowLogIn = false;
            this.notShowMaps = false;
            this.notShowSchedule = false;
            this.notShowTeams = false;
            this.message = "Welcome";
            this.arrowLeft = false;
            this.notShowEachTeamSchedule = false;
            this.notShowChatTeams=false,
                            this.logOutIcon=false,

            this.notShowChatRoom = false;

            this.history = [];
            this.history.push("changeDisplayToHomeScreen");
        },
        goToPreviousScreen: function () {
            console.log("before", this.history);
            switch (this.history[this.history.length - 2]) {
                case "changeDisplayToTeams":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToTeams()
                    break;
                case "changeDisplayToEachTeamSchedule":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToEachTeamSchedule()
                    break;
                case "changeDisplayToChatRoom":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToChatRoom()
                    break;
                case "changeDisplayToChatTeams":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToChatTeams()
                    break;
                case "changeDisplayToMaps":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToMaps()
                    break;
                case "changeDisplayToSchedule":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToSchedule()
                    break;
                case "changeDisplayToInfo":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToInfo()
                    break;
                case "changeDisplayToLogIn":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToLogIn()
                    break;
                case "changeDisplayToHomeScreen":
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToHomeScreen();
                    break;
                default:
                    this.history.pop();
                    this.history.pop();
                    console.log(this.history.length);
                    this.changeDisplayToHomeScreen()
            }
            console.log("after", this.history);
        }
    },
    

});
start();

function start() {
    var fetchConfig =
        fetch("https://api.myjson.com/bins/6s3ku", {
            method: "GET",
            headers: new Headers({})
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
    main.months = data.months;
    main.teams = data.teams;
    

}

function onConversionToJsonFailed() {
    console.log("Not a json mate!");
}

function setPageLocation() {
    document.getElementById("moreInfo") == "pageLocationMoreInfo"
}

function displaySelectedMap() {
    var locationChoise = document.getElementById("locationChoise");
    document.getElementById("mapFrame").src = locationChoise.value;
}


//    var icon = $('.foo');
//var icon_fa_icon = icon.attr('data-icon');
//
//if (icon_fa_icon === "alarm-clock") {
//    icon.attr('data-icon', 'chevron-circle-right');
//} else {
//    icon.attr('data-icon', 'star');
//}
