import Classes from './PictureHolder.module.css';
import React from 'react';
import { useChirpCreatorUploadImages } from '../ChirpCreator/ChirpCreator';


// Now I know this may look ugly but I couldn't find a dynamic solution to having odd number of pictures, unforunately


function StringArray({images, click}: {images: string[], click?: (targetImage: string)=>void}) {

    function handleClick(e: React.MouseEvent<HTMLImageElement>) {
        if(click) click(e.currentTarget.src)
    }
    
    return <>
        <div className={Classes.Wrap}>
            {images.length === 1 ?
                <img src={images[0]} style={{flexBasis: "100%"}} className={Classes.Image} onClick={handleClick} alt=''/> : <></>
            }
            {images.length === 2 ? <>
                    <img src={images[0]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>
                    <img src={images[1]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>
                </> : <></>
            }
            {images.length === 3 ? <>
                <img src={images[0]} className={Classes.Image} onClick={handleClick}  alt=''/>
                <div style={{display: "flex", gap: "4px"}}>
                    <img src={images[1]} className={Classes.Image} onClick={handleClick}  alt=''/>
                    <img src={images[2]} className={Classes.Image} onClick={handleClick}  alt=''/>
                </div>
            </> : <></>
            }
            {images.length === 4 ? <>
                <img src={images[0]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>
                <img src={images[1]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>
                <img src={images[2]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>
                <img src={images[3]} style={{flexBasis: "49.5%"}} className={Classes.Image} onClick={handleClick}  alt=''/>

            </> : <></>
            }
        </div>
    </>
    
}



function UploadImgArray() {
    const {images} = useChirpCreatorUploadImages()

    return <>
        <div className={Classes.Wrap}><>
            {images.length === 1 ? images[0]("100%") : <></>
            }
            {images.length === 2 ? <>
                {images[0]("49.5%")}
                {images[1]("49.5%")}
                </> : <></>
            }
            {images.length === 3 ? <>
                {images[0]('')}
                <div style={{display: "flex", gap: "4px", justifyContent: 'space-between', width: '100%'}}>
                    <>
                        {images[1]('')}
                        {images[2]('')}
                    </>
                </div>
            </> : <></>
            }
            {images.length === 4 ? <>
                {images[0]('49.5%')}
                {images[1]('49.5%')}
                {images[2]('49.5%')}
                {images[3]('49.5%')}
            </> : <></>
            }
        </></div>
    </>
}

const PictureHolder = {
    Basic: StringArray,
    Cancellable: UploadImgArray
}

export default PictureHolder