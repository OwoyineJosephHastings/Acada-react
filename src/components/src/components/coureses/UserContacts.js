import React, { useEffect, useState } from "react";
import { projectDatabase } from "../../firebase/config";
import logo from "../../statics/logo.png";

const UserContacts = () => {
  const [Contacts, setContacts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const storageRef = projectDatabase.ref(
      "university/makerere/cedat/school of engineering/contacts"
    );
    console.log(projectDatabase);

    storageRef
      .once("value", (snapshot) => {
        let resourceDocs = [];

        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          childData = { ...childData, childKey };
          resourceDocs.push(childData);
        });

        setContacts(resourceDocs);
        console.log(resourceDocs);
      })
      .then((data) => {
        setLoading(null);
      });
  }, []);

  return (
    <div>
      {Loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      {Contacts && (
        <div className>
          {Contacts.map((contact) => {
            return (
              <div className="card" style={{ width: "100%" }} key={contact.key}>
                <div className="card-body" key={contact.key}>
                  <h5 className="card-title">
                    <img
                      src={logo}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                      className="card-img-top"
                      alt="profile icon"
                    />
                    {"     " + contact.Username}
                  </h5>
                  <p className="card-text">{contact.Message}</p>
                  <a href="/" className="btn btn-primary">
                    View
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserContacts;
