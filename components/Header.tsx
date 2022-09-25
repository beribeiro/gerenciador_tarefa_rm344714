/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { NextPage } from 'next';

type HeaderProps = {
    sair() : void,
    setShowModal(e : boolean) : void
}

export const Header: NextPage<HeaderProps> = ({sair, setShowModal}) => {

    const fullName = localStorage.getItem("userName");
    const userName = fullName?.split(' ')[0] || '...';

    return (
        <div className="container-header">
            <img src="/icons/logo.svg" alt="logo fiap" className="logo" />
            <button onClick={e => setShowModal(true)}><span>+</span>Adicionar Tarefa</button>

            <div className='mobile'>
                <span>Olá, {userName}</span>
                <img src="/icons/exit-mobile.svg" onClick={sair} alt="sair" />
            </div>

            <div className='desktop'>
                <span>Olá, {userName}</span>
                <img src="/icons/exit-desktop.svg" onClick={sair} alt="sair" />
            </div>
        </div>
    )
}