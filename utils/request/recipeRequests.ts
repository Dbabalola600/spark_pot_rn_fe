import axios from "axios";



import { BASE_URL } from "../lib/envvar";



const recipeRequest = {


    getAllRecipes: async (
        search: any,
        page: any
    ) => {


        let res: {
            status: number;
            data: any;
            message: string
        } = {
            status: 0,
            data: {},
            message: ""
        }



        return await axios.get(
            BASE_URL +
            "/recipe/", {
            params: {
                search: search,
                page: page
            }
        }
        ).then((response) => {
            res.status = response.data.status;
            res.data = response.data.data;
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


    createNewRecipe: async (
        userId: any,
        image: any,
        servings: any ,
        ingredients: any,
        name: any,
        instructions: any ,
        date_added: any,
        total_time: any,
        description: any,
        // ispublic: any
    ) => {

        let newInfo = {
            custom:true,
            userId: userId,
            image: image,
            servings: servings ,
            ingredients: ingredients,
            name: name,
            instructions: instructions ,
            date_added: date_added,
            total_time: total_time,
            description: description,
            public: false
        }


        const body = newInfo
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
                "/recipe/newRecipe",
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



    addtoJournalfromAPI: async(
        userId: any,
        image: any,
        servings: any ,
        ingredients: any,
        name: any,
        instructions: any ,
        date_added: any,
        total_time: any,
        description: any,
        author: any,
        slugId: any
    )=>{


        let newInfo = {
            custom:false,
            userId: userId,
            image: image,
            servings: servings ,
            ingredients: ingredients,
            name: name,
            instructions: instructions ,
            date_added: date_added,
            total_time: total_time,
            description: description,
            public: true,
            slugId:slugId,
            author: author
        }

        const body = newInfo
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
            "/recipe/newRecipe",
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


}



// async function myFunc() {
//     console.log(await recipeRequest.getAllRecipes("", 5))
// }

// myFunc()


export default recipeRequest