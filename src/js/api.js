
const Api = function() {
}

Api.prototype.ajax = function(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function(event) {
    callback(JSON.parse(xhr.responseText));    
  }
  xhr.send();
};

const $ = new Api();
export default $;