import { useState, useRef, forwardRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Button,
  Header,
  Modal,
  ModalActions,
  ModalContent,
} from 'semantic-ui-react';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import messages from '../messages';
import { createThumbnail } from '../actions';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';

/**
 * @typedef {object} ModalButtonsProps
 * @property {() => void} onClose
 * @property {() => void} onSubmit
 * @property {boolean} disabled
 * @property {import('react-intl').IntlShape} intl
 */

/**
 * @type {import('react').ForwardRefExoticComponent<
 *   ModalButtonsProps & import('react').RefAttributes<HTMLButtonElement>
 * >}
 */
const ModalButtons = forwardRef((props, ref) => {
  const { onClose, onSubmit, disabled, intl } = props;

  return (
    <ModalActions>
      <Button
        onClick={onClose}
        disabled={disabled}
        aria-label={intl.formatMessage(messages.modalCancelButton)}
      >
        {intl.formatMessage(messages.modalCancelButton)}
      </Button>
      <Button
        className="button"
        onClick={onSubmit}
        disabled={disabled}
        ref={!disabled ? ref : null}
        aria-label={intl.formatMessage(messages.createTemplateButton)}
      >
        {intl.formatMessage(messages.createTemplateButton)}
      </Button>
    </ModalActions>
  );
});

/**
 * @typedef {object} CreateTemplateModalProps
 * @property {boolean} open
 * @property {() => void} onClose
 * @property {string} pageTitle
 */

/** @type {import('react').FC<CreateTemplateModalProps>} */
export const CreateTemplateModal = forwardRef((props, ref) => {
  const { open, onClose, pageTitle } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const [missingInputValues, setMissingInputValues] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const lastRef = useRef();

  const { nearest_container } = useSelector(
    (state) => state?.templateContainer || {}
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
        })
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

  useModalKeyHandler(ref, lastRef, open, onClose);

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
                  prev.filter((val) => val !== 'template-title')
                )
              }
              ref={ref}
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
        ref={lastRef}
      />
    </Modal>
  );
});

export default CreateTemplateModal;
