import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContactForm from './contactForm';
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
<Provider store={store}>
  <ContactForm />
</Provider>, document.getElementById('root'));