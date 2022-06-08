import { IonAvatar, IonButton, IonCheckbox, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRadio } from '@ionic/react';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { off } from 'process';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
  type: string;
  id: string;
}

const FormContainer: React.FC<ContainerProps> = ({ name, type, id }) => {
  
    const [taskVars, setTaskVars] = useState([]);
    

    if(type == "Liste des processus") {
      var url = 'http://digitalisi.tn:8080/engine-rest/process-definition/'+id+'/form-variables';

    }else {
      var url = 'http://digitalisi.tn:8080/engine-rest/task/'+id+'/form-variables';

    }
    let username = localStorage.getItem("username");
    let password = localStorage.getItem("password");

    let headers = new Headers();
    
    //headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

    const fetcher = ()=>fetch(url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
          })
    .then(response => response.json())
    .then(json => {
      setTaskVars(json);
    });

    useEffect(() => {
     fetcher();
    }, []);
    
    console.warn("taskvars",Object.entries(taskVars));
    var formData = new Map();
    //les variables de formulaire array, par défaut object
    let form_array = Object.entries(taskVars);
    //html qu'il va etre affiché, Boucle 
    let form_dom = form_array
    .map(entry => {
        var object = JSON.parse(JSON.stringify(entry[1]))
        formData.set(entry[0],object.value);

        if(object.type =="Boolean")
        return <IonItem>
      <IonLabel position="floating">{entry[0]}</IonLabel>
      <IonCheckbox onIonChange={e=>{formData.set(entry[0], (e.target as HTMLInputElement).value); } } id={entry[0]} name={entry[0]}  />
      
    </IonItem>;
          
      else {
          return <IonItem>
          <IonLabel position="floating">{entry[0]}</IonLabel>
          <IonInput type="text" value={object.value} onIonChange={e=>{formData.set(entry[0], (e.target as HTMLInputElement).value); } } id={entry[0]} name={entry[0]} />
  
      </IonItem>;
      }
    });
    
    let handleSubmit = () => {
        
          var object_vars = form_array.map(entry=>{
          var json_entry = JSON.parse(JSON.stringify(entry));
          console.log(json_entry[1]);
          if(json_entry[1].type == "String")
            json_entry[1].value= formData.get(json_entry[0]);
          else
            json_entry[1].value= formData.get(json_entry[0])=== 'on'?"true":"false";   
          return json_entry;
        });
        console.log(object_vars);
        //on a changé l'array object 
        var variables = Object.fromEntries(object_vars);
        //body eli bech nabathouh
        var body_req = {
          variables: variables
        };
        //lchkoun bech tabaath
        if(type == "Liste des processus")
          var endpoint = "http://digitalisi.tn:8080/engine-rest/process-definition/"+id+"/submit-form";
        else
        var endpoint = "http://digitalisi.tn:8080/engine-rest/task/"+id+"/complete";

        //alert(JSON.stringify(body_req))
        headers.append('Content-type', 'application/json');
        fetch(endpoint, {method:'POST',
            headers: headers,
            body: JSON.stringify(body_req)
            //credentials: 'user:passwd'
          })
          .then(response => {
            //alert("responsee"+JSON.stringify(response));
            window.location.href = "page/"+type;

            })
          .then(json => {
          });
        } 

// afficher form_dom
    let form = <form name="process_form"  id="process_form" className="ion-padding">
    {form_dom}
    <IonButton color="dark" onClick={handleSubmit} className="ion-margin-top" expand="block">
    Submit
  </IonButton>

  </form>;
    

      return form;
    
  
 
};

export default FormContainer;


