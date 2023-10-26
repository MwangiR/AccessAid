import auth from '../utils/auth';
import UserProfile from '../components/UserProfileCard';
import ViewClients from '../components/viewClients';
import ActivityFeed from '../components/ActivityFeed';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    console.log(data);

    return (
      <>
        <div className='min-h-screen flex border-r'>
          <nav className='w-56 flex-none flex-col text-anti-white shadow-md bg-navGray'>
            sidebar
          </nav>
          <main className='flex-1 min-w-0 overflow-auto'>
            {' '}
            <UserProfile username={data.username} email={data.email} />
            <ActivityFeed />
            <ViewClients />
          </main>
        </div>
      </>
    );
  }

  auth.login();
}
