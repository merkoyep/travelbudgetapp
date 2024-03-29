import { Form, NavLink } from 'react-router-dom';
import { HomeIcon, TrashIcon } from '@heroicons/react/24/solid';
import '../App.css';

const Nav = ({ userName }) => {
  return (
    <nav className='flex bg-green-300 p-4 text-white fill-white'>
      <NavLink
        to='/'
        aria-label='Go home'
        className='flex items-center flex-1 hover:text-black'
      >
        <HomeIcon width={40} />
        <h1>Home</h1>
      </NavLink>

      {userName && (
        <Form
          method='post'
          action='/logout'
          onSubmit={(event) => {
            if (!window.confirm('Leaving? This will erase all data.')) {
              event.preventDefault();
            }
          }}
        >
          <button
            type='submit'
            className='button
            button--warning flex items-center hover:text-black'
          >
            <TrashIcon width={40} />
            Exit
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
