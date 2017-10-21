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

  renderMessage(message, element, first = true) {
    if (first) {
      $('#chats').prepend(`<div class=message id=${message.objectId}>
                          <div class=username>${message.username}:</div>
                          <div class=text>${message.text}</div>
                          </div>`);
    } else {
      $(element).after(`<div class=message id=${message.objectId}>
                          <div class=username>${message.username}:</div>
                          <div class=text>${message.text}</div>
                          </div>`);
    }
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
  let objectId = $('#chats').find('.message:first').attr('id');
  let messages = data.responseJSON.results;

  for (let i = messages.length - 1; i >= 0 && messages[i].objectId !== objectId; i--) {
    if (i === messages.length - 1) {
      app.renderMessage(messages[i]);
    } else {
      app.renderMessage(messages[i], `#${messages[i + 1].objectId}`, false);
    }
  }
};

//TODO: fix circular reference to data
let refresh = function() {
  app.fetch(printMessages);

  setTimeout (() => refresh(), 1000);
};

refresh();
// console.log($('#chats').find('.message:first').attr('id'));