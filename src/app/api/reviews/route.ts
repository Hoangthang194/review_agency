import { NextRequest, NextResponse } from 'next/server';
import pool, { queryRows, queryRow, query } from '@/lib/db';

// Type definition for Review
interface Review {
    id: number;
    review_type: 'forex' | 'crypto' | 'prop';
    name: string;
    slug: string;
    rating: number;
    reviews: number;
    description: string;
    url_site: string | null;
    logo: string | null;
    logo_bg: string | null;
    tags: string[] | null;
    stats: Array<{ icon: string; title: string; value: string }> | null;
    terms: Array<{ label: string; value: string }> | null;
    key_info: Array<{ label: string; value: string }> | null;
    content: string | null;
    pros: string[] | null;
    cons: string[] | null;
    average_rating: number;
    rating_breakdown: Array<{ stars: number; pct: string }> | null;
    advantages: string[] | null;
    disadvantages: string[] | null;
    created_at: Date;
    updated_at: Date;
}

// GET /api/reviews - Get all reviews with optional filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type'); // 'forex' | 'crypto' | 'prop'
        const slug = searchParams.get('slug');
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = parseInt(searchParams.get('offset') || '0');

        let sql = 'SELECT * FROM reviews WHERE 1=1';
        const params: any[] = [];

        // Filter by type
        if (type && ['forex', 'crypto', 'prop'].includes(type)) {
            sql += ' AND review_type = ?';
            params.push(type);
        }

        // Filter by slug (for single review)
        if (slug) {
            sql += ' AND slug = ?';
            params.push(slug);
        }

        // Order by created_at descending (newest first)
        sql += ' ORDER BY created_at DESC';

        // Add limit and offset
        sql += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const results = await queryRows<any>(sql, params);

        // Parse JSON fields (mysql2 may return JSON fields as strings or objects)
        const reviews = results.map((review) => {
            const parseJson = (field: any) => {
                if (!field) return null;
                if (typeof field === 'string') {
                    try {
                        return JSON.parse(field);
                    } catch {
                        return field;
                    }
                }
                return field;
            };

            return {
                ...review,
                tags: parseJson(review.tags),
                stats: parseJson(review.stats),
                terms: parseJson(review.terms),
                key_info: parseJson(review.key_info),
                pros: parseJson(review.pros),
                cons: parseJson(review.cons),
                rating_breakdown: parseJson(review.rating_breakdown),
                advantages: parseJson(review.advantages),
                disadvantages: parseJson(review.disadvantages),
            };
        });

        // If slug is provided, return single review, otherwise return array
        if (slug) {
            return NextResponse.json(reviews[0] || null, {
                status: reviews[0] ? 200 : 404,
            });
        }

        return NextResponse.json(reviews, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch reviews',
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

// PUT /api/reviews?type=forex&slug=binance - Update a review
export async function PUT(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type'); // 'forex' | 'crypto' | 'prop'
        const slug = searchParams.get('slug');

        // Validate query parameters
        if (!type || !slug) {
            return NextResponse.json(
                {
                    error: 'Type and slug are required',
                },
                {
                    status: 400,
                }
            );
        }

        if (!['forex', 'crypto', 'prop'].includes(type)) {
            return NextResponse.json(
                {
                    error: 'Invalid review type',
                },
                {
                    status: 400,
                }
            );
        }

        // Get request body
        const body = await request.json();

        // Check if review exists
        const existingReview = await queryRow<any>(
            'SELECT id FROM reviews WHERE review_type = ? AND slug = ?',
            [type, slug]
        );

        if (!existingReview) {
            return NextResponse.json(
                {
                    error: 'Review not found',
                },
                {
                    status: 404,
                }
            );
        }

        // Prepare update fields
        const updateFields: string[] = [];
        const updateParams: any[] = [];

        // Helper function to handle JSON fields
        const handleJsonField = (value: any) => {
            if (value === null || value === undefined) {
                return null;
            }
            return JSON.stringify(value);
        };

        // Update fields that are provided in the request body
        if (body.review_type !== undefined) {
            if (!['forex', 'crypto', 'prop'].includes(body.review_type)) {
                return NextResponse.json(
                    {
                        error: 'Invalid review_type',
                    },
                    {
                        status: 400,
                    }
                );
            }
            updateFields.push('review_type = ?');
            updateParams.push(body.review_type);
        }

        if (body.name !== undefined) {
            updateFields.push('name = ?');
            updateParams.push(body.name);
        }

        if (body.slug !== undefined && body.slug !== slug) {
            // Check if new slug already exists in another review
            const slugExists = await queryRow<any>(
                'SELECT id FROM reviews WHERE slug = ? AND (review_type != ? OR slug != ?)',
                [body.slug, type, slug]
            );
            if (slugExists) {
                return NextResponse.json(
                    {
                        error: 'Slug already exists',
                    },
                    {
                        status: 409,
                    }
                );
            }
            updateFields.push('slug = ?');
            updateParams.push(body.slug);
        }

        if (body.rating !== undefined) {
            updateFields.push('rating = ?');
            updateParams.push(body.rating);
        }

        if (body.reviews !== undefined) {
            updateFields.push('reviews = ?');
            updateParams.push(body.reviews);
        }

        if (body.description !== undefined) {
            updateFields.push('description = ?');
            updateParams.push(body.description);
        }

        if (body.url_site !== undefined) {
            updateFields.push('url_site = ?');
            updateParams.push(body.url_site || null);
        }

        if (body.logo !== undefined) {
            updateFields.push('logo = ?');
            updateParams.push(body.logo || null);
        }

        if (body.logo_bg !== undefined) {
            updateFields.push('logo_bg = ?');
            updateParams.push(body.logo_bg || null);
        }

        if (body.tags !== undefined) {
            updateFields.push('tags = ?');
            updateParams.push(handleJsonField(body.tags));
        }

        if (body.stats !== undefined) {
            updateFields.push('stats = ?');
            updateParams.push(handleJsonField(body.stats));
        }

        if (body.terms !== undefined) {
            updateFields.push('terms = ?');
            updateParams.push(handleJsonField(body.terms));
        }

        if (body.key_info !== undefined) {
            updateFields.push('key_info = ?');
            updateParams.push(handleJsonField(body.key_info));
        }

        if (body.content !== undefined) {
            updateFields.push('content = ?');
            updateParams.push(body.content || null);
        }

        if (body.pros !== undefined) {
            updateFields.push('pros = ?');
            updateParams.push(handleJsonField(body.pros));
        }

        if (body.cons !== undefined) {
            updateFields.push('cons = ?');
            updateParams.push(handleJsonField(body.cons));
        }

        if (body.average_rating !== undefined) {
            updateFields.push('average_rating = ?');
            updateParams.push(body.average_rating);
        }

        if (body.rating_breakdown !== undefined) {
            updateFields.push('rating_breakdown = ?');
            updateParams.push(handleJsonField(body.rating_breakdown));
        }

        if (body.advantages !== undefined) {
            updateFields.push('advantages = ?');
            updateParams.push(handleJsonField(body.advantages));
        }

        if (body.disadvantages !== undefined) {
            updateFields.push('disadvantages = ?');
            updateParams.push(handleJsonField(body.disadvantages));
        }

        // If no fields to update
        if (updateFields.length === 0) {
            return NextResponse.json(
                {
                    error: 'No fields to update',
                },
                {
                    status: 400,
                }
            );
        }

        // Build SQL query
        updateParams.push(type, slug);
        const sql = `UPDATE reviews SET ${updateFields.join(', ')} WHERE review_type = ? AND slug = ?`;

        // Execute update
        await query(sql, updateParams);

        // Fetch updated review (use new slug if changed, otherwise use original)
        const finalType = body.review_type || type;
        const finalSlug = body.slug || slug;
        const updatedReview = await queryRow<any>(
            'SELECT * FROM reviews WHERE review_type = ? AND slug = ?',
            [finalType, finalSlug]
        );

        if (!updatedReview) {
            return NextResponse.json(
                {
                    error: 'Failed to fetch updated review',
                },
                {
                    status: 500,
                }
            );
        }

        // Parse JSON fields
        const parseJson = (field: any) => {
            if (!field) return null;
            if (typeof field === 'string') {
                try {
                    return JSON.parse(field);
                } catch {
                    return field;
                }
            }
            return field;
        };

        const result = {
            ...updatedReview,
            tags: parseJson(updatedReview.tags),
            stats: parseJson(updatedReview.stats),
            terms: parseJson(updatedReview.terms),
            key_info: parseJson(updatedReview.key_info),
            pros: parseJson(updatedReview.pros),
            cons: parseJson(updatedReview.cons),
            rating_breakdown: parseJson(updatedReview.rating_breakdown),
            advantages: parseJson(updatedReview.advantages),
            disadvantages: parseJson(updatedReview.disadvantages),
        };

        return NextResponse.json(result, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error updating review:', error);
        return NextResponse.json(
            {
                error: 'Failed to update review',
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

// DELETE /api/reviews?type=forex&slug=binance - Delete a review
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type'); // 'forex' | 'crypto' | 'prop'
        const slug = searchParams.get('slug');

        // Validate query parameters
        if (!type || !slug) {
            return NextResponse.json(
                {
                    error: 'Type and slug are required',
                },
                {
                    status: 400,
                }
            );
        }

        if (!['forex', 'crypto', 'prop'].includes(type)) {
            return NextResponse.json(
                {
                    error: 'Invalid review type',
                },
                {
                    status: 400,
                }
            );
        }

        // Check if review exists
        const existingReview = await queryRow<any>(
            'SELECT id, name FROM reviews WHERE review_type = ? AND slug = ?',
            [type, slug]
        );

        if (!existingReview) {
            return NextResponse.json(
                {
                    error: 'Review not found',
                },
                {
                    status: 404,
                }
            );
        }

        // Delete the review
        await query(
            'DELETE FROM reviews WHERE review_type = ? AND slug = ?',
            [type, slug]
        );

        return NextResponse.json(
            {
                message: 'Review deleted successfully',
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error('Error deleting review:', error);
        return NextResponse.json(
            {
                error: 'Failed to delete review',
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

