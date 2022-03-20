import React from 'react';
import ContactForm from '../contacts/ContactForm';
import ContactList from '../contacts/ContactList';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
