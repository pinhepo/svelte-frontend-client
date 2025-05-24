import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ fetch, params }) => {
    try {
        const response = await fetch('/api/pages');
        const pages = await response.json();
        
        const page = pages.find((p: any) => p.slug === params.slug);
        
        if (!page) {
            throw error(404, 'Página não encontrada');
        }

        return {
            page
        };
    } catch (e) {
        throw error(500, 'Erro ao carregar a página');
    }
}; 