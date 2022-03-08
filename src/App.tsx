
import { UserContextProvider } from './hooks/userContext'
import Routes from "./routes";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  )
}

export default App;
