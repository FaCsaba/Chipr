import PageName from '../../components/PageName/PageName';
import { useChirps, ChirpUser, ChirpItem } from '../../store/ChirpProvider';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChirpListing from '../../components/ChirpList/ChirpList';
import ProfileOverview from '../../components/ProfileOverview/ProfileOverview';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../store/AuthProvider';
import ChirpCreator from '../../components/ChirpCreator/ChirpCreator';

export default function ProfilePage() {
    const {currentUser} = useAuth()
    const {chirps, users} = useChirps()
    const location = useLocation()
    const nav = useNavigate()

    const [viewedUser, setViewedUser] = useState<ChirpUser | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [chirpsOfUser, setChirpsOfUser] = useState<ChirpItem[] | undefined>(undefined)
    const [chirpHandle, setChirpHandle] = useState<string | null>(null)

    useEffect(()=>{
        function getChirpHandleFromPath() {
            const chirpHandlePart = location.pathname.split('/')[2]
            if (chirpHandlePart[0] === '@') return decodeURIComponent(chirpHandlePart.slice(1))
            nav(`/user/@${chirpHandlePart}`)
            return decodeURIComponent(chirpHandlePart)
        }

        setChirpHandle(getChirpHandleFromPath())

        
    }, [location.pathname, nav])

    useEffect(()=>{
        if (chirpHandle && users) {
            setViewedUser(users.filter(u=>{return u.chirpHandle === chirpHandle})[0])
        }
    }, [chirpHandle, users])

    
    useEffect(()=>{
        if (viewedUser) {
            setChirpsOfUser(chirps?.filter(c=>{return c.userId === viewedUser.id}))
        }
        setIsLoading(false)
    }, [viewedUser, chirps])




    return <>
    {viewedUser? <PageName name="Profile"/>:<PageName name='User does not exist'/>}
        
    {viewedUser &&
        <>
            <ProfileOverview user={viewedUser} />
            {viewedUser.id === currentUser?.chirprInfo?.id && <ChirpCreator/>}
            <ChirpListing chirps={chirpsOfUser}/>
        </>
    }
    {isLoading &&
        <div><Spinner/></div>
    }
    </>
}