// task 5

const select = document.getElementById("list");
const input = document.getElementById("count-5");
const output = document.getElementById("answer-5");
const errorlog = document.getElementById("errorlog-5");
calc = () => {
    if (isNaN(input.value) || input.value < 0) { // валидация данных
        errorlog.style.display = "block";
        errorlog.innerText = "Ошибка, введенные данные некорректны";
        return -1;
    }
    errorlog.style.display = "none";
    output.innerText = select.value * input.value;
}

const button = document.getElementById("button-5");
window.addEventListener('DOMContentLoaded', function (event) {
    button.addEventListener("click", calc);
});

// task 6

const products = {
    "product1": {
        "name": "Стартовый",
        "price": 39,
        "subproducts": [
            {
                "name": "4гб RAMg + 1тб HDD",
                "price": 39
            },
            {
                "name": "6гб RAM + 1тб HDD",
                price: 49,
            },
        ],
        "subproperty": { }
    },
    "product2": {
        "name": "Средний",
        "price": 99,
        "subproducts": [
            {
                "name": "8гб RAM + 1тб HDD",
                "price": 99
            },
            {
                "name": "12гб RAM + 2тб HDD",
                "price": 129
            },
            {
                "name": "16гб RAM + 2тб HDD + 512гб SSD",
                "price": 139
            },
            {
                "name": "32гб RAM + 5тб HDD + 1тб SSD",
                "price": 159
            }
        ],
        "subproperty": { }
    },
    "product3": {
        "name": "Продвинутый",
        "price": 159,
        "subproducts": [ ],
        "subproperty": {
            "name": "Свой домен",
            "multiplier": 1.1
        }
    },
    "product4": {
        "name": "Эксперт",
        "price": 259,
        "subproducts": [
            {
                "name": "32гб RAM + 50тб HDD + 10тб SSD",
                "price": 259
            },
            {
                "name": "64гб RAM + 100тб HDD + 40тб SSD",
                "price": 359
            },
            {
                "name": "64гб RAM + 1000тб HDD + 100тб SSD",
                "price": 499
            },
        ],
        "subproperty": {
            "name": "Максимальная производительность",
            "multiplier": 1.23
        }
    }
}
function loadProductsEl(productsEl) {
    for (let i = 1; i <= Object.keys(products).length; i++) {
        let productEl = document.createElement("div");
        let productRadioEl = document.createElement("input");

        productRadioEl.setAttribute("type", "radio");
        productRadioEl.setAttribute("id", `radio-${i}`);
        productRadioEl.setAttribute("value", `product${i}`);
        productRadioEl.setAttribute("name", "product-type");
        productEl.appendChild(productRadioEl);

        let productRadioLabelEl = document.createElement("label");
        productRadioLabelEl.setAttribute("for", `radio-${i}`);
        productRadioLabelEl.innerText = products[`product${i}`]["name"];
        productEl.appendChild(productRadioLabelEl);

        productsEl.appendChild(productEl);
    }
}

function getProductType(typeSelectEls) {
    let selectedType;

    typeSelectEls.forEach(typeSelectEl => {
        if (typeSelectEl.checked === true) {
            selectedType = typeSelectEl.value;
        }
    });
    const product = products[selectedType];

    return product;
}

function formStandartSelectOption() {
    const option = document.createElement("option");
    const name = document.createTextNode("Выберите опцию");
    option.setAttribute("value", "");
    option.appendChild(name);

    return option;
}

function loadSubproductsOptions(subproducts, subproductsSelected) {
    if (subproducts.length > 0) {
        subproductsSelected.removeAttribute("disabled");
    }
    else {
        subproductsSelected.setAttribute("disabled", "");
    }
    subproducts.forEach((subproduct) => {
        const option = document.createElement("option");
        let name = document.createTextNode(subproduct["name"]);
        option.setAttribute("value", subproduct["price"]);
        option.appendChild(name);
        subproductsSelected.appendChild(option);
    });
}

function loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel) {

    if (Object.keys(subproductProperty).length > 0) {
        subproductsCheckbox.removeAttribute("disabled");
        subproductsCheckbox.setAttribute("value", subproductProperty["multiplier"]);
        subproductsCheckboxLabel.innerText = subproductProperty["name"];
    }
    else {
        subproductsCheckbox.setAttribute("disabled", "");
        subproductsCheckbox.setAttribute("value", "");
        subproductsCheckboxLabel.innerText = "Нет";
    }
}

function loadSubproductEl(product) {
    let subproductsSelectEl = document.getElementById("select");
    let subproductsCheckbox = document.getElementById("property");
    let subproductsCheckboxLabel = document.getElementById("property-label");

    subproductsSelectEl.innerHTML = " ";
    option = formStandartSelectOption();
    subproductsSelectEl.appendChild(option);

    let subproducts = product["subproducts"];
    loadSubproductsOptions(subproducts, subproductsSelectEl);

    let subproductProperty = product["subproperty"];
    loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel);
}

function changeProductType() {
    const typeSelectEls = document.getElementsByName("product-type");
    const product = getProductType(typeSelectEls);
    loadSubproductEl(product);
}

function getQuantity(quantityEl) {
    return parseInt(quantityEl.value);
}

function getProductPrice(subproductTypeEl, product) {
    let productPrice;
    if ((subproductTypeEl.getAttribute("disabled") === null) && !(subproductTypeEl.value === "")) {
        productPrice = subproductTypeEl.value;
    }
    else {
        if (product == undefined) {
            const log = document.getElementById("errorlog-6");
            log.style.display = "block";
            log.innerText = "Ошибка, введенные данные некорректны";
            return;
        }
        productPrice = product["price"];
    }

    return productPrice;
}

function getProductMultiplier(subproductPropertyEl) {
    let productMultiplier;
    if (subproductPropertyEl.getAttribute("disabled") === null && subproductPropertyEl.checked) {
        productMultiplier = subproductPropertyEl.value;
    }
    else {
        productMultiplier = 1;
    }
    return productMultiplier;
}

function isResultValid(result) {
    return !(isNaN(result) || result < 0);
}

const log = document.getElementById("errorlog-6");
function calcResult(quantity, productPrice, productMultiplier) {
    let result = quantity * productPrice * productMultiplier;
    if (isResultValid(result)) {
        log.style.display = "none";
        return result;
    }
    else {
        log.style.display = "block";
        log.innerText = "Ошибка, введенные данные некорректны";
        return 0;
    }
}

function writeResult(result) {
    let resultEl = document.getElementById("answer-6");
    resultEl.innerHTML = result;
}

function calculate() {
    let quantityEl = document.getElementById("count-6");
    let typeSelectEls = document.getElementsByName("product-type");

    let product = getProductType(typeSelectEls);

    let subproductTypeEl = document.getElementById("select");
    let subproductPropertyEl = document.getElementById("property");

    let quantity = getQuantity(quantityEl);

    let productPrice = getProductPrice(subproductTypeEl, product);

    let productMultiplier = getProductMultiplier(subproductPropertyEl);

    let result = calcResult(quantity, productPrice, productMultiplier);
    writeResult(result);
}


document.addEventListener("DOMContentLoaded", () => {
    let productsEl = document.getElementById("calc-radio-group");
    loadProductsEl(productsEl);

    let selectEl = document.getElementById("calc-radio-group");
    selectEl.addEventListener("change", changeProductType);

    let buttonEl = document.getElementById("button-6");
    buttonEl.addEventListener("click", calculate);
});