// YOUR CODE HERE:
class App {
  constructor () {
    this.server;
  }

  init(server) {
    this.server = server;
  }

  send(data) {
    $.ajax({
      type: 'POST',
      url: this.server,
      data: data
      // success: success,
      // dataType: dataType
    });
  }

  fetch(cb) {
    let data = $.ajax({
      url: this.server,
      // data: data
      // success: success,
      // dataType: dataType
    }).done(() => cb.call(this, data))
      .fail(() => console.log('failure'));
    return data;
  }

  clearMessages() {
    $('#chats').html('');
  }

  renderMessage(message) {
    $('#chats').prepend(`<div class=message>
                        <div class=username>${message.username}:</div>
                        <div class=text>${message.text}</div>
                        </div>`);
  }

  renderRoom(roomName) {
    $('#roomSelect').append(`<option value=${roomName}>${roomName}</option>`);
  }

  handleUsernameClick() {

  }

  handleSubmit() {
    $('.spinner').toggle();
    let value = $('input').val();
    let message = {
      username: 'Mel Brooks',
      text: `${value}`,
      roomname: 'lobby'
    };

    this.send(message);
  }
}

let app = new App();
app.init('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');


$(document).ready(function() {

  $(document).on('click', '.username', () => app.handleUsernameClick());

  $(document).on('submit', '.submit', () => app.handleSubmit());

  $(document).on('click', '.submit', () => app.handleSubmit());

});


let printMessages = function(data) {
  let messages = data.responseJSON.results; messages.forEach(message => app.renderMessage(message));
};

//TODO: fix circular reference to data
let refresh = function() {
  app.fetch(printMessages);

  setTimeout (() => refresh(), 5000);
};

refresh();
