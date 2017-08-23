//If a runtime error occured saying "module not found", open "node.js command prompt" and enter: npm install module_name
const webpush = require('web-push');
var firebase = require('firebase');
var admin = require("firebase-admin");
var async = require('async');
var oracledb = require('oracledb');
oracledb.autoCommit = true;

//enter the directory to the serviceAccountKey.json, replace the '\' with '/'
//For example ("C:/server/serviceAccountKey.json") instead of ("C:\server\serviceAccountKey.json")

var serviceAccount = require(" #directory# /serviceAccountKey.json");

//Firebase Admin Initialization
//refer to https://firebase.google.com/docs/admin/setup, replace # with respective database url
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "#"
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

webpush.setGCMAPIKey('#');
//Replace # with GCM API Key
//GCM API Key is obtained from Firebase Console > Project Name > Project Settings > Cloud Messaging tab
//such as https://console.firebase.google.com/project/push-notification-web-d0beb/settings/cloudmessaging

//replace # with respective email
webpush.setVapidDetails(
    'mailto:#',
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


function sql() {

    // Replace # with respective credentials, connectString values can be obtained from tnsnames.ora file
    oracledb.getConnection({
            user: "#",
            password: "#",
            connectString: "(DESCRIPTION = (LOAD_BALANCE = YES) (FAILOVER=ON) (ADDRESS = (PROTOCOL = TCP)(HOST = #)(PORT = 1521)) (ADDRESS = (PROTOCOL = TCP)(HOST = #)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED)      (SERVICE_NAME = #)    )  )"
        },

        function(err, connection) {
            if (err) {
                console.log(err.message);
                return;
            }
            async.waterfall([
                    function(callback) {
                        connection.execute("SELECT detail_lokasi, catatan1, id_penyelesai FROM hd_laporan_pengguna WHERE id IN (27,19)",
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                message = result.rows.toString().split(','); // Convert query object to string then separate into arrays
                                console.log(message);

                                for (var i = 0; i < message.length; i += 3) {
                                    messagefull = message[i] + ", " + message[i + 1] + ", " + message[i + 2];
                                    console.log(messagefull);
                                    object.push(messagefull);
                                }

                                dblength = object.length;

                                callback(null, message, connection);
                            });
                    }
                    // ,
                    // function(callback) {
                    // connection.execute("SELECT jenis_pengguna, no_tel, no_aduan, detail_lokasi, catatan1, id_penyelesai FROM hd_laporan_pengguna WHERE id IN (27,19)", 
                    // function(err, result)
                    // {
                    // if (err) { console.log(err); return; }										
                    // query = result.rows.toString().split(','); // Convert query object to string then separate into arrays
                    // console.log(query);
                    //messagefull = message[0] + "\n" + message[1] + "\n" + message[2];
                    //console.log(messagefull[0]);
                    // for (var i=0; i < message.length; i+=3){
                    // messagefull = message[i] + ", " + message[i+1] + ", " + message[i+2];
                    // console.log(messagefull);
                    // object.push(messagefull);
                    // }

                    //object
                    //dblength = object.length; 

                    //callback(null, message, connection);
                    // });
                    // }
                    /*
								 ,
                                 function(message, connection, callback) {
                                    connection.execute( "UPDATE status_push SET status = '1' WHERE status is NULL",                                  
                                    function(err, result)
                                    {
                                         if (err) { console.log(err); return; }
                                         var count = result.rowsAffected;
										 console.log(count);
                                         callback(null, count);
										 doRelease(connection);
                                    });
                                 }
								 */
                ]

                /*,
                                 function (err, result) {
                                    //console.log("Done" + result);
                                }
								*/
            );
        });



    function doRelease(connection) {
        connection.close(
            function(err) {
                if (err) {
                    console.error(err.message);
                }
            });
    }

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
