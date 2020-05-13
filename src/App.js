import React from "react";
import "./App.css";
import { Provider } from "./Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Switch } from "react-router-dom";

import Contacts from "./components/contact/Contacts";
import AddContact from "./components/contact/AddContact";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Test from "./components/test/Test";
import EditContact from "./components/contact/EditContact";

function App() {
  return (
    <Provider>
      <HashRouter>
        <div className="App">
          <Header branding="Contact Manger" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route exact path="/contact/add" component={AddContact} />
              <Route exact path="/contact/edit/:id" component={EditContact} />
              <Route exact path="/contact/about" component={About} />
              <Route exact path="/test" component={Test} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
