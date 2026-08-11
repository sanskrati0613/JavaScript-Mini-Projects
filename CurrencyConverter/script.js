const BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");
const exchange = document.querySelector(".exchange");


for(let select of dropdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = Number(amount.value);
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    const URL = `${BASE_URL}${fromCurr.value}`;
    //console.log(URL);
    let response = await fetch(URL);
    //console.log(response);
    let data = await response.json();
    //console.log(data);
    let rate = data.rates[toCurr.value];

    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const exchangeCurrencies = () => {
    let temp = fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

exchange.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchangeCurrencies();
    updateExchangeRate();
});

fromCurr.addEventListener("change", () =>{
    updateExchangeRate();
});

toCurr.addEventListener("change", () =>{
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
