function $(id) {
    return document.getElementById(id);
}

var activeAmount = 0;
const CL_COMPLETED = 'completed';

function updateActive() {
    var active = $('active');
    active.innerHTML = activeAmount + ' items left';
}

function addTodo() {
    var todo = $('todo');
    var msg = todo.value;
    var list = $('list');

    if (msg == '') {
        console.warn('msg is empty');
        return;
    }
    var item = document.createElement('div');
    var itemContent = document.createElement('div');
    var itemDelete = document.createElement('button');

    item.className = 'list-item';
    itemContent.innerHTML = msg;
    itemContent.className = 'content';
    itemDelete.type = 'button';
    itemDelete.innerHTML = 'X';
    itemDelete.className = 'delete';

    item.appendChild(itemContent);
    item.appendChild(itemDelete);
    list.insertBefore(item, list.childNodes[0]);

    todo.value = '';
    ++activeAmount;
    updateActive();

    item.addEventListener('click', () => {
        if (item.classList.contains(CL_COMPLETED)) {
            item.classList.remove(CL_COMPLETED);
            ++activeAmount;
        }
        else {
            item.classList.add(CL_COMPLETED)
            --activeAmount;
        }
        updateActive();
    }, false);

    itemDelete.addEventListener('click', function (event) {
        list.removeChild(item);
        if (!item.classList.contains(CL_COMPLETED))
            --activeAmount;
        updateActive();
        event.stopPropagation();
    }, false);
}


window.onload = () => {
    // Binding keyboard event
    $('todo').addEventListener('keyup', function (event) {
        //console.log('0x' + event.keyCode.toString(16));
        if (event.keyCode != 0xd) return; // 0xd is "enter"
        addTodo();
    }, false);
}
