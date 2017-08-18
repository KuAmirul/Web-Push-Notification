
//If a runtime error occured saying "module not found", open "node.js command prompt" and enter: npm install module_name
const webpush = require('web-push');
var firebase = require('firebase');
var admin = require("firebase-admin");
var async = require('async');
var mysql = require('mysql');

//enter the directory to the serviceAccountKey.json, replace the '\' with '/'
//For example ("C:/server/serviceAccountKey.json") instead of ("C:\server\serviceAccountKey.json")

var serviceAccount = require(" #directory# /serviceAccountKey.json");

//Firebase Admin Initialization
//refer to https://firebase.google.com/docs/admin/setup, replace # with respective database url
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: " # "
});


// For server identification, a set of Voluntary Application server Identification (VAPID) keys are needed   
// VAPID keys should be generated only ONCE. 

// To generate new keys:
// Open node.js command prompt, change directory to current folder
// Run: node generateVapid.js

// after the keys are generated, copy the values displayed on console, replace the # with the keys generated:
const vapidKeys = {
    publicKey: '#',
    privateKey: '#'
};
//take note of 'vapidKeys.publicKey' value, it will be referred as applicationServerPublicKey in 'main.js' file

webpush.setGCMAPIKey('#');            //Replace # with GCM API Key
//GCM API Key is obtained from Firebase Console > Project Name > Project Settings > Cloud Messaging tab
//such as https://console.firebase.google.com/project/push-notification-web-d0beb/settings/cloudmessaging


webpush.setVapidDetails(
    'mailto:#',                           //replace # with respective email
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


var db = admin.database();
var ref = db.ref("accounts");
var pushSubscription = [];
var target = [];
var message = [];
var fblength = 0;
var dblength = 0;
var messagefull = [];
var object = [];

// Function to retrieve subscription from Firebase Database
ref.on('value', function(snapshot) {
    fblength = snapshot.numChildren(); //get number of node ; start at '1'
    ref.limitToLast(fblength).on("child_added", function(childSnapshot) {
        pushSubscription = childSnapshot.val();
        target.push(pushSubscription);
        //console.log(target);
    });
});

// replace # with respective credentials
var con = mysql.createConnection({
    port: "#",
    host: "#",
    user: "#",
    password: "#",
    database: "#"
});


function sql() {

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM customers WHERE status is NULL ", function(err, result) {
            if (err) throw err;
            dblength = result.length;  //start at '1'
            for (var i = 0; i < result.length; i++) {
                message.push(result[i].name);

                ////////////////////////  IF NULL = EXIT


            }

            //var qry = "UPDATE customers SET status = NULL WHERE id = "+result[i].id;
            var qry = "UPDATE customers SET status = '1' WHERE id = " + result[i].id;
            con.query(qry, function(err, result) {
               if (err) throw err;
               console.log(result.affectedRows + " record(s) updated");
            });
        });
	});	


}
///////////////////////////////////
setTimeout(sql, 8000); //QUERY SQL


// /*	
function send() {

    if (message[0] == "") {
        console.log("No null values");
        disconnect();
    } else {


        for (var i = 0; i < dblength; i++) {
            // console.log(message[i]);

            for (var j = 0; j < fblength; j++) {
                //console.log(target[j]);

                webpush.sendNotification(target[j], object[i])
                    .then(function(result) {
                        console.log(result)
                    }).catch(function(error) {
                        console.log('error', error)
                    })


            }

        }

        console.log("Push messages send : " + dblength);
        console.log("Number of target : " + target.length);
    }
}

//////////////////////						
setTimeout(send, 15000); // SEND PUSH 
// */

function disconnect() {

    //con.end(function(err) {});
    ref.off("child_added");
    ref.off('value');
    db.goOffline();
    console.log('Exiting');
    process.exit();

}
//////////////////////////
setTimeout(disconnect, 35000); // EXIT
