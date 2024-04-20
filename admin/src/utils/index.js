import { app } from "./firebase";
import { getDownloadURL, getStorage, ref,  uploadBytesResumable } from "firebase/storage";


export const API_URL = "http://localhost:8800"

export const uploadFIle = (setFileUrl, file) => {
    const storage = getStorage(app);

    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, File);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = 
            ( snapshot.bytesTransferred / snapshot.totalBytes )* 100;

            console.log("Upload is " + progress + "% done");

            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Uploading is running");
                    break;
            }
        },
        (error) => {console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                console.log("Successfully uploaded")
                setFileUrl(downloadURL);
            });
        }
    );


};