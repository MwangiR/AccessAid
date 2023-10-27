import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import ErrorPage from './pages/Error';
import Profile from './pages/Profile';
import ManageClients from './pages/manageClients';
import App from './App.jsx';
import './index.css';
import auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const isAuthenticated = auth.loggedIn();

const getRouteElement = (Component) => {
  return isAuthenticated ? <Component /> : <Navigate to='/' />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/profile',
        element: getRouteElement(Profile),
      },
      {
        path: '/manageClients',
        element: getRouteElement(ManageClients),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>,
);
