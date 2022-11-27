class Currency {
    constructor(firstCurrency, secondCurrency) {
        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
        this.url = `https://api.exchangerate.host/latest?base=`;
        this.amount = null;
    }
    exchange() {
        if (this.firstCurrency == this.secondCurrency) {
            this.alert("Eyni valyutanı bir-birinə çevirməyinizə ehtiyac yoxdur...");
        }

        return new Promise((resolve, reject) => {
            fetch(this.url + this.firstCurrency)
                .then(res => res.json())
                .then(data => {
                    const rate = (data.rates[this.secondCurrency]);


                    const newAmount = Number(this.amount);

                    let result = (rate * newAmount).toFixed(4);

                    let fromRate = document.querySelector('#fromRate');
                    let toRate = document.querySelector('#toRate');
                    fromRate.textContent = `1 ${this.firstCurrency} = ${(rate).toFixed(4)} ${this.secondCurrency}`;

                    toRate.textContent = `1 ${this.secondCurrency} = ${(1 / rate).toFixed(4)} ${this.firstCurrency}`

                    resolve(result);
                })
                .catch(err =>{this.alert('Network error');reject(err)})
        })

    }
    changeAmount(amount) {
        this.amount = amount;
    }

    changeFirstCurrency(fromCurrency) {
        this.firstCurrency = fromCurrency;
    }

    changeSecondCurrency(toCurrency) {
        this.secondCurrency = toCurrency;
    }
}
const amountElement = document.querySelector('#amount1');
const firstSelect = document.querySelector('#from');
const secondSelect = document.querySelector('#to');

const resultField = document.querySelectorAll('#amount2')[1]

const currency = new Currency('RUB', 'USD');

add();

function add() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('https://api.exchangerate.host/latest?base=RUB')
            .then((res) => res.json())
            .then((data) => {
                fromRate.textContent = `1 RUB = ${(data.rates['USD']).toFixed(4)} USD`;
                toRate.textContent = `1 USD = ${(1 / (data.rates['USD'])).toFixed(4)} RUB`
            })
            .catch((err) => console.log(err))
    })
    amountElement.addEventListener('input', exchangeCurrency);
    firstSelect.addEventListener('click', exchangeFrom);
    secondSelect.addEventListener('click', exchangeTo);
    amountElement.addEventListener('keyup', changeComma);
}



function changeComma(e) {
    if (amountElement.value.includes(',')) {
        let newFilterComma = amountElement.value.replace(',', '.');
        amountElement.value = newFilterComma;
    }
}



amountElement.addEventListener('keyup',Salamla);

function Salamla(){
    alert('Salam');
}