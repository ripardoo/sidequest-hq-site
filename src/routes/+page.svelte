<script>
  import Desktop from '$lib/Desktop.svelte';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  
</script>

<Desktop />
  