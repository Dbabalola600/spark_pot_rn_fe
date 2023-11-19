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
        ) .then((response) => {
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

        
    }





}



async function myFunc(){
    console.log(await recipeRequest.getAllRecipes("", 5))
}

myFunc()


export default recipeRequest