import { lazy } from 'react';

export const HomePage = lazy(() => import('~/pages/HomePage'));
export const WritePage = lazy(() => import('~/pages/WritePage'));
export const SearchPage = lazy(() => import('~/pages/SearchPage'));
export const SettingPage = lazy(() => import('~/pages/SettingPage'));
export const UserPage = lazy(() => import('~/pages/user/UserPage'));
export const SeriesPage = lazy(() => import('~/pages/SeriesPage'));
export const PostPage = lazy(() => import('~/pages/PostPage'));
