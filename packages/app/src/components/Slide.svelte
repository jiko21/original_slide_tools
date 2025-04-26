<script lang="ts">
	export let item = '';
	export let ratio = 1.0;
	export let isActive: boolean = false;
	export let globalStyle = '';
</script>

<div
	class="box-border h-full w-full print:visible print:block print:h-full print:w-full print:p-0"
	class:block={isActive}
	class:hidden={!isActive}
	style="--ratio: {ratio};"
>
	<div
		class="slide-youso aspect-video h-full max-h-[calc(100vh-48px)] w-full max-w-[calc(100vw-48px)] bg-white print:h-full print:w-full {globalStyle}"
		style="font-size: {16 * ratio}px"
	>
		{@html item}
	</div>
</div>

<style>
</style>
