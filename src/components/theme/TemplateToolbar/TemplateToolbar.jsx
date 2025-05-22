import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBaseUrl, flattenToAppURL} from '@plone/volto/helpers';
import {Icon} from '@plone/volto/components';
import messages from '../../../messages';

import collectionSVG from '@plone/volto/icons/collection.svg';
import {useIntl} from 'react-intl';
import CreateTemplateModal from '../modals/CreateTemplateModal';
import {getTemplateContainers} from "../../../actions";

const TemplateToolbar = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const pathname = flattenToAppURL(getBaseUrl(location.pathname));
  const content = useSelector((state) => state?.content?.data) || [];
  const [openModal, setOpenModal] = React.useState(false);

  const {nearest_container} = useSelector(
    (state) => state?.templateContainer || {},
  );

  useEffect(() => {
    if (!nearest_container) {
      dispatch(getTemplateContainers(pathname));
    }
  }, [])

  if (!content || content['@type'] !== 'Document' || !nearest_container) {
    return null;
  }

  return (
    <>
      <button
        title={intl.formatMessage(messages.createTemplateButton)}
        aria-label={intl.formatMessage(messages.createTemplateButton)}
        onClick={() => setOpenModal(true)}
      >
        <Icon
          name={collectionSVG}
          size="30px"
        />
      </button>
      <CreateTemplateModal open={openModal} onClose={() => setOpenModal(false)} pageTitle={content.title}/>
    </>
  );

};

export default TemplateToolbar;
