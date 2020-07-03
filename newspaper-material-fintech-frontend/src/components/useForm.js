<<<<<<< HEAD
import { useState} from 'react';
=======
import {useState} from 'react';
>>>>>>> ba7e30a72e6a4f5b4f0bee7986dad61a4ce1a1d2

const useForm = (initialFieldValues, setCurrentId) => {
    
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({})
    
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }   
    const resetForm = () => {
        setValues(initialFieldValues);
        setErrors({});
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
 
}
 
export default useForm;