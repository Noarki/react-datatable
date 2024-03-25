import { useAppSelector } from '../../../__data/hooks/redux';
import style from './UserProfile.module.scss';

const UserProfile = () => {
    const { activeUser } = useAppSelector((state) => state.dataTable);

    return (
        <div className={style.profileWrapper}>
            <div> {activeUser?.id}</div>
            <div> {activeUser?.firstName}</div>
            <div> {activeUser?.lastName}</div>
            <div> {activeUser?.email}</div>
            <div> {activeUser?.phone}</div>
            <div> {activeUser?.description}</div>
        </div>
    );
};

export default UserProfile;
