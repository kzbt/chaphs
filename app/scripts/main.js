var ref = new Firebase('https://cygnus.firebaseio.com/chart');

// send data to firebase on click
var onClickVote = function(color) {
    var votesRef = ref.child(color).child('votes');

    // since its updating data in real time transaction is required
    votesRef.transaction(function(current_value) {
        return current_value + 1;
    });
};

var green = {votes : 1};
var blue = {votes : 1};
var red = {votes : 1};
var yellow = {votes : 1};

// get votes from firebase
ref.child('Green').on('value', function(snapshot) {
    green.votes = snapshot.val().votes;
});
ref.child('Red').on('value', function(snapshot) {
    red.votes = snapshot.val().votes;
});
ref.child('Blue').on('value', function(snapshot) {
    blue.votes = snapshot.val().votes;
});
ref.child('Yellow').on('value', function(snapshot) {
    yellow.votes = snapshot.val().votes;
});

// instantiate chart
var context = $("#myChart").get(0).getContext("2d");
var myChart = new Chart(context);

var options = {
    animation : false
};

var data = [
    {
        value: 1,
        color:"#dc322f"
    },
    {
        value : 1,
        color : "#859900"
    },
    {
        value : 1,
        color : "#268bd2"
    },
    {
        value : 1,
        color : "#b58900"
    }
];

// call this function every second to update chart
function updateData() {
// chart data
var data = [
    {
        value: red.votes,
        color:"#dc322f"
    },
    {
        value : green.votes,
        color : "#859900"
    },
    {
        value : blue.votes,
        color : "#268bd2"
    },
    {
        value : yellow.votes,
        color : "#b58900"
    }
];
myChart.Pie(data, options);
}

setInterval(function(){updateData()}, 1000)