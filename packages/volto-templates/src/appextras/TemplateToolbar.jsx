import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import messages from '../messages';

import collectionSVG from '@plone/volto/icons/collection.svg';
import { useIntl } from 'react-intl';
import CreateTemplateModal from '../modals/CreateTemplateModal';
import { getTemplateContainers } from '../actions';

const TemplateToolbar = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const content = useSelector((state) => state?.content?.data) || [];
  const pathname = flattenToAppURL(getBaseUrl(content['@id']));

  const [openModal, setOpenModal] = React.useState(false);

  const { nearest_container } =
    useSelector((state) => state?.templateContainer) || {};

  const inputRef = useRef(null);
  const backRef = useRef(null);

  const onOpen = () => {
    setOpenModal(true);
    inputRef.current?.focus();
  };

  const onClose = () => {
    setOpenModal(false);
    backRef.current?.focus();
  };

  useEffect(() => {
    if (!nearest_container) {
      dispatch(getTemplateContainers(pathname));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!content || content['@type'] !== 'Document' || !nearest_container) {
    return null;
  }

  return (
    <>
      <button
        title={intl.formatMessage(messages.createTemplateButton)}
        aria-label={intl.formatMessage(messages.createTemplateButton)}
        onClick={onOpen}
        ref={backRef}
      >
        <Icon name={collectionSVG} size="30px" />
      </button>
      <CreateTemplateModal
        open={openModal}
        onClose={onClose}
        pageTitle={content.title}
        ref={inputRef}
      />
    </>
  );
};

export default TemplateToolbar;
