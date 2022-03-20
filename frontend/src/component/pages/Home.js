import React from 'react';
import ContactList from '../contacts/ContactList';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>Contact Form</div>

      <div>
        <h2>ContactList</h2>
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
