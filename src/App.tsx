import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import { ItemForm } from "./ItemForm";
import { Nav } from "./Nav";
import { UserContextProvider, UserContextType } from "./UserContext";

export function App() {
  const queryClient = new QueryClient();
  const user: UserContextType = {
    email: "ryanwhand@gmail.com",
    name: "Ryan",
    role: "admin",
    token: "abc123",
  };

  return (
    <UserContextProvider value={user}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Nav />
          {/* we could use Switch here too */}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/item" exact>
            <ItemForm />
          </Route>
          <Route path="/item/:itemId">
            <ItemForm />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
