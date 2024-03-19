import { createPortal } from 'react-dom';
import style from './UserAdd.module.scss';

const UserAdd = () => {
    const portal = document.getElementById('portal');

    return createPortal(
        <>
            <div className={style.modalPortalWrapper}>
                <p className={style.headerText}> Add new fantastic user</p>
                <form className={style.inputsWrapper}>
                    <div>
                        <p className={style.inputsDiscription}>Id</p>
                        <input placeholder='id' className={style.inp}></input>
                        <p className={style.inputsDiscription}>name</p>
                        <input placeholder='name' className={style.inp}></input>
                        <p className={style.inputsDiscription}>surname</p>
                        <input placeholder='surname' className={style.inp}></input>
                        <p className={style.inputsDiscription}>Email</p>
                        <input placeholder='Email' className={style.inp}></input>
                        <p className={style.inputsDiscription}>Phone</p>
                        <input placeholder='Phone' className={style.inp}></input>{' '}
                    </div>
                    <div>
                        <p className={style.inputsDiscription}>Address</p>
                        <input placeholder='Address' className={style.inp}></input>
                        <p className={style.inputsDiscription}>City</p>
                        <input placeholder='City' className={style.inp}></input>
                        <p className={style.inputsDiscription}>State</p>
                        <input placeholder='State' className={style.inp}></input>
                        <p className={style.inputsDiscription}>ZIP Code</p>
                        <input placeholder='ZIP Code' className={style.inp}></input>
                    </div>
                    <textarea className={style.area} placeholder='Discription'></textarea>
                </form>
            </div>
        </>,
        portal as HTMLElement
    );
};

export default UserAdd;
