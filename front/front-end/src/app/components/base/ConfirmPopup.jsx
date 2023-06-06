import Button from './ButtonBis';
import React from 'react';

const ConfirmPopup = ({body, show = false, yesAction = () => {}, noAction = () => {}, error}) => {

    if (!show) return null;
    
    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-dark bg-opacity-25 flex justify-center items-center'>
            <div className='h-fit w-fit p-3 border-4 border-dark rounded-2xl bg-gray-1'>
                {body}
                <div className='flex justify-evenly mt-3 '>
                    <Button title={"Oui"} onClick={() => yesAction()}/>
                    <Button title={"Annuler"} onClick={() => noAction()}/>
                </div>
                {error && <p className='text-red-700'>Erreur : {error}</p>}
            </div>
        </div>
    );
};

export default ConfirmPopup;