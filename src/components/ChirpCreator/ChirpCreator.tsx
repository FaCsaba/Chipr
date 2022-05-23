import Classes from './ChirpCreator.module.css'
import { useAuth } from '../../store/AuthProvider';
import Button from '../Button/Button';
import { useRef, useEffect, useState, createContext, useContext } from 'react';
import PictureHolder from '../PrictureHolder/PictureHolder';
import UploadImage from '../UploadImage/UploadImage';


function clamp(num: number, min: number, max: number) {return Math.min(Math.max(num, min), max)}

const chirpCreatorUploadImages = createContext<{images: ( (flexBasis: string)=>JSX.Element)[]}>({images: []})

function mapToArray<K=any, V=any>(map: Map<K, V>) {
    let arr: V[] = []
    map.forEach(i => {arr.push(i)})
    console.log(arr)
    return arr
}

export function useChirpCreatorUploadImages() {
    return useContext(chirpCreatorUploadImages)
}

export default function ChirpCreator() {
    const {currentUser, sendChirp} = useAuth()

    const [imgMap, setImageMap] = useState<Map<string, (flexbasis: string)=>JSX.Element>>(new Map())
    const [imgUrls, setImageUrls] = useState<Map<string, string>>(new Map())
    const [imgArray, setImgArray] = useState<((flexBasis: string)=>JSX.Element)[]>([])

    const inputRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)



    function handleSubmit() {
        const input = inputRef.current?.value
        console.log(input)
        if (input || imgUrls.size > 0) {
            sendChirp!(input || '', mapToArray(imgUrls))
        }
        setImageMap(new Map())
        setImageUrls(new Map())
        setImgArray([])
        inputRef.current!.value! = ''
        fileRef.current!.files = null
    }

    function handlePictureUploadClick() {
        document.getElementById("file")?.click()
    }

    useEffect(()=>{
        console.log(imgMap)
        console.log(imgUrls) 
    }, [imgMap, imgUrls])

    function handleFileInput() {
        if (!fileRef.current?.files) {
            return // if no files found
        }
        
        const l = clamp(fileRef.current.files.length, 1, 4)
        for (let i = 0; i < l; i++) {
            if (imgMap.size < 5) {
            console.log("oninput works")


            const file = fileRef.current.files[i]
            
            const id = crypto.randomUUID()
            setImageMap(o => {
                const n = o.set(id, (flexBasis: string) => <UploadImage flexBasis={flexBasis} id={id} 
                srcFile={file} 
                onCancel={(id)=>{
                    setImageMap(oi => 
                        {
                            let n = new Map()
                            oi.forEach((v, k)=>{
                                if (k !== id) n.set(k,v)
                            })
                            setImgArray(mapToArray(n));
                            return n
                        })
                    
                    setImageUrls(oi => {
                        let n = new Map()
                        oi.forEach((v, k)=>{
                            if (k !== id) n.set(k,v)
                        })
                        return n
                    })
                }} 
                onCloudUrl={(url, id)=>{setImageUrls(oi=>oi.set(id, url))}}
                />);
                setImgArray(mapToArray(n)); 
                return n 
            })
            }
        }
    }

    useEffect(()=>{
        setImgArray(mapToArray(imgMap)); 
    }, [imgMap])

    return (<chirpCreatorUploadImages.Provider value={{images: imgArray}}>
        {currentUser?.chirprInfo &&
            <div className={Classes.Card}>
                    <img className={Classes.ProfilePicture} src={currentUser.chirprInfo!.pic} alt='' />
                <div className={Classes.Form}>
                    <input id="onYourMing" name='ChirpCreator' contentEditable="true" placeholder="Chirp something!" 
                            ref={inputRef} required minLength={3} maxLength={1000} className={Classes.CreateChirpInput} />
                    
                    <PictureHolder.Cancellable />
                    
                    <div>
                        <input type="file" id="file" accept="image/*, video/*" hidden multiple ref={fileRef} onInput={handleFileInput}/>
                        <Button.Primary value='Chirp!' onClick={handleSubmit} className={Classes.Button}/>
                        {imgMap.size < 4 &&
                            <Button.Picture className={Classes.Picture} onClick={handlePictureUploadClick}/>}
                            
                    </div>

                </div>
            </div>
        }
    </chirpCreatorUploadImages.Provider>)
}