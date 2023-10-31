import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef, createContext } from 'react';
import { GET_CLIENTS } from '../utils/queries';
import BioData from '../components/Client_Elements/viewBioData';
import SingleClientEvent from '../components/Client_Elements/singleClientFeed';
import AddNewEvent from '../components/forms/addNewEvent';
import ClientMedication from '../components/Client_Elements/singleClientMedications';

export const ClientContext = createContext();

export default function ManageClients() {
  const { loading, data } = useQuery(GET_CLIENTS);
  const manageClients = data?.clients || [];
  console.log('Manage clients data', manageClients);

  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const [selectClientID, setSelectedClientID] = useState(null);

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (tabSelected.currentTab >= 1 && tabSelected.currentTab < tabSelected.noTabs) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (tabSelected.currentTab > 1 && tabSelected.currentTab <= tabSelected.noTabs) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleClientSelection = (e) => {
    setSelectedClientID(e.target.value);
    console.log('selected CLientID', e.target.value);
  };

  if (loading) {
    return <span className='loading loading-dots loading-lg'></span>;
  }

  return (
    <ClientContext.Provider value={{ currentClient: data }}>
      <div className='min-h-screen flex flex-col'>
        <div className='flex-1 flex flex-col sm:flex-row'>
          {/* //tabs to display Client info */}
          <main className='flex-1 bg-indigo-100 m-10'>
            <div>
              <select
                className='select select-success w-full max-w-xs'
                onChange={handleClientSelection}
              >
                <option disabled selected>
                  Select Client
                </option>
                {manageClients &&
                  manageClients.map((client) => {
                    return (
                      <option key={client.name} value={client._id}>
                        {client.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <section className='max-w-full' aria-multiselectable='false'>
                <ul
                  className='flex items-center border-b border-slate-200'
                  role='tablist'
                  ref={wrapperRef}
                >
                  <li className='' role='presentation'>
                    <button
                      className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                        tabSelected.currentTab === 1
                          ? 'border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500'
                          : 'justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500'
                      }`}
                      id='tab-label-1a'
                      role='tab'
                      aria-setsize='3'
                      aria-posinset='1'
                      tabIndex={`${tabSelected.currentTab === 1 ? '0' : '-1'}`}
                      aria-controls='tab-panel-1a'
                      aria-selected={`${tabSelected.currentTab === 1 ? 'true' : 'false'}`}
                      onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
                    >
                      {/* //tab 1 heading */}
                      <span>Client Bio Data</span>
                    </button>
                  </li>
                  <li className='' role='presentation'>
                    <button
                      className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                        tabSelected.currentTab === 2
                          ? 'border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500'
                          : 'justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500'
                      }`}
                      id='tab-label-2a'
                      role='tab'
                      aria-setsize='3'
                      aria-posinset='2'
                      tabIndex={`${tabSelected.currentTab === 2 ? '0' : '-1'}`}
                      aria-controls='tab-panel-2a'
                      aria-selected={`${tabSelected.currentTab === 2 ? 'true' : 'false'}`}
                      onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
                    >
                      <span>Client Events</span>
                    </button>
                  </li>
                  <li className='' role='presentation'>
                    <button
                      className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                        tabSelected.currentTab === 3
                          ? 'border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500'
                          : 'justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500'
                      }`}
                      id='tab-label-3a'
                      role='tab'
                      aria-setsize='3'
                      aria-posinset='2'
                      tabIndex={`${tabSelected.currentTab === 3 ? '0' : '-1'}`}
                      aria-controls='tab-panel-2a'
                      aria-selected={`${tabSelected.currentTab === 3 ? 'true' : 'false'}`}
                      onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
                    >
                      <span>Client Medication</span>
                    </button>
                  </li>
                </ul>
                <div className=''>
                  <div
                    className={`px-6 py-4 ${tabSelected.currentTab === 1 ? '' : 'hidden'}`}
                    id='tab-panel-1a'
                    aria-hidden={`${tabSelected.currentTab === 1 ? 'true' : 'false'}`}
                    role='tabpanel'
                    aria-labelledby='tab-label-1a'
                    tabIndex='-1'
                  >
                    {/* <p>
                      What is the recipe for successful achievement? To my mind there are just four
                      essential ingredients: Choose a career you love, give it the best there is in
                      you, seize your opportunities, and be a member of the team.
                    </p> */}

                    {/* //Display client biodata */}
                    <BioData clientId={selectClientID} />
                  </div>
                  <div
                    className={`px-6 py-4 ${tabSelected.currentTab === 2 ? '' : 'hidden'}`}
                    id='tab-panel-2a'
                    aria-hidden={`${tabSelected.currentTab === 2 ? 'true' : 'false'}`}
                    role='tabpanel'
                    aria-labelledby='tab-label-2a'
                    tabIndex='-1'
                  >
                    {/* <p>
                      One must be entirely sensitive to the structure of the material that one is
                      handling. One must yield to it in tiny details of execution, perhaps the
                      handling of the surface or grain, and one must master it as a whole.
                    </p> */}
                    <SingleClientEvent clientId={selectClientID} />
                  </div>
                  <div
                    className={`px-6 py-4 ${tabSelected.currentTab === 3 ? '' : 'hidden'}`}
                    id='tab-panel-3a'
                    aria-hidden={`${tabSelected.currentTab === 3 ? 'true' : 'false'}`}
                    role='tabpanel'
                    aria-labelledby='tab-label-3a'
                    tabIndex='-1'
                  >
                    <ClientMedication clientId={selectClientID} />
                  </div>
                </div>
              </section>
            </div>
          </main>

          <nav className='order-first bg-purple-200 text-anti-white shadow-md bg-navGray flex flex-col'>
            <div className='m-4'>sidebar</div>
          </nav>

          <aside className=' bg-yellow-100'>
            {/* Right Sidebar */}
            <div className='mt-4 mb-2 mr-2'>
              <AddNewEvent clientId={selectClientID} />
            </div>
          </aside>
        </div>
        {/* 
          <footer className='bg-gray-100'>Footer</footer> */}
      </div>
    </ClientContext.Provider>
  );
}
