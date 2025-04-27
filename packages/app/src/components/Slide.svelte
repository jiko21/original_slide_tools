<script lang="ts">
	export let item = '';
	export let ratio = 1.0;
	export let isActive: boolean = false;
	export let globalStyle = '';
</script>

<div
	class="pinrt:m-auto box-border h-full w-full print:visible print:block"
	class:block={isActive}
	class:hidden={!isActive}
	style="--ratio: {ratio};"
>
	<div
		class="slide-youso aspect-video h-full max-h-[calc(100vh-48px)] w-full max-w-[calc(100vw-48px)] bg-white {globalStyle} !print:text-[16px] overflow-hidden print:h-auto print:max-h-full print:w-auto print:max-w-full"
		style="font-size: {16 * ratio}px"
	>
		{@html item}
	</div>
</div>

<style>
</style>
