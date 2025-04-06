<script lang="ts">
	import { pushState } from '$app/navigation';
	import { onMount } from 'svelte';
	import Slide from '../components/Slide.svelte';

	const { data } = $props();
	let url: URL;
	let page = $state(0);
	const swipePage = (index: number) => {
		if (!document.startViewTransition) {
			url.searchParams.set('p', `${index + 1}`);
			pushState(url, {});
			page = index;
		}
		document.startViewTransition(() => {
			url.searchParams.set('p', `${index + 1}`);
			pushState(url, {});
			page = index;
		});
	};

	const onKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				if (page === 0) {
					break;
				}

				swipePage(page - 1);
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				if (page === data.splitFiles.length - 1) {
					break;
				}
				swipePage(page + 1);
				break;
			default:
				break;
		}
	};

	onMount(() => {
		url = new URL(decodeURIComponent(document.location.href));
		page = Number(url.searchParams.get('p') ?? '1') - 1;
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<div class="relative">
	{#each data.splitFiles as item, index (`${item}-${index}`)}
		<Slide {item} isActive={page === index} />
	{/each}
</div>
