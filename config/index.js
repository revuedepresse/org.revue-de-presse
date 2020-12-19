const raven = {
  dsn: process.env.RAVEN_DSN
};

const testMode = false;

const getHostAndScheme = environmentProvider => {
  let host = "localhost";
  let scheme = "http://";

  const environment = environmentProvider.getEnvironmentParameters();
  if (environment.productionMode) {
    host = "api.press-review.weaving-the-web.org";
    scheme = "https://";
  }

  return {
    host,
    scheme
  };
};

const api = {
  routes: {
    actions: {
      fetchHighlights: {
        method: "get",
        route: "/api/twitter/highlights",
        params: {
          pageSize: Number,
          pageIndex: Number
        }
      }
    }
  }
};

const getApi = environmentProvider => {
  api.host = getHostAndScheme(environmentProvider).host;
  api.scheme = getHostAndScheme(environmentProvider).scheme;

  return api;
};
const getRoutes = () => api.routes;
const getSchemeAndHost = () => `${api.scheme}${api.host}`;

export default {
  getApi,
  getRoutes,
  getSchemeAndHost,
  raven,
  testMode
};
