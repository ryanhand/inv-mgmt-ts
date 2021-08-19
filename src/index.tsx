import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { Nav } from "./Nav";

// HTML                      vs JSX
// class                        className
// for                          htmlFor
// inline styles are strings    inline styles are objects, numbers = px
// <!-- comments -->            {/* comments */}
// attributes are kebob-cased   props are camelCase

render(
  <BrowserRouter>
    <Nav />
    <Route path="/about">
      <About />
    </Route>
    <Route path="/" exact>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
