import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function POST(req : NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if( !name || !email || !password ) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Faltan campos obligatorios"
                }, { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "El correo ya está registrado"
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
                message: "Error interno del servidor"
            }, { status: 500 }
        );
    };
}