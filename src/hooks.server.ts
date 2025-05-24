import { paraglideMiddleware } from '$lib/paraglide/server.js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Ignore requests to .well-known directory
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};
