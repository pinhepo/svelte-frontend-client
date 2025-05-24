<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script lang="ts">
    import { onMount } from 'svelte';

    let pages: any[] = [];
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/api/pages');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Pages data:', data);
            pages = data;
        } catch (e) {
            error = e instanceof Error ? e.message : 'An error occurred';
            console.error('Error:', e);
        } finally {
            loading = false;
        }
    });
</script>

<main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Home Page</h1>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p class="text-red-500">Error: {error}</p>
    {:else}
        <div class="grid gap-4">
            {#each pages as page}
                <div class="border p-4 rounded">
                    <h2 class="text-xl font-semibold">{page.title}</h2>
                    <p>{page.description}</p>
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
    .container {
        max-width: 1200px;
    }
</style>
