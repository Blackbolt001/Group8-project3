import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData,setUserFormData] = useState({email:'',password:''});
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false );
  const [login, {error}] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData,[name]:value});
    };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

  const form = event.currentTarget;
  if(form.checkValidity() ===false){
    event.preventDefault();
    event.stopPropogation();
  }
    try {
      const { data } = await login({
        variables: { ...userFormData,}}
      );
        const {token} = await data.login;
         Auth.login(token);
      }
      catch (err){
        console.error(err);
        setShowAlert(true);
      }
 

    setUserFormData({
      username:'',
      email: '',
      password: '',
    });
  };

 // return (
   // <main className="flex-row justify-center mb-4">
      //<div className="col-12 col-lg-10">
      //  <div className="card">
        //  <h4 className="card-header bg-dark text-light p-2">Login</h4>
         // <div className="card-body">
          //  {data ? (
            //  <p>
           //     Successfully Logged in!
            //  </p>
            //) : (
             // <form onSubmit={handleFormSubmit}>
             //   <input
              //    className="form-input"
              //    placeholder="Your email"
              //    name="email"
               //   type="email"
              //    value={formState.email}
              //    onChange={handleChange}
              //  />
              //  <input
               //   className="form-input"
               //   placeholder="******"
             //     name="password"
              //    type="password"
              //    value={formState.password}
              //    onChange={handleChange}
             //   />
             //   <button
             //     className="btn btn-block btn-info"
              ///    style={{ cursor: 'pointer' }}
              //    type="submit"
              //  >
              //    Submit
             //   </button>
           //   </form>
          //  )}

           // {error && (
           //   <div className="my-3 p-3 bg-danger text-white">
              //  {error.message}
           //   </div>
          //  )}
        //  </div>
       // </div>
     // </div>
  ////  </main>
//  );
//};
}
export default LoginForm;