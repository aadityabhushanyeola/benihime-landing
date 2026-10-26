import { useState } from 'react';
import { Copy, Mail, Phone } from 'lucide-react';
import { contactEmail, phoneNumbers } from '../siteConfig';

export function ContactDetails() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setError(false);
      setMessage('Email address copied. Paste it into your email app.');
    } catch {
      setError(true);
      setMessage(`Could not copy automatically. Please select and copy ${contactEmail}.`);
    }
  };
  return <div className="contact-details">
    <a href={`mailto:${contactEmail}`} onClick={() => { setError(false); setMessage('Opening your email app. If nothing opens, copy the address below.'); }}><Mail size={15}/>{contactEmail}</a>
    <div className="contact-phones">{phoneNumbers.map(phone => <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}><Phone size={14}/>{phone}</a>)}</div>
    <button type="button" className="copy-email" onClick={copyEmail}><Copy size={13}/>Copy email</button>
    <p className={`contact-message ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'} aria-live={error ? 'assertive' : 'polite'}>{message}</p>
  </div>;
}
