
"use server"

import { signOut } from "@/auth"

export const logOut = async() => {
    // if you wanna do some server things
    await signOut();
}