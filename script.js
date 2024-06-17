const dropdowns = document.querySelectorAll('.select-container select');
const button=document.querySelector('.submit');
const input=document.querySelector('.input');
const from_curr=document.querySelector('.from div select');
const to_curr=document.querySelector('.to div select');
const p=document.querySelector('.info');

dropdowns.forEach((dropdown) => {
    for(country in countryList){
        let newOption =document.createElement('option');
        newOption.value=country;
        newOption.innerText=country;
        if(country==="USD" && dropdown.name==="from"){
            newOption.selected="selected";
        }
        else if(country==="INR" && dropdown.name==="to"){
            newOption.selected="selected";
        }
        dropdown.append(newOption);
    }
    dropdown.addEventListener('change',(e)=>{updateFlag(e.target)})
})

const updateFlag = (ele) =>{
    let country=ele.value;
    let countrycode=countryList[country];
    let link=`https://flagsapi.com/${countrycode}/flat/32.png`;
    let img=ele.parentElement.querySelector('img');
    img.src=link;
}

button.addEventListener('click',async(e)=>{
    e.preventDefault();
    let amount=input.value;
    if(!(amount>1)){
        amount=1;
        input.value=1;
    }
    const url=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_U7oq8nVvOqgCkK3jZQo6GQi2o3aULN12heb0qQ2L&currencies=${to_curr.value}&base_currency=${from_curr.value}`;
    let response = await fetch(url);
    let info = await response.json();
    let data=info['data'];
    let rate=data[to_curr.value];
    let finalamount = rate*amount;
    p.innerText = `${amount} ${from_curr.value} = ${finalamount} ${to_curr.value}`;
})