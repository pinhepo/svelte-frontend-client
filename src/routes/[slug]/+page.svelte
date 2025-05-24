<script lang="ts">
    import type { PageData } from './$types.js';
    
    export let data: PageData;
    const { page } = data;
</script>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{page.title}</h1>
    
    <div class="prose">
        <p class="text-gray-600">Meta Description: {page.metaDescription}</p>
        <p class="text-gray-600">Meta Keywords: {page.metaKeywords}</p>
        <p class="text-gray-600">Template: {page.page_template}</p>
        <p class="text-gray-600">Status: {page.isOffline ? 'Offline' : 'Online'}</p>
    </div>
</div> 