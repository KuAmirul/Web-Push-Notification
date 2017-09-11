'use strict';

// applicationServerPublicKey is the value generated in server.js file, refer to 'server.js' file on how to retrieve the keys
// After the keys are generated, repalce the # with the respective keys
const applicationServerPublicKey = '#';


const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

// Function to encode server keys
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//Firebase anonymous authentication
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        //var uid = user.uid;
        // 
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);

        function addUser(endpoint, auth, p256dh) {
            var rootRef = firebase.database().ref().child('accounts').child(uid).set({
                endpoint: endpoint
            })

            var keyRef = firebase.database().ref().child('accounts').child(uid).child('keys').set({
                auth: auth,
                p256dh: p256dh
            })

        }



        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js')
                .then(function(swReg) {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                })
                .catch(function(error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging is not supported');
            pushButton.textContent = 'Push Not Supported';
        }

        function initialiseUI() {
            pushButton.addEventListener('click', function() {
                pushButton.disabled = true;
                if (isSubscribed) {
                    unsubscribeUser();
                } else {
                    subscribeUser();
                }
            });

            // Set the initial subscription value
            swRegistration.pushManager.getSubscription()
                .then(function(subscription) {
                    isSubscribed = !(subscription === null);

                    updateSubscriptionOnServer(subscription);

                    if (isSubscribed) {
                        console.log('User IS subscribed.');
                    } else {
                        console.log('User is NOT subscribed.');
                    }

                    updateBtn();
                });
        }

        //Funtion to update button whenever clicked
        function updateBtn() {
            if (Notification.permission === 'denied') {
                pushButton.textContent = 'Push Messaging Blocked.';
                pushButton.disabled = true;
                updateSubscriptionOnServer(null);
                return;
            }

            if (isSubscribed) {
                pushButton.textContent = 'Disable Push Messaging';
            } else {
                pushButton.textContent = 'Enable Push Messaging';
            }

            pushButton.disabled = false;
        }

        navigator.serviceWorker.register('sw.js')
            .then(function(swReg) {
                console.log('Service Worker is registered', swReg);

                swRegistration = swReg;
                initialiseUI();
            })

        //Function to store user subscription
        function subscribeUser() {
            const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
            swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                })
                .then(function(subscription) {
                    console.log('User is subscribed.');
                    //console.log(JSON.stringify(subscription));
                    var target = subscription.toJSON();
                    //console.log(target);
                    var endpoint = target.endpoint;
                    console.log(endpoint);
                    var auth = target.keys.auth;
                    //console.log(mytext);
                    var p256dh = target.keys.p256dh;
                    console.log(p256dh);
                    addUser(endpoint, auth, p256dh);


                    updateSubscriptionOnServer(subscription);

                    isSubscribed = true;

                    updateBtn();
                })
                .catch(function(err) {
                    console.log('Failed to subscribe the user: ', err);
                    updateBtn();
                });
        }

        function updateSubscriptionOnServer(subscription) {
            const subscriptionJson = document.querySelector('.js-subscription-json');
            const subscriptionDetails =
                document.querySelector('.js-subscription-details');

            if (subscription) {
                subscriptionJson.textContent = JSON.stringify(subscription);
                subscriptionDetails.classList.remove('is-invisible');
            } else {
                subscriptionDetails.classList.add('is-invisible');
            }
        }

        function unsubscribeUser() {
            swRegistration.pushManager.getSubscription()
                .then(function(subscription) {
                    if (subscription) {
                        return subscription.unsubscribe();
                    }
                })
                .catch(function(error) {
                    console.log('Error unsubscribing', error);
                })
                .then(function() {
                    updateSubscriptionOnServer(null);

                    console.log('User is unsubscribed.');
                    isSubscribed = false;

                    updateBtn();
                });
        }



    } else {
        // User is signed out.
        // ...
    }
    // ...
});
