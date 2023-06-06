import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../../assets/img/icons/logo_tree-up.svg'

function Welcome() {
  return (
    <div className='p-8 w-full h-full sm:h-80 lg:h-96 flex flex-col justify-between items-center'>
        <img className='w-24 sm:w-32 lg:w-40' src={logo} alt="Logo tree-up" />
        <p className='text-lg sm:text-xl lg:text-2xl text-center'>Tree-up te souhaite la bienvenue sur l'application de partage de projets avec la communauté</p>
        <div className='w-full text-right lg:text-lg'>
            <Link to='/'>Aller sur la page d'accueil</Link>
        </div>
    </div>
  )
}

export default Welcome