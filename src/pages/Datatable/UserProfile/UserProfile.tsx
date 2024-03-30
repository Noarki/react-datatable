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
            </div>
            <div className={style.secondProfileColumn}>
                <div> State: {activeUser?.address?.state}</div>
                <div> City: {activeUser?.address?.city}</div>
                <div> Address: {activeUser?.address?.streetAddress}</div>
                <div> zip: {activeUser?.address?.zip}</div>
                <div> Description: {activeUser?.description}</div>
            </div>
        </div>
    );
};

export default UserProfile;
