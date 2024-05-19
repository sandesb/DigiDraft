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
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span className="ml-4">Backlog</span>
              </a>
            </li></Link>
           
            <Link to="Sprints"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span className="ml-4">Sprint</span>
              </a>
            </li></Link>

            <Link to="Sprint"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
                <span className="ml-4">Update</span>
              </a>
            </li></Link>

            <Link to="Record"><li className="relative px-6 py-3">
              <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className="ml-4">Record</span>
              </a>
            </li></Link>
          </ul>

          <div className="px-6 my-6">
            <Link to="Form1"><button className="flex items-center justify-between w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create Task
            </button></Link>
          </div>

          

          <div className="px-6 my-6">
  <Link to="Form2">
    <button className="flex items-center justify-between w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-teal-600 border border-transparent rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-800">
      Prioritize
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
