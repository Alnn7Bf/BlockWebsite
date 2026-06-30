import { NextRequest } from "next/server";
import { badRequest, conflict, serverError, success } from "@/lib/api";
import validatePassword from "@/utils/validate-password";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function POST(req : NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if( !name || !email || !password ) return badRequest("Completa todos los campos para continuar.");

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        const passwordValidation = validatePassword(password);

        if(!passwordValidation.valid) return badRequest(
            "La contraseña no cumple los requisitos de seguridad.", 
            { errors: passwordValidation.errors }
        );

        if(existingUser) return conflict("Ya existe una cuenta con este correo electrónico.");

        const hashedPassword = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: "CREDENTIALS"
            }
        });

        return success(undefined, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        return serverError("No pudimos crear tu cuenta. Intenta nuevamente.");
    };
}