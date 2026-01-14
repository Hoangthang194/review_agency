"use client";

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface ContactResponse {
    message: string;
    contact: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        subject: string;
        message: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
}

/**
 * Function to submit a contact form.
 * @param formData - The contact form data.
 * @returns The response from the API.
 */
export async function submitContact(formData: ContactFormData): Promise<ContactResponse> {
    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to submit contact form: ${response.statusText}`);
        }

        return result;
    } catch (error) {
        console.error("Error submitting contact form:", error);
        throw error;
    }
}

