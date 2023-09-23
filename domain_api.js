var input = document.getElementById("domain_search");

//popular bundle .com, .net, .org
function showPopularBundle() {
    let popularItemDiv = document.getElementsByClassName('popular_tld');
    let popularItem = [];
    var dm_bundle_price = 0;
    // document.getElementsByClassName('popular_bundle')[0].innerHTML = "";
    document.getElementsByClassName('dm_result_bundle')[0].innerHTML = '';

    //domain price 
    const domainPrice = {
        'com': '250',
        'net': '180',
        'org': '200',
    };

    document.getElementsByClassName('dm_result_bundle')[0].innerHTML = '';

    // let popularItemDiv = document.getElementsByClassName('popular_tld')[0].dataset.tld;
    if (popularItemDiv.length > 0) {
        let html = [];
        html =
            `
            <div class="dm_element">
                <!-- left domain info -->
                <div style="display: flex;align-items: center;" class="dm_element_left">
                    
                    
                    <div style="padding:8px 15px" >
                        <div class='dm_name popular_bundle' style="color:black; margin-bottom:5px"></div>
                        <div class="availability" style="color:black">
                        For registration only. Renewals are normal price.
                        </div> 
                    </div>
                </div>

                <!-- right price and card btn -->
                <div class="dm_element_right " >
                <div class="dm_price dm_bundle_price">

                    </div>
                    <div class="dm_btn">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div> 
            `;
        document.getElementsByClassName('dm_result_bundle')[0].innerHTML = html;

        for (let a = 0; a < popularItemDiv.length; a++) {
            // popularItem.push(popularItemDiv[a].dataset.tld);
            document.getElementsByClassName('popular_bundle')[0].innerHTML += "." + popularItemDiv[a].dataset.tld + " ";
            dm_bundle_price += parseInt(domainPrice[popularItemDiv[a].dataset.tld]);
            document.getElementsByClassName('dm_bundle_price')[0].innerHTML = dm_bundle_price + " TK";

        }
        // console.log(domainPrice['dataset.tld']);

    } else {
        html =
            `
            <div class="dm_element" style="margin-top:3px !important; border-radius:8px; overflow:hidden;">
                <!-- left domain info -->
                <div style="display: flex;align-items: center;" class="dm_element_left">
                    
                    
                    <div style="padding:8px 15px" >
                        <div class='dm_name popular_bundle' style="color:red; margin-bottom:5px">No Bundle Were Found !</div>
                        <div class="availability" style="color:red">
                        </div> 
                    </div>
                </div>

                <!-- right price and card btn -->
                <div class="dm_element_right " >
                <div class="dm_price dm_bundle_price">

                    </div>
                </div>
            </div> 
            `;
        document.getElementsByClassName('dm_result_bundle')[0].innerHTML = html;
    }

}


function hasPreviousSearch() {
    let input = document.getElementById("domain_search");
    let hasLocalSearchItem = localStorage.getItem("domainSearch");
    // console.log(hasLocalSearchItem);


    if (input.value != "") {

        //if input aren't empty
        localStorage.removeItem('domainCard'); //clear card
        localStorage.setItem('domainSearch', JSON.stringify(input.value)); //get localstorage
        doApi(input.value);

    } else {

        //has input value
        if (hasLocalSearchItem != null) { //localstorage is present
            if (hasLocalSearchItem != "") { //localstorate not empty;
                let getLocalSearchItem = JSON.parse(hasLocalSearchItem);
                input.value = getLocalSearchItem;
                doApi(getLocalSearchItem);
            }
        }

    }
}

hasPreviousSearch();
/*
this hasPreviousSearch() function check if input is empty or not;
if empty then check any data save info localstorage in browser;
if input empty and localstorage present it call doApi() function with localdata, 
if input empty and localstorage are not present nothing happen;
if there is no localdata present and input not empty, it call doApi() with input value, and save data to localstorage;;
*/


