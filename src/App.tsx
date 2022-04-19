
import { CartContextProvider } from './hooks/cartHook';
import { UserContextProvider } from './hooks/userContext'
import CategorysProvider from './hooks/categoryHook';

import Routes from "./routes";

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <CategorysProvider>
          <Routes />
          </CategorysProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App;
