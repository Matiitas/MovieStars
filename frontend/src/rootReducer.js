import { combineReducers } from "redux";
import auth from "./reducers/auth";

//auth es con el nombre que se pued encontrar en la store de redux
//en el mapStateToProps(state) ---- state.auth
export default combineReducers({
  auth,
});
