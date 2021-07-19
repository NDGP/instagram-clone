import firebase from "firebase";
import { USER_STATE_CHANCE } from "../constents";

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    dispatch({type: USER_STATE_CHANCE, currentUser: snapshot.data()})
                }
                else{
                    console.log('user does not exist')
                }
            })
    })
}