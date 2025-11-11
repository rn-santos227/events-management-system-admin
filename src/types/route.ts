
import type { ReactNode, ComponentType } from 'react';

export interface Route {
  name: string;
  path: string;
  element?: ReactNode | ComponentType<unknown>;
  children?: Route[];
  protected?: boolean;
  layout?: ComponentType<unknown>;
  allowedRoles?: string[];
  meta?: {
    title?: string;
    icon?: ReactNode;
    description?: string;
  };
}