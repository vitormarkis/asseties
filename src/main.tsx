import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "§/index.css"

import { Form } from "@components/Form"
import Home from "@routes/root"
import TagsForm from "@routes/tagsForm"
import { queryClient } from "@services/queryClient"
import { Provider } from "react-redux"
import { store } from "./features/store"
import { HomeOutlet } from "@components/HomeOutlet"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeOutlet />
      },
      {
        path: "/edit",
        element: <Form />,
      },
    ],
  },
  {
    path: "/addTags/:id",
    element: <TagsForm />,
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
