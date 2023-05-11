import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import '../App.css'
import ContactList from './ContactList';
import AddContactForm from './AddContactForm';
import EditContactForm from './EditContactForm';
import Charts from './Charts';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   creating a reference for the sidebar using the useRef hook
  const sidebarRef = useRef<HTMLElement | null>(null);

//   accessing the current location using the useLocation hook from react-router-dom to use in further condition
  const location = useLocation()

//   defining a click event handler to handle clicks outside the sidebar to close the sidebar
  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

//   effect for event listener on every mouse-click
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);
  return (
    <div className='h-full'>
      
      
<div className='w-full flex bg-blue-500 min-[768px]:z-50 fixed pt-2 pb-2 min-[769px]:pt-3 min-[769px]:pb-3'>

<button data-drawer-target="default-sidebar" onClick={()=>setIsSidebarOpen((!isSidebarOpen))} data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className=" inline-flex items-center p-2 mt-2 ml-3 text-sm text-slate-50 rounded-lg sm,md:hidden hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 max-[768px]:z-50 min-[769px]:hidden">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>
<div className='w-full flex items-center justify-center max-[768px]:-ml-10 ml-56 text-2xl font-medium text-slate-50'>{location.pathname.startsWith('/charts')?'Charts and Maps':'Contact Page'}</div>
</div>
{/* render UI for sidebar nav */}
<aside ref={sidebarRef} id="default-sidebar" className={`fixed min-[768px]:top-14 top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 ${isSidebarOpen?'translate-x-0 ':'max-[768px]:-translate-x-full'}`} aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-slate-100 ">
      <ul className="space-y-2 font-medium">
         <li>
            <Link to="/" className={`flex items-center p-2 text-gray-900 rounded-lg ${!location.pathname.startsWith('/charts')?'bg-blue-700 text-slate-50':'text-gray-900 hover:bg-slate-200'}`}>
               <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
               <span className="flex-1 ml-3 whitespace-nowrap">Contact</span>
            </Link>
         </li>
         <li>
            <Link to="/charts" className={`flex items-center p-2 rounded-lg  ${location.pathname.startsWith('/charts')?'bg-blue-700 text-slate-50':'text-gray-900 hover:bg-slate-200'}`}>
               <svg aria-hidden="true" className="w-6 h-6 transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3">Charts and Maps</span>
            </Link>
         </li>
      </ul>
   </div>
</aside>
{/* main component where all the components/pages will load */}
<main className="p-4 max-[768px]:ml-0 ml-64 items-center flex flex-col pt-20">
      {/* defining routes to use them inside this main container */}
   <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="add" element={<AddContactForm />} />
          <Route path="edit/:id" element={<EditContactForm />} />
          <Route path="charts" element={<Charts />} />
  </Routes>
</main>

{/* backdrop when sidebar is opened on mobile devices */}
{isSidebarOpen?<div drawer-backdrop="" className="max-[768px]:bg-gray-900 max-[768px]:bg-opacity-50  max-[768px]:fixed max-[768px]:inset-0 max-[768px]:z-30"></div>:null}
</div>
  );
};

export default Dashboard;
