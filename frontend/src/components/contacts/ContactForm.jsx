import { useContext, useEffect, useState } from 'react';
import { ContactContext } from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
};

const ContactForm = () => {
  const [contact, setContact] = useState(initialContact);

  const contactContext = useContext(ContactContext);

  useEffect(() => {}, []);

  const { name, email, phone, type } = contact;

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    contactContext.addContact(contact);
    clearAll();
  };

  const clearAll = () => {};

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        id='personal'
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      <label htmlFor='personal'>Personal</label>{' '}
      <input
        id='professional'
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      <label htmlFor='professional'>Professional</label>
      <div>
        <input
          type='submit'
          value={'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      }
    </form>
  );
};

export default ContactForm;
