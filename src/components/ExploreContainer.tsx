import { IonIcon,IonAvatar, IonContent, IonItem, IonLabel, IonPage } from '@ionic/react';
import { off } from 'process';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import './ExploreContainer.css';
import { Storage } from '@ionic/storage';
import { type } from 'os';
import { IonList, IonThumbnail, IonImg } from '@ionic/react';
import { archiveOutline, archiveSharp, bookmarkOutline, exit, heartOutline, heartSharp, list, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, person, settings, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';


interface ContainerProps {
  name: string;
  
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    const [image, setImage] = useState("")
    const [processes, setProcesses] = useState([])
    const [iconType, setIconType] = useState(settings)

    
    if(name == "Liste des processus") {
      var url = 'http://digitalisi.tn:8080/engine-rest/process-definition?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15';
    }
    else {
      var url = 'http://digitalisi.tn:8080/engine-rest/task?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0';
    }

    const handleLocation = async () => {
      if(name == "Liste des processus") {
        setIconType(person);
      }
      else {
        setIconType(settings);
      }
  
    }

    console.log(name);
      let headers = new Headers();
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

      const fetcher = ()=>fetch(url, {method:'GET',
              headers: headers,
            })
      .then(response => response.json())
      .then(json => {
        console.log("fddf");

        setProcesses(json);
      })

      useEffect(() => {
       fetcher();
      }, [processes]);

     

      return <Virtuoso
      style={{ height: '100%' }}
      totalCount={processes.length}
      itemContent={(index) => {
        
        let object = JSON.parse(JSON.stringify(processes[index]));
        return (
          <div style={{ height: '56px' }}>
            <IonItem onClick={()=>{window.location.href='/form/'+name+"/"+object.name+"/"+object.id}}>
            <IonIcon  ios={iconType} md={iconType} />
              <IonLabel> {object.name}</IonLabel>
            </IonItem>
          </div>
        );
      }}
    />;
    
  
 
};

export default ExploreContainer;


