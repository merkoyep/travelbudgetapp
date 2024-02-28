import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard, { dashboardLoader, dashboardAction } from './pages/Dashboard';
import Main, { mainLoader } from './layouts/Main';
import React from 'react';
import Error from './pages/Error';
import { logoutAction } from './actions/logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from './pages/ExpensesPage';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
        errorElement: <Error />,
        action: expensesAction,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
