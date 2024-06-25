import { Route } from './route';

export class Resource {
  name: string;
  path: string;
  routes: Route[];

  constructor(data: { name: string; path: string; routes: Route[] }) {
    Object.assign(this, data);
  }

  getRouteByPathAndMethod(path: string, method: string): Route {
    return this.routes.find((route) => {
      return route.path === (path ?? '/') && route.method === method;
    });
  }
}
