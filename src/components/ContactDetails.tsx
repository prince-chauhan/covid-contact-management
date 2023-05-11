import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) => state.contacts.value.find(contact => contact.id === Number(id)));

  if (!contact) {
    return <p>Contact not found</p>;
  }

  return (
    <div>
      <h2>{contact.firstName}</h2>
      <p>{contact.lastName}</p>
      <p>{contact.status}</p>
    </div>
  );
};

export default ContactDetails;
