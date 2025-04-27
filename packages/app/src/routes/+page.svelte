<script lang="ts">
	import { pushState } from '$app/navigation';
	import { onMount } from 'svelte';
	import Slide from '../components/Slide.svelte';
	import Toolbar from '../components/Toolbar/Toolbar.svelte';

	const { data } = $props();
	let url: URL;
	let page = $state(0);
	let ratio = $state(1);
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

	const onResize = () => {
		const width = window.innerWidth - 48;
		ratio = width / 1920;
	};

	const onKeyDown = (e: KeyboardEvent) => {
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
		const width = window.innerWidth - 48;
		ratio = width / 1920;

		url = new URL(decodeURIComponent(document.location.href));
		page = Number(url.searchParams.get('p') ?? '1') - 1;
		document.addEventListener('keydown', onKeyDown);
		window.addEventListener('resize', onResize);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('resize', onResize);
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
			<Slide {item} isActive={page === index} {ratio} globalStyle={data.globalStyle} />
		{/each}
	</div>
	<div
		class="invisible absolute bottom-8 flex w-full justify-center group-hover:visible print:hidden"
	>
		<Toolbar {onFullscreenClick} {onPrev} {onNext} />
	</div>
</div>
