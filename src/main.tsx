import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { LazyApp } from "./Pages/App.lazy.tsx";
import Loading from "./components/Loading/Loading.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <LazyApp />
              </Suspense>
            }
          />
          <Route
            path="app"
            element={
              <Suspense fallback={<Loading />}>
                <LazyApp />
              </Suspense>
            }
          />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
