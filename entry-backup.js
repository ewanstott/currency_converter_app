//UPTO 1.12

//get api data that shows the conversion per currency

//create an interface that allows entry of:
//start value
//destination currency

//do the maths

//display it to the DOM

const inputRef = document.getElementById("input");
const currencyRef = document.getElementById("currency");
const outputRef = document.getElementById("output");
const outputLabelRef = document.getElementById("outputLabel");
const errorRef = document.getElementById("error");
const outputContainer = document.getElementById("outputContainer");
const appRef = document.getElementById("app");
const internetRef = document.getElementById("internet");

getApiData();

//state
let fixerIoData;
const topCurrencies = ["USD", "GBP", "EUR"];

async function getApiData() {
  try {
    const { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=8b853c03d3313d0cd8af733b49ee4538&base=EUR`
    );
    fixerIoData = data;
    setCurrencyOptions();

    appRef.style.display = "block";
  } catch (e) {
    internetRef.innerHTML = `API Down!, no new data for you!`;
    internetRef.style.display = "block";
  }
}

function setCurrencyOptions() {
  currencyRef.innerHTML = ``;

  const options = Object.keys(fixerIoData.rates);

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];

    if (topCurrencies.includes(options[i])) {
      currencyRef.prepend(option);
    } else {
      currencyRef.append(option);
    }
  }

  const option = document.createElement("option");
  option.text = "";
  currencyRef.prepend(option);
}

inputRef.addEventListener("input", (e) => {
  outputContainer.style.display = "none";

  if (!validateInput("number", e.target.value)) {
    errorRef.innerHTML = `Bad input value!`;
    return;
  }
  if (!validateInput("currency", currencyRef.value)) {
    return;
  }

  outputContainer.style.display = "block";
  errorRef.innerHTML = ``;

  onUserInput(e.target.value, currencyRef.value);
});

currencyRef.addEventListener("change", (e) => {
  outputContainer.style.display = "none";

  if (!validateInput("currency", e.target.value)) {
    return;
  }
  if (!validateInput("number", inputRef.value)) {
    errorRef.innerHTML = `Bad input value!`;
    return;
  }

  outputContainer.style.display = "block";

  outputLabelRef.innerHTML = `${e.target.value} value:`;

  onUserInput(inputRef.value, e.target.value);
});

function validateInput(type, value) {
  switch (type) {
    case "number":
      const _value = Number(value);
      if (_value > 0 && _value < 999999999) {
        return true;
      }
      break;

    case "currency":
      if (currencyRef.value.length === 3) {
        return true;
      }

      break;
    default:
      console.log("Maybe you sent wrong type!");
      break;
  }
}

function onUserInput(value) {
  outputRef.value = convert(value, currencyRef.value);
}

function convert(value, currency) {
  const { rates } = fixerIoData;

  return rates[currency] * value;
}