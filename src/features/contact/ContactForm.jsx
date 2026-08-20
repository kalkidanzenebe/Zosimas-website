import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2 } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields';
import { Button } from '../../components/common/Button';
import { localizedServiceOptions } from '../../i18n/data';
import { resetContact, submitContact } from '../../store/slices/contactSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { useI18n } from '../../hooks/useI18n';

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
  const { t, locale } = useI18n();
  const { status, error, fieldErrors } = useSelector((state) => state.contact);
  const [values, setValues] = useState(emptyForm);
  const options = localizedServiceOptions(locale);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(submitContact(values));
    if (submitContact.fulfilled.match(result)) {
      setValues(emptyForm);
      dispatch(showNotification({ type: 'success', message: t('form.captured') }));
    } else {
      dispatch(
        showNotification({
          type: 'error',
          message: result.payload?.errors ? t('form.review') : t('form.unable'),
        }),
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-line bg-surface p-8" role="status">
        <CheckCircle2 className="h-8 w-8 text-teal" />
        <h3 className="mt-4 text-2xl font-semibold text-ink">{t('form.successTitle')}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t('form.successBody')}</p>
        <div className="mt-6">
          <Button type="button" variant="secondary" onClick={() => dispatch(resetContact())}>
            {t('form.another')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput id="fullName" label={t('form.fullName')} value={values.fullName} onChange={onChange} error={fieldErrors.fullName} required autoComplete="name" />
        <FormInput id="email" label={t('form.email')} type="email" value={values.email} onChange={onChange} error={fieldErrors.email} required autoComplete="email" />
        <FormInput id="phone" label={t('form.phone')} type="tel" value={values.phone} onChange={onChange} error={fieldErrors.phone} autoComplete="tel" />
        <FormInput id="company" label={t('form.company')} value={values.company} onChange={onChange} autoComplete="organization" />
        <div className="sm:col-span-2">
          <FormSelect
            id="service"
            label={t('form.service')}
            value={values.service}
            onChange={onChange}
            options={options}
            error={fieldErrors.service}
            required
            placeholder={t('form.selectService')}
          />
        </div>
        <div className="sm:col-span-2">
          <FormTextarea
            id="message"
            label={t('form.message')}
            value={values.message}
            onChange={onChange}
            error={fieldErrors.message}
            required
            placeholder={t('form.messagePlaceholder')}
          />
        </div>
      </div>
      {status === 'error' && error && (
        <p className="mt-4 text-sm text-ink" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6">
        <Button type="submit" arrow disabled={status === 'submitting'}>
          {status === 'submitting' ? t('form.sending') : t('form.submit')}
        </Button>
      </div>
    </form>
  );
}
