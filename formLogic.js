//user info form html
let profileForm=document.querySelector("#profileSetup");
let nameInput=document.querySelector("#name");
let careerInput=document.querySelector("#career");
let offeringAInput=document.querySelector("#offering");
let seekingAInput=document.querySelector("#seeking");

//take input from form and return as object
let takeInfo=(e)=>{
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