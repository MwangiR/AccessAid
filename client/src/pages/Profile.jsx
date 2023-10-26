import auth from '../utils/auth';
import UserProfile from '../components/UserProfileCard';
import ViewClients from '../components/viewClients';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    console.log(data);

    return (
      <>
        <div className='min-h-screen flex border-r'>
          <nav className='w-56 flex-none flex-col'>sidebar</nav>
          <main className='flex-1 min-w-0 overflow-auto'>
            {' '}
            <UserProfile username={data.username} email={data.email} />
            <ViewClients />
          </main>
        </div>
      </>
    );
  }

  auth.login();
}
