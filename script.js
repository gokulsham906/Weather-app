// http://api.weatherapi.com/v1/current.json?key=c20b2b3e2ea74df1bfc11316252305&q=mumbai&aqi=no

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:first-child");
const dateandTimeField = document.querySelector(".time_location p:last-child");
const conditionField = document.querySelector(".condition p:last-child");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let targetLocation = "Lucknow";

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=c20b2b3e2ea74df1bfc11316252305&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
    let [date, timePart] = time.split(" ");
    let currentDay = getDayName(new Date(date).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${timePart} - ${currentDay} ${date}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    const target = searchField.value;
    fetchResults(target);
}

fetchResults(targetLocation);

function getDayName(number) {
    switch (number) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
}
