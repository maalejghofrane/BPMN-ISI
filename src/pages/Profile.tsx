import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { Storage } from '@ionic/storage';
import App from '../App';
import Login from './Login';
import { useEffect, useState } from 'react';
import { personAddOutline, chatboxEllipsesOutline, imageOutline, bookmarkOutline, arrowForward, settings } from 'ionicons/icons';
import { profile } from 'console';
import { IonList, IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/react';

const Profile: React.FC = () => {


  const history = useHistory();
  const [lastName, setLastName] = useState(['']);
  const [firstName, setFirstName] = useState([''])
  const [email, setEmail] = useState([''])
  const [nbProcesses, SetNbProcesses] = useState([0])
  const [nbTasks, setNbTasks] = useState([0])

  const [image, setImage] = useState("../assets/icon/entrepreneur.png")


  var username = localStorage.getItem('username')
  var password = localStorage.getItem('password')
  

  var profileURL = 'http://digitalisi.tn:8080/engine-rest/user/' + username + '/profile';

  let headers = new Headers();
  var processesURL = 'http://digitalisi.tn:8080/engine-rest/process-definition/count?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0';
  var tasksURL = 'http://digitalisi.tn:8080/engine-rest/task/count?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15';

  headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(profileURL, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(json => {
      setEmail(json.email)
      setLastName(json.lastName)
      setFirstName(json.firstName)
      console.log(json);
    });

  fetch(processesURL, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(json => {
      SetNbProcesses(json.count)
      console.log("processes", json);
    });

  fetch(tasksURL, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(json => {
      setNbTasks(json.count)
      console.log("tasks", json);
    });



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mon profile : <b>{firstName} {lastName}</b></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
         
          </IonRow>
          <IonRow >
          <IonCol size="5">
            <IonItem key= "1">
            <IonImg  src={image} />
          </IonItem>            
          </IonCol>
            <IonCol size="7">
              <IonCard color='medium'>
                <IonCardHeader>
                  <IonRow >
                    <IonIcon />
                    <IonCardSubtitle>Informations de l'{username} :</IonCardSubtitle>
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol>
                      <IonText>
                        <b>Nom :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{firstName}
                      </IonText>
                    </IonCol>
                    
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonText>
                        <b>Prenom :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{lastName}
                      </IonText>
                    </IonCol>
                    
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonText>
                        <b>Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{email}</b>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>     
          <IonRow >
            <IonCol size="12">
              <IonCard color="success" >
                <IonCardContent>
                <IonCardSubtitle>Taches</IonCardSubtitle>
                  <IonCardTitle>{nbTasks}</IonCardTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12">
              <IonCard color='secondary'>
                <IonCardContent>
                <IonCardSubtitle>Processus</IonCardSubtitle>
                  <IonCardTitle>{nbProcesses}</IonCardTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Profile;
