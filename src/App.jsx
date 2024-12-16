import { useState } from 'react'
import CalenderComponent from './components/CalenderComponent.jsx'
import EventListComponents from './components/EventListComponents.jsx'
import HeaderComponents from './components/HeaderComponents.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


function App() {
  
  const router=createBrowserRouter([
    {
      path:"/",
      element:<HeaderComponents/>,
      children:[
        {
          path:"/",
          element:<CalenderComponent/>
        },
        {
          path:"/event",
          element:<EventListComponents/>
        }
      ]
    },
  ])

  return (
      <RouterProvider router={router}></RouterProvider>
  )
}

export default App
