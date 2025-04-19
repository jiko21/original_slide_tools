<script lang="ts">
	export let item = '';
	export let isActive: boolean = false;
</script>

<div
	class="box-border h-full w-full print:visible print:block print:h-full print:w-full print:p-0"
	class:block={isActive}
	class:hidden={!isActive}
>
	<div
		class="aspect-video h-[calc(100vh-48px)] max-h-full w-[calc(100vw-48px)] max-w-full bg-white print:h-full print:w-full"
	>
		{@html item}
	</div>
</div>
