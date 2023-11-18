import axios from "axios";



import { BASE_URL } from "../lib/envvar";








const userRequest = {
    userLogin: async (
        userName: any,
        password: any,
    ) => {
        let loginInfo = {
            userName: userName,
            password: password,
        }


        const body = loginInfo
        let res: {
            status: number;
            data: any;
            message: string
        } = {
            status: 0,
            data: {},
            message: ""
        }

        return await axios
            .post(
                BASE_URL +
                "/user/login",
                body,
                {
                    headers: {
                    },
                    method: "POST"
                }
            )

            .then((response) => {
                res.status = response.data.status;
                res.data = response.data;
                res.message = response.data.message;
                return res;
            })
            .catch((err) => {
                if (err.response) {
                    res.status = err.response.status;
                    res.data = err.response.data;
                } else {
                    res.status = 500;
                    res.data = {};
                }
                res.message = err.message;
                return res;
            });


    },

    createAccount: async (
        userName: any,
        password: any,
        fName: any,
        lName: any,
        email: any
    ) => {
        let accountInfo = {
            userName: userName,
            password: password,
            fName: fName,
            lName: lName,
            email: email
        }


        const body = accountInfo
        let res: {
            status: number;
            data: any;
            message: string
        } = {
            status: 0,
            data: {},
            message: ""
        }


        return await axios
            .post(
                BASE_URL +
                "/user/create",
                body,
                {
                    headers: {
                    },
                    method: "POST"
                }
            )

            .then((response) => {
                res.status = response.data.status;
                res.data = response.data;
                res.message = response.data.message;
                return res;
            })
            .catch((err) => {
                if (err.response) {
                    res.status = err.response.status;
                    res.data = err.response.data;
                } else {
                    res.status = 500;
                    res.data = {};
                }
                res.message = err.message;
                return res;
            });

    }




}


async function myFunc() {
    console.log(await userRequest.createAccount(
        "jae","password","jaeger","sparks","jaeger.sparks" 
    )
    )

}

myFunc()

export default userRequest
