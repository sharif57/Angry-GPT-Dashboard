import { CiSettings, CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Guests from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";

import { FaUser } from "react-icons/fa";
import {
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";


import Setting from "../pages/Main/Setting/Setting";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { TbCash } from "react-icons/tb";
import { PiLaptopThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import Subscription from "../pages/Main/Subscription/Subscription";
import AddSubscription from "../pages/Main/AddSubscription/AddSubscription";
import { BookOpenText } from "lucide-react";
import Books from "../pages/Main/Books/Books";
import AddBook from "../pages/Main/AddBook/AddBook";
import AddBookEdit from "../pages/Main/AddBookEdit/AddBookEdit";
import ManageOrders from "../pages/Main/Manage Orders/ManageOrders";
import TransactionHistory from "../pages/Main/TransactionHistory/TransactionHistory";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    name: "User",
    path: "users",
    icon: FaUser,
    element: <Guests />,
  },


  {
    name: "Subscription",
    path: "subscription",
    icon: TbCash,
    element: <Subscription  />,
  },
  {
    path: "addsubscription",
    element: <AddSubscription  />,
  },
  {
    name: "Books",
    path: "books",
    icon: BookOpenText ,
    element: <Books />,
  },
  {
    path: "addBook",
    element: <AddBook />,
  },
  {
    path: "addBookEdit/:id",
    element: <AddBookEdit />,
    loader: ({ params }) => fetch(`${import.meta.env.VITE_IMAGE_API}/books/${params.id}`),
  },
  {
    name: "Manage Orders",
    path: "manage-orders",
    icon: PiLaptopThin,
    element: <ManageOrders />,
  },
  {
    name: "Transaction History",
    path: "transaction-history",
    icon: PiLaptopThin,
    element: <TransactionHistory />,
  },

  {
    name: "Setting",
    path: "settings",
    icon: IoSettingsOutline,
    element: <Setting />,
  },
  {
    path: "/hosts/:id",
    element: <HostDetails />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: <ChangePassword />,
      },
      {
        path: "settings/change-password/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: <VerifyEmail />,
      },
      {
        name: "Terms & Condition",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
      {
        name: "Trust & Safety",
        icon: BiMessageSquareDetail,
        path: "settings/trust-safety",
        element: <Trust />,
      },
      {
        path: "settings/trust-safety/edit",
        element: <EditTrust />,
      },
    ],
  },
];