//main api function
function doApi(localSearchData) {

    //api required data
    const X_RapidAPI_Key = '9715ad5b67msh29e1ed7d944594ep10ae37jsna4e2df913318';
    const X_RapidAPI_host = 'domainr.p.rapidapi.com';
    const apiUriSearch = 'https://domainr.p.rapidapi.com/v2/search';
    const apiUriStatus = 'https://domainr.p.rapidapi.com/v2/status';
    // const query = event.target.value;
    const query = localSearchData ? localSearchData : document.getElementById('domain_search').value;
    // const ablDomain = document.getElementsByClassName('availability');
    // const dm_element = document.getElementsByClassName('dm_element');
    // const dm_icon = document.getElementsByClassName('dm_icon');
    // const cardBtn = document.getElementsByClassName('addToCard');


    const domainPrice = {
        'com': '250 TK',
        'net': '180 TK',
        'org': '200 TK',
    };

    if (query != "") { //input not empty

        /**
         * make ajux for searching domain
         * this ajux call an api and get all relative domain against input value;
         */
        axios.get(apiUriSearch, {
                params: {
                    'mashape-key': '9715ad5b67msh29e1ed7d944594ep10ae37jsna4e2df913318',
                    'query': query,
                },
                headers: {
                    'X-RapidAPI-Key': X_RapidAPI_Key,
                    'X-RapidAPI-Host': X_RapidAPI_host,
                }
            })
            .then((response) => {

                // console.log(response.data.results);
                let Html = [];
                document.getElementsByClassName('dm_result_popular')[0].innerHTML = '';
                response.data.results.forEach((element, index) => {
                    // console.log(element);

                    //show ajux loading
                    // ablDomain[index].innerHTML = 'Finding ..'

                    /**
                     * we get enough data by response.
                     * but we dosn't get any domain are available or not.
                     * so we have to call another api to get this domain are active or not.
                     * we foreach all response an get domain active or not.
                     */
                    axios.get(apiUriStatus, {
                            params: {
                                'mashape-key': '9715ad5b67msh29e1ed7d944594ep10ae37jsna4e2df913318',
                                'domain': element.domain,
                            },
                            headers: {
                                'X-RapidAPI-Key': X_RapidAPI_Key,
                                'X-RapidAPI-Host': X_RapidAPI_host,
                            }
                        })
                        .then((response) => {

                            // console.log(response.data.status[0].zone);
                            // console.log(ablDomain[abl]);
                            // let Dname = response.data.status[0].zone;

                            if (response.data.status[0].zone == 'com' || response.data.status[0].zone == "net" || response.data.status[0].zone == "org") {

                                //if TLD is .com or .net or .org
                                if (response.data.status[0].summary == 'inactive') { //if TLD .com, .net, .org are not active. availabel for purches now.

                                    let popData =
                                        `
                                    <div class="dm_element">
                                        <!-- left domain info -->
                                        <div style="display: flex;align-items: center;" class="dm_element_left">
                                            
                                            <div class="dm_icon" style="color:green"><i class="fa-solid fa-circle-check"></i></div>
                                            <div style="padding:3px" >
                                                <div class='dm_name' style="color:green">${element.domain}</div>
                                                <div class="availability" style="color:green">
                                                Buy Now
                                                </div>
                                            </div>
                                        </div>

                                        <!-- right price and card btn -->
                                        <div class="dm_element_right " >
                                            <div class="dm_price">
                                                ${domainPrice[element.zone] ?? "10"}
                                            </div>
                                            <div class="dm_btn addToCard ${element.domain} popular_tld" data-tld="${element.zone}" data-active="yes"  data-price="${domainPrice[element.zone] ?? '10'}" data-vat="5" data-name="${element.domain}"  onclick="addToCard(this)">
                                                <i class="fa-solid fa-plus"></i>
                                            </div>
                                        </div>
                                    </div> 
                                    `;
                                    document.getElementsByClassName('dm_result_popular')[0].innerHTML += popData;
                                } else {
                                    let popData =
                                        `<div class="dm_element">
                                        <!-- left domain info -->
                                        <div style="display: flex;align-items: center;" class="dm_element_left">
                                            
                                            <div class="dm_icon" style="color:red"><i class="fa-solid fa-circle-xmark"></i></div>
                                            <div style="padding:3px" >
                                                <div class='dm_name' style="color:red">${element.domain}</div>
                                                <div class="availability" style="color:red">
                                                Already Sold
                                                </div>
                                            </div>
                                        </div>

                                        <!-- right price and card btn -->
                                        <div class="dm_element_right " >
                                            <div class="dm_price">
                                                ${domainPrice[element.zone] ?? "10"}
                                            </div>
                                            <div class="dm_btn addToCard ${element.domain}" data-price="${domainPrice[element.zone] ?? '10'}" data-vat="5" data-name="${element.domain}" data-i="${index}" onclick="addToCard(this)">
                                                <i class="fa-solid fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                    document.getElementsByClassName('dm_result_popular')[0].innerHTML += popData;

                                }
                                // console.log('get');
                            } else { //TLD are not .com or .net or .org

                                if (response.data.status[0].summary == 'inactive') {
                                    // console.log(response.data.status[0]);
                                    // let bundleHtml = [];
                                    Html +=
                                        `
                                            <div class="dm_element">
                                                <!-- left domain info -->
                                                <div style="display: flex;align-items: center;" class="dm_element_left">
                                                    
                                                    <div class="dm_icon" style="color:green"><i class="fa-solid fa-circle-check"></i></div>
                                                    <div style="padding:3px" >
                                                        <div class='dm_name' style="color:green">${element.domain}</div>
                                                        <div class="availability" style="color:green">
                                                        Buy Now
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- right price and card btn -->
                                                <div class="dm_element_right " >
                                                    <div class="dm_price">
                                                        ${domainPrice[element.zone]?? '10 TK'}
                                                    </div>
                                                    <div class="dm_btn addToCard ${element.domain}" data-price="${domainPrice[element.zone] ?? '10'}" data-vat="5" data-name="${element.domain}"  onclick="addToCard(this)">
                                                        <i class="fa-solid fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>    
                                        `;

                                    document.getElementById('ds_result_show').innerHTML = Html;




                                    // ablDomain[index].innerHTML = 'Buy Now'
                                    // dm_element[index].style.color = 'green';
                                    // dm_icon[index].innerHTML =
                                    //     `<i class="fa-solid fa-circle-check"></i>`;
                                    // dm_icon[index].style.color = 'green';



                                } else {

                                    Html +=
                                        `
                                        <div class="dm_element">
                                            <!-- left domain info -->
                                            <div style="display: flex;align-items: center;" class="dm_element_left">
                                                
                                                <div class="dm_icon" style="color:red"><i class="fa-solid fa-circle-xmark"></i></div>
                                                <div style="padding:3px" >
                                                    <div class='dm_name' style="color:red">${element.domain}</div>
                                                    <div class="availability" style="color:red">
                                                    Already Sold
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- right price and card btn -->
                                            <div class="dm_element_right " >
                                                <div class="dm_price">
                                                    ${domainPrice[element.zone] ?? "10 TK"}
                                                </div>
                                                <div class="dm_btn addToCard ${element.domain}" data-price="${domainPrice[element.zone] ?? '10'}" data-vat="5" data-name="${element.domain}" data-i="${index}" onclick="addToCard(this)">
                                                    <i class="fa-solid fa-plus"></i>
                                                </div>
                                            </div>
                                        </div>    
                                    `;
                                    document.getElementById('ds_result_show').innerHTML = Html;

                                    // document.getElementById('ds_result_show').innerHTML = Html;



                                    // dm_icon[index].innerHTML =
                                    //     `<i class="fa-solid fa-circle-xmark"></i>`;
                                    // dm_icon[index].style.color = 'red';
                                    // dm_element[index].style.color = 'red';
                                    // ablDomain[index].innerHTML = 'Already Sold'
                                }

                            }

                            // cardBtn[index].setAttribute('data-name', Dname);
                            // cardBtn[index].setAttribute('data-price', '50');
                            // cardBtn[index].setAttribute('data-vat', '0');

                            showPopularBundle();
                        })

                });

            })
            .then((error) => {
                console.log(error);
            })
    } else { //if input value is empty
        document.getElementById('ds_result_show').innerHTML = '';
    }
}

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {

        hasPreviousSearch();
        /**
         * exicute this function directly if click on search icon.
         * 
         */
    };
});