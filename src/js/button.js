const CLASS_NAME = 'L_btn';

const Button = function(options) {
  this.options = options;
  this.el = this.createEl();
  this.el.addEventListener('click', () => {
    this.options.onclick();
  });
}

Button.prototype.createEl = function() {
  let el =  document.createElement('button');
  el.textContent = this.options.text || 'x';
  el.className = CLASS_NAME;
  return el;
}

export default Button;