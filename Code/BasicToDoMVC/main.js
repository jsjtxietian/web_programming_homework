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

    //jsonp
    (function () {
        var guid = 0;
        /**
         * Basic JSONP
         * @param url {String}
         * @param [opt] {Object}
         * @param [opt.onSuccess] {Function}
         * @param [opt.onFailure] {Function}
         */
        window.JSONP = function (url, opt) {
            opt = opt || {};
            var script = document.createElement('script');
            var id = guid++;
            var jsonp = '__jsonp_' + id;
            window[jsonp] = function (res) {
                if (opt.onSuccess) opt.onSuccess(res);
                // define error & use opt.onFailure
            };
            script.onload = function () {
                document.body.removeChild(script);
                delete window[jsonp];
            };

            url += (url.indexOf('?') > -1 ? '&' : '?') + 'jsonp=' + jsonp;
            script.setAttribute('src', url);
            document.body.appendChild(script);
        };
    })();
   
    (function () {
        var JSONP = window.JSONP;
        var URL = 'http://127.0.0.1:3476';
        var MSG = 'Start server by `node examples/data/server.js` on project root';

        Object.assign(window, {
            init: function (callback) {
                JSONP(URL + '/init', {
                    onSuccess: function (data) {
                        console.log(data);
                    },
                    onFailure: function () {
                        console.error(MSG);
                    }
                });
            },
            flush: function (callback) {
                JSONP(URL + '/flush?data=' , {
                    onSuccess: function (data) {
                        console.log('flushed');
                    },
                    onFailure: function () {
                        console.error(MSG);
                    }
                });
            }
        });
    })();
}

//ajax demo
(function () {
    var GET = 'get';
    window.Ajax = {
        /**
         * Basic Ajax
         * @param url {String}
         * @param [opt] {Object}
         * @param [opt.onSuccess] {Function}
         * @param [opt.onFailure] {Function}
         * @param [opt.cached] {Boolean}
         */
        get: function (url, opt) {
            opt = opt || {};
            if (opt.cached) {
                url += (url.indexOf('?') > -1 ? '&' : '?') + new Date().getTime() + 'r';
            }
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status >= 200 && request.status < 400) {
                        var ret = request.responseText;
                        var contentType = request.getResponseHeader('content-type');
                        if (contentType == 'application/json' || contentType == 'text/json') {
                            try {
                                ret = JSON.parse(ret);
                            } catch (e) {
                                console.error(e);
                                if (opt.onFailure) opt.onFailure(e);
                            }
                        }
                        if (opt.onSuccess) opt.onSuccess(ret);
                    }
                    else {
                        if (opt.onFailure) opt.onFailure();
                    }
                }
            };

            request.open(GET, url, true);
            request.send(null);
        }
    }
})();

// Ajax.get("https://httpbin.org/get", {
//     onSuccess: (result) => {
//         console.log(result);
//     }
// });

