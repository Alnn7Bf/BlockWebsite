import { NextRequest, NextResponse } from "next/server";
import validatePassword from "@/utils/validate-password";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function POST(req : NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if( !name || !email || !password ) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Completa todos los campos para continuar."
                }, { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        const passwordValidation = validatePassword(password);

        if(!passwordValidation.valid) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "La contraseña no cumple los requisitos de seguridad.",
                    errors: passwordValidation.errors,
                }, { status: 400 }
            )
        }

        if(existingUser) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Ya existe una cuenta con este correo electrónico."
                }, { status: 409 }
            )
        }

        const hashedPassword = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: "CREDENTIALS"
            }
        });

        return NextResponse.json({
            ok: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.log(error);
        return NextResponse.json(
            {
                ok: false,
                message: "No pudimos crear tu cuenta. Intenta nuevamente."
            }, { status: 500 }
        );
    };
}