import { Agent } from 'node:https';

const API_KEY = 'd7ee400e04b0ed2b2215e6906596da6e7f8cd227d11e3ceba7173359f225a1f6';
const API_URL = 'https://kristycoral.local.api.umbrielcms.com.br:3001';
const TENANT_ID = 'kristycoral';

// Configuração para ignorar verificação SSL em desenvolvimento
const httpsAgent = new Agent({
    rejectUnauthorized: false
});

export async function fetchPages() {
    try {
        const response = await fetch('/api/pages');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw error;
    }
} 