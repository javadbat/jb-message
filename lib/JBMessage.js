import CSS from './JBMessage.scss';
class JBMessage {
    constructor({
        duration = {
            error: 9,
            information: 7,
            success: 5,
            warning: 7
        },
        position = 'fixed',
        marginTop = '64px',
    } = {}) {
        this.config = { duration, position, marginTop };
        this._initStyle();
        this._initWrapperDOM();
    }
    _initStyle(){
        const styleTag = document.createElement('style');
        styleTag.innerHTML = CSS;
        document.head.appendChild(styleTag);
    }
    _initWrapperDOM() {
        let listWrapper = document.querySelector('.jb-message-list-wrapper');
        if (!listWrapper) {
            var WrapperDom = document.createElement('div');
            WrapperDom.classList.add('jb-message-list-wrapper');
            WrapperDom.style.position = this.config.position;
            WrapperDom.style.marginTop = this.config.marginTop;
            document.body.appendChild(WrapperDom);
            this.listWrapperDom = WrapperDom;
        } else {
            // sometime message list initiated in other place and for mistake it initiated again
            this.listWrapperDom = listWrapper;
        }
    }
    //TODO: add message template so we show when needed with just param and it can handle html too
    //add() { }
    
    /**
     * will show the message you tell to  the function.
     * @typedef {"success" | "error" | "information" | "warning"} statusFormat
     * @param {{message : string, type : statusFormat}} param - parameter of showing message.
     * @return {{dom : object}}
     */
    show(param) {
        const messageType = param.type || 'information';
        const duration = this.config.duration[messageType];
        const messageDOM = this._createMessageDOM(param.message, messageType, duration);
        this.listWrapperDom.appendChild(messageDOM);
        setTimeout(() => { messageDOM.close();}, duration * 1000 - 1000);
        return {
            dom:messageDOM,
        };
    }
    _createMessageDOM(message, type, duration) {
        let alertDom = document.createElement('div');
        alertDom.classList.add('jb-message-wrapper');
        alertDom.classList.add('--' + type);
        const contentDom = this._createMessageContentDOM(message);
        const closeBtnDom = this._createCloseButtonDOM(alertDom);
        alertDom.appendChild(closeBtnDom);
        alertDom.appendChild(contentDom);
        alertDom.close = this._selfClose;
        var alertIconDom = this._createIcon(type, duration);
        alertDom.appendChild(alertIconDom);
        return alertDom;
    }
    _createCloseButtonDOM(alertDom) {
        let closeBtnDom = document.createElement('div');
        closeBtnDom.classList.add('message-close-btn-wrapper')
        closeBtnDom.addEventListener('click', function () { alertDom.close() });
        closeBtnDom.innerHTML =
            `<svg x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve" width="16px" height="16px">
        <g id="Close">
            <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" fill="#FFFFFF"/>
        </g>
        </svg>`;
        return closeBtnDom;
    }
    _createMessageContentDOM(message){
        var text = document.createTextNode(message);
        var textDom = document.createElement('span');
        textDom.classList.add('message-text-wrapper');
        textDom.appendChild(text);
        return textDom;
    }
    _createIcon(type, closeAlertAnimationDuration) {
        let Wrapperdom = document.createElement('div');
        var innerIconDomString = "";
        if (type == "error") {
            innerIconDomString = `<path  d="M24 24 L 40 40"></path>`;
            innerIconDomString += `<path  d="M40 24 L 24 40"></path>`
        }
        if (type == "information") {
            innerIconDomString = `<path  d="M32 24 L 32 36"></path>`;
            innerIconDomString += `<path  d="M32 42 L 32 42"></path>`
        }
        if (type == "success") {
            innerIconDomString = `<path  d="M20 36 L 27 42"></path>`;
            innerIconDomString += `<path  d="M28 42 L 42 22"></path>`;

        }
        Wrapperdom.classList.add('message-svg-icon-wrapper');
        var borderCircleStyleString = `animation:circleAnimation ${closeAlertAnimationDuration}s  ease 0s forwards`;
        var svgString = `<svg class="message-svg-icon viewbox="0 0 64 64" ${type}" >
            <circle class="bg-circle" cx="32" cy="32" r="20"></circle>
            <circle class="border-circle" cx="32" cy="32" r="26" style="${borderCircleStyleString}"></circle>
            <g class="message-inner-icon-shape-group --${type}">
                ${innerIconDomString}
            </g>
        </svg>`
        Wrapperdom.innerHTML = svgString;
        return Wrapperdom;
    }
    _selfClose(){
        //in this function "this" is a dom of alert
        if(this.isClosing){
            //if message closed before we dont close it again
            return;
        }
        this.isClosing = true;
        this.classList.add('--hide');
        setTimeout(() => {

            if (this.parentNode) {
                this.parentNode.removeChild(this);
            } else {
                //if user close message by click befire timeout
                this.remove();
            }
            this.closed = true;
        }, 1000);
        //raise custome onclose event
        const customEvent = new CustomEvent('close');
        this.dispatchEvent(customEvent);
    }
}
export default JBMessage;