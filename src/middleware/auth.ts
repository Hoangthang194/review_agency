import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken, JWTPayload } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextRequest {
    user?: JWTPayload;
}

/**
 * Middleware to verify JWT token and attach user to request
 */
export function withAuth(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
        try {
            const authHeader = request.headers.get('authorization');
            const token = extractToken(authHeader);

            if (!token) {
                return NextResponse.json(
                    { error: 'No token provided' },
                    { status: 401 }
                );
            }

            const user = verifyToken(token);
            (request as AuthenticatedRequest).user = user;

            return handler(request as AuthenticatedRequest);
        } catch (error: any) {
            return NextResponse.json(
                { error: 'Invalid or expired token', message: error.message },
                { status: 401 }
            );
        }
    };
}

/**
 * Middleware to check if user has required role
 */
export function withRole(requiredRoles: string[]) {
    return (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) => {
        return withAuth(async (request: AuthenticatedRequest) => {
            if (!request.user) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            if (!requiredRoles.includes(request.user.role)) {
                return NextResponse.json(
                    { error: 'Insufficient permissions' },
                    { status: 403 }
                );
            }

            return handler(request);
        });
    };
}

