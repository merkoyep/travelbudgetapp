import { Form, useLoaderData } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
const Intro = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const users = useLoaderData();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Extract selected username from the form
    const username = event.target.selectTrip.value;
    // Implement your login logic here, possibly including redirecting the user
    console.log('Logging in user:', username);
    // Redirect after login, or set state indicating the user is logged in
  };

  return (
    <div className='intro'>
      <div>
        <h1>Take Control of your travel spending!!</h1>
        <p>Have fun and be financially responsible!</p>
        <div>
          <button
            onClick={() => {
              setLogin(true);
              setSignup(false);
            }}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setSignup(true);
              setLogin(false);
            }}
          >
            Sign up
          </button>
        </div>
        {login && (
          <Form onSubmit={handleLoginSubmit}>
            <label htmlFor='selectTrip'>Select Trip</label>
            <select name='selectTrip' id='selectTrip' required>
              {users.map((user) => {
                return (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </Form>
        )}
        {signup && (
          <Form method='post'>
            <input
              type='text'
              name='userName'
              required
              placeholder="What's your name?"
              aria-label='your Name'
            />
            <input type='hidden' name='_action' value='newUser' />
            <button type='submit' className='btn'>
              Create Account
              <UserPlusIcon width={20} />
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};
export default Intro;
