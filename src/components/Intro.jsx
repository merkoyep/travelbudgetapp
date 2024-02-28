import { Form } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';

const Intro = () => {
  return (
    <div className='intro'>
      <div>
        <h1>Take Control of your travel spending!!</h1>
        <p>Have fun and be financially responsible!</p>
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
      </div>
    </div>
  );
};
export default Intro;
