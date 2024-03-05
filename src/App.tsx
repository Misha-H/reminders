import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from '~/routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.page()} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
