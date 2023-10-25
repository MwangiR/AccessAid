import auth from '../utils/auth';

export default function Profile() {
  if (auth.loggedIn) {
    const { data } = auth.getProfile();
    console.log(data);

    return (
      <>
        Profile
        <p>{data.username}</p>
      </>
    );
  }

  auth.login();
}
