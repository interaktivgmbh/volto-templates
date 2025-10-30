import { useEffect, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import SelectTemplateModal from '../modals/SelectTemplateModal';
import CreateTemplateModal from '../modals/CreateTemplateModal';
import messages from '../messages';
import { getTemplateContainers } from '../actions';

import collectionSVG from '@plone/volto/icons/collection.svg';

function TemplatesToolbarCreate({ location }) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [openModal, setOpenModal] = useState(false);
  const content = useSelector((state) => state?.content?.data) || [];

  const pathname = flattenToAppURL(getBaseUrl(location.pathname));

  const { nearest_container } = useSelector(
    (state) => state?.templateContainer || {},
  );

  useEffect(() => {
    if (!nearest_container) {
      dispatch(getTemplateContainers(pathname));
    }
  }, []);

  if (!content || content['@type'] !== 'Document' || !nearest_container) {
    return null;
  }

  return (
    <>
      <Plug pluggable="main.toolbar.top">
        <button
          title={intl.formatMessage(messages.createTemplateButton)}
          aria-label={intl.formatMessage(messages.createTemplateButton)}
          onClick={() => setOpenModal(true)}
        >
          <Icon name={collectionSVG} size="30px" />
        </button>
      </Plug>
      <CreateTemplateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pageTitle={content.title}
      />
    </>
  );
}

function TemplatesToolbar(props) {
  const onClickHandler = useRef(null);
  const showTemplatesModal = useSelector(
    (state) => state.templates.showTemplatesModal,
  );

  useEffect(() => {
    if (showTemplatesModal) {
      onClickHandler.current();
    }
  }, [showTemplatesModal]);

  return (
    <>
      <TemplatesToolbarCreate location={props.location} />
      <Plug pluggable="main.toolbar.bottom">
        {(props) => {
          onClickHandler.current = props.onClickHandler;
          return null;
        }}
      </Plug>
      <SelectTemplateModal show={showTemplatesModal} />
    </>
  );
}

export default TemplatesToolbar;
