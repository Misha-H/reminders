import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SettingsContextProvider } from '~/context/settings';
import { routes } from '~/routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <SettingsContextProvider>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page()} />
          ))}
        </Routes>
      </SettingsContextProvider>
    </BrowserRouter>
  );
}

export default App;
