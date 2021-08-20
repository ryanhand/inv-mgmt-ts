import { render } from "react-dom";
import { App } from "./App";

// HTML                      vs JSX
// class                        className
// for                          htmlFor
// inline styles are strings    inline styles are objects, numbers = px
// <!-- comments -->            {/* comments */}
// attributes are kebob-cased   props are camelCase

render(<App />, document.getElementById("root"));
