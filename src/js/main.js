import Select from './select';

let input = new Select({
  id: 'input',
  url: './asset/province.json'
});

console.log(input);
// console.log(lable);

// [
//   'shanghai',
//   'beijing',
//   'hangzou',
//   'shangxi',
//   'anhui'
// ].map(function(index, elem) {
//   new Lable({
//     text: elem,
//     id: 'container'
//   });
// });

// let xhr = new XMLHttpRequest();
// xhr.open('GET', './asset/province.json');
// xhr.onload = function(event) {
//   console.log("onload()");
//   console.log(JSON.parse(xhr.responseText));

// }
// xhr.send();

