import { getUserByUserId } from "../redux/features/auth/authThunk"
import { useDispatch } from "react-redux";

const GetUserById = async (userId: string) => {

const dispatch = useDispatch();

  try {
    if(!userId) {
      return
    }

    const user = await dispatch(getUserByUserId(userId) as any)

    return user.payload[0]
  } catch (error) {
    console.log("Error while fetching the user", error)
  }
}

export { GetUserById }