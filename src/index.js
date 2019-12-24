// import 'babel-polyfill';
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './js/com/App'

// ReactDOM.render(<App/>, document.getElementById('app')) // eslint-disable-line no-undef
import './js/main'
// import logMessage from './js/logger'
// Log message to console
// logMessage('Welcome back to Expack!1222')


// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef 
    module.hot.accept(function() {
        console.log('Accepting the updated printMe module!');
        location.reload()
      })  // eslint-disable-line no-undef 

      module.hot.check(false).then(outdatedModules => {
        // outdated modules...
        location.reload()
      }).catch(error => {
        // catch errors
      });
}
