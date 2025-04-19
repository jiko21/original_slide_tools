<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toolbar from './Toolbar.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/Toolbar',
		component: Toolbar,
		// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
		tags: ['autodocs'],
		parameters: {
			// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
			layout: 'fullscreen'
		},
		args: {
			// onLogin: fn(),
			// onLogout: fn(),
			// onCreateAccount: fn()
		}
	});
</script>

<Story name="Logged In" />

<Story name="Logged Out" />
