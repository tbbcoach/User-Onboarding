import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

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
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(() => console.log("form submitted success"))
            .catch(err => console.log(err));
    };

    const validateChange = e => {
        yup.reach(formSchema, e.target.name)
        validateChange(e.target.value)
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
               
                 Terms & Conditions
                 </label>
                <button>Submit</button>
            

            </form>

        );
    }