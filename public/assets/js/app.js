$(function () {
  $('#create').on('click', function (e) {
    $.post('/', {task: $('#new_task').val().trim()}, function (data) {
      const template = `
<li id=item_${data.insertId}>
  <div id="text_${data.insertId}">
    <div id="task_${data.insertId}">${$('#new_task').val().trim()}</div>

    <div>
      <button type="button" data-id="${data.insertId}" class="complete">Complete</button>&nbsp;
      <button type="button" data-id="${data.insertId}" class="update">Modify</button>&nbsp;
      <button type="button" data-id="${data.insertId}" class="delete">Delete</button>
    </div>
    <br/>
  </div>

  <div id="update_${data.insertId}" class="form-group" style="display: none;">
    <label for="task">Task:</label>
    <input type="text" id="${data.insertId}" name="task" value="${$('#new_task').val().trim()}">
    <button type="button" data-id="${data.insertId}" class="submitUpdate">Update Task</button>
  </div>
</li>`
      
      $('#list').append(template);
    });
  });

  $('#list').on('click', '.complete', function (e) {
    const id   = $(this).data('id'),
          task = $(`#task_${id}`).text();

    $.ajax({
        url: '/',
        method: 'PUT',
        data: {id: id}
    }).then(function (data) {
      $('#done').append($('<li>').text(task));
      $(`#item_${id}`).remove();
    });
  });

  $('#list').on('click', '.update', function (e) {
    const id = $(this).data('id');

    $(`#update_${id}`).show();
    $(`#text_${id}`).hide();
  });

  $('#list').on('click', '.submitUpdate', function (e) {
    const id   = $(this).data('id'),
          task = $(`#task_update_${id}`).val().trim();

    $.ajax({
        url: '/',
        method: 'PUT',
        data: {id: id, task: task}
    }).then(function (data) {
      $(`#task_${id}`).text(task);
      $(`#update_${id}`).hide();
      $(`#text_${id}`).show();
    });
  });

  $('#list').on('click', '.delete', function (e) {
    const id = $(this).data('id');

    $.ajax({
        url: '/',
        method: 'DELETE',
        data: {id: id}
    }).then(function (data) {
      $(`#item_${id}`).remove();
    });
  });

  $('#clear_completed').on('click', function (e) {
    $.ajax({
        url: '/completed',
        method: 'DELETE'
    }).then(function (data) {
      $(`#done`).empty();
    });
  });
});