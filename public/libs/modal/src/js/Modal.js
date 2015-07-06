/*jslint browser: true, nomen: true */
/*global ActiveXObject*/

function Modal(userOptions) {
    'use strict';

    var defaultOptions = {
        width:         0,
        height:        0,
        padding:       20,
        autoDimension: true,
        autoShow:      true,
        locked:        false,
        title:         '',
        html:          '',
        buttons:       [],
        url:           '',
        onShow:        false,
        beforeClose:   false,
        onClose:       false,
        loading_text:  'loading...'
    };

    this.options = this._merge(defaultOptions, userOptions);
    this._validate();

    this._elements = {
        mask:      this._create('mask'),
        container: this._create('container')
    };

    this._visible = false;

    this._build();

    if (this.options.autoShow) {
        this.show();
    }
}

/**
 * merges obj_a with obj_b, keeping only the keys of the obj_a and replacing the
 * values found in obj_b
 * @param  {Object} obj_a source object
 * @param  {Object} obj_b new data
 * @return {Object}
 */
Modal.prototype._merge = function (obj_a, obj_b) {
    'use strict';

    var response = {},
        i = 0;

    for (i in obj_a) {
        if (obj_a.hasOwnProperty(i)) {
            response[i] = (obj_b.hasOwnProperty(i)) ? obj_b[i] : obj_a[i];
        }
    }
    return response;
};

/**
 * shortcut to create a div with a class prefix "modal-"
 * @param  {String} className
 * @param  {String} content   valid HTML
 * @return {Object}
 */
Modal.prototype._create = function (className, content) {
    'use strict';

    if (typeof className !== 'string' || !className.length) {
        throw "className MUST be a non empty string";
    }

    var element = document.createElement('div');
    element.className = 'modal-' + className;

    if (typeof content === 'string' && content.length) {
        element.innerHTML = content;
    }

    return element;
};

/**
 * checks if the options are valid
 */
Modal.prototype._validate = function () {
    'use strict';

    var options = this.options,
        numButtons = 0,
        i = 0;

    // autoDimenions
    if (typeof options.autoDimension !== 'boolean') {
        throw "autoDimension MUST be boolean";
    }

    // width and height
    if (options.autoDimension === true) {
        options.width = '0px';
        options.height = '0px';
    } else {
        options.width = (typeof options.width === 'number') ? options.width + 'px' : options.width;
        options.height = (typeof options.height === 'number') ? options.height + 'px' : options.height;
    }

    if (typeof options.width !== 'string') {
        throw "width MUST be a string or a number";
    }
    if (options.width.indexOf('%') === -1 && options.width.indexOf('px') === -1) {
        throw "width MUST be in pt or % units";
    }

    if (typeof options.height !== 'string') {
        throw "height MUST be a string or a number";
    }
    if (options.height.indexOf('%') === -1 && options.height.indexOf('px') === -1) {
        throw "height MUST be in pt or % units";
    }

    // padding
    options.padding = (typeof options.padding === 'number') ? options.padding + 'px' : options.padding;
    if (typeof options.padding !== 'string') {
        throw "padding MUST be a string or a number";
    }
    if (options.padding.indexOf('%') === -1 && options.padding.indexOf('px') === -1) {
        throw "padding MUST be in pt or % units";
    }

    // locked
    if (typeof options.locked !== 'boolean') {
        throw "locked MUST be a boolean";
    }

    // autoShow
    if (typeof options.autoShow !== 'boolean') {
        throw "autoshow MUST be a boolean";
    }

    // title
    if (typeof options.title !== 'string') {
        throw "title MUST be string";
    }

    // html
    if (typeof options.html !== 'string' && typeof options.html !== 'object') {
        throw "html MUST be string or a HTML Object";
    }

    if (typeof options.url !== 'string') {
        throw "url MUST be string";
    }

    // string
    if (typeof options.url !== 'string') {
        throw "url MUST be string";
    }

    // onShow
    if (options.onShow !== false && typeof options.onShow !== 'function') {
        throw "onShow MUST be function";
    }

    // onClose
    if (options.onClose !== false && typeof options.onClose !== 'function') {
        throw "onClose MUST be function";
    }

    // beforeClose
    if (options.beforeClose !== false && typeof options.beforeClose !== 'function') {
        throw "beforeClose MUST be function";
    }

    // url
    if ((typeof options.html === 'string' && !options.html.length) && !options.url.length) {
        throw "you MUST provide a html content or a URL";
    }

    // buttons
    if (typeof options.buttons !== 'object' || typeof options.buttons.length !== 'number') {
        throw "buttons MUST be array";
    }
    numButtons = options.buttons.length;
    for (i = 0; i < numButtons; i += 1) {
        // buttons must have title and click :)
        if (typeof options.buttons[i].title !== 'string' || !options.buttons[i].title.length) {
            throw 'button ' + i + ' has a invalid title (MUST be a non empty string)';
        }

        if (typeof options.buttons[i].click !== 'function') {
            throw 'button ' + i + ' has a invalid callback for click event';
        }

        if (options.buttons[i].hasOwnProperty('className') && typeof options.buttons[i].className !== 'string') {
            throw 'button ' + i + ' has a invalid className (MUST be a string)';
        }
    }
};

