import auth from '../utils/auth';
import UserProfile from '../components/UserProfileCard';
import ViewClients from '../components/viewClients';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    console.log(data);

    return (
      <>
        <UserProfile username={data.username} email={data.email} />
        <ViewClients />
      </>
    );
  }

  auth.login();
}
