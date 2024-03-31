import { createPortal } from 'react-dom';
import style from './UserAdd.module.scss';
import Button from '../../main-Page-Components/button/Button';
import { useState } from 'react';

interface Iprops {
    showUserCreationWindow: boolean;
    setShowUserCreationWindow: (x: boolean) => void;
}

const UserAdd: React.FC<Iprops> = ({ setShowUserCreationWindow, showUserCreationWindow }) => {
    const portal = document.getElementById('portal');
    const [newUserProfile, setNewUserProfile] = useState([]);

    const handleFormSubmit = () => {};

    const modalWindowOutClick = () => {
        setShowUserCreationWindow(!showUserCreationWindow);
    };

    return createPortal(
        <div className={style.fullMonitorScreen} onClick={modalWindowOutClick}>
            <div className={style.modalPortalWrapper} onClick={(e) => e.stopPropagation()}>
                <p className={style.headerText}> Add new fantastic user</p>
                <form className={style.inputsWrapper}>
                    <div className={style.inputsCol}>
                        <div>
                            <h2 className={style.inputsDiscription}>Id</h2>
                            <input placeholder='id' className={style.inp}></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Name</h2>
                            <input placeholder='Name' className={style.inp}></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Surname</h2>
                            <input placeholder='Surname' className={style.inp}></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Email</h2>
                            <input placeholder='Email' className={style.inp}></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Phone</h2>
                            <input placeholder='Phone' className={style.inp}></input>
                        </div>
                    </div>
                    <div className={style.inputsCol}>
                        <div>
                            <p className={style.inputsDiscription}>Address</p>
                            <input placeholder='Address' className={style.inp}></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>City</p>
                            <input placeholder='City' className={style.inp}></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>State</p>
                            <input placeholder='State' className={style.inp}></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>ZIP Code</p>
                            <input placeholder='ZIP Code' className={style.inp}></input>
                        </div>
                    </div>

                    <div className={style.inputsCol}>
                        <textarea className={style.area} placeholder='Discription'></textarea>
                        <Button onClick={handleFormSubmit} className={style.userAddBtn}>
                            Add new user
                        </Button>
                    </div>
                </form>
            </div>
        </div>,
        portal as HTMLElement
    );
};

export default UserAdd;
