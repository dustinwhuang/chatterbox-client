// YOUR CODE HERE:
class App {
  constructor () {
    this.server;
  }

  init() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
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

  fetch() {
    let data;
    $.ajax({
      url: this.server,
      data: data
      // success: success,
      // dataType: dataType
    });
    return data;
  }

  clearMessages() {
    $('#chats').html('');
  }

  renderMessage(message) {
    $('#chats').append(`<div class=message>
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

    // this.send([]);
  }
}

let app = new App();


$(document).ready(function() {

  $(document).on('click', '.username', () => app.handleUsernameClick());

  $(document).on('submit', '.submit', () => app.handleSubmit());

  $(document).on('click', '.submit', () => app.handleSubmit());

});

// console.log(app.fetch());
