import React, { useEffect } from 'react';
import { Modal, Header } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { getSelectableTemplates } from '../../../actions';

export const SelectTemplateModal = ({ open, ...rest }) => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state?.selectabletemplates?.items) || [];
  const contextUrl = useSelector((state) => state?.content?.data?.['@id']) || '';
  var dimmer;

  useEffect(() => {
    dispatch(getSelectableTemplates());
  }, [dispatch]);

  return (
    open && (
      <Modal
        dimmer={dimmer}
        open={open}
        className='select-template-modal'
      >
        <Header>Test Run Modal {contextUrl}</Header>

        <div className={'selectable-templates'}>
          {templates.length === 0 && (
            <strong>No Templats Available</strong>
          )}

          {templates.length > 0 &&
            templates.map(function (template, i) {
              return (
                <div className={'selectable-template'} key={i}>
                  <a href={contextUrl + '/add?type=Document&template=' + template.UID}>{template.title}</a>
                </div>
              );
            })}
        </div>

      </Modal>
    )
  );

};
