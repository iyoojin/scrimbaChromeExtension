// Variables
const inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// function to render leads
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //   ulEl.innerHTML += `<li>${myLeads[i]}</li>`;
    //   const li = document.createElement("li");
    //   li.textContent = myLeads[i];
    //   ulEl.append(li);
    listItems += `
          <li>
              <a target='_blank' href='${leads[i]}'> 
                  ${leads[i]} 
              </a>
          </li>
      `;
  }
  ulEl.innerHTML = listItems;
}

// Event Listeners
inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem(`myLeads`, JSON.stringify(myLeads));
  render(myLeads);
});

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem(`myLeads`, JSON.stringify(myLeads));
    render(myLeads);
  }
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
