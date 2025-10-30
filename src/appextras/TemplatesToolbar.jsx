import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { matchRoutes } from 'react-router-config';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import SelectTemplateModal from '../modals/SelectTemplateModal';
import CreateTemplateModal from '../modals/CreateTemplateModal';
import messages from '../messages';
import { getTemplateContainers, toggleShowTemplatesModal } from '../actions';
import useRouteChange from '../hooks/useRouteChange';

import collectionSVG from '@plone/volto/icons/collection.svg';

function getSpreadObject(condition, obj) {
  return condition ? obj : [];
}

function CreateTemplateAction(props) {
  const dispatch = useDispatch();
  const { location, content, setOpenCreateModal } = props;
  const intl = useIntl();

  const { nearest_container } = useSelector(
    (state) => state?.templateContainer || {},
  );

  const pathname = flattenToAppURL(getBaseUrl(location.pathname));

  useEffect(() => {
    if (!nearest_container) {
      dispatch(getTemplateContainers(pathname));
    }
  }, []);

  if (!content || content['@type'] !== 'Document' || !nearest_container) {
    return null;
  }

  return (
    <button
      title={intl.formatMessage(messages.createTemplateButton)}
      aria-label={intl.formatMessage(messages.createTemplateButton)}
      onClick={() => setOpenCreateModal(true)}
    >
      <Icon name={collectionSVG} size="30px" />
    </button>
  );
}

function RouteChangeHandler() {
  const dispatch = useDispatch();
  const history = useHistory();
  const content = useSelector((state) => state.content?.data) || {};
  const { items: templates = [] } = useSelector(
    (state) => state?.templates.selectableTemplates || {},
  );
  const isTemplate = content?.['@type'] === 'Template';
  const path = getBaseUrl(history.location.pathname);

  const routes = useMemo(
    () => [
      ...getSpreadObject(templates.length > 0, [
        {
          path: ['/add', '/**/add'],
          callback: (tx) => {
            const search = tx.search.replace('?', '');
            if (!search.includes('type=Document')) {
              return true;
            }
            if (!search.includes('template=')) {
              dispatch(toggleShowTemplatesModal());
              return false;
            }
            history.replace(`${path}/template-add${tx.search}`);
            return false;
          },
        },
      ]),
      ...getSpreadObject(isTemplate, [
        {
          path: ['/edit', '/**/edit'],
          callback: (tx) => {
            history.replace(`${path}/template-edit${tx.search}`);
            return false;
          },
        },
      ]),
    ],
    [isTemplate, history, path, templates],
  );

  const onBlock = useCallback(
    (tx) => {
      const match = matchRoutes(routes, tx.pathname);

      if (match.length === 1) {
        return match[0].route?.callback(tx) ?? true;
      }

      return true;
    },
    [routes],
  );

  useRouteChange(null, routes.length > 0 ? onBlock : null);

  return null;
}

function TemplatesToolbar(props) {
  const onClickHandler = useRef(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const content = useSelector((state) => state.content?.data) || {};
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
      <Plug pluggable="main.toolbar.top">
        <CreateTemplateAction
          location={props.location}
          content={content}
          setOpenCreateModal={setOpenCreateModal}
        />
        <RouteChangeHandler />
      </Plug>
      <Plug pluggable="main.toolbar.bottom">
        {(props) => {
          onClickHandler.current = props.onClickHandler;
          return null;
        }}
      </Plug>
      <CreateTemplateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        pageTitle={content.title}
      />
      <SelectTemplateModal show={showTemplatesModal} />
    </>
  );
}

export default TemplatesToolbar;
