import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';
import https from 'node:https';

export async function GET() {
    try {
        console.log('Environment variables:', {
            apiUrl: env.LOCAL_API,
            tenantId: env.CLIENT_TENANT_ID,
            apiKey: env.CLIENT_API_KEY ? 'exists' : 'missing'
        });

        const url = `${env.LOCAL_API}/private/pages/listPages`;
        console.log('Fetching from URL:', url);

        const response = await fetch(url, {
            headers: {
                'x-tenant-id': env.CLIENT_TENANT_ID,
                'x-api-key': env.CLIENT_API_KEY
            },
            agent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Detailed error:', error);
        return json({ 
            error: 'Failed to fetch pages',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
} 