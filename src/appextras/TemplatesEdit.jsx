import { createPortal } from 'react-dom';

import Sidebar from '@plone/volto/components/manage/Sidebar/Sidebar';

function TemplatesEdit() {
  return (
    <>
      <h1>WTFFF</h1>
      {createPortal(
        <Sidebar settingsTab />,
        document.getElementById('sidebar'),
      )}
    </>
  );
}

export default TemplatesEdit;
