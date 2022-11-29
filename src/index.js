//(FOR PROFILE PAGE)
//firebase database 
import {initializeApp} from "firebase/app";
import { getFirestore, collection, getDocs, addDoc  } from 'firebase/firestore';
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
//adding user info to database (db), moved to takeInfo function
// try{
//     const docRef= await addDoc(collection(db, "users"), {
//         name:"testName"
//     });
//     console.log("User added!");
// }
// catch(e){
//     console.error("Error adding doc:", e);
// }

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
    //update firebase
    try{
        const docRef= await addDoc(collection(db, "users"), profile);
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
let formIsVisible=true;

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

//pull info if signed in and form filled previously
let fillProfile=async ()=>{
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});
    displayProfile(userInfo)
}