/**
 * set the modal dimensions and position on screen
 */
Modal.prototype._align = function () {
    'use strict';

    var width, height;

    this._elements.container.style.padding = this.options.padding;

    if (this.options.autoDimension) {
        this._elements.container.classList.add('hide-modal');
        document.body.appendChild(this._elements.container);

        width = this._elements.container.offsetWidth;
        height = this._elements.container.offsetHeight;

        this._remove(this._elements.container);
        this._elements.container.style.width = width + 'px';
        this._elements.container.style.height = height + 'px';
        this._elements.container.classList.remove('hide-modal');
    } else {
        width = parseInt(this.options.width, 10);
        height = parseInt(this.options.height, 10);

        this._elements.container.style.width = width + 'px';
        this._elements.container.style.height = height + 'px';
    }

    if (height < window.outerHeight) {
        this._elements.container.classList.add('modal-centered');
    } else {
        this._elements.container.classList.remove('modal-centered');
        this._elements.container.style.left = 0;
        this._elements.container.style.right = 0;
        this._elements.container.style.position = 'absolute';
        this._elements.container.style.top = (document.body.scrollTop + 30) + 'px';
    }
};

/**
 * [_build description]
 */
Modal.prototype._build = function () {
    'use strict';

    var options = this.options,
        self = this,
        numButtons = options.buttons.length,
        i = 0;

    if (options.url.length) {
        // if is a ajax request, don't show anything but loading message
        this._elements.loading = this._create('loading', this.options.loading_text);
        this._elements.container.appendChild(this._elements.loading);
        this._getContentFromURL(options.url, function (html) {
            // if user closed the modal before load, don't do anything
            this.update({
                url: '',
                html: html,
                autoShow: (this._visible)
            });
        });
    } else {
        if (options.title.length) {
            this._elements.header = this._create('header', options.title);
            this._elements.container.appendChild(
                this._elements.header
            );
        }

        if (!options.locked) {
            this._elements.close = this._create('close', 'x');
            this._elements.container.appendChild(
                this._elements.close
            );

            this._elements.close.onclick = function () {
                self.close();
            };
        }

        this._elements.content = this._create('content');
        if (typeof this.options.html === 'string') {
            this._elements.content.innerHTML = this.options.html;
        } else {
            this._elements.content.appendChild(this.options.html.cloneNode());
        }
        this._elements.container.appendChild(
            this._elements.content
        );

        // buttons
        if (numButtons) {
            this._elements.buttons_container = this._create('buttons-container');
            this._elements.buttons = [];

            for (i = 0; i < numButtons; i += 1) {
                this._elements.buttons.push(
                    document.createElement('button')
                );
                this._elements.buttons[i].innerHTML = options.buttons[i].title;
                if (options.buttons[i].hasOwnProperty('className')) {
                    this._elements.buttons[i].className = options.buttons[i].className;
                } else {
                    this._elements.buttons[i].className = 'modal-button';
                }

                this._elements.buttons[i].onclick = options.buttons[i].click;
                this._elements.buttons_container.appendChild(this._elements.buttons[i]);
            }

            this._elements.container.appendChild(this._elements.buttons_container);
        }
    }

    // configure mask events
    if (!options.locked) {
        this._elements.mask.onclick = function () {
            self.close();
        };
    }

    this._align();
};

/**
 * get the HTML content via xhr
 * @param {String} url
 * @param {Function} callback
 * @returns {String}
 */
Modal.prototype._getContentFromURL = function (url, callback) {
    'use strict';

    var self = this,
        xhr;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback.call(self, xhr.responseText);
        }
    };

    xhr.open("GET", url, true);
    xhr.send(null);
};

/**
 * insert mask and container in the body
 */
Modal.prototype.show = function () {
    'use strict';

    if (document.body.querySelectorAll('.modal-mask')) {
        document.body.appendChild(this._elements.mask);
    }
    document.body.appendChild(this._elements.container);
    this._visible = true;
    if (this.options.onShow) {
        this.options.onShow();
    }
};

/**
 * allow change all configs and show new data
 * @param {Object} options
 */
Modal.prototype.update = function (options) {
    'use strict';

    this.options = this._merge(this.options, options);
    this._validate();
    this._remove(this._elements.container);
    this._elements.container.innerHTML = '';
    this._build();

    if (this.options.autoShow) {
        this.show();
    }
};

Modal.prototype.close = function () {
    'use strict';

    var returnBeforeClose = true;
    if (this.options.beforeClose) {
        returnBeforeClose = (this.options.beforeClose() === false) ? false : true;
    }

    if (returnBeforeClose) {
        this._remove(
            this._elements.container,
            this._elements.mask
        );

        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    this._visible = false;
};

/**
 * remove elements from body
 */
Modal.prototype._remove = function () {
    'use strict';

    var i = 0,
        al = arguments.length;

    for (i = 0; i < al; i += 1) {
        try {
            document.body.removeChild(arguments[i]);
        } catch (ignore) {
            // just in case
        }
    }
};