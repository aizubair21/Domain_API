function addToCard(e) {
    // const card_item = document.getElementsByClassName('dm_card_item');
    // const card_subtotal = document.getElementsByClassName('dm_card_subtotal');
    // const card_total = document.getElementsByClassName('dm_card_total');
    // const card_vat = document.getElementsByClassName('dm_card_vat');

    //get domain info by click add button
    let Dname = e.dataset.name;
    let Dprice = e.dataset.price;
    let Dvat = e.dataset.vat;
    let localIndex = 0;
    let data = [];

    let card = {
        name: Dname,
        price: Dprice,
        qty: '1',
        vat: Dvat,
    };
    let card2 = [{
        name: Dname,
        price: Dprice,
        qty: '1',
        vat: Dvat,
    }];


    let check = localStorage.getItem('domainCard'); //get localstorage data


    // console.log(check = [].localStorage.getItem('card'));

    // if (data = "" || data == null || data === 'null') {
    // } 
    // else {
    //     // let localData = JSON.parse(localStorage.getItem('domainCard'));
    //     console.log(JSON.parse(localStorage.getItem('domainCard')));
    // }



    //set array to localStorage
    if (check == null) { //if domainCard key not exist in localstorage;
        // console.log('null');
        localStorage.setItem('domainCard', JSON.stringify(card2));

    } else { //if key exist
        // console.log('not null');
        data = JSON.parse(localStorage.getItem('domainCard'));
        data.push(card);
        localStorage.setItem('domainCard', JSON.stringify(data));
    }

    //get all localstorage data after set
    if (check != null) {
        let datas = JSON.parse(localStorage.getItem('domainCard'));
        localIndex = datas.length - 1;
        e.setAttribute('data-index', localIndex);
        // console.log(localIndex);
    }

    // if (check != null && check.length > 0) {
    //     //for each throught localStorage data
    //     datas.forEach(cardItem => {
    //         subTotal += parseInt(cardItem.price);
    //     });
    // }


    showCheckOutInfo();
    displayCardItem();
    changeBtnIfInCard();

}

function showCheckOutInfo() {
    let datas;
    let subTotal = 0;
    let vat = 0;
    let total = 0;

    const card_item = document.getElementsByClassName('dm_card_item');
    const card_subtotal = document.getElementsByClassName('dm_card_subtotal');
    const card_total = document.getElementsByClassName('dm_card_total');
    const card_vat = document.getElementsByClassName('dm_card_vat');

    const card_item_input = document.getElementsByClassName('dm_card_item_input');
    const card_subtotal_input = document.getElementsByClassName('dm_card_subtotal_input');
    const card_vat_input = document.getElementsByClassName('dm_card_vat_input');
    const card_total_input = document.getElementsByClassName('dm_card_total_input');


    let check = localStorage.getItem('domainCard');

    if (check != null && check.length > 0) {

        datas = JSON.parse(localStorage.getItem('domainCard'));
        //for each throught localStorage data
        datas.forEach(cardItem => {
            subTotal += parseInt(cardItem.price);
            vat += parseInt(cardItem.vat);
        });

        let withoutVat = subTotal / 100 * vat;
        card_item[0].innerHTML = datas.length;
        card_subtotal[0].innerHTML = "৳" + subTotal + " TK";
        card_vat[0].innerHTML = vat + "% ( " + withoutVat + " TK )";
        total = (subTotal - withoutVat);
        card_total[0].innerHTML = "৳" + total + " TK";
        card_total[1].innerHTML = "৳" + total + " TK";

        // console.log(subTotal / 100 * vat);

        card_item_input[0].value = datas.length;
        card_subtotal_input[0].value = subTotal;
        card_vat_input[0].value = vat;
        card_total_input[0].value = total;

    } else {
        card_item[0].innerHTML = 0;
        card_subtotal[0].innerHTML = 0;
        card_vat[0].innerHTML = 0;
        card_total[0].innerHTML = 0;

        card_item_input[0].value = 'item';
        card_subtotal_input[0].value = 'subtotal';
        card_vat_input[0].value = 'vat';
        card_total_input[0].value = 'total';
        card_total[1].innerHTML = '0';
    }

    displayCardItem();
}

function changeBtnIfInCard() {
    let check = localStorage.getItem('domainCard');

    let localData = JSON.parse(check);
    let plusBtn = document.getElementsByClassName('addToCard');
    if (check != null) { //has data in localstorage
        for (let i = 0; i < plusBtn.length; i++) {
            plusBtn[i].innerHTML = ` <i class="fa-solid fa-plus"></i>`;
            plusBtn[i].setAttribute('onclick', 'addToCard(this)');
            // addBtn[i].innerHTML = `<i class="fa-solid fa-shoping-basket"></i>`;

        }
        localData.forEach(cardItem => {
            let name = cardItem.name;
            // console.log(document.getElementsByClassName(`'${name}'`));
            if (document.getElementsByClassName(name)[0] != undefined) {
                document.getElementsByClassName(name)[0].innerHTML = `<a style="color:white; font-size:12px;" href="#"><i class="fa-solid fa-cart-shopping"></i></a>`; //change plus button with shoping icon alongist anchor tag
                document.getElementsByClassName(name)[0].removeAttribute('onclick'); //remove onlicck attribute
            }
        })

    } else {
        for (let i = 0; i < plusBtn.length; i++) {
            plusBtn[i].innerHTML = ` <i class="fa-solid fa-plus"></i>`;
            plusBtn[i].setAttribute('onclick', 'addToCard(this)');
            // addBtn[i].innerHTML = `<i class="fa-solid fa-shoping-basket"></i>`;

        }
    }
}

function clearCard() {
    localStorage.removeItem('domainCard')
    changeBtnIfInCard();
    showCheckOutInfo();
}

function displayCardItem() {
    let data = [];
    let div = '';
    data = JSON.parse(localStorage.getItem('domainCard'));
    if (localStorage.getItem('domainCard') != null) {
        data.forEach((dm, index) => {
            div +=
                `
            <div class='domain_item'>
                <div class='name'>${dm.name}</div>
                <div class='cross_btn' data-index="${index}" onclick="removeFromCard(this)">-</div>
            </div>
            `;

        });
        document.getElementsByClassName('dm_card_domain_show')[0].innerHTML = div;
    } else {

        document.getElementsByClassName('dm_card_domain_show')[0].innerHTML = '';
    }
}

//remove a card item
function removeFromCard(e) {
    let localIndex = e.dataset.index;
    let localData = [];

    localData = JSON.parse(localStorage.getItem('domainCard'));
    localData.splice(localIndex, 1);
    localStorage.setItem('domainCard', JSON.stringify(localData));
    displayCardItem();
    showCheckOutInfo();
    changeBtnIfInCard();
    // console.log(localData);
}

setTimeout(() => {
    changeBtnIfInCard();
}, 1000);

displayCardItem();
showCheckOutInfo();