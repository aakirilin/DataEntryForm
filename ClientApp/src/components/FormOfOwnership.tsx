import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/FormOfOwnership';
import { ApplicationState } from '../store';
import { FormsOfOwnership } from '../constants';


const FormOfOwnership = () => {
    const [showFormsOfOwnership, setShowFormsOfOwnership ] = useState(false);

    const dispatch = useDispatch();
    const formOfOwnership = useSelector<ApplicationState, string|undefined>(state => state.formOfOwnership?.Form);
    const setFormOfOwnership = (value:string) => dispatch(actionCreators.setFormOfOwnership(value));

    return (
        <>
            <h3 className='header'>Форма собственности</h3>
            <p className='lable'>Вид деятельности*</p>
            <div className = 'mb-40'>
                <button className = 'select-box' onClick={() => setShowFormsOfOwnership(!showFormsOfOwnership)}>
                    {FormsOfOwnership.find(f => f.value===formOfOwnership)?.lable} 
                    <svg className='select-box-arrow' width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.4197 1.92786C13.5816 1.76936 13.6719 1.5581 13.6719 1.31478C13.6719 0.824083 13.2913 0.440747 12.8019 0.440747C12.5559 0.440747 12.329 0.532998 12.1699 0.704447L6.62835 6.37595L7.36531 6.37595L1.82922 0.704448C1.6653 0.531648 1.43702 0.440748 1.19852 0.440748C0.710525 0.440748 0.328602 0.824084 0.328602 1.31478C0.328602 1.55945 0.417447 1.77072 0.582146 1.92786L6.31817 7.79811C6.50858 7.99955 6.74033 8.10276 6.99645 8.10547C7.25742 8.10547 7.48432 8.00091 7.68095 7.79811L13.4197 1.92786Z" fill="#222222"/>
                    </svg>
                </button>
                <div className='select-box-options' hidden={!showFormsOfOwnership}>
                    {FormsOfOwnership.map(f =>  <button className='select-box-option' onClick={
                            () => { setFormOfOwnership(f.value); setShowFormsOfOwnership(false);}
                        }>{f.lable}</button>)}
                </div>
            </div>
                        
            </>
    )
};

export default FormOfOwnership;
