$(function () {

  // Create new task (on click)
  $('#create').on('click', function (e) {
    $.post('/', {task: $('#new_task').val().trim()}, function (data) {
      const template = `
<li id="item_${data.insertId}" class="list-group-item">
  <div id="text_${data.insertId}">
    <button type="button" data-id="${data.insertId}" class="btn btn-danger delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
    <button type="button" data-id="${data.insertId}" class="btn btn-warning update"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
    <span>&nbsp;</span>
    <span id="task_${data.insertId}">${$('#new_task').val().trim()}</span>
    <div class="pull-right">
      <button type="button" data-id="${data.insertId}" class="btn btn-success complete"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
    </div>
  </div>

  <div id="update_${data.insertId}" class="input-group" style="display: none;">
    <span class="input-group-btn">
      <button type="button" class="btn btn-success submitUpdate" data-id="${data.insertId}"><span class="glyphicon glyphicon-ok" aria-hidden="true"></button>
    </span>
    <input type="text" class="form-control updateInput" id="update_input_${data.insertId}" value="${$('#new_task').val().trim()}" maxlength="30">
  </div>
</li>`
      
      $('#list').append(template);
      $('#new_task').val('');
    });
  });

  // Create new task (on enter)
  $('#new_task').keypress(function (e) {
    if (e.which == 13) $('#create').click();
  });


  // Mark task completed
  $('#list').on('click', '.complete', function (e) {
    const id   = $(this).data('id'),
          task = $(`#task_${id}`).text();

    $.ajax({
        method: 'PUT',
        data: {id: id}
    }).then(function (data) {
      $('#done').append($('<li>').text(task).addClass('list-group-item'));
      $(`#item_${id}`).hide({duration: 250, complete: $(this).remove()});
    });
  });


  // Show update input
  $('#list').on('click', '.update', function (e) {
    const id    = $(this).data('id'),
          input = $(`#update_input_${id}`);  // Store the element reference so we can use a native JS method later

    $(`#update_${id}`).show({duration: 125});
    $(`#text_${id}`).hide();
    input.focus();
    input[0].setSelectionRange(30,30);  // Sets the cursor location at the end of the input (max chars == 30)
  });

  // Make put request with updated task (on click)
  $('#list').on('click', '.submitUpdate', function (e) {
    const id   = $(this).data('id'),
          task = $(`#update_input_${id}`).val().trim();

    $.ajax({
        method: 'PUT',
        data: {id: id, task: task}
    }).then(function (data) {
      $(`#task_${id}`).text(task);
      $(`#update_${id}`).hide();
      $(`#text_${id}`).show();
    });
  });

  // Make put request with updated task (on enter)
  $('#list').on('keypress', '.updateInput', function (e) {
    if (e.which == 13) $(this).prev().children().click();  // Previous div, child button
  });


  // Delete task
  $('#list').on('click', '.delete', function (e) {
    const id = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        data: {id: id}
    }).then(function (data) {
      $(`#item_${id}`).hide({duration: 250, complete: $(this).remove()});
    });
  });

  // Clear completed tasks list
  $('#clear_completed').on('click', function (e) {
    $.ajax({
        method: 'DELETE',
        data: {id: 'completed'}
    }).then(function (data) {
      $(`#done`).children().hide({duration: 250});
      setTimeout(() => $('#done').empty(), 300);  // Remove elements from page after timeout (otherwise animation fails)
    });
  });
});