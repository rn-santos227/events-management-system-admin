
import type { ReactNode, ComponentType } from 'react';

export interface AppRoute {
  name: string;
  path: string;
  element?: ReactNode | ComponentType<unknown>;
  children?: AppRoute[];
  protected?: boolean;
  layout?: ComponentType<unknown>;
  allowedRoles?: string[];
  meta?: {
    title?: string;
    icon?: ReactNode;
    description?: string;
  };
}