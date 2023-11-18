
type UserFull = {
    userName: string
    _id: string
    email: string
    image: string
    lName: string
    fName: string
    password: string | null,
    image: string | null,
    isVerified: boolean | null,
    isActive: boolean | null,
    role: string | null
}




interface UserState {
    userName: string
    _id: string
    email: string
    image: string
    lName: string
    fName: string
  






    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    errorMessage: string;
    requestStatus: number;
    loginErrorMessage: string;
}