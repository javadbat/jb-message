# JBMessage
message builder module for js

## installation 
```cmd

    npm install jb-message

```
## instruction

first you have to create your message instance and config and style it however you want
```js
    //your-custom-app-message.js
    import JBMessage from  'jb-message';
    const message = new JBMessage();
    export {message};

```
then import your custome message instance in your app whenever you need and show a message
