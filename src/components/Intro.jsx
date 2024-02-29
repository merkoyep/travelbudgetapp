import { Form } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Intro = () => {
  return (
    <div
      className='self-start mt-40
    ml-10'
    >
      <div className='flex flex-col gap-2 items-left'>
        <h1 className='font-semibold text-5xl mt-8 mb-3'>Travel Budgeter</h1>
        <p>Take Control of your travel spending!</p>
        <Form method='post' className='flex gap-2'>
          <input
            type='text'
            name='userName'
            required
            placeholder='Where are we going?'
            aria-label='Your destination'
            className='border text-center'
          />
          <input type='hidden' name='_action' value='newUser' />
          <button
            type='submit'
            className='btn flex items-center border rounded-sm p-1'
          >
            <PaperAirplaneIcon width={20} />
            Create Trip
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Intro;
