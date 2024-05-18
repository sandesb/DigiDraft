import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    return (
        
        <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

          {/* Desktop sidebar */}
          <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            {/* Sidebar content */}
                {/* Desktop sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="text-gray-500 dark:text-gray-400">

          <ul className="mt-6">
            {/* Menu items */}
            {/* Replace href with React Router Link or similar */}
            {/* Example: <Link to="/dashboard"> */}
            <Link to="/"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Backlog</span>
              </a>
            </li></Link>
           
            <Link to="Sprint"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Sprint</span>
              </a>
            </li></Link>

            <Link to="Record"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Record</span>
              </a>
            </li></Link>
          </ul>

          <div className="px-6 my-6">
            <Link to="Form1"><button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create Task
              <span className="ml-2" aria-hidden="true">+</span>
            </button></Link>
          </div>

          

          <div className="px-6 my-6">
  <Link to="Form2">
    <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-800">
      Prioritize Task
      <span className="ml-2" aria-hidden="true">+</span>
    </button>
  </Link>
</div>

        </div>
      </aside>
          </aside>
    
          {/* Mobile sidebar */}
          <CSSTransition
            in={isSideMenuOpen}
            classNames="side-menu"
            timeout={150}
            unmountOnExit
          >
          </CSSTransition>
    
          <CSSTransition
            in={isSideMenuOpen}
            classNames="side-menu"
            timeout={150}
            unmountOnExit
          >
            <aside
              className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
            >
              {/* Mobile sidebar content */}
              {/* Replace this with your mobile sidebar content */}
            </aside>
          </CSSTransition>
   
   
            <div class="w-full overflow-hidden rounded-lg shadow-xs">

              
              
            </div>
        </div>
      );
    };
    

export default Sidebar;
