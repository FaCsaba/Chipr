import Classes from './PageName.module.css'

export default function PageName({name}: {name: string}) {
    return <>
    <p className={Classes.PageName}>{name}</p>
    </>
}