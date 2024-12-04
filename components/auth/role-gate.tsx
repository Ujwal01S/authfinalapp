"use client"

import { UserRole } from "@prisma/client"

import { FormError } from "../form-error"
import { useCurrentRole } from "@/hooks/user-current-role"


interface RoleGateProps {
    children:React.ReactNode
    allowedRole:UserRole
};


export const RoleGate = ({allowedRole,children}:RoleGateProps) => {
    const role = useCurrentRole();

    if(role !== allowedRole){
        return(
            <FormError message="You do not have permission to view this content" />
        )
    }

    return(
        <>
        {children}
        </>
    )
}