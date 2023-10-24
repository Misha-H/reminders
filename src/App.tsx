import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DataContextProvider } from './context';
import { routes } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/settings' element={<Settings />} /> */}
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page()} />
          ))}
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;

{
  /* <div className='app'>
  <Navbar />

  <h1>Reminders</h1>

  <Searchbar />

  <TaskGroup />
</div> */
}
