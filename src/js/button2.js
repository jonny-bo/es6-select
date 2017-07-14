export default class Button {
  constructor(option) {
    let defaultOption = {
      id: 'container',
      val: '按钮',
      props: {}
    }
    let config = Object.assign({}, defaultOption, option);

    let btn = document.createElement('button');
    let props = config.props;

    for (let propName in props) {
      let propValue = props[propName]
      btn.setAttribute(propName, propValue)
    }

    btn.appendChild(document.createTextNode(config.val));
    let container = document.getElementById(config.id);
    container.appendChild(btn);
    this.button = btn;
  }

  active() {
    let className = this.button.className;
    this.button.className = `${className} active`;
  }

  disable() {
    this.button.disabled = true;
  }

  enable() {
    this.button.disabled = false;
  }
}