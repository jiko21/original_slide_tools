<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowBack from '../icons/ArrowBack.svelte';
	import ArrowForward from '../icons/ArrowRight.svelte';
	import CloseFullscreen from '../icons/CloseFullscreen.svelte';
	import FullScreen from '../icons/FullScreen.svelte';

	let isFullScreen = $state(false);
	let { onFullscreenClick, onPrev, onNext } = $props();
	const onFullScreenChange = () => {
		isFullScreen = document.fullscreenElement !== null;
	};
	onMount(() => {
		isFullScreen = document.fullscreenElement !== null;
		document.addEventListener('fullscreenchange', onFullScreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', onFullScreenChange);
		};
	});
</script>

<div class="w-fit rounded-full bg-black p-2 opacity-50">
	<button class="p-1 hover:opacity-20" onclick={() => onPrev()}>
		<ArrowBack />
	</button>
	<button class="p-1 hover:opacity-20" onclick={() => onFullscreenClick()}>
		{#if isFullScreen}
			<CloseFullscreen />
		{:else}
			<FullScreen />
		{/if}
	</button>
	<button class="p-1 hover:opacity-20" onclick={() => onNext()}>
		<ArrowForward />
	</button>
</div>
