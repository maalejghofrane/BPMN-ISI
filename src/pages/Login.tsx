import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle, storefront } from "ionicons/icons";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { Storage } from '@ionic/storage';
import App from '../App';


const Login: React.FC = () => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const store = new Storage();
  store.create();
  const handleLogin = async () => {
    if (!username) {
        setMessage("Entrez un username valide");
        setIserror(true);
        return;
    }
    
    if (!password) {
        setMessage("Entrez un password valide");
        setIserror(true);
        return;
    }

  
    var baseURL= 'http://digitalisi.tn:8080/engine-rest/user/'+username+'/profile';
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));  
    console.log(baseURL) ;
    fetch(baseURL, {method:'GET',
            headers: headers,
          })
    .then(response => response.json())
    .then(json => {
      console.warn(json, "JSON");
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      window.location.href = "profile";
    }).catch(()=>{ setMessage("L utilisateur n existe pas");
        setIserror(true);});
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Se Connecter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center test">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Quitter"]}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <img style={{width:150}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Institut_Sup%C3%A9rieur_d%27Informatique_%28logo%29.svg/1200px-Institut_Sup%C3%A9rieur_d%27Informatique_%28logo%29.svg.png"></img>
          </IonCol>
          
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Username</IonLabel>
            <IonInput
                type="text"
                value={username}
                onIonChange={(e) => setUserName(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton  color="dark" expand="block" onClick={handleLogin}>Se connecter</IonButton>
              

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;