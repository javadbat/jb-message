# JBMessage
message builder module for js

> this package is deprecated please use jb-notification instead

## installation 
```bash

    npm install jb-message

```
## instruction

first you have to create your message instance and config and style it however you want
```js
    //your-custom-app-message.js
    import {JBMessage} from  'jb-message';
    const message = new JBMessage();
    export {message};

```
then import your custome message instance in your app whenever you need and show a message


### set custome style

in some cases in your project you need to change default style of module, for example you need different positioning or custom margin-top values.    
if you want to set a custom style to this module all you need is to set css variable in parent scope of module.
| css variable name        | description                           |
| -------------            | -------------                         |
| --jb-message-position    | module position default is `absolute` |
| --jb-message-margin-top  | module margin-top defualt is `64px`   |
