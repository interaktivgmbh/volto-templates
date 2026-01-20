import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  Button,
  Card,
  CardGroup,
  Header,
  Image,
  Modal,
  ModalActions,
  ModalContent,
} from 'semantic-ui-react';
import propTypes from 'prop-types';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import { getSelectableTemplates, toggleShowTemplatesModal } from '../actions';
import messages from '../messages';

const TemplateCard = ({ template, baseUrl, onSelect, intl }) => {
  const handleImageClick = () => {
    window.open(template?.template_thumbnail, '_blank', 'noopener,noreferrer');
  };

  const handleImageKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick();
    }
  };

  return (
    <Card key={template.UID}>
      {template?.template_thumbnail && (
        <div
          className="card-image-wrapper"
          role="button"
          tabIndex={0}
          onClick={handleImageClick}
          onKeyDown={handleImageKeyDown}
          aria-label={intl.formatMessage(messages.openImageInNewTab)}
        >
          <Image
            src={`${template?.template_thumbnail}?ts=${new Date().getTime()}`}
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
          onClick={() =>
            onSelect(
              `${baseUrl.replace('/add', '/template-add')}&template=${template.UID}`,
            )
          }
        >
          {intl.formatMessage(messages.selectTemplateButton)}
        </Button>
      </Card.Content>
    </Card>
  );
};

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

const ModalButtons = ({
  onCancel,
  onContinueWithoutTemplate,
  baseUrl,
  intl,
}) => (
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
  const { items: templates = [], loaded } = useSelector(
    (state) => state?.templates.selectableTemplates || {},
  );
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const baseUrl =
    flattenToAppURL(getBaseUrl(location.pathname)) + '/add?type=Document';

  const handleButtonClick = (url) => {
    dispatch(toggleShowTemplatesModal());
    history.push(url, { byTemplate: true });
  };

  useEffect(() => {
    if (show) {
      dispatch(getSelectableTemplates());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (show && loaded && templates.length === 0) {
      handleButtonClick(baseUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, loaded, templates.length]);

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
