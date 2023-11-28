import { Header } from '~/components';

export default function () {
  return (
    <div className='timetable page'>
      <Header title='Timetable' />

      <div className='actions'>
        <button className='bg-red fit'>Reset</button>
      </div>
    </div>
  );
}
