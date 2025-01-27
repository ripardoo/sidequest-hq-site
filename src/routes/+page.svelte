<script>
  import Desktop from '$lib/Desktop.svelte';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { dev } from '$app/environment';

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  
</script>

<Desktop />
