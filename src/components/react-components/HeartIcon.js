import React from "react";
import firebase from "../data_components/firebase";
import { db } from "../data_components/firebase";

class HeartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HeartUpdated: false,
      baseUrl: "https://snaptok.herokuapp.com/",
    };
  }
  componentDidMount() {
    try {
      db.collection("users")
        .where("uid", "==", this.props.uid)
        .get()
        .then((query) => {
          const doc = query.docs[0];
          console.log(doc);
          this.setState({
            HeartUpdated: doc.data().hearts.includes(this.props.postId ),
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  handleFirestoreHeart = (props) => {
    db.collection("users")
      .where("uid", "==", this.props.uid)
      .get()
      .then((query) => {
        const document = query.docs[0];
        if (props === "add")
          document.ref.update({
            hearts: firebase.firestore.FieldValue.arrayUnion(this.props.postId),
          });
        else
          document.ref.update({
            hearts: firebase.firestore.FieldValue.arrayRemove(
              this.props.postId
            ),
          });
      });
  };

  sendHeartRequests = async (props) => {
    const idToken = await firebase.auth().currentUser.getIdToken();

    fetch(this.state.baseUrl + "heart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        FIREBASE_AUTH_TOKEN: idToken,
      },
      body: JSON.stringify({ id: this.props.postId, action: props }),
    })
      .then((res) => res.json())
      .catch((err) => err);
  };

  updateHeart = () => {
    if (this.state.HeartUpdated) {
      this.setState((prevState, props) => ({
        HeartUpdated: false,
      }));
      this.sendHeartRequests("decrease");
      this.handleFirestoreHeart("remove");
    } else {
      this.setState((prevState, props) => ({
        HeartUpdated: true,
      }));
      this.sendHeartRequests("increase");
      this.handleFirestoreHeart("add");
    }
  };

  render() {
    return (
      <>
        {this.state.HeartUpdated ? (
          <i
            class="fa fa-heart icon-heart"
            aria-hidden="true"
            onClick={this.updateHeart}
            style={{ color: "#ef3f3f", fontSize: "x-large" }}
          ></i>
        ) : (
          <i
            class="fa fa-heart-o"
            aria-hidden="true"
            style={{ fontSize: "x-large" }}
            onClick={this.updateHeart}
          ></i>
        )}
      </>
    );
  }
}

export default HeartIcon;
