"use client"
import { FormEventHandler } from "react"
import { createUser } from "../../utils/mangoTest"



export default function SignUp() {
    function handleSubmit(data: FormData) {
        const username = data.get("username") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        fetch("/api/users/createUser", {
            method: "POST",
            "body": JSON.stringify({ username, email, password })
        })
            .then(value => value.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
    }
    return (
        <div className="w-full h-screen grid place-items-center">
            <form action={handleSubmit}>
                <fieldset className="w-lg p-3 border">
                    <h1 className="text-center font-bold text-xl">Sign up</h1>
                    <input name="username" className="w-50% h-12 border mx-auto block my-3 mt-10" placeholder="Username" type="text" />
                    <br />
                    <input name="email" className="w-50% h-12 mx-auto border block my-3" placeholder="Email Address" type="email" />
                    <br />
                    <input name="password" className="w-50% h-12 mx-auto border block my-3" placeholder="Password" type="password" />
                    <br />
                    <input className="w-50% h-12 bg-accent mx-auto border block my-3" type="submit" value="Log In" />
                </fieldset>
            </form>
        </div>
    )
}
