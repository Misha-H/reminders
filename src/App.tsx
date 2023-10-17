import { Searchbar, TaskGroup } from './components';
import { DataContextProvider } from './context';

function App(): JSX.Element {
  return (
    <DataContextProvider>
      <div className='app'>
        <h1>Reminders</h1>

        <Searchbar />

        <TaskGroup />
      </div>
    </DataContextProvider>
  );
}

export default App;
