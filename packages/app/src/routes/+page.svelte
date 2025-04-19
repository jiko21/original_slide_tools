<script lang="ts">
	import { pushState } from '$app/navigation';
	import { onMount } from 'svelte';
	import Slide from '../components/Slide.svelte';
	import Toolbar from '../components/Toolbar/Toolbar.svelte';

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
		console.log(e.key);
		switch (e.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				onPrev();
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				onNext();
				break;
			case 'Escape':
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
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

	const onFullscreenClick = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	};

	const onPrev = () => {
		if (page === 0) {
			return;
		}

		swipePage(page - 1);
	};

	const onNext = () => {
		if (page === data.splitFiles.length - 1) {
			return;
		}
		swipePage(page + 1);
	};
</script>

<div class="group relative">
	<div class="p-6 print:h-screen print:w-screen print:p-0">
		{#each data.splitFiles as item, index (`${item}-${index}`)}
			<Slide {item} isActive={page === index} />
		{/each}
	</div>
	<div
		class="invisible absolute bottom-8 flex w-full justify-center group-hover:visible print:hidden"
	>
		<Toolbar {onFullscreenClick} {onPrev} {onNext} />
	</div>
</div>
