import HighlightList from "../components/highlight-list/highlight-list.vue";
import Time from "./time";

const defaultRedirect = `/highlights/${Time.today()}/${Time.today()}`;

export default [
  {
    path: "/",
    redirect: defaultRedirect
  },
  {
    component: HighlightList,
    path: "/highlights/:startDate/:endDate",
    name: "highlights"
  },
  {
    path: "*",
    redirect: defaultRedirect
  }
];
