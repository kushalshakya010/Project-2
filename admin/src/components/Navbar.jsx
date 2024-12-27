import { Button, Drawer, Menu, MenuDivider, UnstyledButton, rem, useMantineColorScheme} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from "clsx";
import React from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { MdArrowForward } from 'react-icons/md';
import {IconTrash} from "@tabler/icons-react"
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store';
import Logo from './Logo';
import Sidebar from "./Sidebar"


const MobileDrawer = ({theme})=> {
  const {user} = useStore();
  const [opened, {open, close} ] = useDisclosure(false);

  return(
    <>
    <Drawer
      opened = { opened }
      
      onClose= { close }
      overlayProps = {{backgroundOpacity : 0.5, blur:4}}
      >
        <Sidebar close = {close} />

        <div className='w-full mt-10'>
          <UserMenu user = {user?.user} theme={theme} />
        </div>

        
    </Drawer>

    <UnstyledButton className={theme? "text-white" : "text-slate-800"}
            onClick={open}
    >
      <BiMenu className='text-xl' />
    </UnstyledButton>
    </>
  );

};
const UserMenu = (user, theme) =>{
  const {signOut} = useStore();

  const handleSignOut  = () =>{
    localStorage.removeItem("user");

    signOut();
  };

  return (

    <Menu shadow="md" width={200}>          

        <Menu.Target>
          
          <UnstyledButton className={clsx("flex items-center", theme ? "text-gray-300" : "text-black")}>

            <img src={user?.user?.image} alt="Profile" className='w-8 h-8 rounded-full'/>

            <div className='flex flex-col items-start ml-1'>
              <p className='font-medium'>{user?.user?.name}</p>
              <span className='text-sm font-normal'>{user?.user?.accountType}</span>

            </div>
          </UnstyledButton>
        </Menu.Target>
            <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            
            <Menu.Item left={<FaUser style={{width: rem(14), height: rem(14)}}/>}> Profile </Menu.Item>

            <Menu.Item leftSection={
              <AiOutlineLogout style = {{width: rem(14), height: (14)}}/>
            }
            onClick={()=> handleSignOut()}
            >Logout
            </Menu.Item>
            <MenuDivider />
            <Menu.Label>Danger Zone</Menu.Label>

            <Menu.Item 
            color="red"
            leftSection={ <IconTrash style = {{width: rem(14), height: (14)}}/> }
            onClick={()=> {}}
            >Delete Account
            </Menu.Item>


        </Menu.Dropdown>
    </Menu>
  )
}
const Navbar = () => {
    const { colorScheme } = useMantineColorScheme();

    const {user, signInModal, setSignInModal } = useStore();
    const location = useLocation();
    const theme = colorScheme === "dark"
      
  const handleLogin = ()=> {
    location.pathname === '/auth' && setSignInModal(!signInModal);
  };
  return (
    <div className='w-full fixed top-0 z-50 bg-transparent flex flex-row px-4 md:px-6 py-4 md:py-5 items-center justify-between gap-4 shadow'>
      {user && (
      <div className='block lg:hidden'>
        <MobileDrawer theme = {theme}/>
        </div>
      )}
          <div className='hidden lg:flex gap-2 text-[20px]'>
            <Link to='/' className='text-rose-600' ><FaYoutube/></Link>
            <Link to='/' className='text-blue-600' ><FaFacebook/></Link>
            <Link to='/' className='text-rose-600' ><FaInstagram/></Link>
            <Link to='/' className='text-blue-600' ><FaTwitterSquare/></Link>

          </div>

          <Logo />
          <div className='flex gap-14 items-center '>
            <div className='gap-2 flex items-center'>
              {
                user?.token? (
                <UserMenu user={user?.user} theme={theme}/> 
                
                ): (
                <Link 
                  to='/auth'
                  onClick= { handleLogin }
                  className={clsx("flex items-center gap-2 rounded-full 2xl:mr-10 text-base", theme 
                  ? "text-white" 
                  : "text-black"
                )}
                >
                <span>Login</span>
                <MdArrowForward/>
                </Link>)
              }
            </div>

          </div>
          
    </div>
  );
}

export default Navbar;