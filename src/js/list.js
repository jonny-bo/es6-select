import Lable from './lable';

const CLASS_UL_NAME = 'L_list';
const CLASS_LI_NAME = 'L_item';

const List = function(options) {
  this.options = options;
  this.data = options.data || [];
  this.el = this.init();
  this.container = document.getElementById('container');
  this.lables = [];
}

List.prototype.init = function() {
  let ul =  document.createElement('ul');
  ul.className = CLASS_UL_NAME;
  this.data.map(item => {
    let li = document.createElement('li');
    li.textContent = item.item_name || 'x';
    li.className = CLASS_LI_NAME;
    li.onclick = () => {
      if (!li.style.backgroundColor) {
        li.style.backgroundColor = '#DDD';
        const lable = new Lable({
          id: this.options.id,
          text: li.textContent
        });
        this.lables.push(lable);
      }
      this.close();
    }

    ul.appendChild(li);
  });
  return ul;
};

List.prototype.open = function() {
  this.container.style.display = 'block';
}

List.prototype.close = function() {
  this.container.style.display = 'none';
}

List.prototype.reload = function($data) {
  this.data = $data;
  const ul = this.init();

  return ul;
}

export default List;