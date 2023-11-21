import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DataContextProvider } from '~/context';
import { routes } from '~/routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page()} />
          ))}
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
