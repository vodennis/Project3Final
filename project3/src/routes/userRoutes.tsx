import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Generate } from "../views/Generate";
import { Search } from "../views/Search";
import { Individual } from "../views/Individual";

export function UserRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/Generate" Component={Generate} />
        <Route path="/Search" Component={Search} />
        <Route path="/Individual" Component={Individual} />
        <Route path="*" Component={Generate}/>
      </Route>,
    ),
  );
}
