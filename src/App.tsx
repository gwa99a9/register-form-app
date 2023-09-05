import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

type FormData = {
  firstName: string,
  lastName: string
  email: string,
  phoneNumber: string,
  gender: string
  dob: {
    day: string,
    month: string,
    year: string,
  },
  password: string,
  confirmPassword: string,
  marketing: boolean
}
function App() {

  // Generate date options (1-31)
  const dateOptions = Array.from({ length: 31 }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));

  // Generate month options (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));

  // Generate year options (e.g., from 1900 to the current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => (
    <option key={currentYear - index} value={currentYear - index}>
      {currentYear - index}
    </option>
  ));

  const schema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
    email: z.string().email({ message: 'Email address not valid' }),
    phoneNumber : z.string().regex(/^(?:7|0|(?:\+94))[0-9]{9,10}$/,{ message: 'Phone number not valid' }),
    gender: z.string(),
    dob: z.object({
      day: z.string(),
      month: z.string(),
      year: z.string(),
    }),
    password: z.string().min(8, { message: 'At lest 8 characters' })
      .regex(/[A-Z]/, { message: 'At least one capital letter' })
      .regex(/[a-z]/, { message: 'At least one capital letter' })
      .regex(/[0-9]/, { message: 'At least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'At least one special character' }),
    confirmPassword: z.string().min(8, { message: 'At lest 8 characters' })
      .regex(/[A-Z]/, { message: 'At least one capital letter' })
      .regex(/[a-z]/, { message: 'At least one capital letter' })
      .regex(/[0-9]/, { message: 'At least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'At least one special character' }),
    marketing: z.boolean()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log(data);
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1>Registration Form</h1>
              <form onSubmit={handleSubmit(submitData)} className="form-horizontal">

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">First Name<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='text' className="form-control" {...register("firstName")} />
                      {errors.firstName && <span className='errors'> {errors.firstName.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">Last Name<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='text' className="form-control" {...register("lastName")} />
                      {errors.lastName && <span className='errors'> {errors.lastName.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">Email<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='email' className="form-control" {...register("email")} />
                      {errors.email && <span className='errors'> {errors.email.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">Phone<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='text' className="form-control" {...register("phoneNumber")} />
                      {errors.phoneNumber && <span className='errors'> {errors.phoneNumber.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      Male<input className="form-check-input" type="radio" value="male" id='radio-male' checked {...register("gender")} />
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      Female<input className="form-check-input" type="radio" value="female" id='radio-female' {...register("gender")} />
                    </label>
                  </div>
                </div>

                <div className="form-group mb-3" >
                  <label className="col-sm-2 control-label">Birthday</label>
                  <div className="row">
                    <div className="col-md-4">
                      <select className="form-select" {...register("dob.day")}>
                        <option value="" disabled selected>day</option>
                        {dateOptions}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select className="form-select" {...register("dob.month")}>
                        <option value="" disabled selected>month</option>
                        {monthOptions}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select className="form-select" {...register("dob.year")}>
                        <option value="" disabled selected>year</option>
                        {yearOptions}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">Password<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='password' className="form-control" {...register("password")} />
                      {errors.password && <div className='errors'> {errors.password.message}</div>}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="col-sm-2 control-label">Confirm Password<span className="required">*</span></label>
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type='password' className="form-control" {...register("confirmPassword")} />
                      {errors.confirmPassword && <div className='errors'> {errors.confirmPassword.message}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="marketing-promotions"  {...register("marketing")} />
                    <label className="form-check-label" htmlFor="marketing-promotions">
                      I'd like to receive marking promotions and special offers updates.
                    </label>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button type='submit' className="btn btn-primary btn-lg btn-block">Sign Up</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
