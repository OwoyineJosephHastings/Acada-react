import React, { useEffect,useState } from 'react'
import {projectDatabase} from '../firebase/config';

function ShowContacts() {
    const [loading, setLoading] = useState(true);
    const [resourceDocuments, setResourceDocs] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = ()=>{
        const storageRef = projectDatabase.ref("university/makerere/cedat/school of engineering/contacts")
        let resourceDocs = [];
        storageRef
        .once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            resourceDocs.push(childData, childKey);
          });
        }).then((e) => {
          setResourceDocs(resourceDocs);
          setError(null);
          setLoading(false);
          console.log(resourceDocuments)
        
        })
        .catch((e) => {
          setResourceDocs(null);
          console.log(e)
          setLoading(false);
          setError(e);
        });
        
    }

    useEffect(()=>{
        fetchData();
           
    },[])
    return (
        <div>
            {resourceDocuments.length!==0 &&<a href="/courses"> works</a>}
            {loading&&<h1>loading...</h1>}
        </div>
    )
}

export default ShowContacts
