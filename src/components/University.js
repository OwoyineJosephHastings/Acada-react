import React, { useState } from 'react';
import { projectDatabase } from '../firebase/config';


const University = (props) => {
  const [resourceDocuments, setResourceDocs] = useState([]);
 const load =e =>{
   
    const storageRef = projectDatabase.ref("university/");
    
let resourceDocs=[];
    storageRef
     .once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var children= childSnapshot.getChilren();
        resourceDocs.push(children);
      });
    }).then(
      e=>{setResourceDocs(resourceDocs);
      console.log(resourceDocuments)
      }

      );
    
 }
 

    return (
        <div >
            <button className="btn btn-success" onClick={(e)=>{load()}}>HEllo</button>
        </div>
    );
}

export default University;
