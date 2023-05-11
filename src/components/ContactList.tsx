import React from 'react';
import { useSelector } from 'react-redux';
import { Contact } from '../types';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../reducers';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.value);
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className="flex flex-col items-center w-full justify-center">
    <div className="flex items-center justify-center h-12 mb-4 rounded">
        <button type="button" onClick={()=>navigate('add')} className="text-gray-900 inline-flex items-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg px-5 py-2.5 mr-2 mb-2 "> 
          <svg fill="none" className='w-5 mr-3' stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
          </svg>
          <span className='font-medium text-sm  '>
            Create Contact
          </span>
        </button>
      </div>
             
       

      {contacts.length?
      <div className="grid lg:grid-cols-3 max-[1024px]:grid-cols-2 max-[560px]:grid-cols-1 gap-4 mb-4">  
      {contacts.map((contact: Contact) => ( 
        <div key={contact.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <div className='flex-col flex items-center'>            
                <p className="font-medium text-gray-700 text-xl ">{`${contact.firstName} ${contact.lastName}`}</p>
                <p className=" mb-10 font-normal text-gray-700 text-lg ">{contact.status==='1'?'Active':'Inactive'}</p>              
            </div>
            <div className='inline-flex w-full justify-evenly '>
            <button type="button" onClick={()=>navigate(`edit/${contact.id}`)} className="text-gray-900 inline-flex items-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg px-5 py-2.5 mr-2 mb-2 "> 
            <svg fill="none" className='w-4 mr-2' stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
            </svg> 
            <span className='font-medium text-sm  '>
            Edit
            </span>
            </button>
            <button type="button" onClick={()=>dispatch(deleteContact(contact.id))} className="focus:outline-none inline-flex items-center  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 "> 
            <svg fill="none" className='w-4 mr-2' stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
            </svg> 
            <span className='font-medium text-sm  '>
                Delete
            </span>
            </button>
            </div>        
        </div>      
      ))}
      </div>
      :
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg flex items-center mt-10">
            <div className='w-20 mr-8'>
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
            </div>
            <div className='flex-col flex jus items-center'>            
                <h4 className="font-medium text-gray-700 text-lg ">No Contact Found</h4>
                <p className=" mt-5 font-normal text-gray-700 text-md ">Please add contact from Create Contact Button</p>              
            </div>      
        </div>
      }
    </div>
  );
};

export default ContactList;
