import {
  Button,
  Header,
  Modal,
  ModalActions,
  ModalContent,
} from 'semantic-ui-react';
import messages from '../../../messages';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createThumbnail } from '../../../actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useHistory } from 'react-router';

/**
 * @typedef {object} ModalButtonsProps
 * @property {() => void} onClose
 * @property {() => void} onSubmit
 * @property {boolean} disabled
 * @property {import('react-intl').IntlShape} intl
 */

/** @type {import('react').FC<ModalButtonsProps>} */
const ModalButtons = ({ onClose, onSubmit, disabled, intl }) => (
  <ModalActions>
    <Button onClick={onClose} disabled={disabled}>
      {intl.formatMessage(messages.modalCancelButton)}
    </Button>
    <Button className="button" onClick={onSubmit} disabled={disabled}>
      {intl.formatMessage(messages.createTemplateButton)}
    </Button>
  </ModalActions>
);

/**
 * @typedef {object} CreateTemplateModalProps
 * @property {boolean} open
 * @property {() => void} onClose
 * @property {string} pageTitle
 */

/** @type {import('react').FC<CreateTemplateModalProps>} */
export const CreateTemplateModal = ({ open, onClose, pageTitle }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const [missingInputValues, setMissingInputValues] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { nearest_container } = useSelector(
    (state) => state?.templateContainer || {},
  );

  const { data: content } = useSelector((state) => state?.content || {});

  const onSubmit = () => {
    setIsSubmitDisabled(true);

    if (title === '') {
      setMissingInputValues((prev) => prev.concat(['template-title']));
      setIsSubmitDisabled(false);
    } else {
      setMissingInputValues([]);

      dispatch(
        createContent(flattenToAppURL(nearest_container), {
          title: title,
          template_description: description || '',
          blocks: content?.blocks || [],
          blocks_layout: content?.blocks_layout || {},
          '@type': 'Template',
        }),
      ).then((content) => {
        if (content && content['@id']) {
          setTitle('');
          setDescription('');
          setIsSubmitDisabled(false);

          history.push(flattenToAppURL(content['@id']));
          dispatch(createThumbnail(flattenToAppURL(content['@id'])));

          onClose();
        }
      });
    }
  };

  return (
    <Modal open={open} className="create-template-modal">
      <Header>{intl.formatMessage(messages.createTemplateModalTitle)}</Header>
      <ModalContent>
        <p className="info-title">
          <FormattedMessage
            id="Create template based on {page}"
            defaultMessage="Create template based on {page}"
            values={{ page: pageTitle }}
          />
        </p>
        <div className="fields">
          <div className="field required">
            <label htmlFor="template-title">
              {intl.formatMessage(messages.templateFormTitle)}
            </label>
            <input
              type="text"
              id="title"
              name="template-title"
              disabled={isSubmitDisabled}
              placeholder={intl.formatMessage(messages.templateFormTitle)}
              onChange={(evt) => setTitle(evt.target.value)}
              onFocus={() =>
                setMissingInputValues((prev) =>
                  prev.filter((val) => val !== 'template-title'),
                )
              }
            />
            {missingInputValues.includes('template-title') ? (
              <p className="required-field-popup">
                {intl.formatMessage(messages.templateFormRequiredField)}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="template-description">
              {intl.formatMessage(messages.templateFormDescription)}
            </label>
            <input
              type="text"
              id="description"
              name="template-description"
              disabled={isSubmitDisabled}
              placeholder={intl.formatMessage(messages.templateFormDescription)}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalButtons
        onClose={onClose}
        onSubmit={onSubmit}
        disabled={isSubmitDisabled}
        intl={intl}
      />
    </Modal>
  );
};

export default CreateTemplateModal;
