
import type { ReactNode, ComponentType } from 'react';

export interface Route {
  name: string;
  path: string;
  protected: boolean;
  element?: ReactNode | ComponentType<unknown>;
  children?: Route[];
  layout?: ComponentType<unknown>;
  allowedRoles?: string[];
  meta?: {
    title?: string;
    icon?: ReactNode;
    description?: string;
  };
}