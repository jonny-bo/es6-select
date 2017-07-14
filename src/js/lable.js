import Button from './button';

const CLASS_NAME = 'L_lable';

const Lable = function(options) {
  this.options = options;
  this.container = document.getElementById(options.id);
  this.el = this.createEl();
  this.container.appendChild(this.el);
  const closeBtn = new Button({
    text: 'x',
    onclick: () => {
      this.dispose()
    }
  });
  this.el.appendChild(closeBtn.el);
}

Lable.prototype.createEl = function() {
  const el =  document.createElement('span');
  el.textContent = this.options.text || 'span';
  el.className = CLASS_NAME;
  return el;
}

Lable.prototype.dispose = function() {
  this.container.removeChild(this.el);
}

export default Lable;