import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, RouteProps, Routes } from 'react-router-dom';
import { AuthPage } from '../components/atoms/auth-page';
import { Version } from '../components/page/version';
import { Role } from '../types/user';
import { ROUTE_CONSTANT } from './shared/constant';
import { Layout } from './shared/layout';
import Home from '../components/page/Home';
import Form from "../components/page/Form";
import Helper from '../context/Helper';

/**
 * use the below code for the components which uses default export
 * const IndexPage = lazy(() => import('../components/page'));
 */

const IndexPage = lazy(() =>
  import('../components/page').then((module) => ({
    default: module.Index,
  })),
);

const authorizedRoutes: AuthRouteProps[] = [
  {
    path: ROUTE_CONSTANT.auth,
    element: <IndexPage />,
  },
  {
    path: ROUTE_CONSTANT.role,
    element: <IndexPage />,
    roles: [Role.administrator],
  },
];

export function AppRoute() {
  return (
    <HashRouter>
      <Helper>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path={ROUTE_CONSTANT.home} element={<Layout />}>
            {/* <Route path={''} element={<IndexPage />} />
            {authorizedRoutes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={
                  <AuthPage {...r} element={r.element} roles={r.roles} />
                }
              />
            ))}
            <Route path={ROUTE_CONSTANT.version} element={<Version />} /> */}

            <Route path="/" element={<Home />} />
            <Route path="/Form?/:id" element={<Form />} />
            <Route path={'*'} element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
      </Helper>
    </HashRouter>
  );
}

function FullPageLoader() {
  return <div>Loading...</div>;
}

function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

type AuthRouteProps = RouteProps & {
  roles?: Role[];
};
