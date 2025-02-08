"use client"

import { NextPage } from "next";
import AuthForm from "~/app/_components/auth/AuthForm";
import LoginForm from "~/app/_components/auth/LoginForm";
import { signInSchema } from "~/app/_schemas/authSchema";

const SignInPage: NextPage = () => {
    return <LoginForm />
}

export default SignInPage