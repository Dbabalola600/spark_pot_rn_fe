import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userRequest from '../utils/request/userRequests';
import { RootState } from './store';




const initialState: UserState = {
    userName: "",
    _id: "",
    email: "",
    image: "",
    lName: "",
    fName: "",
    errorMessage: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    requestStatus: 0,
    loginErrorMessage: "",
}




export const loginUser = createAsyncThunk(
    "auth/",
    async (
        { userName, password }: { userName: string; password: string },
        thunkApi
    ) => {
        try {
            const saveResponse = await userRequest.userLogin(userName, password)
            console.log("slice")
            // console.log(saveResponse.data)

            if (saveResponse.data.message === "success") {

                // let UserInfo: UserFull = saveResponse.data.data as UserFull
                let UserInfo = saveResponse.data.data
                return {
                    allUserInformation: UserInfo,

                    saveResponse
                }
                // console.log(UserResponse.status)
               
            } else {

                // console.log(saveResponse.data)
                switch (saveResponse.data.status) {
                    case 0:
                        return thunkApi.rejectWithValue(
                            "A network error occur. Please check your connection"
                        );
                    case 403:
                        return thunkApi.rejectWithValue(
                            "Invalid Email or Password"
                        );
                    case 400:
                        return thunkApi.rejectWithValue(
                            "A bad request occured"
                        );
                    case 500:
                        return thunkApi.rejectWithValue(
                            "Something went wrong with our servers please try again later"
                        );
                    default:
                        return thunkApi.rejectWithValue(
                            "An error occured. Please try again later"
                        );
                }
            }
        } catch (e: any) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }


    }
);


const UserInformation = (

    state: UserState,
    allUserInformation: UserFull
) => {


  state._id= allUserInformation._id
  state.fName= allUserInformation.fName
  state.email= allUserInformation.email
  state.image = allUserInformation.image
  state.lName =allUserInformation.lName
  state.userName = allUserInformation.userName
    return state;
};




const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthStateTokens(
            state: UserState,
            action: PayloadAction<{ _id: any; email: any }>
        ) {
            state._id = action.payload._id;
            state.email = action.payload.email;
        },
        clearAuthState(state: UserState) {
            return initialState;
        }, logOut(state: UserState, action: PayloadAction<{ _id: any }>) {
            // state._id = null
            localStorage.clear()
        },
        deleteAuthItem: (state) => ({
            ...state,
            user: {

                userName: "",
                _id: "",
                email: "",
                image: "",
                password: "",
                isActive: false,
                isVerified: false,
                role: "",
            },
            _id: "",
        }),


    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                // when login is pending
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.loginErrorMessage = ""
                return state;
            })

            .addCase(loginUser.rejected, (state: UserState, action) => {
                // when login is unsuccessful
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.loginErrorMessage = action.payload as string;
                return state;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // when login is successful
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loginErrorMessage = ""
                console.log(" success payload here")
                // console.log(action.payload);
                const allUserInformation = action.payload
                    ?.allUserInformation as UserFull;
                return UserInformation(state, allUserInformation);
            })
            // .addCase(LogoutUser.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.isSuccess = true;

            //     console.log("here")
            //     console.log(action.payload);
            //     // const allUserInformation = action.payload
            //     //     ?.allUserInformation as UserFull;
            //     return defaultAuth(state);
            // });

    },

});


export const { setAuthStateTokens, clearAuthState, deleteAuthItem } =
authSlice.actions;



export const authSelector = (state: RootState) => state;



export default authSlice.reducer;
