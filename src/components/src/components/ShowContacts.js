import React, { Component } from "react";
import { projectDatabase } from "../firebase/config";

export class ShowContacts extends Component {
  componentDidMount() {
    const storageRef = projectDatabase.ref(
      "university/makerere/cedat/school of engineering/contacts"
    );
    storageRef.once("value", (snapshot) => {
      let resourceDocs = [];

      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        resourceDocs.push(childData);
      });

      this.setState(resourceDocs);
      console.log(resourceDocs);
    });
  }
  render() {
    return <div></div>;
  }
}

export default ShowContacts;
