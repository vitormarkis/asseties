import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "§/index.css"

import { HomeOutlet } from "@components/HomeOutlet"
import Home from "@routes/root"
import { queryClient } from "@services/queryClient"
import { Provider } from "react-redux"
import { store } from "./features/store"
import { NewAssetForm } from "@routes/NewAssetForm"
import TagsForm, { loader as addTagsFormLoader, loader } from "@routes/tagForm"
import { EditAssetForm, loader as editAssetFormLoader } from "@routes/EditAssetForm"
import TagsLibrary from "@routes/tagsLibrary"
import AssetPage from "@routes/AssetPage"
import { loader as assetPageLoader } from "@routes/AssetPage"

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
    </QueryClientProvider>
  </React.StrictMode>
)
