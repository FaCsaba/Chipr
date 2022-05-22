import {useState, useEffect} from 'react';
import { useAuth } from '../../store/AuthProvider';
import { ref, uploadBytes, getDownloadURL, StorageReference, deleteObject } from 'firebase/storage';
import { bucket } from '../../firebaseSetup';
import Spinner from '../Spinner/Spinner';
import Classes from './UploadImage.module.css';
import Button from '../Button/Button';


function UploadImage(
    {srcFile, id, onCloudUrl, onCancel, flexBasis, className, onClick}: {onClick?: ()=>void, className?: string, srcFile: File, flexBasis?: string, id?: string, onCloudUrl?: (cloudUrl: string, id: string) => void, onCancel?: (id: string) => void}
) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [isInCloud, setIsInCloud] = useState<boolean>(false);

    const [cloudRef, setCloudRef] = useState<StorageReference | null>(null)
    const [srcUrl, setSrcUrl] = useState<string | null>(null)   
    const [cloudUrl, setCloudUrl] = useState<string | null>(null)

    const {currentUser} = useAuth()

    useEffect(()=>{
        const _cloudRef = ref(bucket, 'img/'+currentUser?.auth?.uid+'/'+id+'/'+srcFile.name)
        setCloudRef(_cloudRef)

        setSrcUrl(URL.createObjectURL(srcFile))

        if (cloudUrl === null && !isCanceled) {
            uploadBytes(_cloudRef, srcFile)
                .then( () =>{
                    getDownloadURL(_cloudRef).then( url => {
                        setCloudUrl(url)
                        if (onCloudUrl) {onCloudUrl(url, id || '')}
                        setIsLoading(false)
                        setIsInCloud(true)
                    })
                    .catch(r => {
                        console.log(r)
                    })
                })
                .catch(r => {
                    console.log(r)
                    setIsLoading(false)
                })
        }
    }, [currentUser?.auth?.uid, onCloudUrl, srcFile, cloudUrl, id, isCanceled])

    useEffect(()=>{
        if (isCanceled && cloudRef && isInCloud) {
            console.log('Deleted')
            deleteObject(cloudRef)
                .then(()=>setIsInCloud(false))
                .catch(reason=>{console.log(reason)})
            if (onCancel) {onCancel(id || '')}
        }

    }, [cloudRef, isCanceled, id, onCancel, isInCloud])

    return (
        <div style={{flexBasis}} className={Classes.ImageContainer}>
            {isLoading &&
                <><Spinner className={Classes.Spinner}/>
                <div className={Classes.ImageNotLoadedYetGray+' '+className}/>
            </>}
            <Button.Secondary onClick={()=>setIsCanceled(true)} className={Classes.CancelButton} value='X'/>
            <img src={srcUrl!} className={Classes.Image+' '+className} alt='Your upload' onClick={onClick}/>
        </div>
    )
}

export default UploadImage