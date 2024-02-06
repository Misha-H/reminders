import { Header, Searchbar, TaskGroup } from '~/components';

export default function () {
  return (
    <div className='home page'>
      <Header title='Tasks' />
      <Searchbar />
      <TaskGroup />
    </div>
  );
}
