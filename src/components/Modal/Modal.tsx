import Classes from './Modal.module.css';

function Modal({children, onCancel}: {children: JSX.Element, onCancel: ()=>void}) {
    return (<>
        <div className={Classes.Backdrop} onClick={onCancel}/>
        <div className={Classes.Modal}>
            {children}
        </div>
    </>
    )
}

export default Modal