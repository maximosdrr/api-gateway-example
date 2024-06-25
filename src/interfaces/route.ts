export interface Route {
  alias?: string;
  path: string;
  method: string;
  permissions?: string[];
}
