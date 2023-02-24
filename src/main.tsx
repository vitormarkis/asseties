import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "§/index.css"

import { HomeOutlet } from "@components/HomeOutlet"
import AssetPage, { loader as assetPageLoader } from "@routes/AssetPage"
import { EditAssetForm, loader as editAssetFormLoader } from "@routes/EditAssetForm"
import { NewAssetForm } from "@routes/NewAssetForm"
import Home from "@routes/root"
import TagsForm, { loader as addTagsFormLoader } from "@routes/tagForm"
import TagsLibrary from "@routes/tagsLibrary"
import { Provider } from "react-redux"
import { store } from "./features/store"

import { queryClient } from "@services/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeOutlet />,
      },
      {
        path: "/edit/:id",
        element: <EditAssetForm />,
        loader: editAssetFormLoader,
      },
      {
        path: "/add",
        element: <NewAssetForm />,
      },
    ],
  },
  {
    path: "/addTags/:id",
    element: <TagsForm />,
    loader: addTagsFormLoader,
  },
  {
    path: "/tags-library",
    element: <TagsLibrary />,
  },
  {
    path: "/asset/",
    element: <AssetPage />,
  },
  {
    path: "/asset/:id",
    element: <AssetPage />,
    loader: assetPageLoader,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
