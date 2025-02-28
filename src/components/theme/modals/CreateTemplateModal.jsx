import { Button, Header, Modal, ModalActions, ModalContent } from 'semantic-ui-react';
import messages from '../../../messages';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplateContainers } from '../../../actions';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';

const ModalButtons = ({ onCancel, onSubmit, intl }) => (
  <ModalActions>
    <Button onClick={onCancel}>
      {intl.formatMessage(messages.modalCancelButton)}
    </Button>
    <Button
      className="button"
      onClick={onSubmit}
    >
      {intl.formatMessage(messages.createTemplateButton)}
    </Button>
  </ModalActions>
);


export const CreateTemplateModal = ({ open, onCancel, pageTitle }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [missingInputValues, setMissingInputValues] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const pathname = flattenToAppURL(getBaseUrl(location.pathname));

  const { items: containers = [] } = useSelector(
    (state) => state?.templateContainer || [],
  );

  const onSubmit = () => {
    setIsSubmitDisabled(true);

    if (title === '') {
      setMissingInputValues((prev) => prev.concat(['template-title']));
      setIsSubmitDisabled(false);
    } else {
      setMissingInputValues([]);
      console.log('Submit....');
      dispatch(getTemplateContainers(pathname));
      console.log(containers);
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
              placeholder={intl.formatMessage(messages.templateFormTitle)}
              onChange={(evt) => setTitle(evt.target.value)}
              onFocus={() =>
                setMissingInputValues((prev) =>
                  prev.filter((val) => val !== 'template-title'),
                )
              }
            />
            {missingInputValues.includes('template-title') ? (
              <p className="required-field-popup">{intl.formatMessage(messages.templateFormRequiredField)}</p>
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
              placeholder={intl.formatMessage(messages.templateFormDescription)}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalButtons onCancel={onCancel} onSubmit={onSubmit} intl={intl} />;
    </Modal>
  )
    ;
};

export default CreateTemplateModal;
