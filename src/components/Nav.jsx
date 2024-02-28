import { Form, NavLink } from 'react-router-dom';
import { HomeIcon, TrashIcon } from '@heroicons/react/24/solid';
import '../App.css';

const Nav = ({ userName }) => {
  return (
    <nav className='flex bg-green-300 p-4 text-white fill-white'>
      <NavLink to='/' aria-label='Go home' className='flex items-center flex-1'>
        <HomeIcon width={40} />
        <h1>Home</h1>
      </NavLink>

      {userName && (
        <Form
          method='post'
          action='/logout'
          onSubmit={(event) => {
            if (
              !window.confirm('Logout? You will need your trip name to login.')
            ) {
              event.preventDefault();
            }
          }}
        >
          <button
            type='submit'
            className='button
            button--warning flex items-center'
          >
            <TrashIcon width={40} />
            Sign out
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
