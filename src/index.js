//(FOR PROFILE PAGE)
//firebase database 
import {initializeApp} from "firebase/app";
import { getFirestore, collection,doc, getDoc, addDoc,setDoc } from 'firebase/firestore';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';
const firebaseConfig={
    apiKey: "AIzaSyBdSlFUW_twevViRkbYj4oN6BA73Jgd4pU",
    authDomain: "cfa-intern-chat.firebaseapp.com",
    projectId: "cfa-intern-chat",
    storageBucket: "cfa-intern-chat.appspot.com",
    messagingSenderId: "665578109167",
    appId: "1:665578109167:web:bda7a613f9a965932e831a"
};
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//user info form html
let profileForm=document.querySelector("#profileSetup");
let nameInput=document.querySelector("#name");
let careerInput=document.querySelector("#career");
let offeringAInput=document.querySelector("#offering");
let seekingAInput=document.querySelector("#seeking");

//take input from form and return as object
async function takeInfo(e){
    e.preventDefault();
    let profile={
        myName:nameInput.value,
        career:careerInput.value,
        offeringAdvice:offeringAInput.checked,
        seekingAdvice:seekingAInput.checked,
    };
    console.log(profile);
    //will be called onLoad when Firebase is set up and can save whether form has been filled by user already.
    displayProfile(profile);
    toggleForm();
    // return profile;
    //set email as key
    let myKey=getAuth().currentUser.email;
    //update firebase
    try{
        const docRef= await setDoc(doc(db, "users", myKey), profile);
        console.log("User added!");
    }
    catch(e){
        console.error("Error adding doc:", e);
    }
}

//user info display html
let profileDisplay=document.querySelector("#profileDisplay");
let nameDisplay= document.querySelector("#nameDisplay");
let careerDisplay= document.querySelector("#careerDisplay");
let offeringDisplay= document.querySelector("#offeringDisplay");
let seekingDisplay= document.querySelector("#seekingDisplay");

//display user's profile info, (takes userInfo object, taken from form or database if already filled)
//will be called onLoad when Firebase is set up and can save whether form has been filled by user already.
let displayProfile=(userInfo)=>{
    nameDisplay.innerHTML="Name: "+userInfo.myName;
    careerDisplay.innerHTML="Career: "+userInfo.career;
    offeringDisplay.innerHTML="Offering: "+userInfo.offeringAdvice;
    seekingDisplay.innerHTML="Seeking: "+userInfo.seekingAdvice;
}
profileForm.addEventListener("submit", takeInfo);
let editInfo= document.querySelector("#editInfo");
let formIsVisible=false;

//toggle visibility: hide/show form and hide/show edit button
let toggleForm=()=>{
    if(formIsVisible){
        profileForm.classList.add("hidden");
        editInfo.classList.remove("hidden");
        formIsVisible=false;
    }
    else{
        profileForm.classList.remove("hidden");
        editInfo.classList.add("hidden");
        formIsVisible=true;
    }
}
editInfo.addEventListener("click",toggleForm);

//cancel button, closes form without submitting
let cancelButton=document.querySelector("#cancelChange");
cancelButton.addEventListener("click", toggleForm);

//sign in
const provider = new GoogleAuthProvider();
async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    // var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
let signInButton=document.querySelector("#signIn");
signInButton.addEventListener("click", signIn);

//sign out
function signOutUser() {
    signOut(getAuth());
    clearProfile();
    console.log("Signed out");
}
let signOutButton=document.querySelector("#signOut");
signOutButton.addEventListener("click", ()=>{signOutUser()});
//pull info if signed in and form filled previously
let fillProfile=async ()=>{
    const querySnapshot = await getDoc(doc(db, "users",getAuth().currentUser.email));
    let userInfo=querySnapshot.data();
    displayProfile(userInfo);
}
//clear profile display
let clearProfile=()=>{
    displayProfile({
        myName:"",
        career:"",
        offeringAdvice:"",
        seekingAdvice:"",
    })
}
//pull submitted info if signed in
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user.displayName);
    fillProfile();
  } else {
    // User is signed out
  }
});

// //logs current user
// let whoAmI=()=>{
//     console.log(getAuth().currentUser.displayName);
// }
// let whoAmIButton=document.querySelector("#whoAmI");
// whoAmIButton.addEventListener("click", ()=>{whoAmI()});

//pull info
