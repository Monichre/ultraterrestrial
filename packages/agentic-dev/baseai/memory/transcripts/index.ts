import {MemoryI} from '@baseai/core';

const memoryTranscripts = (): MemoryI => ({
	name: 'transcripts',
	description: "",
	git: {
		enabled: true,
		include: ['**/*'],
		gitignore: true,
		deployedAt: '',
		embeddedAt: ''
	}
});

export default memoryTranscripts;