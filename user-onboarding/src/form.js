import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import Input from './input';

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

    useEffect(() => {
        if (formState.terms) {
            setButtonDisabled(!formState.terms);
        }
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        // console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(() => console.log("form submitted success", formState))
            .catch(err => console.log(err));
    };

    const validateChange = e => {
        e.persist();
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
            .then(valid =>
                setErrors({
                    ...errors, [e.target.name]: ""
                })
            )
            .catch(error =>
                setErrors({
                    ...errors, [e.target.name]: error.errors[0]
                })
            );
    }

    const inputChange = e => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
        validateChange(e);
    }
        return (
            // <div>Form starts here!</div>

            <form onSubmit={formSubmit}>
                <Input
                    type='text'
                    name='name'
                    onChange={inputChange}
                    value={formState.name}
                    label="Name"
                    errors={errors}
                />
                <Input
                    type='text'
                    name='email'
                    onChange={inputChange}
                    value={formState.email}
                    label="Email"
                    errors={errors}
                />
                <Input
                    type='text'
                    name='password'
                    onChange={inputChange}
                    value={formState.password}
                    label="Password"
                    errors={errors}
                />
                <label className="terms" htmlFor="terms">
                    <input name="terms" type="checkbox" onChange={inputChange} />
               
                 Terms & Conditions
                 </label>
                <button disabled={buttonDisabled}>Submit</button>
            

            </form>

        );
    }