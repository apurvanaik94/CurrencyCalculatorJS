
let baseUrl=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024/v1/currencies/`;
let fromCurr=document.querySelector("#from-currency");
let toCurr=document.querySelector("#to-currency");
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");


for(let select of dropdowns){   
    for (currCode in countryList){       
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name ==="from-currency" && currCode==="USD")
            {
                newOption.selected=true;
            }
        else if(select.name ==="to-currency" && currCode==="INR")
            {
                newOption.selected=true;
            }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
    });
}

const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelectorAll("img");
    img[0].src=newSrc;
}

const getExchangeRate=async ()=>{
    let amount=document.querySelector("#amount")
let amountVal=amount.value;
if(amountVal=="" || amountVal<0)
    {
        amount.value=1;
        amount=1
    }  
    let url=`${baseUrl}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
       
    let data= await response.json();
    let exchangeValues=data[fromCurr.value.toLowerCase()];
    for(val in exchangeValues)
        {
            if(val===toCurr.value.toLowerCase())
            {
                let exchangeRate=exchangeValues[val];
                console.log(exchangeRate);
                let finalAmt=amountVal*exchangeRate;
                let msg=`${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
                document.querySelector(".msg").innerText=msg;               
            };
        }
}

btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
getExchangeRate();
});
window.addEventListener("load",getExchangeRate);