import {Outlet,createBrowserRouter} from "react-router-dom"
import Xyz from "./xyz"
import Login from "./page/login"
import MultipleInputs from "./page/signup";
import Page from "./page/home";
import ShowEmployee from "./page/UserDisplay";
import DeleteDisplay from "./component/deleteacc";
import UpdateUser from "./component/updateuser";
import AddUser from "./component/adduser";
import SimpleDisplay from "./page/SimpleDisplay";

const App = ()=>{
 return <Outlet/>
}

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/xyz",
        element : <Xyz/>
      },
      {
        path: "/signin",
        element: <Login></Login>
      },
      {
        path:"/",
        element: <Page></Page>
      },
      {
        path:"/signup",
        element: <MultipleInputs></MultipleInputs>
      },
      {
        path:"/home",
        element: <Page></Page>
      },
      {
        path: "/display",
        element: <ShowEmployee></ShowEmployee>
      },
      {
        path: "/DeleteDisplay/:id",
        element: <DeleteDisplay></DeleteDisplay>
      },
      {
        path: "/update/:id",
        element: <UpdateUser></UpdateUser>
      },
      {
        path: "/adduser",
        element: <AddUser></AddUser>
      },
      {
        path: "/simpledisplay",
        element: <SimpleDisplay></SimpleDisplay>
      }

    ]
  }

])
export default appRouter;