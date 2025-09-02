let button = document.getElementById("btn")
let InputBar = document.getElementById("InputBar")
let text = document.querySelector(".text")
let wordSearched = document.querySelector(".WordSearched")
let phonetics = document.querySelector(".phonetics")
let partOfSpeech = document.querySelector(".partOfSpeech")
let Meaning = document.querySelector(".Meaning")


let URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

button.addEventListener("click",()=>{

    let InputValue = InputBar.value.trim() //trims the word added into the input bar

    if(InputValue === " "){
        alert("Input a Word")
        return
    }

    fetch(`${URL}${InputValue}`)//first check if the response is okay
    .then(response => {
        if(!response.ok){
            if(response.status === 404){
                throw new Error("Word not found!,Check the spelling")
            }else{
                throw new Error(`HTTPS RESPONSE: ${response.status}`)
            }
        }
        return response.json()
    })
    .then(data => {
        //check if the data is an array
        if(Array.isArray(data) && data.length > 0){
        console.log(data[0].meanings[0]);
        Meaning.innerHTML = data[0].meanings[0].definitions[0].definition
        wordSearched.innerHTML = data[0].word
        phonetics.innerHTML = data[0].phonetic || "N/A"
        partOfSpeech.innerHTML = data[0].meanings[0].partOfSpeech
        }else{
            throw new Error("invalid response from the Api")
        }
    })
})



