//UPTO 1.12

//get api data that shows the conversion per currency

//create an interface that allows entry of:
//start value
//destination currency

//do the maths

const inputRef = document.getElementById("input");
const currencyRef = document.getElementById("currency");
// const outputRef = document.getElementById("output");
// const outputLabelRef = document.getElementById("outputLabel");
// const errorRef = document.getElementById("error");
// const outputContainer = document.getElementById("outputContainer");
// const appRef = document.getElementById("app");
// const internetRef = document.getElementById("internet");

let fixerIoData;

//display it to the DOM

(async function () {
  const { data } = await axios.get(
    `xxxhttp://data.fixer.io/api/latest?access_key=93082791255de205159bfb5a11602060&base=EUR`
  );
  fixerIoData = data;
})();

inputRef.addEventListener("input", (e) => {
  console.log(e.target.value, currencyRef.value);
  convert(e.target.value, currencyRef.value);
});

function convert(value, currency) {
  console.log(value, currency);
}
