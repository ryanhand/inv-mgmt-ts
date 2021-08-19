import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { Nav } from "./Nav";
import { ItemForm } from "./ItemForm";

// HTML                      vs JSX
// class                        className
// for                          htmlFor
// inline styles are strings    inline styles are objects, numbers = px
// <!-- comments -->            {/* comments */}
// attributes are kebob-cased   props are camelCase

render(
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
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
