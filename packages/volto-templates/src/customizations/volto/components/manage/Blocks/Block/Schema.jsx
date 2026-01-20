import messages from '@interaktivgmbh/volto-templates/messages'

const Schema = ({ intl, type }) => ({
  title: intl.formatMessage(messages.blockSettings),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.default),
      fields: [
        'placeholder',
        'required',
        'fixed',
        'disableNewBlocks',
        'readOnly',
      ],
    },
  ],
  properties: {
    placeholder: {
      title: intl.formatMessage(messages.placeholder),
      description: intl.formatMessage(messages.placeholderDescription),
      type: 'string',
    },
    required: {
      title: intl.formatMessage(messages.required),
      description: intl.formatMessage(messages.requiredDescription),
      type: 'boolean',
    },
    fixed: {
      title: intl.formatMessage(messages.fixed),
      description: intl.formatMessage(messages.fixedDescription),
      type: 'boolean',
    },
    disableNewBlocks: {
      title: intl.formatMessage(messages.disableNewBlocks),
      description: intl.formatMessage(messages.disableNewBlocksDescription),
      type: 'boolean',
    },
    readOnly: {
      title: intl.formatMessage(messages.readOnly),
      description: intl.formatMessage(messages.readOnlyDescription),
      type: 'boolean',
    },
  },
  required: [],
});

// Static properties for backwards compatibility (used by LayoutSchema.jsx etc.)
Schema.title = 'Block settings';
Schema.fieldsets = [
  {
    id: 'default',
    title: 'Default',
    fields: [
      'placeholder',
      'required',
      'fixed',
      'disableNewBlocks',
      'readOnly',
    ],
  },
];
Schema.properties = {
  placeholder: {
    title: 'Helper text',
    description:
      'A short hint that describes the expected value within this block',
    type: 'string',
  },
  required: {
    title: 'Required',
    description: "Don't allow deletion of this block",
    type: 'boolean',
  },
  fixed: {
    title: 'Fixed position',
    description: 'Disable drag & drop on this block',
    type: 'boolean',
  },
  disableNewBlocks: {
    title: 'Disable new blocks',
    description: 'Disable creation of new blocks after this block',
    type: 'boolean',
  },
  readOnly: {
    title: 'Read-only',
    description: 'Disable editing on this block',
    type: 'boolean',
  },
};
Schema.required = [];

export default Schema;
