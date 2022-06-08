import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { Storage } from '@ionic/storage';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, exit, heartOutline, heartSharp, list, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, person, settings, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useEffect, useState } from 'react';
import { IonThumbnail, IonImg, } from '@ionic/react';


interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Profile',
    url: '/profile',
    iosIcon: person,
    mdIcon: person
  },
  {
    title: 'Liste des processus',
    url: '/page/Liste%20des%20processus',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline
  },

  {
    title: 'Liste des tâches',
    url: '/page/Liste%20des%20tâches',
    iosIcon: settings,
    mdIcon: settings
  },

  {
    title: 'Déconnecter',
    url: '/page/deconnect',
    iosIcon: exit,
    mdIcon: exit
  }
];


interface ScanNewProps {
  username: any;
}
const Menu: React.FC<ScanNewProps> = ({ username }) => {
  const [image, setImage] = useState("../assets/icon/LogoIsi.png")
  const location = useLocation();
  const [haveProcesses, setHaveProcesses] = useState(false);
  const [haveTasks, setHavetasks] = useState(false)
  var password = localStorage.getItem('password')
  let headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

  var processesURL = 'http://digitalisi.tn:8080/engine-rest/process-definition/count?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0';
  var tasksURL = 'http://digitalisi.tn:8080/engine-rest/task/count?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15';
  fetch(processesURL, {
    method: 'GET',
    headers: headers,
    //credentials: 'user:passwd'
  })
    .then(response => response.json())
    .then(json => {
      setHaveProcesses(json.count > 0)
      console.log("processes", json);
    });

  fetch(tasksURL, {
    method: 'GET',
    headers: headers,
    //credentials: 'user:passwd'
  })
    .then(response => response.json())
    .then(json => {
      setHavetasks(json.count > 0)
      console.log("tasks", json);
    });
  console.log("booleans", haveProcesses, haveTasks);
  console.log("menu username", username);
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Digital ISI</IonListHeader>
          <IonImg src={image} />

          <IonNote > <b>{username}</b></IonNote>
          {appPages.map((appPage, index) => {
            if ((appPage.title == 'Liste des tâches' && haveTasks === false) || (appPage.title == 'Liste des processus' && haveProcesses === false))
              return;

            if (appPage.title == 'Déconnecter')
              var onClick = async () => {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                window.location.href = "/";
              }
            else
              var onClick = async () => {
                window.location.href = appPage.url;
              }
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem onClick={onClick} className={location.pathname === appPage.url ? 'selected' : ''} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>


      </IonContent>
    </IonMenu>
  );
};

export default Menu;
