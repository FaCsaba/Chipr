import PageName from '../../components/PageName/PageName';
import UploadImage from '../../components/UploadImage/UploadImage';
import {useState} from 'react';
export default function SettingsPage() {
    const [srcFile, setSrcFile] = useState<File>()

    function handle() {
        const f: HTMLInputElement | null = document.getElementById('file') as HTMLInputElement
        setSrcFile(f.files![0])
    }

    return <>
    <PageName name='Settings'/>
    <input id='file' type='file' onInput={handle}></input>
    {srcFile &&
    <UploadImage flexBasis='100%' id='0' onCancel={() => {}} onCloudUrl={()=>{}} srcFile={srcFile}/>
    }
    </>
}