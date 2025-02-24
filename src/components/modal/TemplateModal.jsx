import React, { useEffect } from 'react';
import {
  Modal,
  Header,
  ModalContent,
  ModalActions,
  CardGroup,
  Card,
  Button,
  Image
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectableTemplates, setShowTemplatesModal } from '../../actions';
import { useIntl } from 'react-intl';
import propTypes from 'prop-types';
import messages from '../../messages';
import { useHistory } from 'react-router';

const TemplateCard = ({ template, baseUrl, onSelect }) => (
  <Card key={template.UID}>
    {template?.template_thumbnail && (
          <Image src={`${template?.template_thumbnail}/@@images/image/large`} wrapped ui={false} />
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
        {useIntl().formatMessage(messages.selectTemplateButton)}
      </Button>
    </Card.Content>
  </Card>
);

TemplateCard.propTypes = {
  template: propTypes.object.isRequired,
  baseUrl: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired,
};

const ModalButtons = ({ onCancel, onContinueWithoutTemplate, baseUrl }) => (
  <ModalActions>
    <Button onClick={onCancel}>
      {useIntl().formatMessage(messages.modalCancelButton)}
    </Button>
    <Button
      className="button"
      onClick={() => onContinueWithoutTemplate(baseUrl)}
    >
      {useIntl().formatMessage(messages.modalWithoutTemplateButton)}
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
    (state) => state?.selectabletemplates || {}
  );
  const intl = useIntl();
  const history = useHistory();
  const baseUrl = `${intl.locale}/add?type=Document`;

  const handleButtonClick = (url) => {
    dispatch(setShowTemplatesModal(false));
    history.push(url);
  };

  useEffect(() => {
    dispatch(getSelectableTemplates());
  }, [dispatch]);

  if (!show) return null;

  return (
    <Modal open={show} className="select-template-modal">
      <Header>{intl.formatMessage(messages.templateModalTitle)}</Header>
      <ModalContent>
        <CardGroup className="selectable-templates">
          {templates.length === 0 ? (
            <strong>{intl.formatMessage(messages.noAvailableTemplates)}</strong>
          ) : (
            templates.map((template) => (
              <TemplateCard
                key={template.UID}
                template={template}
                baseUrl={baseUrl}
                onSelect={handleButtonClick}
              />
            ))
          )}
        </CardGroup>
      </ModalContent>
      <ModalButtons
        onCancel={() => dispatch(setShowTemplatesModal(false))}
        onContinueWithoutTemplate={handleButtonClick}
        baseUrl={baseUrl}
      />
    </Modal>
  );
};

TemplateModal.propTypes = {
  show: propTypes.bool,
};

export default TemplateModal;
