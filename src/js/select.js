import $ from "./api";
import Lable from './lable';
import List from './list';

const Select = function(options) {
  this.options = options;
  this.el = document.getElementById(options.id);
  this.getData();

  let cache = [];
  this.el.addEventListener('input', () => {
    if (cache[this.el.value]) {
      this.result = cache[this.el.value];
      return;
    }
    if (this.el.value) {
      this.result = this.filterResult(this.el.value);
      cache[this.el.value] = this.result; 
    } else {
      this.result = this.data;
    }
    console.log(this.result);
    const ul = this.list.reload(this.result);
    this.container.removeChild(this.list.el);
    this.container.appendChild(ul);
    this.list.el = ul;
  });

  this.el.addEventListener('focus', () => {
    if (!this.list) {
      this.list = new List({
        id: 'select-labs',
        data: this.data
      });
      this.container = document.getElementById('container');
      this.container.appendChild(this.list.el);
    }
    this.list.open();
  });
}

Select.prototype.getData = function() {
  $.ajax('GET', this.options.url, (responce) => {
    this.data = this.result = responce;
  });
};

Select.prototype.filterResult = function(value) {
  return this.data.filter(item => {
    return item.item_name.indexOf(value) > -1;
  });
};


export default Select;