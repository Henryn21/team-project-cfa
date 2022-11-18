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
    return profile;
}
profileForm.addEventListener("submit", takeInfo);

