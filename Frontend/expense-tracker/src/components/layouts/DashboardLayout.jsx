import React, { useContext } from 'react'

import NavbarLayout from './NavbarLayout'
import SideMenuLayout from './SideMenuLayout'

import { UserContext } from '../../context/userContext'

// Passing the activeMenu Prop
const DashboardLayout = ({ children, activeMenu }) => {
      const {user} = useContext(UserContext);
  return (
    <div className=''>
      <NavbarLayout activeMenu = {activeMenu} />
      
      {user && (
            <div className='flex'>
                  <div className='max-[1080px]:hidden'>
                        <SideMenuLayout activeMenu={activeMenu} />
                  </div>
                  <div className='grow mx-5'> {children} </div>
            </div>
      )}
    </div>
  )
}

export default DashboardLayout