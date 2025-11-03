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

function CreateTemplateAction({ setOpenCreateModal }) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const content = useSelector((state) => state.content?.data) || {};
  const { nearest_container } = useSelector(
    (state) => state?.templateContainer || {},
  );

  const pathname = flattenToAppURL(getBaseUrl(content['@id']));

  useEffect(() => {
    if (!nearest_container) {
      dispatch(getTemplateContainers(pathname));
    }
  }, [nearest_container, pathname]);

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
            if (!/type=(Document|Template)/.test(tx.search)) {
              return true;
            }
            if (tx.search.includes('type=Template')) {
              history.push(`${path}/template-add${tx.search}`, {
                byTemplate: true,
              });
              return false;
            }
            dispatch(toggleShowTemplatesModal());
            return false;
          },
        },
      ]),
      ...getSpreadObject(isTemplate, [
        {
          path: ['/edit', '/**/edit'],
          callback: (tx) => {
            history.push(`${path}/template-edit${tx.search}`, {
              byTemplate: true,
            });
            return false;
          },
        },
      ]),
    ],
    [isTemplate, history, path, templates],
  );

  const onBlock = useCallback(
    (tx, action) => {
      console.log(tx);
      if (tx.state?.byTemplate || action === 'POP') {
        return true;
      }

      const match = matchRoutes(routes, tx.pathname);

      if (match.length === 1) {
        return match[0].route?.callback(tx, action) ?? true;
      }

      return true;
    },
    [routes],
  );

  useRouteChange(null, routes.length > 0 ? onBlock : null);

  return null;
}

function TemplatesToolbar() {
  const el = useRef(null);
  const onClickHandler = useRef(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const content = useSelector((state) => state.content?.data) || {};
  const showTemplatesModal = useSelector(
    (state) => state.templates.showTemplatesModal,
  );

  useEffect(() => {
    if (showTemplatesModal && onClickHandler.current) {
      const toolbarMenu = document.querySelector(
        '#toolbar .toolbar-content .pusher-puller',
      );
      if (toolbarMenu.hasChildNodes()) {
        onClickHandler.current();
      }
    }
  }, [showTemplatesModal]);

  return (
    <>
      <Plug pluggable="main.toolbar.top">
        <CreateTemplateAction setOpenCreateModal={setOpenCreateModal} />
        <RouteChangeHandler />
      </Plug>
      <Plug pluggable="main.toolbar.bottom">
        {(props) => {
          onClickHandler.current = props.onClickHandler;
          return <button ref={el} style={{ display: 'none' }} />;
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
