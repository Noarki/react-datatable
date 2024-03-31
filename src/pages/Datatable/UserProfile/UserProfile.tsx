import { useAppSelector } from '../../../__data/hooks/redux';
import style from './UserProfile.module.scss';

const UserProfile = () => {
    const { activeUser } = useAppSelector((state) => state.dataTable);

    return (
        <div className={style.profileWrapper}>
            <div className={style.firstProfileColumn}>
                <div className={style.ProfileTextWrapper}>
                    id: <p className={style.ProfileTextData}>{activeUser?.id}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Name: <p className={style.ProfileTextData}>{activeUser?.firstName}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Surname: <p className={style.ProfileTextData}>{activeUser?.lastName}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Email: <p className={style.ProfileTextData}>{activeUser?.email}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Phone number: <p className={style.ProfileTextData}>+7{activeUser?.phone}</p>
                </div>
            </div>
            <div className={style.secondProfileColumn}>
                <div className={style.ProfileTextWrapper}>
                    State: <p className={style.ProfileTextData}>{activeUser?.address?.state}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    City: <p className={style.ProfileTextData}>{activeUser?.address?.city}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Address: <p className={style.ProfileTextData}>{activeUser?.address?.streetAddress}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    zip: <p className={style.ProfileTextData}>{activeUser?.address?.zip}</p>
                </div>
                <div className={style.ProfileTextWrapper}>
                    Description: <p className={style.ProfileTextData}>{activeUser?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
