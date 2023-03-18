import { publicRoutes, privateRoutes } from "./routes/index";
import ProtectRoute from "./routes/ProtectRoute";
import PublicRoute from "./routes/PublicRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { ukoTheme } from "./theme/index";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function App() {
  const appTheme = ukoTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />

        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PublicRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </PublicRoute>
                  }
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              let Layout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectRoute>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </ThemeProvider>
      <Toaster />
    </StyledEngineProvider>
  );
}

export default App;
