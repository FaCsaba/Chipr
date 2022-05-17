import PageName from '../../components/PageName/PageName';
import { useChirps, ChirpUser, ChirpItem } from '../../store/ChirpProvider';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChirpListing from '../../components/ChirpList/ChirpList';
export default function ProfilePage() {
    const {getUser, users} = useChirps()
    const [viewedUser, setViewedUser] = useState<ChirpUser | undefined>(undefined)
    const location = useLocation()
    const nav = useNavigate()
    const [chirps, setChirps] = useState<ChirpItem[] | undefined>(undefined)

    

    useEffect(()=>{
        function getChirpHandleFromPath() {
            const chirpHandlePart = location.pathname.split('/')[2]
            if (chirpHandlePart[0] === '@') return chirpHandlePart.slice(1)
            nav(`/user/@${chirpHandlePart}`)
            return chirpHandlePart
        }

        const chirpHandle = getChirpHandleFromPath()
        getUser(chirpHandle)
        setViewedUser(users?.find((user: ChirpUser | undefined)=>{return user?.chirpHandle === chirpHandle}))
    }, [getUser, users, location, nav])

    async function getChirps() {
        setChirps(await viewedUser?.getChirps())
    }

    useEffect(()=>{
        getChirps()
    })



    return <>
        <PageName name={viewedUser?.username? viewedUser.username : 'Unknown User'}/>
        <ChirpListing chirps={chirps}/>
    </>
}