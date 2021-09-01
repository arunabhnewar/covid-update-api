const details = document.getElementById('details');
const errorMsg = document.createElement('div');
// const notFoundMsg = document.createElement(div);
const spinner = document.getElementById('spinner');

const searchData = () => {
    const searchField = document.getElementById('search-field');
    const searchInText = searchField.value;
    // empty search field
    if (searchInText == '') {
        errorMsg.innerHTML = `
            <div class="d-flex justify-content-center">
                <p class="error-text">⚠️ Please search with a valid country name ⚠️</p>
            </div>`
        details.innerHTML = "";
        details.appendChild(errorMsg);
    }
    else {
        // clear data 
        searchField.value = '';
        // api
        const url = `https://api.covid19api.com/total/country/${searchInText}`
        spinner.classList.remove('d-none');
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // setting a timer of 1s,before removing the spinner, and showing data
                setTimeout(() => {
                    spinner.classList.add('d-none');
                    displayData(data);
                }, 1000);
            })
    }
}

const displayData = covidArray => {
    // error handle
    if (covidArray.message === 'Not Found') {
        errorMsg.innerHTML = `
            <div class="d-flex justify-content-center">
                <p class="error-text">⚠️ Not result found ⚠️</p>
            </div>`
        details.innerHTML = "";
        details.appendChild(errorMsg);
    }
    else {
        errorMsg.innerHTML = '';
    }
    const latestUpdate = covidArray[covidArray.length - 1];
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mx-auto mt-5 details-card" style="width: 18rem;">
        <div class="card-body card-data">
            <h5 class="card-title text-center title">${latestUpdate.Country}</h5>
            <hr>
            <h6 class="card-subtitle mb-2 confirmed-detail">Confirmed: ${latestUpdate.Confirmed}</h6>
            <h6 class="card-subtitle mb-2 active-detail">Active: ${latestUpdate.Active}</h6>
            <h6 class="card-subtitle mb-2 death-detail">Deaths: ${latestUpdate.Deaths}</h6>
            <h6 class="card-subtitle mb-2 date-detail">Date: ${latestUpdate.Date.slice(0, 10)}</h6>
        </div>
    </div>
    `
    details.innerHTML = "";
    details.appendChild(div);
}