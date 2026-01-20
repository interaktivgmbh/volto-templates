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

function CreateTemplateAction({ setOpenCreateModal, backRef }) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearest_container, pathname]);

  if (!content || content['@type'] !== 'Document' || !nearest_container) {
    return null;
  }

  return (
    <button
      title={intl.formatMessage(messages.createTemplateButton)}
      aria-label={intl.formatMessage(messages.createTemplateButton)}
      onClick={() => setOpenCreateModal(true)}
      ref={backRef}
    >
      <Icon name={collectionSVG} size="30px" />
    </button>
  );
}

function RouteChangeHandler() {
  const dispatch = useDispatch();
  const history = useHistory();
  const content = useSelector((state) => state.content?.data) || {};
  const isTemplate = content?.['@type'] === 'Template';
  const path = getBaseUrl(history.location.pathname);

  const routes = useMemo(
    () => [
      {
        path: ['/add', '/**/add'],
        callback: (tx) => {
          if (tx.search.includes('type=Template')) {
            history.push(`${path}/template-add${tx.search}`, {
              byTemplate: true,
            });
            return false;
          }
          if (tx.search.includes('type=Document')) {
            dispatch(toggleShowTemplatesModal());
            return false;
          }
          return true;
        },
      },
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTemplate, history, path],
  );

  const onBlock = useCallback(
    (tx, action) => {
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
  const inputRef = useRef(null);
  const backRef = useRef(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const content = useSelector((state) => state.content?.data) || {};
  const showTemplatesModal = useSelector(
    (state) => state.templates.showTemplatesModal,
  );

  const onCloseCreateModal = () => {
    setOpenCreateModal(false);
    backRef.current?.focus();
  };

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

  useEffect(() => {
    if (!openCreateModal) return;
    inputRef.current?.focus();
  }, [openCreateModal]);

  return (
    <>
      <Plug pluggable="main.toolbar.top">
        <CreateTemplateAction
          setOpenCreateModal={setOpenCreateModal}
          backRef={backRef}
        />
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
        onClose={onCloseCreateModal}
        pageTitle={content.title}
        ref={inputRef}
      />
      <SelectTemplateModal show={showTemplatesModal} />
    </>
  );
}

export default TemplatesToolbar;
