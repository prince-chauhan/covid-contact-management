import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editContact } from '../reducers';
import { Contact } from '../types';
import { RootState } from '../store';

const EditContactForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const existingContact = useSelector((state: RootState) => state.contacts.value.find(contact => contact.id === Number(id)));
  
    const [contact, setContact] = useState<Contact | undefined>(existingContact);
  
   // Function to handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContact({ ...contact!, [event.target.name]: event.target.value });
    };
  
  // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (contact) {
        dispatch(editContact(contact));// Dispatches the action to edit the contact
        navigate('/');// navigate back to home page
      }
    };
  
    if (!contact) {
      return <p>Contact not found</p>;
    }
  
    return (
        <div className='w-full flex-col flex items-center'>
        <h5 className="text-xl font-medium text-gray-900 text-center mb-8 ">Edit Contact Screen</h5>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form>
                <div className="mb-6">
            {/* Input for first name */}
                <label htmlFor="first" className="block mb-2 text-md font-medium text-gray-900 ">First Name</label>
                <input type="text" id="first" name='firstName' onChange={handleChange} value={contact.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required/>
                </div>
                <div className="mb-6">
            {/* Input for last name */}
                <label htmlFor="last" className="block mb-2 text-md font-medium text-gray-900 ">Last Name</label>
                <input type="text" id="last" name='lastName' onChange={handleChange} value={contact.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required/>
                </div>
            {/* Radio button for active/inactive status */}
                <label htmlFor="last" className="block mb-2 text-md font-medium text-gray-900 ">Status</label>
                <div className="flex items-center mb-10">
                    <input id="option-1" type="radio" name="status" onChange={handleChange}  value={'1'} className="w-4 h-4 border-gray-300 " checked={contact.status==='1'} />
                    <label htmlFor='option-1' className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Active
                    </label>

                    <input id="option-2" type="radio" name="status" onChange={handleChange}  value={'0'} className="ml-6 w-4 h-4 border-gray-300 " checked={contact.status==='0'}/>
                    <label htmlFor='option-2' className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Inactive
                    </label>
                </div>
            </form>
        </div>
      {/* Button to make the changes in contact */}
        <button type="submit" onClick={handleSubmit} className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center ">Save Edited Contact</button>
    </div>
    );
  };
  
  export default EditContactForm;
  