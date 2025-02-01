import {MemoryI} from '@baseai/core';

const memoryKnowledgeBase = (): MemoryI => ({
	name: 'knowledge-base',
	description: "│  My list of docs as memory for an AI agent pipe",
	git: {
		enabled: false,
		include: ['documents/**/*'],
		gitignore: false,
		deployedAt: '',
		embeddedAt: ''
	}
});

export default memoryKnowledgeBase;