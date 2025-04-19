<script lang="ts">
	import ArrowBack from '../icons/ArrowBack.svelte';
	import ArrowForward from '../icons/ArrowRight.svelte';
	import FullScreen from '../icons/FullScreen.svelte';
</script>

<div class="w-fit rounded-full bg-black p-2 opacity-50">
	<button class="p-1 hover:opacity-20">
		<ArrowBack />
	</button>
	<button class="p-1 hover:opacity-20">
		<FullScreen />
	</button>
	<button class="p-1 hover:opacity-20">
		<ArrowForward />
	</button>
</div>
