import React from 'react';

import './FormFields.css'

const FormFields = ({formData, change, id, blur,showError})=>{


    const renderSelectOptions = (options)=>{
        let optionsToRender = options!==null ? 
                                options.map((item, index )=>{
                                    return <option name={item.name} value={item.id} key={index}>{item.name}</option>
                                })
        : <option name="default" value={null}>Loading</option>

        return optionsToRender;
    }

    const renderField=()=>{

        let showLabel='';
        switch(formData.element){
            case "input":   showLabel = formData.label ? <label htmlFor={id}>{formData.labelText}</label>:null
                            return(
                            <div>
                                {showLabel}
                                <input {...formData.config} className="input" value={formData.value} onChange={(event)=>change({event, id, blur:false})} onBlur={(event)=> blur({event, id, blur:true})} />
                                {showError(formData)}
                            </div>
                            )
            case "select":  showLabel = formData.label ? <label htmlFor={id}>  
                            {formData.labelText}</label>:null
                            return(
                                <div>
                                   {showLabel}
                                    <div>
                                        <select value={formData.value} onChange={(event)=>change({event, id, blur:false})} onBlur={(event)=> blur({event, id, blur:true})} >

                                            {renderSelectOptions(formData.config.options)}

                                        </select>
                                    </div>
                                </div>
                            )
            default: return <div>Control not identified</div>
        }
    }


    return(
        <div>{renderField()}</div>
    )
}

export default FormFields;