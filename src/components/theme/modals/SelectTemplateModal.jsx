import React, { useEffect } from 'react';
import { Button, Card, CardGroup, Header, Image, Modal, ModalActions, ModalContent, } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectableTemplates, toggleShowTemplatesModal } from '../../../actions';
import { useIntl } from 'react-intl';
import propTypes from 'prop-types';
import messages from '../../../messages';
import { useHistory, useLocation } from 'react-router';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';


const TemplateCard = ({ template, baseUrl, onSelect, intl }) => (
  <Card key={template.UID}>
    {template?.template_thumbnail && (
      <div
        className="card-image-wrapper"
        onClick={() =>
          window.open(
            `${template?.template_thumbnail}/@@images/image/large`,
            '_blank',
            'noopener,noreferrer'
          )}
      >
        <Image
          src={`${template?.template_thumbnail}/@@images/image/large?ts=${new Date().getTime()}`}
          wrapped
          ui={false}
        />
      </div>
    )}
    <Card.Content>
      <Card.Header>{template.title}</Card.Header>
      <Card.Description>{template?.template_description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button
        className="select-template-button"
        onClick={() => onSelect(`${baseUrl}&template=${template.UID}`)}
      >
        {intl.formatMessage(messages.selectTemplateButton)}
      </Button>
    </Card.Content>
  </Card>
);

TemplateCard.propTypes = {
  template: propTypes.shape({
    UID: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    template_thumbnail: propTypes.string,
    template_description: propTypes.string,
  }).isRequired,
  baseUrl: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired,
};

const ModalButtons = ({ onCancel, onContinueWithoutTemplate, baseUrl, intl }) => (
  <ModalActions>
    <Button onClick={onCancel}>
      {intl.formatMessage(messages.modalCancelButton)}
    </Button>
    <Button
      className="button"
      onClick={() => onContinueWithoutTemplate(baseUrl)}
    >
      {intl.formatMessage(messages.modalWithoutTemplateButton)}
    </Button>
  </ModalActions>
);

ModalButtons.propTypes = {
  onCancel: propTypes.func.isRequired,
  onContinueWithoutTemplate: propTypes.func.isRequired,
  baseUrl: propTypes.string.isRequired,
};

const TemplateModal = ({ show = false }) => {
  const dispatch = useDispatch();
  const { items: templates = [] } = useSelector(
    (state) => state?.templates.selectableTemplates || {},
  );
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const baseUrl = flattenToAppURL(getBaseUrl(location.pathname)) + '/add?type=Document';

  const handleButtonClick = (url) => {
    dispatch(toggleShowTemplatesModal());
    history.push(url);
  };

  useEffect(() => {
    dispatch(getSelectableTemplates());
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <Modal open={show} className="select-template-modal">
      <Header>{intl.formatMessage(messages.templateModalTitle)}</Header>
      <ModalContent>
        <CardGroup itemsPerRow={3} className="selectable-templates">
          {templates.length === 0 ? (
            <strong>{intl.formatMessage(messages.noAvailableTemplates)}</strong>
          ) : (
            templates.map((template) => (
              <TemplateCard
                key={template.UID}
                template={template}
                baseUrl={baseUrl}
                onSelect={handleButtonClick}
                intl={intl}
              />
            ))
          )}
        </CardGroup>
      </ModalContent>
      <ModalButtons
        onCancel={() => dispatch(toggleShowTemplatesModal())}
        onContinueWithoutTemplate={handleButtonClick}
        baseUrl={baseUrl}
        intl={intl}
      />
    </Modal>
  );
};

TemplateModal.propTypes = {
  show: propTypes.bool,
};

export default TemplateModal;
