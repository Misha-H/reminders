import { BrowserRouter, Route, Routes } from 'react-router-dom';

// TODO: Delete this as we dont need/use it
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
