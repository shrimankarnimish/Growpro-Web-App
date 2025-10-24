import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  UsersIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Profile,
  Tables,
  Notifications,
  Customer,
  User
} from "@/pages/dashboard";

import Addcustomer from "@/pages/dashboard/addcustomer";
import Viewcustomer from "@/pages/dashboard/viewcustomer";
import AddUser from "@/pages/dashboard/adduser"; // <-- New
import ViewUser from "@/pages/dashboard/viewuser"; // <-- New
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "customers",
        path: "/customers",
        element: <Customer />,
        collapse: [
          {
            name: "Add Customer",
            path: "/customers/add",
            element: <Addcustomer />,
          },
          {
            name: "View Customer",
            path: "/customers/view",
            element: <Viewcustomer />,
          },
        ],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users", // <-- New main tab
        path: "/users",
        element: <User />, // optional if you have a main Users page, otherwise null
        collapse: [
          {
            name: "Add User",
            path: "/users/add",
            element: <AddUser />,
          },
          {
            name: "View User",
            path: "/users/view",
            element: <ViewUser />,
          },
        ],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
