"use client"

import { NextPage } from "next";
import AuthForm from "~/app/_components/auth/AuthForm";
import { signUpSchema } from "~/app/_schemas/authSchema";

const SignupPage: NextPage = () => {
    return (
        <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      class: ""
    }}
  />
    )
}

export default SignupPage