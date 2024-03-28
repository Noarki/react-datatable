import { useAppSelector } from '../../../__data/hooks/redux';
import style from './UserProfile.module.scss';

const UserProfile = () => {
    const { activeUser } = useAppSelector((state) => state.dataTable);

    return (
        <div className={style.profileWrapper}>
            <div className={style.firstProfileColumn}>
                <div> id: {activeUser?.id}</div>
                <div> Name: {activeUser?.firstName}</div>
                <div> Surname: {activeUser?.lastName}</div>
                <div> Email: {activeUser?.email}</div>
                <div> Phone number: +7{activeUser?.phone}</div>
                <div> Description: {activeUser?.description}</div>
            </div>
        </div>
    );
};

export default UserProfile;
