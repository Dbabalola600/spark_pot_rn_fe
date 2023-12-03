import { useEffect, useState } from "react";
import { SecureStorage } from "../singleton/secureStorage";








export const userGetUserInfo = async () => {

    const [user, setUser] = useState<any>({});


    useEffect(() => {
        const fetchUser = async () => {
            let userId = await SecureStorage.getInst().getValueFor("userId");
            let fName = await SecureStorage.getInst().getValueFor("fName");
            let lName = await SecureStorage.getInst().getValueFor("lName");
            let image = await SecureStorage.getInst().getValueFor("image");

            setUser({
                userid: userId,
                fName: fName,
                lName: lName,
                image: image
            });
        };

        fetchUser();
    }, []);



    // console.log(user)



    return (user)


}