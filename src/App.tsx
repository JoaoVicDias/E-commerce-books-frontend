
import { CartContextProvider } from './hooks/cartHook';
import { UserContextProvider } from './hooks/userContext'

import Routes from "./routes";

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App;
