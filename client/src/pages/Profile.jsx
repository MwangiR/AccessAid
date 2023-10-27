// import { createContext } from 'react';
import auth from '../utils/auth';
import UserContext from '../utils/userContext';
import UserProfile from '../components/UserProfileCard';
import ViewClients from '../components/viewClients';
import EventsFeed from '../components/eventsFeed';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    // console.log('User', data);

    return (
      <>
        {/* <div className='min-h-screen flex border-r'>
          <nav className='w-56 flex-none flex-col text-anti-white shadow-md bg-navGray '>
            sidebar
          </nav>
          <main className='flex-1 min-w-0 overflow-auto'>
            <UserProfile username={data.username} email={data.email} />
            <EventsFeed />
            <ViewClients />
          </main>
        </div> */}
        <UserContext.Provider value={data}>
          <div className='min-h-screen flex flex-col'>
            <div className='flex-1 flex flex-col sm:flex-row'>
              <main className='flex-1 bg-indigo-100'>
                <UserProfile />
                <EventsFeed />
                <ViewClients />
              </main>

              <nav className='order-first sm:w-32 bg-purple-200 text-anti-white shadow-md bg-navGray'>
                Sidebar
              </nav>

              <aside className='sm:w-32 bg-yellow-100'>Right Sidebar</aside>
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
