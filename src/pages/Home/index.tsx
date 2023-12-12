import { Header, TaskGroup, Searchbar } from '~/components';

export default function () {
  return (
    <div className='home page'>
      <Header title='Reminders' />
      <Searchbar />
      <TaskGroup />
      change margin on "Reminders" to be in line with rest <br></br>
      change search bar height to be same as task box height <br></br>
    </div>
  );
}
