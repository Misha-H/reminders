import { Header, Searchbar, TaskGroup } from '~/components';

export default function () {
  return (
    <div className='home page'>
      <Header title='Reminders' />
      <Searchbar />
      <TaskGroup />
    </div>
  );
}
