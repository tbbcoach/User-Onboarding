import React, { useState } from 'react';
import * as yup from 'yup';

export default function Form() {
     
    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false
    };

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({ ...defaultState, terms: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    let formSchema = yup.object().shape({
        name: yup.string().required("Please provide your name."),
        email: yup.string().required("Email is a required field").email("Not a valid email address."),
        password: yup.string().required(8, "Minimum of 8 characters required."),
        terms: yup.boolean().oneOf([true], "Please agree to terms and conditions.")
    });
    
    return (
        // <div>Form starts here!</div>

        <form>
            <input
                type='text'
                name='name'
                // onChange={inputChange}
                // value={formState.name}
                label="Name"
            />
            <input 
                type='text'
                name='email'
                // onChange={inputChange}
                // value={formState.name}
                label="Email"
            />
            <input
                type='text'
                name='password'
                // onChange={inputChange}
                // value={formState.name}
                label="Email"
            />
            <label className="terms" htmlFor="terms">
                <input name="terms" type="checkbox" />     
               [ //add inputChange ]
                 Terms & Conditions
                 </label>
            <button>Submit</button>  
            [//add disable button]

        </form>

    )
};