import { createPortal } from 'react-dom';
import style from './UserAdd.module.scss';
import Button from '../../main-Page-Components/button/Button';
import { useState } from 'react';
import { useAppDispatch } from '../../../__data/hooks/redux';
import { userSlice } from '../../../__data/store/redusers/dataTableReducer';

interface Iprops {
    showUserCreationWindow: boolean;
    setShowUserCreationWindow: (x: boolean) => void;
}

const portal = document.getElementById('portal');

const UserAdd: React.FC<Iprops> = ({ setShowUserCreationWindow, showUserCreationWindow }) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',

        address: {
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
        },
    });

    const formCorrectionCheck = /^[1-9]+[0-9]*$/.test(formData.id) && /^[а-яёa-z0-9А-ЯЁA-Z]+(([ ][а-яёa-z0-9А-ЯЁA-Z ])?[а-яёa-z0-9А-ЯЁA-Z]*)*$/.test(formData.firstName) && /^[а-яёa-z0-9А-ЯЁA-Z]+(([ ][а-яёa-z0-9А-ЯЁA-Z ])?[а-яёa-z0-9А-ЯЁA-Z]*)*$/.test(formData.lastName) && /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(formData.email) && /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(formData.phone)

    const handleSubmit = (event: any) => {
        const { name, value } = event.target;

        switch (name) {
            case 'city':
                setFormData({ ...formData, address: { ...formData.address, [name]: value } });
                break;
            case 'streetAddress':
                setFormData({ ...formData, address: { ...formData.address, [name]: value } });
                break;
            case 'state':
                setFormData({ ...formData, address: { ...formData.address, [name]: value } });
                break;
            case 'zip':
                setFormData({ ...formData, address: { ...formData.address, [name]: value } });
                break;

            default:
                setFormData({ ...formData, [name]: value });
                break;
        }
    };

    const modalWindowOutClick = () => {
        setShowUserCreationWindow(!showUserCreationWindow);
    };

    const handleFormSubmit = () => {
        if (formCorrectionCheck) {
            setFormData({...formData, phone: formData.phone.replace('+7', '')})
            
            dispatch(userSlice.actions.addFormUserData(formData));
            modalWindowOutClick();
        }
        else{
            alert('Некорректные данные!!')
        }
        
    };

    return createPortal(
        <div className={style.fullMonitorScreen} onClick={modalWindowOutClick}>
            <div className={style.modalPortalWrapper} onClick={(e) => e.stopPropagation()}>
                <p className={style.headerText}> Add new fantastic user</p>
                <form className={style.inputsWrapper}>
                    <div className={style.inputsCol}>
                        <div>
                            <h2 className={style.inputsDiscription}>Id</h2>
                            <input
                                name='id'
                                id='id'
                                type='text'
                                placeholder='id'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Name</h2>
                            <input
                                name='firstName'
                                id='firstName'
                                type='text'
                                placeholder='Name'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Surname</h2>
                            <input
                                name='lastName'
                                id='lastName'
                                type='text'
                                placeholder='Surname'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Email</h2>
                            <input
                                name='email'
                                id='email'
                                type='email'
                                placeholder='Email'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <h2 className={style.inputsDiscription}>Phone</h2>
                            <input
                                name='phone'
                                id='phone'
                                type='tel'
                                placeholder='Phone'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>
                    </div>
                    <div className={style.inputsCol}>
                        <div>
                            <p className={style.inputsDiscription}>Address</p>
                            <input
                                name='streetAddress'
                                id='streetAddress'
                                type='text'
                                placeholder='Address'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>City</p>
                            <input
                                name='city'
                                id='city'
                                type='text'
                                placeholder='City'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>State</p>
                            <input
                                name='state'
                                id='state'
                                type='text'
                                placeholder='State'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>

                        <div>
                            <p className={style.inputsDiscription}>ZIP Code</p>
                            <input
                                name='zip'
                                id='zip'
                                type='text'
                                placeholder='ZIP Code'
                                className={style.inp}
                                onChange={handleSubmit}
                            ></input>
                        </div>
                    </div>

                    <div className={style.inputsCol}>
                        <textarea
                            name='discription'
                            onChange={handleSubmit}
                            className={style.area}
                            placeholder='Discription'
                        ></textarea>
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
