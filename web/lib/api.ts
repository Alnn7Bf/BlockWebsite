import { NextResponse } from "next/server";

export function success<T>(message?: string, data?: T) {
    return NextResponse.json({
        ok: true,
        ...(message && { message }),
        ...(data !== undefined && { data }),
    });
}

export function created<T>(message?: string, data?: T) {
    return NextResponse.json({
        ok: true,
        ...(message && { message }),
        ...(data !== undefined && { data }),
    }, { status: 201 });
}

export function badRequest<T>(message: string, data?: T) {
    return NextResponse.json({
        ok: false,
        message,
        ...(data !== undefined && { data }),
    }, { status: 400 });
}

export function unauthorized() {
    return NextResponse.json({
        ok: false,
        message: "No autorizado",
    }, { status: 401 });
}

export function notFound(message: string) {
    return NextResponse.json({
        ok: false,
        message,
    }, { status: 404 });
}

export function conflict<T>(message: string, data?: T) {
    return NextResponse.json({
        ok: false,
        message,
        ...(data !== undefined && { data }),
    }, { status: 409 });
}

export function serverError(message = "Ocurrió un error interno") {
    return NextResponse.json({
        ok: false,
        message,
    }, { status: 500 });
}