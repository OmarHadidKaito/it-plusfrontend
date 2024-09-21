import { FC } from "react";
import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";

const Loadable = (Component: FC) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const GeoPage = Loadable(lazy(() => import("src/pages/Geo")));

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <GeoPage />,
      },
    ],
  },
];
