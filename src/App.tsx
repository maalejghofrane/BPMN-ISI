import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import { Storage } from '@ionic/storage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Form from './pages/Form';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Profile from './pages/Profile';

setupIonicReact();

const App: React.FC = () => {

  var username = localStorage.getItem("username");
  if (username === null) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/page/:name" component={Page} exact={true} />
            <Route path="/form/:name" exact={true} component={Form} />
            <Route path="/login" component={Login} exact={true} />
          </IonRouterOutlet>

        </IonReactRouter>
      </IonApp>
    );
  }
  else
    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu username={username} />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/profile" />
              </Route>
              <Route path="/profile" component={Profile} exact={true} />
              <Route path="/page/:name" component={Page} exact={true} />
              <Route path="/form/:type/:name/:id" exact={true} component={Form} />
              <Route path="/login" component={Login} exact={true} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
};

export default App;
