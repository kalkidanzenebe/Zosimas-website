import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2 } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields';
import { Button } from '../../components/common/Button';
import { serviceSelectOptions } from '../../data/services';
import { resetContact, submitContact } from '../../store/slices/contactSlice';
import { showNotification } from '../../store/slices/uiSlice';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
};

export function ContactForm() {
  const dispatch = useDispatch();
  const { status, error, fieldErrors } = useSelector((state) => state.contact);
  const [values, setValues] = useState(emptyForm);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(submitContact(values));
    if (submitContact.fulfilled.match(result)) {
      setValues(emptyForm);
      dispatch(showNotification({ type: 'success', message: 'Message captured. A backend can be connected later.' }));
    } else {
      dispatch(showNotification({ type: 'error', message: result.payload?.errors ? 'Please review the form.' : 'Unable to submit right now.' }));
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-line bg-surface p-8" role="status">
        <CheckCircle2 className="h-8 w-8 text-teal" />
        <h3 className="mt-4 text-2xl font-semibold text-navy">Message received.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This form is prepared for future API integration. No email has been sent yet. Your details were stored locally in application state.
        </p>
        <div className="mt-6">
          <Button type="button" variant="secondary" onClick={() => dispatch(resetContact())}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput id="fullName" label="Full Name" value={values.fullName} onChange={onChange} error={fieldErrors.fullName} required autoComplete="name" />
        <FormInput id="email" label="Email" type="email" value={values.email} onChange={onChange} error={fieldErrors.email} required autoComplete="email" />
        <FormInput id="phone" label="Phone" type="tel" value={values.phone} onChange={onChange} error={fieldErrors.phone} autoComplete="tel" />
        <FormInput id="company" label="Company" value={values.company} onChange={onChange} autoComplete="organization" />
        <div className="sm:col-span-2">
          <FormSelect
            id="service"
            label="Service"
            value={values.service}
            onChange={onChange}
            options={serviceSelectOptions}
            error={fieldErrors.service}
            required
            placeholder="Select a service"
          />
        </div>
        <div className="sm:col-span-2">
          <FormTextarea
            id="message"
            label="Message"
            value={values.message}
            onChange={onChange}
            error={fieldErrors.message}
            required
            placeholder="Tell us about the problem you want to solve."
          />
        </div>
      </div>
      {status === 'error' && error && (
        <p className="mt-4 text-sm text-navy" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6">
        <Button type="submit" arrow disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Start a Conversation'}
        </Button>
      </div>
    </form>
  );
}
