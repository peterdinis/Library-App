"use client"

import { NextPage } from "next";
import AuthForm from "~/app/_components/auth/AuthForm";
import { signInSchema } from "~/app/_schemas/authSchema";

const SignInPage: NextPage = () => {
    return (
        <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            defaultValues={{
                email: "",
                password: "",
            }}
        />
    )
}

export default SignInPage