import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import{required, nonEmpty, charLengthFive, isNumber} from './validators';
import {submitForm} from './actions';
import Input from './input';
import {SubmissionError} from 'redux-form';
class ContactForm extends Component {

  onSubmit(values){
    return fetch( 'https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    })
      .then(res => {
          if (!res.ok) {
              if (
                  res.headers.has('content-type') &&
                  res.headers
                      .get('content-type')
                      .startsWith('application/json')
              ) {
                  // It's a nice JSON error returned by us, so decode it
                  return res.json().then(err => Promise.reject(err));
              }
              // It's a less informative error returned by express
              return Promise.reject({
                  code: res.status,
                  message: res.statusText
              });
          }
          return;
      })
      .then(() => console.log('Submitted with values', values))
      .catch(err => {
          const {reason, message, location} = err;
          if (reason === 'ValidationError') {
              // Convert ValidationErrors into SubmissionErrors for Redux Form
              return Promise.reject(
                  new SubmissionError({
                      [location]: message
                  })
              );
          }
          return Promise.reject(
              new SubmissionError({
                  _error: 'Error submitting message'
              })
          );
      });
    }
  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
        successMessage = (
            <div className="message message-success">
                Message submitted successfully
            </div>
        );
    }

    let errorMessage;
    if (this.props.error) {
        errorMessage = (
            <div className="message message-error">{this.props.error}</div>
        );
    }

    return (
    <div className="delivery-form"> 
       {successMessage}
       {errorMessage}
       {console.log(this.props)}
      <h2>Report a problem with your delivery</h2>
      <form  onSubmit={this.props.handleSubmit(values=>{ 
        return this.props.dispatch(submitForm(values))
         })}>
        <div className="form-input">
          <label htmlFor="trackingNumber">Tracking number</label>
          <Field component={Input} element = 'input' name="trackingNumber" value="" id="trackingNumber"
          validate={[required, nonEmpty, charLengthFive, isNumber ]}/>
        </div>
      <div className="form-input">
        <label htmlFor="issue">What is your issue?</label>
        <Field component={Input} element="select" name="issue" id="issue">
          <option value='not-delivered'>My delivery hasn't arrived</option>
          <option value="wrong-item">The wrong item was delivered</option>
          <option value="missing-part">Part of my order was missing</option>
          <option value="damaged">Some of my order arrived damaged</option>
          <option value="other">Other (give details below)</option>
        </Field>
      </div>
      <div className="form-input">
        <label htmlFor="details">Give more details (optional)</label>
        <Field component={Input} element="textarea" name="details" id="details"></Field>
      </div>
        <button type="submit">Submit</button>
      </form>
    </div>
     
    );
  }
}

export default reduxForm({
  form: 'conform',
  initialValues:{
    issue: 'not-delivered'
  }
})(ContactForm)

