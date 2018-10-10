import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'

class ContactForm extends Component {
  render() {
    return (
    <div className="delivery-form">
      <h2>Report a problem with your delivery</h2>
      <form>
        <div className="form-input">
          <label htmlFor="trackingNumber">Tracking number</label>
          <Field component="input" name="trackingNumber" value="" id="trackingNumber" />
        </div>
      <div className="form-input">
        <label htmlFor="issue">What is your issue?</label>
        <Field component="select" name="issue" id="issue">
          <option value="not-delivered">My delivery hasn't arrived</option>
          <option value="wrong-item">The wrong item was delivered</option>
          <option value="missing-part">Part of my order was missing</option>
          <option value="damaged">Some of my order arrived damaged</option>
          <option value="other">Other (give details below)</option>
        </Field>
      </div>
      <div className="form-input">
        <label htmlFor="details">Give more details (optional)</label>
        <Field component="textarea" name="details" id="details"></Field>
      </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    );
  }
}

export default reduxForm({
  form: 'conform'
})(ContactForm)

