function $(id) {
    return document.getElementById(id);
}
const CL_COMPLETED = 'completed';

var items = [];

function update() {
    var list = $('list');
    list.innerHTML = '';
    for (var i = 0; i < items.length; ++i) {
        (function (index) {
            var it = items[index];
            var msg = it.msg;
            var item = document.createElement('div');
            var itemContent = document.createElement('div');
            var itemDelete = document.createElement('button');
            item.classList.add('list-item');
            it.completed && item.classList.add(CL_COMPLETED);
            itemContent.innerHTML = msg;
            itemContent.className = 'content';
            itemDelete.type = 'button';
            itemDelete.innerHTML = ' X ';
            itemDelete.className = 'delete';
            item.appendChild(itemContent);
            item.appendChild(itemDelete);
            list.insertBefore(item, list.childNodes[0]);

            // bind events
            item.addEventListener('click', function () {
                it.completed = !it.completed;
                update();
            }, false);
            itemDelete.addEventListener('click', function (event) {
                items.splice(index, 1);
                update();
                event.stopPropagation();
            }, false);
        })(i);
    }

    var activeCount = 0;
    items.forEach(function (item) {
        if (!item.completed)
            ++activeCount;
    });
    $('count').innerHTML = activeCount + ' items left';
}

function addTodo() {
    var todo = $('todo');
    var msg = todo.value;
    if (msg == '') {
        console.warn('msg is empty');
        return;
    }

    items.push({
        msg: msg,
        completed: false
    });
    update();
    todo.value = '';
}

window.onload = () => {
    $('todo').addEventListener('keyup', function (event) {
        if (event.keyCode != 13) return;
        addTodo();
    }, false);
}