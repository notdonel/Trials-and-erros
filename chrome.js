//chrome://extensions/
// Get From HTML & variables
let inputBtn=document.getElementById("input-btn")
let myLeads=[]
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
// Functions   
if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}
inputBtn.addEventListener("click", function (){
myLeads.push(inputEl.value) 
inputEl.value=""
localStorage.setItem("myLeads",JSON.stringify(myLeads))
render(myLeads)
console.log(localStorage.getItem(myLeads))
}) 


function render(leads){
let  listItems=""
 for(i=0;i<myLeads.length;i++){
    listItems+=`
    <li> 
    <a target='_blank' href='${leads[i]}'> ${leads[i]}</a>
    </li>`
}
ulEl.innerHTML=listItems   
}

deleteBtn.addEventListener("dblclick",function(){
    console.log("double clicked!")
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})
// Save tab
tabBtn.addEventListener("click",function(){ 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    });
})
