import { getDownloadURL, getStorage, ref,  uploadBytesResumable } from "firebase/storage";
import { app } from "./firebase";


export const API_URL = "http://localhost:8800"

export const uploadFIle = (setFileUrl, file) => {
    const storage = getStorage(app);

    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

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
                console.log("Successfully uploaded", downloadURL)
                setFileUrl(downloadURL);
            });
        }
    );


};

export function formatNumber(num) {
    console.log("----------------------------------------------");
    console.log(num);
    if(num >= 1000000) {
        return (num / 1000000 ).toFixed(1) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num;
}

export function getInitials(fullName) {
    const names = fullName.split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
    const initialsStr = initials.join(" ");

    return initialsStr;
}

export function createSlug(title){
    return title
    .toLowerCase()
    .replace( /\s+/g, '=')              //replace spaces with -
    .replace( /[^\w-]+/g, '')           //remove non-word characters
    .replace( /--+/g, '-')              //replace multiple - with single -
    .replace( /^-+/, '')                //trim - from start of text
    .replace( /-+$/, '');               //trim - from end to text
}

export const updateURL = ({ page, navigate, location }) => {
    const params = new URLSearchParams();

    if (page && page > 1) {
        params.set("page", page);
    }

    const newURL = `${location.pathname}? ${params.toString()}`;
    navigate(newURL, {replace: true});

    return newURL;
};



