import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { Storage } from '@ionic/storage';
import App from '../App';
import Login from './Login';
import { useEffect, useState } from 'react';
const Page: React.FC = () => {

 
  const { name } = useParams<{ name: string; username: any; }>();
  const history = useHistory();
  console.log(name);
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])


  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
