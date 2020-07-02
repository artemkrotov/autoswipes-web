import React from "react";
import InputMask from "react-input-mask";
import './input.scss';
import { useTranslation } from "react-i18next";

const Input = props => {
    const { name, title, inputType, value, handleChange, placeholder, errors, ...rest } = props;
    const { t } = useTranslation();

    const renderErrors = () => {
        if (errors && errors.length){

            return errors.map(( err, id ) => <div className="form-group__error" key={id}>{t('validation.'+err)}</div>);
        } else {
            return '';
        }
    }

    return (
        <div className={errors && errors.length ? 'form-group form-group--errors' : 'form-group'}>
            <label htmlFor={name} className="form-group__label">
                {title}
            </label>
            <InputMask
                className="form-group__control"
                id={name}
                name={name}
                type={inputType}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                {...rest}
            />
            {renderErrors()}
        </div>
    );
};

export default Input;
