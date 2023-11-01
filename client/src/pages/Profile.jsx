// import { createContext } from 'react';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';
import UserContext from '../utils/userContext';
import UserProfile from '../components/Profile_Elements/UserProfileCard';
import ViewClients from '../components/Profile_Elements/viewClients';
import EventsFeed from '../components/Profile_Elements/eventsFeed';
import modalComponent from '../components/modalComponent';
import AddNewClient from '../components/forms/addNewClient';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    // console.log('User', data);

    return (
      <>
        <UserContext.Provider value={data}>
          <div className='min-h-screen flex flex-col'>
            <div className='flex-1 flex flex-col sm:flex-row'>
              <main className='flex-1 bg-indigo-100'>
                <UserProfile />
                <EventsFeed />
                <ViewClients />
              </main>

              <nav className='order-first bg-purple-200 text-anti-white shadow-md bg-navGray flex flex-col'>
                <div className='m-4 flex flex-col'>
                  <Link className='btn btn-outline btn-secondary' to='/manageClients'>
                    Manage Clients
                  </Link>
                  <Link className='btn btn-outline btn-secondary my-4' to='/manageMedications'>
                    Manage Medications
                  </Link>
                  <div className='mt-4'>{modalComponent(AddNewClient, 'Add New Client')}</div>
                </div>
              </nav>

              <aside className='sm:w-32 bg-yellow-100'>{/* <p>Right sidebar</p> */}</aside>
            </div>
            {/* 
          <footer className='bg-gray-100'>Footer</footer> */}
          </div>
        </UserContext.Provider>
      </>
    );
  }

  auth.login();
}
